<template>
	<navigator url="" class="goods_item">
		<u-image class="u-skeleton-fillet"  width="100%" height="300rpx" :src="item.cover_url"></u-image>
		
		<view class=" u-line-1 u-skeleton-rect">
			{{item.title?item.title:'商品名称'}}
			
		</view>
		<view class="u-flex u-row-between">
			<view class="price u-skeleton-rect">
				￥ {{item.price}}
			</view>
			<view class="sales u-skeleton-rect">
				销量：{{item.sales}}
			</view>
		</view>
	</navigator>
</template>

<script>
	export default {
		name:"goods-card",
		props:{
		  item:{
			  type:Object,
			  default(){
				  return {}
			  }
		  }	
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
.goods_item{
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
