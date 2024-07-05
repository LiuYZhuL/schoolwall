<template>

	<view class="container">
			<view style="height: 60px;background-color:#F46B42;"></view>
	  <view class="header">
	    <view class="user-info">
	      <image class="avatar" src="/static/2.jpg" />
	      <view class="user-details">
	        <text class="username">{{ppp}}</text>
	        <text class="userid">{{qqq}}</text>
	      </view>
	    </view>
	    <view class="stats" @click="tofriend()">
	     
	      <view class="stat-item"v-for="(item,index) in myData":key="index">
	        <text class="stat-value">{{item.num}}</text>
	        <text class="stat-label">{{item.name}}</text>
	      </view>
		  
		  
	     
	    </view>
		
	  </view>
	<view>


	<view class="profile-container">
	 
	  <view class="profile-item" @tap="navigateTo('gender')">
	    <text class="item-label">我的圈子</text>
	    <image class="arrow-icon"  />
	  </view>
	  <view class="profile-item" @tap="navigateTo('birthdate')">
	    <text class="item-label">我的动态</text>
	    <image class="arrow-icon"  />
	  </view>
	  <view class="profile-item" @tap="navigateTo('signature')">
	    <text class="item-label">修改个人信息</text>
	    <image class="arrow-icon" />
		
		</view>
		<view class="profile-item" @tap="navigateTo('nickname')">
		  <text class="item-label">退出</text>
		  <image class="arrow-icon"  />
	  </view>
	</view>

	
		
		
	</view>
	  </view>
	
</template>

<script>
	import request from "../../api/request";
	import * as api from "../../api/api";
	export default {
	
		data() {//data() 是一个用于定义组件数据的函数。该函数返回一个包含组件数据的对象。
			return {
				ppp:'小明',
				qqq:'aasds',
				myData:[{
					name:"关注",
					num:5
				},{
					name:"粉丝",
					num:13
				}
				]
			}
		},
		onShow(){
			this.ppp=uni.usernameop,
			this.qqq=uni.myautograph
		},
		onLoad() {//onLoad() 是在小程序框架中使用的生命周期函数
	
	
		},
		computed:{
			
		},
		methods: {
			tofriend(){
				  uni.navigateTo({ url: '/pages/user/my/myfriend' });
			},
			navigateTo(page) {
			      // 根据页面名称跳转到相应的页面
			      switch(page) {
			        case 'nickname':
			          uni.navigateTo({ url: '/pages/index/index' });
			          break;
			        case 'gender':
			          uni.navigateTo({ url: '/pages/user/my/mygroup' });
			          break;
			        case 'birthdate':
			          uni.navigateTo({ url: '/pages/user/my/myannounce' });
			          break;
			        case 'signature':
			          uni.navigateTo({ url: '/pages/user/modify/name' });
			          break;
			      }
			    }
		   
		}
	}
	
</script>

<style>
	.profile-container {
	  display: flex;
	  flex-direction: column;
	  background-color: #ffffff;
	}
	
	.profile-item {
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  padding: 15px 10px;
	  border-bottom: 1px solid #eaeaea;
	}
	
	.item-label {
	  font-size: 16px;
	  color: #333;
	}
	
	.arrow-icon {
	  width: 16px;
	  height: 16px;
	  tint-color: #ccc;  /* 根据需要调整箭头图标颜色 */
	}
	
.button_1{
		type:white;
		text-align: left;
	}
	
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f5f5f5;
}

.header {

  background-color:#F46B42;
  padding: 20px;
  color: white;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.username {
  font-size: 20px;
  font-weight: bold;
}

.userid {
  font-size: 14px;
}

.stats {
  display: flex;
  justify-content: space-around;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 18px;
  font-weight: bold;
}

.stat-label {
  font-size: 14px;
}
</style>