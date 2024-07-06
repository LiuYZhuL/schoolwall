<template>
	<view class="profile-container">
	  <view class="profile-item" @tap="navigateTo('nickname')">
	    <text class="item-label">昵称</text>
	    <image class="arrow-icon" src="/static/annImg/ArrowRight.png" />
	  </view>
	  <view class="profile-item" @tap="navigateTo('gender')">
	    <text class="item-label">性别</text>
	    <image class="arrow-icon" src="/static/annImg/ArrowRight.png" />
	  </view>
	  <view class="profile-item" @tap="navigateTo('group')">
	    <text class="item-label">我的圈子</text>
	    <image class="arrow-icon" src="/static/annImg/ArrowRight.png" />
	  </view>
	
	  <view class="profile-item" @tap="navigateTo('birthdate')">
	    <text class="item-label">出生年月</text>
	    <image class="arrow-icon" src="/static/annImg/ArrowRight.png" />
	  </view>
	  <view class="profile-item" @tap="navigateTo('signature')">
	    <text class="item-label">个性签名</text>
	    <image class="arrow-icon" src="/static/annImg/ArrowRight.png" />
	  </view>
	  <view class="profile-item" @tap="navigateTo('friend')">
	    <text class="item-label">我的好友</text>
	    <image class="arrow-icon" src="/static/annImg/ArrowRight.png" />
	  </view>
	</view>

	
</template>

<script>
	export default {
	  methods: {
	    navigateTo(page) {
	      // 根据页面名称跳转到相应的页面
	      switch(page) {
	        case 'nickname':
	          uni.navigateTo({ url: '/pages/nickname/nickname' });
	          break;
	        case 'group':
	          uni.navigateTo({ url: '/pages/user/my/mygroup' });
	          break;
	        case 'birthdate':
	          uni.navigateTo({ url: '/pages/birthdate/birthdate' });
	          break;
	        case 'signature':
	          uni.navigateTo({ url: '/pages/signature/signature' });
	          break;
			case 'friend':
			uni.navigateTo({ url: '/pages/user/my/myfriend' });
			break;
			
	      }
	    }
	  }
	};

	
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

</style>