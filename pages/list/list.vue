<template>
	<view class="container">
	  <view class="header">
	    <image class="logo" src="/static/images/1.jpg" />
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
	  <uni-fab ref="fab" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical"
	  		:direction="direction" @trigger="trigger" />
	  </view>
	</view>

</template>
<script>export default {
  data() {
    return {
		
		total: '20',
		title: 'uni-fab',
		directionStr: '垂直',
		horizontal: 'right',
		vertical: 'bottom',
		direction: 'horizontal',
		
		pattern: {
			color: '#7A7E83',
			backgroundColor: '##F4683E',
			selectedColor: '#F4683E',
			buttonColor: "#F4683E",
			iconColor: '#fff'
		},
		content: [
			{
				iconPath: '/static/annImg/add.png',
				selectedIconPath: '/static/annImg/add.png',
				text: '发帖',
				active: false
			},	{
								iconPath: '/static/annImg/search.png',
								selectedIconPath: '/static/annImg/search.png',
								text: '搜索',
								active: false
							}
		],
      // 可以在这里添加数据绑定，如果有动态数据需求的话
    };
  },
  methods: {
	  trigger(e) {
	  			// console.log(e)
	  			this.content[e.index].active = !e.item.active
	  			if (e.index === 0) {
	  			uni.navigateTo({
	  				url: '/pages/announce/mypost'
	  			})
	  			}else if (e.index === 1) {
	  			uni.navigateTo({
	  				url: '/pages/search/usese'
	  			})
	  			} 
	  		
	  		},
    // 如果需要处理点击事件，可以在这里添加方法
  }
};

</script>

<style>/* 通用样式 */
.container {
  
	  display: flex; /* 注意：flex-direction 默认就是 column，除非你需要更改它 */  
		  flex-direction: column; /* 如果需要指定方向的话 */  
		  background-image: url('/static/images/nong.png');  
		  background-size: cover;  
		  background-position: center; /* 可以选择性地设置图片居中 */  
		  background-repeat: no-repeat; /* 确保图片不重复 */  
		  padding: 10px;  
		  padding-top: 44px; /* 与导航栏高度相同，确保内容不会覆盖到导航栏下方 */  
		  overflow-y: auto; /* 允许垂直滚动，如果内容过多的话 */  

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
  background-image: url('/static/images/1.jpg');  
  width: 50px;
  height: 50px;
  background-color: #fff;
   background-size: cover; /* 裁剪图片以完全覆盖容器 */ 
  border-radius: 10px;
  margin-bottom: 5px;
}

.category-text {
  font-size: 14px;
}

</style>