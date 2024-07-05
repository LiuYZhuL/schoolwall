<template>
	<view>
		<view  class="post" v-for="post in posts" :key="post.id">
			<uni-list-chat clickable="true" :avatar-circle="true"  :title="post.circleName" :avatar="post.circleavatar" :note="post.circleType" :time="post.circlePostCount" @click="login()"></uni-list-chat>
		</view>
	
			
	</view>
</template>

<script>
	export default {
	
		data() {
			return {
				posts: [
				  
				],
				
				   
			
			}
		},
		onShow() {
			uni.request({
			  url: 'http://127.0.0.1:4523/m1/4600643-4250220-default/api/user/circle/joined',
			  method: 'GET',
			  header: {
			    'content-type': 'application/json'
			  },
						  
			  success: res => {
								 if (res.statusCode === 200 ) {
								             const data = res.data.data;
								             console.log('Total:', data.total);
											this.total=data.total;
								             const records = data.records;
											 this.posts=records;
								     
								         } else {
								         console.error('Error in response:', res);
								         }
			    console.log(res.data)
			  },
			  fail: err => {
			    console.log(err)
			  }
			})
			
						  
			
			
		
			},
		onLoad() {//onLoad() 是在小程序框架中使用的生命周期函数
		
	
		},
		methods: {//methods 是用于定义组件方法的选项。
		
	       login(){
			   uni.navigateTo({
			   					 	url:'/pages/details/group'
			   })
			   
	       },
		  
		 
		}
	}
</script>

<style>
</style>






