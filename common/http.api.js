// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	 vm.$u.api = {};
	
	// 首页
	vm.$u.api.index = (params = {}) => vm.$u.get('api/index', params);
	
	// 认证相关的
	vm.$u.api.authLogin = (params = {}) => vm.$u.post('api/auth/login', params);// 登录
	vm.$u.api.authRegister = (params = {}) => vm.$u.post('/api/auth/register', params);// 注册
	vm.$u.api.authLogout = () => vm.$u.post('/api/auth/logout');// 退出登录
	vm.$u.api.authOssToken = () => vm.$u.get('/api/auth/oss/token');// 获取OSS Token
	
	// 用户相关的
	vm.$u.api.userInfo = () => vm.$u.get('api/user'); // 用户详情/api/user
	vm.$u.api.userInfoUpdate = (params = {}) => vm.$u.put('/api/user', params);// 更新用户信息
	vm.$u.api.userUpdateAvatar = (params = {}) => vm.$u.patch('/api/user/avatar', params);// 更新用户信息
	
	// 商品相关
	vm.$u.api.goodsDetail = goodsId => vm.$u.get(`/api/goods/${goodsId}`);// 商品详情
	vm.$u.api.goodsList = (params = {}) => vm.$u.get(`/api/goods`,params);// 商品列表
	
	// 收藏相关
	vm.$u.api.goodsCollect = id => vm.$u.post(`/api/collects/goods/${id}`);// 收藏
	vm.$u.api.getCollected = () => vm.$u.get(`/api/collects`);  //获取收藏内容

//购物车相关
vm.$u.api.cartAdd = params => vm.$u.post(`/api/carts`,params); //加入购物车
vm.$u.api.cartList = goods => vm.$u.get(`/api/carts?include=goods`);  //购物车列表

	vm.$u.api.cartNumber = (cart,num) => vm.$u.put(`/api/carts/${cart}`,{num});  //修改购物车数量
	
	vm.$u.api.cartDelete = cart => vm.$u.delete(`/api/carts/${cart}`);  //从购物车删除商品
	vm.$u.api.cartSelect = (params = {}) => vm.$u.patch(`/api/carts/checked`,params);  //从购物车删除商品
	
	//地址相关
	vm.$u.api.getAdress = () => vm.$u.get(`/api/address`);  //获取地址
	
	vm.$u.api.EditDefault = (address) => vm.$u.patch(`/api/address/${address}/default`,address); //设置默认地址
	vm.$u.api.addA = (address) => vm.$u.post(`/api/address`,address); //添加地址
	
	vm.$u.api.deleteA = (address) => vm.$u.delete(`/api/address/${address}`,address); //删除地址
	
	//订单相关
	vm.$u.api.getOrder = () => vm.$u.get(`/api/orders/preview`);  //获取订单内容
	
	
	
}

export default {
	install
}