<template>
	<view>
		<view class="" >
			
		
		<view class="flex" v-for="item in addressList">
			<view class="address2">
				{{`${item.province}${item.city}${item.county}${item.address}`}}
				<br>
				<span class='u-font-10' style="color: #a9aa9d;">{{`${item.name}  ${item.phone}`}}</span>
			</view>
			<!-- <view class="">
				<u-button style="font-size: 13px; width: 30px;" type="warning" @click="deleteAdress(item.id)">删除</u-button>
			</view> -->
			<view class="" v-show="item.is_default?false:true">
				<u-button style="width: 90px;font-size: 13px; ;" type="success" @click="editDefaultAdress(item.id)">设为默认地址</u-button>
			</view>
			
			
			
		</view>
		</view>
		  <u-button  type="primary" style="width: 150px; margin-top: 100px;" @click="addAddress">添加地址</u-button>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				addressList:[],
			}
		},
		methods: {
			async getAdress(){  //请求所有收货地址
				const res=await this.$u.api.getAdress()
				console.log(res)
				this.addressList=res.data
			},
			async editDefaultAdress(id){
				console.log(id)
				await this.$u.api.EditDefault(id)
				this.getAdress()
			},
			addAddress(){
				this.$u.route({
					url:'pages/center/addAddress'
				})
			},
			async deleteAdress(id){
				
			
				await this.$u.api.deleteA(id)
				
				this.getAdress()
			}
		},
		onLoad(){
			this.getAdress()
		},
		computed:{
			
		},
		
	}
</script>

<style lang="scss" scoped>
.address2{
	width: 250px;
	height: 40px;
	margin-top: 20px;
	margin-bottom: 10px;
	margin-left: 20px;
	
}
.flex{
	display: flex;
	
	align-items: center;
}
</style>
