<template>
	<view>

		<view class="flex" v-for="item in cartsList" :key="item.id">
			<view class="checkbox">

				<u-checkbox v-model="item.is_checked?true:false" shape="circle" @change="checkBoxChanged(item.id)">
				</u-checkbox>

			</view>
			<view class="backG">

				<view class="view1">
					<u-image width="80px" height="80px" :src='item.goods.cover_url' class=""></u-image>
				</view>


				<view class="border1">
					<view style="font-weight: bold;">
						<text class=""> {{item.goods.title}} </text>

					</view>
					<view style="font-size: 14px;">
						{{item.goods.description}}
					</view>
					<view class="bottom1 ">
						<view class="view2" style="color:red;font-weight: bold;">
							<span class='money u-font-10 '>￥</span>
							{{item.goods.price}}
						</view>

						<u-number-box class="numberBox" v-model="item.num" size="mini" @change='changeCartsNumber'
							:index="item.id"></u-number-box>
						<view class="button1">
							<u-button @click="deleteCart(item.id)" size="mini" type="warning">删除</u-button>
						</view>


					</view>
				</view>

			</view>
		</view>
   <view class="computed">
	   
	   <view class="com" style="color:red ; font-weight: bold;">
		   <span class='money u-font-10 ' style="color:black ; font-weight: 300;">合计：￥</span>
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
				checked: false,
				cartsList: [],  //商品列表
				
				cartSelected: [], //选中的商品列表
			}
		},
		methods: {
			async getCartsList() {
				const res = await this.$u.api.cartList()
				this.cartsList = res.data
console.log(this.cartsList)
				for (let i = 0; i < this.cartsList.length; i++) {
					if (this.cartsList[i].is_checked)
						this.cartSelected.push(this.cartsList[i].id)
				}
			console.log(this.cartSelected)
			},
			async checkBoxChanged(id) {

				//	item.is_checked=!item.is_checked
				
				const num = this.cartSelected.indexOf(id)
				console.log(num)
				
				if (num == -1)
					this.cartSelected.push(id)
				else
					this.cartSelected.splice(num, 1)     //没有选中的话 选中，选中的话 取消选中
					
					
				await this.$u.api.cartSelect({
					cart_ids: this.cartSelected
				})
				
				
				
				this.getCartsList()
			},
			async changeCartsNumber(val) {
				//通过props将id传进去
				const {
					value,
					index
				} = val
				await this.$u.api.cartNumber(index, String(value))  //改变商品数量
			},
			async deleteCart(id) {
				await this.$u.api.cartDelete(id)    //删除商品
				this.getCartsList()
			},
			toPay(){
				this.$u.route({
					url:'/pages/carts/pay'
				})
			}
		},
		onLoad() {
			this.getCartsList('goods')
		},
		computed:{
			selectedPrice(){
				//计算商品总价
				let price=0
				for(let i=0;i<this.cartsList.length;i++){
					if(this.cartsList[i].is_checked==1){
						price+=this.cartsList[i].goods.price*this.cartsList[i].num
					}
				}
				return price
			}
		}
	}
</script>

<style lang="scss" scoped>
	.backG {
		background-color: #fffdfb;
		width: 500px;
		display: flex;
	}

	.flex {
		display: flex;

	}

	.checkbox {
		position: relative;
		top: 41px;
		left: 9px;
	}

	.border1 {
		width: 270px;
		height: 100px;

	}

	.view1 {
		margin-left: 10px;
	}

	.bottom1 {
		margin-top: 30px;
		display: flex;
		justify-content: space-between;
	}
	.computed{
		width: 100%;
		height: 80px;
		
		position: relative;
		
		border-top: 1px solid black;
		
	}
	.buttin11{
		width: 80px;
		position: absolute;
		right: 20px;
		top: 20px;
		border-radius: 30%;
	}
	.com{
		position: absolute;
		top: 30px;
		right: 170px;
	}
	
</style>
