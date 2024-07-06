<template>
  <view class="container">
 
    <view class="profile-section">
      <image :src="popd.circleAvatar" class="profile-logo" />
      <view class="profile-info">
        <text class="profile-name">{{popd.circleName}}</text>
       
       
      </view>
    </view>
    <view class="description-section">
      <text class="description-title">简介</text>
    <textarea v-model="post.content" class="input-field"style="padding-top: 20px;" placeholder=" " disabled >{{popd.circleType}}</textarea>
    </view>
   <!-- <view class="users-section">
      <text class="users-title">用户</text>
      <view class="user-avatars">
        <block v-for="(user, index) in users" :key="index">
          <image :src="user.avatar" class="user-avatar" />
        </block>
        <text class="all-users" @click="viewAllUsers">全部</text>
      </view>
    </view> -->
<!--    <button class="join-circle-button" @click="joinCircle">进圈</button> -->
	<button class="join-circle-button" v-if="!followed" @click="followUser(post)">进圈</button>
	<button class="join-circle-button" v-else @click="unfollowUser(post)">退圈</button>
  </view>
</template>

<script>
	import  {BASE_URL}  from '@/api/api.js'
export default {
	onShow() {
		
		// uni.request({
		//   url: 'http://127.0.0.1:4523/m1/4600643-4250220-default/api/user/circle/1',
		//   method: 'GET',
		//   header: {
		//     'authentication': 'application'
		//   },
					  
		//   success: res => {
		// 					 if (res.statusCode === 200 ) {
		// 					             const data = res.data.data;
		// 					             console.log('Total:', data.total);
		// 								this.total=data.total;                             
		// 					             const records = data;
		// 								 this.popd=records;
		// 					     //         records.forEach(record => {
		// 									 // this.popd[0].username=record.circleName;
		// 									 // this.popd[0].name=record.circleName;
		// 									 // this.popd[0].join=record.circleType;
		// 									 // this.popd[0].likes='热度：'+record.circlePostCount;
		// 					     //         });
		// 					         } else {
		// 					         console.error('Error in response:', res);
		// 					         }
		//     console.log(res.data)
		//   },
		//   fail: err => {
		//     console.log(err)
		//   }
		// })
		
	},
  data() {
    return {
		popd :this.$popg.sharedData ,
		followed: false,
    
    };
  },
  methods: {
	  followUser(post) {
		uni.request({
		    url: `${BASE_URL}/api/user/circle/join/1`, // 你的API接口地址
		    method: 'POST',
		    header: {
		        'authentication': '{{token1}}',
		    },
		    success: (res) => {
				this.followed = true; // 更新为已关注
		        console.log(res.data);
		    },
		    fail: (err) => {
		        console.log('请求失败：', err);
		    }
		});
	  },
	  unfollowUser(post) {
		  uni.request({
		      url: `${BASE_URL}/api/user/circle/exit/1`, 
		      method: 'DEL',
		      header: {
				   'authentication': '{{token1}}',
		         
		      },
		      success: (res) => {
		          console.log(res.data);
		      },
		      fail: (err) => {
		          console.log('请求失败：', err);
		      }
		  });
		  
		  
	    this.followed = false; // 更新为未关注
	  },
    goBack() {
      uni.navigateBack();
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
	.input-field {
	  user-select: none;
	}

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
.profile-section {
  display: flex;
  align-items: center;
  padding: 16px 0;
}
.profile-logo {
  width: 60px;
  height: 60px;
  margin-right: 16px;
}
.profile-info {
  flex: 1;
}
.profile-name {
  font-size: 18px;
  font-weight: bold;
}
.profile-stats {
  color: #999;
  margin-top: 4px;
}
.follow-button {
  background: #e6e6ff;
  color: #6666ff;
  padding: 8px 16px;
  border-radius: 16px;
  margin-top: 8px;
  text-align: center;
}
.description-section {
  margin-top: 16px;
}
.description-title {
  font-size: 16px;
  font-weight: bold;
}
.description-content {
  color: #666;
  margin-top: 4px;
}
.users-section {
  margin-top: 16px;
}
.users-title {
  font-size: 16px;
  font-weight: bold;
}
.user-avatars {
  display: flex;
  align-items: center;
  margin-top: 8px;
}
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 8px;
}
.all-users {
  color: #6666ff;
  cursor: pointer;
}
.join-circle-button {
  width: 100%;
  padding: 12px;
  background: #6666ff;
  color: #fff;
  font-size: 18px;
  text-align: center;
  border: none;
  border-radius: 4px;
  margin-top: 16px;
}
</style>
