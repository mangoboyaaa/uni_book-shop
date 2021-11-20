<template>
	<view class="u-wrap">
		<view class="u-search-box">
			<u-search placeholder="搜索商品" v-model="keyword" @custom="searchGoods"></u-search>
		</view>
		<view class="u-menu-wrap">
			<scroll-view :show-scrollbar='true' scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
				<view v-for="(item,index) in categoryList" :key="item.id" class="u-tab-item"
					:class="[current==index ? 'u-tab-item-active' : '']" :data-current="item.id"
					@tap.stop="swichMenu(index,item.id)">
					<text class="u-line-1">{{item.name}}</text>
				</view>
			</scroll-view>
			<block>
				<scroll-view scroll-y class="right-box" @scrolltolower="scrollHandle">
					<view class="page-view">
						<view class="class-item">
							<view class="item-container">
								<view class="thumb-box u-p-40" v-for="(item,index) in goodsList" :key="item.id" @click="toDetail">
								
								<navigator :url="'/pages/goods/show?goodsId='+item.id" class="goods_item">
									<image class="item-menu-image" :src="item.cover_url"></image>
									<view class="item-menu-name">{{item.title}}</view>
									
									</navigator>
								</view>
							</view>
						</view>
						<u-loadmore :status="status" :load-text="loadText"></u-loadmore>
					</view>
				</scroll-view>
			</block>
		</view>
	</view>
</template>

<script>
	// import classifyData from "@/common/classify.data.js";
	export default {
		data() {
			return {
				tabbar: [],
				scrollTop: 0, //tab标题的滚动条位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度

				categoryList: [], // 分类列表
				goodsList: [], // 商品列表
				keyword: '', // 搜索商品关键字
				page: 1, // 分页
				status: 'loadmore', // 加载更多
				loadText: {
					loading: '加载中',
					loadmore: '轻轻上拉',
					nomore: '实在没有了',
				},
				
				category_id: 0, // 分类列表
			}
		},
		computed: {

		},
		onLoad() {
			this.getGoodsData()
		},
		methods: {
			// 初始化数据
			init() {
				this.page = 1
				this.status = 'loadmore'
				this.goodsList = []
			},
			// 关键字搜索
			searchGoods() {
				this.init()
				this.getGoodsData()
			},

			// 下拉刷新右边区域
			scrollHandle() {
				this.page = this.page + 1
				this.getGoodsData()
			},
			//获取商品数据
			async getGoodsData() {
				if (this.status === 'nomore') return
				this.status = 'loading'
				const params = {
					title: this.keyword,
					page: this.page,
					category_id: this.category_id
				}
				const res = await this.$u.api.goodsList(params)
				// console.log(res)
				// 对商品类别数据进行解析封装
				let categoryList = []
				res.categories.map(item => {
					item.children.map(cItem => {
						categoryList.push(cItem)
					})
				})
				this.categoryList = categoryList
				this.goodsList = [...this.goodsList, ...res.goods.data]
				
				if (res.goods.data.length < 10) {
					this.status = 'nomore'
				}else{
					this.status = 'loadmore'
				}
			},


			getImg() {
				return Math.floor(Math.random() * 35);
			},
			// 点击左边的栏目切换
			async swichMenu(index, id) {
				if (index == this.current) return;
				this.current = index;
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;

				this.category_id = id
				this.init()
				this.getGoodsData()

			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({
						size: true
					}, res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if (!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			},
			toDetail(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - 198rpx);
		/* #endif */
		display: flex;
		flex-direction: column;
	}

	.u-search-box {
		padding: 18rpx 30rpx;
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 16rpx;
	}

	.u-search-text {
		font-size: 26rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
	}

	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}

	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fff;
	}

	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid $u-type-primary;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}

	.u-tab-view {
		height: 100%;
	}

	.right-box {
		background-color: rgb(250, 250, 250);
	}

	.page-view {
		padding: 16rpx;
	}

	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}

	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}

	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
		color: $u-main-color;
	}

	.item-container {
		display: flex;
		flex-wrap: wrap;
	}

	.thumb-box {
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 20rpx;
	}

	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
	}
</style>