<template>
	<view >
		<u-swiper :list="imgList" name="img_url" height="320"></u-swiper>
		<view class="u-text-center u-m-t-30">
			<u-tabs :list="sortList" bar-width='100' item-width='160' :is-scroll="true" :current="sortCurrent" @change="changeSort" ></u-tabs>
		</view>
		<u-row gutter="16" class="u-skeleton">
					<u-col span="6" v-for='item in goodsList.length !==0? goodsList: [{},{},{},{}]' >
						<goods-card :item="item"></goods-card>
					
					</u-col>
				</u-row>
				<u-toast ref="uToast" />
				<!-- 骨架屏 -->
					<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>  
	</view>
</template>

<script>
	export default {
	
		data() {
			return {
			   imgList:[
				  
			   ],  //轮播图信息
			   sortList:[
				   {
					   name:'默认'
				   },
				   {
					   name:'销量'
				   },
				   {
				   					   name:'推荐'
				   },{
					   name:'最新'
				   }
			   ],
			   sortCurrent:0,  //标签索引
			   goodsList:[],  //商品信息
			   categoriesList:[],
					page:1,  //商品页码 商品参数数据
			   loading:false
			}
		},
		 onLoad() {
			
			
			
			
      this.getList()
	
		},
		onReachBottom(){
			
			
			this.page+=1
			this.getList()
			
		},
		methods: {
			async getList(){   //获取数据
			this.loading=true  //显示骨架屏
			const params={
							  page:this.page,
							 
			}
			if(this.sortCurrent==1) params.sales=1
			if(this.sortCurrent==2) params.recommend=1
			if(this.sortCurrent==3) params.new=1
			const res=await this.$u.api.index(params)
			 console.log(res)
			// if(this.sortCurrent==1) {
			// 	this.params.sales=1
			// 	this.params.recommend=0
			// 	this.params.new=0
			// }
			// if(this.sortCurrent==2) 
			// {this.params.sales=0
			// 	this.params.recommend=1
			// 	this.params.new=0}
			// if(this.sortCurrent==3) {this.params.sales=0
			// 	this.params.recommend=0
			// 	this.params.new=1}
			// const res=await this.$http.get('/api/index',{
			// 	params:
			// 		this.params
				
			// })	
			
			
			// if(res.status!==200) 
			// this.$refs.uToast.show({
			// 					title: '获取商品列表失败',
			// 					type:'warning'
			// 				})
							this.loading=false
					this.goodsList=[...this.goodsList,...res.goods.data]
					this.categoriesList=res.categories
					this.imgList=res.slides
					
			},
 changeSort(index){
	   this.sortCurrent=index
	   //判断筛选条件
	   this.goodsList=[] //商品数据重置
	   this.page=1 //分页置空
	   this.getList()
	 
 },
 
		}
	}
</script>

<style lang="scss" scoped>
	
	
</style>
