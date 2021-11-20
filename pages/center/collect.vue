<template>
	<view>
		<view class="" v-for="item in collectedList">
			<navigator :url="'/pages/goods/show?goodsId='+item.goods.id" class="goods_item">
				<u-image class="u-skeleton-fillet"  width="120px" height="100px" :src="item.goods.cover_url"></u-image>
				
				<view class=" u-line-1 u-skeleton-rect" style="font-size: 15px;font-weight: bold;width: 200px;">
					{{item.goods.title?item.goods.title:'商品名称'}}
					<br>
					<span style="font-size: 13px; color: #82848A;">
							{{item.goods.description?item.goods.description:'商品描述'}}
					</span>
					
				</view>
				<view class="u-flex u-row-between">
					<view class="price u-skeleton-rect" style="width: 50px;">
						￥ {{item.goods.price}}
					</view>
					
				</view>
			</navigator>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				collectedList:[]
			}
		},
		methods: {
			async getCollected(){
				 const res=await this.$u.api.getCollected()
				 this.collectedList=res.data
				 console.log(res)
			}
		},
		onLoad(){
			this.getCollected()
		}
	}
</script>

<style lang="scss" scoped>
.goods_item{
	display: flex;
	align-items: center;
	justify-content: center;
			margin-top: 10px;
			padding: 20px;
			box-shadow: 0 6px 10px 0 rgba(0,0,0,.1);
			.title{
				
				margin: 10px 0;
				font-weight: 500;
				font-size: 15px;
				width: 100%;
			}
			.sales{
				margin-top: 5px;
				color: #888;
				width:60%
			}
			.price{
				margin-top: 5px;
				color: red;
				width:30%
			}
		}
</style>
