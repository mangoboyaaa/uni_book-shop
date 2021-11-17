<template>
	<view class="wrap">
		
		<view class="content">
			<view class="title">欢迎登录图书馆</view>
			<input class="u-border-bottom"  v-model="email" placeholder="请输入邮箱" />
			<input class="u-border-bottom" type="password" v-model="password" placeholder="请输入密码"  />
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">登录</button>
		
			<view class="alternative">
				<button class="issue">找回密码</button>
				<button class="issue">注册</button>
			</view>
		</view>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			email:'test@a.com',
			password:'123123',
		}
	},
	computed: {
		inputStyle() {
			let style = {};
			if(this.$u.test.email(this.email)&&this.password) {
				style.color = "#fff";
				style.backgroundColor = this.$u.color['warning'];
			}
			return style;
		}
	},
	methods: {
		async submit() {
			if(!this.$u.test.email(this.email)||!this.password)
			return
			const params={
				email:this.email,
				password:this.password
			}
			const res = await this.$u.api.authLogin(params)
			console.log(res)
			
			//登陆后，缓存token
			this.$u.vuex('vuex_token',res.access_token)
			
			//登陆后，缓存用户信息
			const userInfo=await this.$u.api.userInfo()
			this.$u.vuex=('vuex_user',userInfo)
			this.$u.toast('登陆成功')
			
			//登陆后，跳转到来源页
			const backUrl=uni.getStorageSync('back_url')||'pages/index/index'
			setTimeout(()=>{
				this.$u.route({
					type:'reLaunch',
					url:backUrl
				})
			},1500)
			
			
		},
		
	}
};
</script>

<style lang="scss" scoped>
	.issue{
		 width: 80px;
		 height: 30px;
		 font-size: 10px;
		 background-color: rgb(255, 251, 249);
	}
	.u-border-bottom{
		margin-bottom: 15px !important;
	}
.wrap {
	font-size: 28rpx;
	.content {
		width: 600rpx;
		margin: 80rpx auto 0;

		.title {
			text-align: left;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
		.tips {
			color: $u-type-info;
			margin-bottom: 60rpx;
			margin-top: 8rpx;
		}
		.getCaptcha {
			background-color: rgb(253, 243, 208);
			color: $u-tips-color;
			border: none;
			font-size: 30rpx;
			padding: 12rpx 0;
			
			&::after {
				border: none;
			}
		}
		.alternative {
			color: $u-tips-color;
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
		}
	}
	.buttom {
		.loginType {
			display: flex;
			padding: 350rpx 150rpx 150rpx 150rpx;
			justify-content:space-between;
			
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: $u-content-color;
				font-size: 28rpx;
			}
		}
		
		.hint {
			padding: 20rpx 40rpx;
			font-size: 20rpx;
			color: $u-tips-color;
			
			.link {
				color: $u-type-warning;
			}
		}
	}
}
</style>
