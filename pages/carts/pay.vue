<template>
	<view class="flex4">
		
	
	<view class="" style="width: 404px;">
		<view class="address">
			<view class="address2">
				{{address}}
				<br>
				<span class='u-font-10' style="color: #a9aa9d;">{{detail}}</span>
			</view>
			<u-button style="width:80px;" class="butt1" @click="toAdress">选择地址</u-button>
		</view>
		
		
		<view class="flex1" v-for="item in orderPreview" >
			    <view class="">
			    	<u-image width="120px" height="120px" :src='item.goods.cover_url' class=""></u-image> 
			    </view>
				<view class="flex2" style="width: 250px;">
					<view class="" style="margin-top: 20px;">
						{{item.goods.title}}
					</view>
					<view class="flex3" style="margin-bottom: 10px;   ">
						
						<view class="" style="color: red;font-weight: bold; ">
							<span style="font-size: 10px;">￥:</span>
							
							{{item.goods.price}}
						</view>
						<span style="font-size: 10px; font-weight: bold;">	x:{{item.num}}</span>
					
					</view>
				</view>
		</view>
		
	</view>
	<view class="abs" style="border-top: 1px solid black;">
		<view class="abs1" style="color: red;font-weight: bold;">
			<span style="font-size: 10px;">总价:</span>
			{{selectedPrice}}
		</view>
		<u-button  class="buttin11" type="success" @click="toPay">立即支付</u-button>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
					return {
						adressList:[],  //地址数组
						address:'', //默认地址
						detail:'', //姓名电话
						orderPreview:[], //订单列表
					}
				},
		methods: {
			async getAdressList(){
				const {data:res}=await this.$u.api.getAdress()
				
				this.adressList=res
				for(let i=0;i<res.length;i++){
					if(res[i].is_default==1)
					{
						this.address=`${res[i].province}${res[i].city}${res[i].county}${res[i].address}`
						this.detail=`${res[i].name}  ${res[i].phone}`
					}

				}
			},
			async getOrderPreview(){
				const res=await this.$u.api.getOrder()
				console.log(res)
				this.orderPreview=res.carts
			},
			toPay(){
				//支付
				this.$u.toast('支付功能暂未开通')
			},
			toAdress(){
				console.log(1)
				this.$u.route({
					
					url:'/pages/center/address'
				})
			}
				
			},
			onLoad(){
				this.getAdressList()
				this.getOrderPreview()
			},
			computed:{
				selectedPrice(){
					//计算商品总价
					let price=0
					for(let i=0;i<this.orderPreview.length;i++){
						if(this.orderPreview[i].is_checked==1){
							price+=this.orderPreview[i].goods.price*this.orderPreview[i].num
						}
					}
					return price
				}
			}
		
	}
</script>

<style lang="scss" scoped>

.address{
	width: 100%;
	height: 60px;
	
	display: flex;
	
}
.butt1{
	margin: 0;
	position: absolute;
	right: 10px;
	top: 15px;
	height: 30px;
}
.address2{
	width: 250px;
	height: 40px;
	
	position: absolute;
	top: 10px;
	left: 20px
}
.flex1{
	display: flex;
	
}
.flex2{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.flex3{
	display: flex;
	justify-content: space-between;
}

.abs{
	
	position: relative;
	height: 80px;
	width: 100%;
	
}
.abs1{
	 position: absolute;
	 top: 30px;
	 right: 170px;
}
.buttin11{
		width: 80px;
		position: absolute;
		right: 20px;
		top: 20px;
		border-radius: 30%;
	}
</style>
