const install = (Vue, vm) => {
	
	// 是否登录
	const isLogin=()=>{
		const token=vm.vuex_token
			if(!token){
				const currentPage=getCurrentPages().pop()
				const {options,route}=currentPage  //拿到id等数据
				const optionKeys=Object.keys(options)
				let params=''
				if(optionKeys.length!==0){
					
					params=optionKeys.reduce((pre,current)=>{
						return `${pre}${current}=${options[current]}&`
					},'?').slice(0,-1)
				}
				console.log(params)
				
				//缓存当前页，用于登录或注册后的跳转
				uni.setStorageSync('back_url',route+params)
				  vm.$u.toast('请登录')
				  setTimeout(() => {
				  			vm.$u.route({
				  				url: 'pages/auth/login',
				  				type:'redirect'
				  			})
				  		}, 1500)
						return false
		}
		return true
	}
	
	
	vm.$u.utils={
		isLogin
	}
	
	}
	
	export default{
		install
	}