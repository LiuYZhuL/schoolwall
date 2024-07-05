<template>
	<view class="container">
	  <view class="header">
	    <image class="logo" src="path_to_logo_image" />
	    <view class="info">
	      <text class="title">武汉大学</text>
	      <view class="stats">
	        <text class="stat">5448动态</text>
	        <text class="divider">|</text>
	        <text class="stat">4167学子</text>
	      </view>
	    </view>
	    <button class="join-button">加入</button>
	  </view>
	  <view class="announcement">
	    <text>这里是站点表白墙公告，这里是站点表白墙公告，这里是</text>
	  </view>
	  <view class="categories">
	    <view class="category">
	      <view class="category-icon"></view>
	      <text class="category-text">校园购物</text>
	    </view>
	    <view class="category">
	      <view class="category-icon"></view>
	      <text class="category-text">校园跑腿</text>
	    </view>
	    <view class="category">
	      <view class="category-icon"></view>
	      <text class="category-text">旅游</text>
	    </view>
	    <view class="category">
	      <view class="category-icon"></view>
	      <text class="category-text">出行</text>
	    </view>
	    <view class="category">
	      <view class="category-icon"></view>
	      <text class="category-text">美食</text>
	    </view>
	  </view>
	</view>

</template>
<script>export default {
  data() {
    return {
      // 可以在这里添加数据绑定，如果有动态数据需求的话
    };
  },
  methods: {
    // 如果需要处理点击事件，可以在这里添加方法
  }
};

</script>

<style>/* 通用样式 */
.container {
  margin-top:100px ;
  display: flex;
  flex-direction: column;
  background-image: url('./static/images/nong.png');
  background-size: cover;
  padding: 10px;
}

.header {
  display: flex;
  align-items: center;
  padding: 10px 0;
}

.logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.info {
  flex: 1;
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.stats {
  display: flex;
  align-items: center;
  margin-top: 5px;
}

.stat {
  font-size: 14px;
  color: #fff;
}

.divider {
  margin: 0 5px;
  color: #fff;
}

.join-button {
  background-color: #FF4500;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
}

.announcement {
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
}

.categories {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
}

.category {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
}

.category-icon {
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 5px;
}

.category-text {
  font-size: 14px;
}

</style>