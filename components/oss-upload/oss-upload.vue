<template>
	<view>
		<u-upload
			
				:action='action' 
				maxCount="1"
				:max-size="5*1024*1024"
				:custom-btn="true"
				:show-progress="false"
				:form-data="formData"
				:multiple="false"
				:beforeUpload="beforeUpload"
				:deletable="false"
				:show-upload-list="true"
				width="0"
				height="0"
				@on-success='onSuccess'
				ref='upload'
				>
						<u-avatar slot='addBtn' :src="vuex_user.avatar_url" size="140"></u-avatar>
			</u-upload>
	</view>
</template>

<script>
	let _this={}
	export default {
		
		name:"oss-upload",
		data() {
			return {
				formData:{},
				action:'',
				upFileName:'',
			};
		},
		created(){
		_this=this	
		},
		methods:{
			async beforeUpload(index,list){
				
				const {file}=list[0]
				//#ifdef H5
				const fileName=file.name
				//#endif
				
				
				//#ifndef H5
				 const fileName=file.path
				//#endif
				
				
				
			
				
				//请求api 获取osstoken
				const ossToken=await _this.$u.api.authOssToken()
				//设置上传域名
				_this.action=ossToken.host
				
				//处理唯一文件名
				 const suffix = fileName.slice(fileName.lastIndexOf('.'))
				 const upFileName=_this.$u.guid(20)+suffix
				 
				 this.upFileName=upFileName
				
				 
				 
				//额外的上传参数
				_this.formData={
					        'key' : upFileName, //上传后的文件名
					        'policy': ossToken.policy,
					        'OSSAccessKeyId': ossToken.accessid, 
					        'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
					        'signature': ossToken.signature,
				}
				
				return true
			},
			async onSuccess(){
				//上传成功之后
				
				//移除预览区图片
				this.$refs.upload.remove(0)
				
				//请求API头像
				await this.$u.api.userAvatar({
					avatar:this.upFileName
				})
				
				
				//缓存用户信息
				this.$u.utils.updateUser()
				
				this.$u.toast('更新成功')
				
				
			},
			
		}
	}
</script>

<style lang="scss" scoped>

</style>
