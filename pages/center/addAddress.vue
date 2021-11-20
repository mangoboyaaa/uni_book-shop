<template>
	<view>
		<view >
				<u-form class="aaa" :model="form" ref="uForm" >
					<u-form-item label="收货人姓名" prop="name" required labelAlign="center" labelWidth="100px">
						<u-input v-model="form.name"  />
					</u-form-item>
					<u-form-item label="详细地址" prop="address" required labelAlign="center" labelWidth="100px">
						<u-input v-model="form.address"  />
					</u-form-item>
					<u-form-item label="手机号" prop="phone" required labelAlign="center" labelWidth="100px">
						<u-input v-model="form.phone"  />
					</u-form-item>
					<u-form-item label="省份" prop="province" required labelAlign="center" labelWidth="100px">
						<u-input v-model="form.province"  />
					</u-form-item>
					<u-form-item label="城市" prop="city" required labelAlign="center" labelWidth="100px">
						<u-input v-model="form.city"  />
					</u-form-item>
					<u-form-item label="区县" prop="county" required labelAlign="center" labelWidth="100px" >
						<u-input v-model="form.county"  />
					</u-form-item>
					
				</u-form>
				<u-button @click="submit" type="primary" style="width: 100px; margin-top: 100px;">提交</u-button>
				
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					name:'',
					address:'',
					phone:'',
					province:'',
					city:'',
					county:''
					
				},
				rules:{
					name:[{
						required:true,
						message:'请输入收货人姓名',
						trigger:['change','blur']
					}],
					address:[{
						required:true,
						message:'请输入详细地址',
						trigger:['change','blur']
					}],
					phone:[{
						required:true,
						message:'请输入手机号',
						trigger:['change','blur']
					},
					{
						validator: (rule, value, callback) => {
							if(!this.$u.test.mobile(value)){
								return false;
							}
							return true
							},
							message: '请输入正确手机号',
							trigger: ['change', 'blur']
						}],
					province:[{
						required:true,
						message:'请输入省份',
						trigger:['change','blur']
					}],
					city:[{
						required:true,
						message:'请输入城市',
						trigger:['change','blur']
					}],
					county:[{
						required:true,
						message:'请输入区县',
						trigger:['change','blur']
					}],
				}
			}
		},
		onReady() {
					this.$refs.uForm.setRules(this.rules)
				},
		methods: {
			submit(){
				
				this.$refs.uForm.validate(async valid=>{
					if(!valid) return
					await this.$u.api.addA(this.form)  
					this.$u.toast('添加成功')
					
					this.$u.toast('添加成功')
					
					this.$u.route({
						url:'/pages/carts/pay'
					})
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
.aaa{
	margin-left: 20px;
}
</style>
