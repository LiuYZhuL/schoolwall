<template>  
  <view class="container">  
   <view class="search-bar">  
      <input type="text" v-model="query" placeholder="  搜索圈子" @input="onSearch" />  
    </view>  
 

    <view class="post-list" >  
      <uni-list-chat  
        v-for="(post, index) in posts"  
        :key="index"  
        clickable="true"  
        :avatar-circle="true"  
        :avatar="post.circleAvatar"  
        :title="post.circleName"  
        :note="post.circleType"  
        :time="post.circleUpdateTime"  
        @click="login()"  
      ></uni-list-chat>  
    </view>  
  </view>  
</template>  
  
<script>  
import { BASE_URL } from '@/api/api.js';
export default {  
  data() {  
    return {  
      query: '',  
      posts: [],  
    };  
  },  
  methods: {  
    login() {  
      uni.switchTab({  
        url: '/pages/list/list',  
      });  
    },  
    onSearch() {  
      if (this.query.trim() === '') {  
        return; // 如果查询为空，则不执行请求  
      }  
      uni.request({  
        url: `${BASE_URL}/api/user/circle/1?circleId=query`,  
        method: 'GET',  
        success: (res) => {  
          if (res.statusCode === 200) {  
            // 假设 res.data.data 是一个包含多个帖子的数组  data
            this.posts = res.data|| []; // 确保即使数据为空也更新 posts  data.circleAvatar
            console.log('this.posts:', this.posts);  
          } else {  
            console.error('响应错误：', res);  
          }  
        },  
        fail: (err) => {  
          console.error('网络请求失败：', err);  
        },  
      });  
    },  
	 handleInput() {  
	      // 如果已经有一个定时器在运行，则清除它  
	      if (this.debounceTimer) {  
	        clearTimeout(this.debounceTimer);  
	      }  
	  
	      // 设置一个新的定时器，1秒后执行onSearch  
	      this.debounceTimer = setTimeout(() => {  
	        this.onSearch(this.query);  
	        // 清除定时器ID，以便下一次可以重新设置  
	        this.debounceTimer = null;  
	      }, 1000);  
	    },  
  },  
};  
</script>  
  
<style>  
.container {  
  /* 样式 */  
}  
.search-bar {  
  padding: 20px;  
  background-color: white;  
  border-radius: 20px;  
}  
.post-list {  
  /* 如果需要，可以为帖子列表添加样式 */  
}  
</style>