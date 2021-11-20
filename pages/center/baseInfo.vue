<template>
	<view>
		<view >
				<u-form class="aaa" :model="form" ref="uForm" >
					<u-form-item label="姓名" prop="name" required>
						<u-input v-model="form.name"  />
					</u-form-item>
					
				</u-form>
				<u-button @click="submit">提交</u-button>
				<u-button @click="back">返回</u-button>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					name:'',
					
				},
				rules:{
					name:[{
						required:true,
						message:'请输入昵称',
						trigger:['change','blur']
					}]
				}
			}
		},
		onReady(){
		 this.$refs.uForm.setRules(this.rules)
		 this.form.name=this.vuex_user.name
		},
		methods: {
			submit(){
				this.$refs.uForm.validate(async valid=>{
					if(!valid) return 
					//更新用户信息
					
					const res=await this.$u.api.userInfoUpdate(this.form)
					
					//重新请求用户信息//更新vuex中的user
					this.$u.utils.updateUser()
				
					this.$u.toast('更新成功')
					
					//返回个人中心
					this.$u.route({
						type:'reLaunch',
						url:'pages/center/index'
					})
				})
			},
			back(){
				//返回个人中心
				this.$u.route({
					type:'reLaunch',
					url:'pages/center/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.aaa{
	margin-left: 20px;
}
</style>
