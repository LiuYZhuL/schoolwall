<template>
	<view >
	
		<view class="tabs">
		  <text :class="{'tab': true, 'active': selectedTab === 'following'}" @click="selectTab('following')">关注</text>
		  <text :class="{'tab': true, 'active': selectedTab === 'followers'}" @click="selectTab('followers')">粉丝</text>
		</view>
		<scroll-view class="content" scroll-y="true">
		  <view v-if="selectedTab === 'following'">
		    <view class="user" v-for="(user, index) in users" :key="index">
		      <image :src="user.avatar" class="user-avatar" />
		      <view class="user-info">
		        <text class="user-name">{{ user.userName }}</text>
		        <text class="user-time">{{ user.userAvatar }}</text>
				
				
		      </view>
		    </view>
		  </view>
		  <view v-if="selectedTab === 'followers'">
		    <!-- Similar structure for followers -->
			<view class="user" v-for="(quser, index) in qusers" :key="index">
			  <image :src="quser.avatar" class="user-avatar" />
			  <view class="user-info">
			    <text class="user-name">{{ quser.userName }}</text>
			    <text class="user-time">{{ quser.userAvatar }}</text>
			  </view>
			</view>
		  </view>
		
		</scroll-view>
	</view>
</template>

<script>
	
export default {
	onShow() {
		uni.request({  
		  url: 'http://127.0.0.1:4523/m1/4600643-4250220-default/api/user/follow',  
		  method: 'GET',  
		  header: {  
		    'authentication': 'application'  
		  },  
		  success: res => {  
		    if (res.statusCode === 200) {  
		      const data = res.data.data.records;
				this.users=data;
		       
		  
		  
		      // 假设您有一个数组或对象，您想将第一个组的groupName设置为其text属性  
		      // 这里假设this.range是一个已经定义并包含至少一个对象的数组  
		     
		    } else {  
		      console.error('Error in response:', res);  
		    }  
		    // 可以在这里打印整个响应数据以进行调试  
		    console.log(res.data);  
		  },  
		  fail: error => {  
		    console.error('Request failed:', error);  
		  }  
		}),
		
	uni.request({
	  url: 'http://127.0.0.1:4523/m1/4600643-4250220-default/api/user/fans',  
	  method: 'GET',  
	  header: {  
	    'authentication': 'application'  
	  },  
	  success: res => {  
	    if (res.statusCode === 200) {  
	      const data = res.data.data.records;
			this.qusers=data;
	       
	  
	  
	      // 假设您有一个数组或对象，您想将第一个组的groupName设置为其text属性  
	      // 这里假设this.range是一个已经定义并包含至少一个对象的数组  
	     
	    } else {  
	      console.error('Error in response:', res);  
	    }  
	    // 可以在这里打印整个响应数据以进行调试  
	    console.log(res.data);  
	  },  
	  fail: error => {  
	    console.error('Request failed:', error);  
	  }  
	})
		
	},
  data() {
    return {
      selectedTab: 'following',
      users: [
        { avatar: '', name: '峰潇潇Sorcerer', time: '2小时前' },
        { avatar: '', name: '峰潇Sorcerer', time: '2小时前' },
      ],
	  qusers: [
	    { avatar: '', name: '峰潇潇Sorcerer', time: '2小时前' },
	    { avatar: '', name: '峰潇潇Sorcerer', time: '2小时前' },
	  ],
    
    };
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    selectTab(tab) {
      this.selectedTab = tab;
    },
    viewAllUsers() {
      uni.navigateTo({
        url: '/pages/allUsers/allUsers',
      });
    },
    joinCircle() {
      uni.showToast({
        title: '已进圈',
        icon: 'success',
      });
    },
  },
};
</script>

<style>
	
.container {
  padding: 16px;
}
.header {
  display: flex;
  align-items: center;
  padding-bottom: 16px;
}
.back-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}
.header-text {
  font-size: 20px;
  font-weight: bold;
}
.tabs {
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #ccc;
}
.tab {
  padding: 10px;
  cursor: pointer;
}
.active {
  color: red;
  border-bottom: 2px solid red;
}
.content {
  padding: 16px 0;
}
.user {
  display: flex;
  align-items: center;
  padding: 8px 0;
}
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 8px;
}
.user-info {
  flex: 1;
}
.user-name {
  font-size: 16px;
}
.user-time {
  color: #999;
  margin-top: 4px;
}
.follow-button {
  background: #ff6b81;
  color: #fff;
  padding: 2px 2px;
  border-radius: 16px;
}
.circle {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-top: 1px solid #ccc;
}
.circle-logo {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 8px;
}
.circle-info {
  flex: 1;
}
.circle-name {
  font-size: 18px;
  font-weight: bold;
}
.circle-stats {
  color: #999;
  margin-top: 4px;
}
.circle-description {
  color: #666;
  margin-top: 4px;
}
.ad-section {
  margin-top: 16px;
  border-top: 1px solid #ccc;
}
.ad-image {
  width: 100%;
  height: auto;
  margin-top: 8px;
}
.ad-address {
  color: #999;
  margin-top: 4px;
}
.ad-stats {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}
.ad-views {
  color: #999;
}
.ad-actions {
  display: flex;
}
.ad-action {
  margin-left: 16px;
  display: flex;
  align-items: center;
}
.ad-icon {
  width: 16px;
  height: 16px;
  margin-left: 4px;
}
.post-actions {
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
}
.edit-button, .delete-button {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.edit-button {
  background: #f0ad4e;
  color: #fff;
}
.delete-button {
  background: #d9534f;
  color: #fff;
}
</style>