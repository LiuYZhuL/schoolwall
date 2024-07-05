<template>
	<view>
		<uni-forms-item required name="name" style="height: 20px;">
			<input class="modifyName" type="text" v-model="formData.name" placeholder="请输入新昵称" />
    	
		
		</uni-forms-item>
		<button @click="modify" style="color: #007AFF;">修改</button>
		
	</view>
</template>

<script>
	export default {
		data() {//data() 是一个用于定义组件数据的函数。该函数返回一个包含组件数据的对象。
			return {
			   formData: {
			        name: ''  // 确保 formData 初始化时包含 name 属性
			      }
			}
		},
		onLoad() {//onLoad() 是在小程序框架中使用的生命周期函数
	
		},
		methods: {//methods 是用于定义组件方法的选项。
	       modify(){
			   uni.usernameop=this.formData.name,
			   uni.showToast({
				   
			   	icon:'success',
			   	title:'修改成功'
			   })
			   setTimeout(()=>{
				  
				   uni.switchTab({
				   	url:'/pages/user/user'
				   })
				   
			   },500)
			   
			  
			   // this.$refs.form.validate().then(res=>{
			   // 				// console.log('表单数据信息：', res);
			   // 							uni.showToast({
			   // 								icon:'success',
			   // 								title:'登录成功'
			   // 							})
										
						// 				uni.switchTab({
						// 					url:'/pages/user/user'
						// 				})
			   							
			   // 			}).catch(err =>{
			   // 				console.log('表单错误信息：', err);
							
			   // 			})
			   
			   
			 
		   }
		 
		}
	}
</script>

<style>
	.modifyName{
	font-size: 20px;
	}
	.uni-forms-item{
		margin-top: 20px;
	}
</style>