<template>
	<view class="u-rela u-skeleton">
		<!-- 商品信息 -->
		<view class="goods-item">
			<u-image class="u-skeleton-rect" width="100%" height="500rpx" :src="goodsInfo.cover_url"></u-image>
			<view class="name u-line-1 u-p-t-20 u-p-b-20 u-skeleton-rect">{{goodsInfo.title}}</view>
			<view class="u-flex u-row-between">
				<view class="price u-skeleton-rect">￥ {{goodsInfo.price}}</view>
				<view class="sales u-skeleton-rect">销量: {{goodsInfo.sales}}</view>
			</view>
		</view>

		<!-- tab组件 -->
		<u-tabs  class="u-m-l-20 u-m-r-20 u-skeleton-rect" :list="list" :is-scroll="false" :current="current" @change="changeTabs"></u-tabs>
		<view class="content u-m-l-20 u-m-r-20 u-p-b-80 u-skeleton-rect">
			<!-- 商品详情 -->
			<template v-if="current === 0">
				<u-parse :html="goodsInfo.details"></u-parse>
			</template>

			<!-- 商品评论 -->
			<template v-if="current === 1">
				 <template v-if='commentList.length'>
				 	<view class="comment" v-for="(res, index) in commentList" :key="res.id">
				 		<view class="left">
				 			<image :src="res.user.avatar_url" mode="aspectFill"></image>
				 		</view>
				 		<view class="right">
				 			<view class="top">
				 				<view class="name">{{ res.user.name }}</view>
				 				
				 			</view>
				 			<view class="content">{{ res.content }}</view>
				 			
				 			<view class="bottom">
				 				{{ res.created_at }}
				 				
				 			</view>
				 		</view>
				 	</view>
				 </template>
				 <template v-else>
				 	<u-empty
				 	        mode="message"
				 	        icon="http://cdn.uviewui.com/uview/empty/message.png"
							class="uEmpty"
				 	>
				 	</u-empty>
				 </template>
				
			</template>

			<!-- 推荐商品 -->
			<template v-if="current === 2">
				<u-row gutter="16">
					<u-col span="6" v-for="(item,index) in goodsList" :key="index">
						
							<goods-card :item="item"></goods-card>
					</u-col>
				</u-row>
			</template>
		</view>

		<view class="navigation u-absolute">
			<view class="left">
				<view class="item u-text-center"  @click="collect">
					<u-icon name="star" :size="40" :color="this.isCollect?'red':'black'"></u-icon>
					<view class="text u-line-1" >收藏</view>
				</view>
				<view class="item car" @click="toCart">
					<u-badge class="car-num" :count="cartCount" type="error" :offset="[-3, -6]"></u-badge>
					<u-icon name="shopping-cart" :size="40"   :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1" >购物车</view>
				</view>
			</view>
			<view class="right "  >
					<view class="buy btn u-line-1" @click="addCart()">加入购物车</view>
						
						</view>
		</view>
		<!--引用组件-->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsInfo: {}, // 商品信息
				list: [{
					name: '商品详情'
				}, {
					name: '商品评论',
					count:0
				}, {
					name: '推荐商品'
				}], // tab列表
				current: 0, //当前选中的tab选项
				commentList: [{
					
				}], // 评论列表
				isCollect: 0, // 是否收藏
				
				loading: false, // 信息加载
				cartCount: 0,// 购物车数量
				goodsId:null,
				goodsList:[],
				cartCount:0,
				
			}
		},
		onLoad(options) {
			
			this.goodsId=options.goodsId
			this.getGoodsDetail()
			
			this.getCartCount()
		},
		methods: {
			// 获取商品信息
			async getGoodsDetail() {
				this.loading = true
				
				const res = await this.$u.api.goodsDetail(this.goodsId)
			console.log(res)
				this.loading = false
				// console.log(res)
				// 获取商品信息
				this.goodsInfo = res.goods
				this.isCollect = res.goods.is_collect
				// 评论列表
				this.commentList = res.goods.comments
				
				//评论数量
				this.list[1].count=res.goods.comments.length
				
				// 推荐商品列表
				this.goodsList = res.like_goods
				
				
			},
			// 切换tab选项
			changeTabs(index) {
				this.current = index
			},
			
			//收藏商品
			async collect(){
				const res=this.$u.api.goodsCollect(this.goodsId) //请求收藏
				
				//收藏成功之后，提示消息并改变按钮状态
				
				if(this.isCollect===0)
				{
					this.$u.toast('收藏成功')
					this.isCollect=1
				}
				else{
					this.$u.toast('取消收藏')
					this.isCollect=0
				}
			},
			
			
			async addCart(){
				const params={
					goods_id:this.goodsId
				}
				const res=await this.$u.api.cartAdd(params)
				
				this.$u.toast('添加成功')
				//重新获取购物车数据
				this.getCartCount()
				
			},
			
			//获取购物车数量
			async getCartCount(){
				const res = await this.$u.api.cartList()
				
				this.cartCount=res.data.length
			},
			toCart(){
				//跳转到购物车
				
				this.$u.route({
					type:'switchTab',
					url:'/pages/carts/carts'
				})
			}
			
			
		}
	}
</script>

<style lang="scss" scoped>
	// 商品信息
	.goods-item {
		padding: 20rpx;
		margin-bottom: 20rpx;
		// box-shadow: 0 12rpx 20rpx rgba(0, 0, 0, .1);

		// 标题
		.name {
			font-size: 36rpx;
			font-weight: bold;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			width: 100%;
		}

		// 价格
		.price {
			width: 40%;
			color: red;
			padding-left: 20rpx;
			font-weight: bold;
			font-size: 32rpx;
		}

		// 销量
		.sales {
			width: 40%;
			color: #888;
			font-weight: bold;
			font-size: 32rpx;
			padding-right: 20rpx;
		}
	}

	.content {
		min-height: 360rpx;
	}

	// 底部
	.navigation {
		display: flex;
		// margin-top: 100rpx;
		border: solid 2rpx #f2f2f2;
		background-color: #ffffff;
		padding: 16rpx 0;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
        
		.left {
			display: flex;
			font-size: 20rpx;
			margin-right: 80rpx;

			.item {
				margin: 0 30rpx;

				&.car {
					text-align: center;
					position: relative;

					.car-num {
						position: absolute;
						top: -10rpx;
						right: -10rpx;
					}
				}
			}
		}

		.right {
			display: flex;
			font-size: 28rpx;
			align-items: center;

			.btn {
				line-height: 66rpx;
				padding: 0 30rpx;
				border-radius: 36rpx;
				color: #ffffff;
			}

			.cart {
				background-color: #ed3f14;
				margin-right: 30rpx;
			}

			.buy {
				background-color: #ff7900;
			}
		}
		
	}
</style>