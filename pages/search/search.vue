<template >
  <view class="container">
    <view class="search-bar">
      <input type="text" v-model="query" placeholder="  搜索圈子" @input="onSearch" />
    </view>
		<view class="post" v-if="posts===null">
			<uni-list-chat clickable="true" :avatar-circle="true"  :title="posts.circleName" :avatar="posts.circleAvatar" :note="posts.circleType" :time="posts.circleUpdateTime" @click="login()"></uni-list-chat>
		</view>
		<view class="post" v-else>
			<uni-list-chat clickable="true" :avatar-circle="true"  :title="posts.circleName" :avatar="posts.circleAvatar" :note="posts.circleType" :time="posts.circleUpdateTime" @click="login()"></uni-list-chat>
		</view>
		
  </view>
  
</template>

<script>
export default {
  data() {
    return {
      query: '',
     
	  posts: [
	  ],
	
    };
  },
  computed: {

  },
  methods: {
	login(){	 
	  		uni.switchTab({
	  			url:'/pages/list/list'
	  		})				  	
	  },
    onSearch() {
		uni.request({  
		  url: 'http://127.0.0.1:4523/m1/4600643-4250220-default/api/user/circle/1',  
		  method: 'GET',  
		  header: {  
		    // 'content-type': 'application/json' // 通常 GET 请求不需要设置 content-type  
		  },  
		  success: (res) => {  
		    console.log('整个响应：', res); // 打印整个响应以查看结构  
		    if (res.statusCode === 200) {  
		      let data = res.data.data; // 假设你的数据确实在 res.data.data 中  
		      this.posts = data;  
		      console.log('this.posts:', this.posts); // 打印 this.posts 以查看是否设置正确  
		    } else {  
		      console.error('响应错误：', res);  
		    }  
		  },  
		  fail: (err) => {  
		    console.error('网络请求失败：', err);  
		  }  
		});
   
    },
  },
};
</script>

<style>
.container {
	

}
.search-bar {
	
	padding: 20px;
  
  	background-color: white;
	 border-radius: 20px;
}

</style>
