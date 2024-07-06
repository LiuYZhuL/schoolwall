<template>
<view class="container">
  <!-- 顶部用户信息 -->
  <view class="user-info">
    <image class="avatar" src="/static/images/1.jpg" />
    <view class="user-details">
      <text class="username">{{posts.userName}}</text>

      <view class="user-stats" >
        <text class="stat">{{posts.userRegisterTime}}</text>
       
      </view>
    </view>
    <button class="settings-button" @click="gotoSettings">设置</button>
  </view>

  <!-- 动态和评论选项卡 -->
  <view class="tabs">
    <text :class="['tab', { active: activeTab === '动态' }]" @click="switchTab('动态')">动态</text>
    <text :class="['tab', { active: activeTab === '评论' }]" @click="switchTab('评论')">评论</text>
  </view>

  <!-- 内容区域 -->
  <view class="content" v-if="activeTab === '动态'">
    <text class="no-content">暂未发布动态</text>
  </view>
  <view class="content" v-if="activeTab === '评论'">
    <text class="no-content">暂未发布评论</text>
  </view>

  <!-- 底部导航 -->
</view>


</template>

<script>
	export default {
	  data() {
		  
	    return {
			posts:[],
	      activeTab: '动态'
	    };
	  },
	  methods: {
		  onShow() {
		  	uni.request({
		  		url: 'http://127.0.0.1:4523/m1/4600643-4250220-default/api/admin/user/info/1',
		  		method: 'GET',
		  		header: {
		  			'content-type': 'application/json'
		  		},
		  		success: res => {
		  			var that = this;
		  			if (res.statusCode === 200) {
		  
		  				const data = res.data.data;
		  				const records = data;
		  				that.posts = records;
		  
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
	    switchTab(tab) {
	      this.activeTab = tab;
	    },
	
	    gotoSettings() {
	      // 处理设置按钮的点击事件
	      console.log('设置按钮被点击');
	      // 可以在这里添加跳转到设置页面的逻辑
		  uni.navigateTo({
		  		url: '/pages/user/modify/main'
		  	})
	    }
	  }
	};

	
</script>

<style>.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
}

.user-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  width: 100%;
  background-color: #3b3b3b;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 30px;
}

.user-details {
  flex: 1;
  margin-left: 10px;
}

.username {
  color: #fff;
  font-size: 18px;
}

.user-status {
  color: #ccc;
  font-size: 14px;
}

.user-stats {
  display: flex;
  flex-direction: row;
  margin-top: 5px;
}

.stat {
  color: #fff;
  margin-right: 15px;
}

.settings-button {
  background-color: #5a5a5a;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
}

.tabs {
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: #fff;
}

.tab {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  font-size: 16px;
  cursor: pointer;
}

.tab.active {
  border-bottom: 2px solid #ffcc00;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.placeholder {
  width: 80px;
  height: 80px;
}

.no-content {
  color: #999;
  margin-top: 10px;
}

.bottom-nav {
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: #fff;
  padding: 10px 0;
}

.nav-item {
  flex: 1;
  text-align: center;
  color: #999;
}

.nav-item.active {
  color: #ffcc00;
}

</style>