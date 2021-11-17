import Vue from 'vue'
import App from './App'
import axios from 'axios'
Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

//将Vuex通过mixin混入全局
let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);

import store from '@/store';   
//引入vuex



// Vue.prototype.$http=axios
// axios.defaults.baseURL='https://api.shop.eduwork.cn'
// axios.interceptors.request.use(config => {  
// 	//利用axios的请求拦截器，的use方法,使在请求发起之前先将token信息携带
// 	//use方法的作用就是在请求发起之前生成一个回调函数，执行一些预处理
	
// 	config.headers.Authorization = window.sessionStorage.getItem('token')  

// 	//客户端输入的登录信息验证成功后,将token返回给客户端,此时客户端可以拿到token并将其保存到sessionstorage中，
// 	//将此时拿到的token保存在请求头的authorization中，使之后的请求都携带本token信息，因为后续项目的打开都需要token验证
	
// 	  return config 
// })



const app = new Vue({
	store, 
	//将vuex放到vue实例中
    ...App
})



//http拦截器，此为需要加入的内容，如果不是写在common目录，请自行修改引入路径
import httpInterceptor from '@/common/http.interceptor.js'
//这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(httpInterceptor, app)

// http接口API集中管理引入部分
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)

import utils from '@/common/utils.js'
Vue.use(utils, app)


app.$mount()
