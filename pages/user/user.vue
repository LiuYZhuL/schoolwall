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
  	  	<view class="post" v-for="(dpost, index) in dposts" :key="dpost.id"> 
  	  <view class="post-content" @click="gotoDp()">
  	    <view class="post-tag">
  	      <text class="tag-text">日常投稿</text>
  	    </view>
  	    <text class="content-text">
  	      {{dposts[index].postContent}}
  	    </text>
  	    <text class="hashtag">#考试不挂科</text>
  	  </view>
  	      <view class="divider"></view>  
  		  </view>
  	
  	  
    <text class="no-content" @click="gomyan">修改动态</text>
  </view>
  <view class="content" v-if="activeTab === '评论'">
  	  
  	  <view class="post" v-for="(ppost, index) in pposts" :key="ppost.id">
  	  <view class="post-content" @click="gotoDp()">
  	    <view class="post-tag">
  	      <text class="tag-text">日常投稿</text>
  	    </view>
  	    <text class="content-text">
  	      {{pposts[index].postContent}}
  	    </text>
  	    <text class="hashtag">#考试不挂科</text>
  	  </view>
  	      <view class="divider"></view>  
  	  		  </view>
  	  
    <text class="no-content">评论</text>
  </view>

  <!-- 底部导航 -->
</view>


</template>

<script>
	import { BASE_URL } from '@/api/api.js';
	export default {
	  data() {
		  
	    return {
			ppost:[],
			dposts:[],
			posts:[],
	      activeTab: '动态'
	    };
	  },
	  methods: {
		  onShow() {
		  	uni.request({
		  		url: `${BASE_URL}/api/admin/user/info/1`,
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
						this.$userinfo.sharedData=that.posts;
		  
		  			} else {
		  				console.error('Error in response:', res);
		  			}
		  			console.log(res.data)
		  		},
		  		fail: err => {
		  			console.log(err)
		  		}
		  	}),
			uni.request({
				url: `${BASE_URL}/api/user/post`,
				method: 'GET',
				header: {
					'content-type': 'application/json'
				},
				success: res => {
					var that = this;
					if (res.statusCode === 200) {
					  
						const data = res.data.data;
						const records = data.records;
						that.dposts = records;
						// this.$userinfo.sharedData=that.posts;
						console.log(that.dposts);
					  
					} else {
						console.error('Error in response:', res);
					}
					console.log(res.data)
				},
				fail: err => {
					console.log(err)
				}
			}),
			uni.request({
				url: `${BASE_URL}/api/user/postComment`,
				method: 'GET',
				header: {
					'content-type': 'application/json'
				},
				success: res => {
					var that = this;
					if (res.statusCode === 200) {
					  
						
						 
						that.pposts = res.data.records;
						// this.$userinfo.sharedData=that.posts;
						console.log(that.pposts);
					  
					} else {
						console.error('Error in response:', res);
					}
					console.log(res.data.records)
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
	    },
		gomyan(){
			uni.navigateTo({
					url: '/pages/user/my/myannounce'
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

	.post-content {
	  margin-top: 10px;
	}
	
	.post-tag {
	  background-color: #ffebcd;
	  color: #ff4500;
	  padding: 3px 6px;
	  border-radius: 3px;
	  display: inline-block;
	  margin-bottom: 5px;
	}
	
	.tag-text {
	  font-size: 12px;
	}
	
	.content-text {
	  font-size: 14px;
	  line-height: 20px;
	  color: #333;
	}
	
	.hashtag {
	  color: #1e90ff;
	  margin-top: 5px;
	}
	
	.post-footer {
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  margin-top: 10px;
	}
	
	.views {
	  font-size: 12px;
	  color: #999;
	}
	
	.footer-actions {
	  display: flex;
	  align-items: center;
	}
	
	.action-item {
	  display: flex;
	  align-items: center;
	  margin-left: 15px;
	}
	
	.action-icon {
	  width: 16px;
	  height: 16px;
	  margin-right: 5px;
	}
	
	.action-text {
	  font-size: 12px;
	  color: #999;
	}
	.divider {  
	  /* 分割线样式 */  
	  width: 100%; /* 宽度100% */  
	  height: 1px; /* 高度1px */  
	  background-color: #ccc; /* 背景色为灰色 */  
	  margin: 10px 0; /* 上下边距，根据需要调整 */  
	}  

</style>