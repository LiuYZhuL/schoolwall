<template>
	<view>
		<view  class="post" v-for="post in posts" :key="post.id">
		<uni-list-chat clickable="true" link to='/pages/info/talk'   badge-positon="left":avatar-circle="true" title="河南农业大学" badge-text="9" avatar="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" note="欢迎加入河南农业大学表白墙" time="2020-02-02 20:20" ></uni-list-chat>
	</view>
	</view>
	
</template>

<script>
	
	export default {
	
		data() {
			return {
					posts: [],
				
			}
		},
		onShow() {
			uni.request({
			  url: 'http://127.0.0.1:4523/m1/4600643-4250220-default/api/user/circle?apifoxApiId=181507530',
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
		onLoad() {
			
		},
		methods: {
		
		}
	}
</script>

<style>
	.avatar{
		height: 80rpx;
		width: 80rpx; 
		border-radius: 100%; 
		margin-right: 10px;
	}
	.messageAlert{
		display: flex;
		justify-content: space-between;
	}
	.name{
		text-align:left; 
		font-size: 18px;
	}
	.messageTime{
		text-align:right;
		color: RGB(0,0,0,0.5);
	}
	.message{
		color: RGB(0,0,0,0.5);
	}
	.redDot{
		border-radius: 100%; 
		background-color: red; 
		text-align: center; 
		height: 18px; 
		width: 18px;
	}
	.redDotNum{
		text-align: center; 
		color: white;
	}
</style>
