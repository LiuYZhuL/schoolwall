<template>
	<view class="container">
		<view class="header">
			<image class="logo" :src="posts.circleAvatar" />
			<view class="info">
				<text class="title">{{posts.circleName}}</text>
				<view class="stats">
					<text class="stat">{{posts.circlePostCount+'动态'}}</text>
					<text class="divider">|</text>
					<text class="stat">{{posts.circleUserCount+'学子'}}</text>
				</view>
			</view>
			<button @click="gotoDg" class="join-button">加入</button>
		</view>
		<view class="announcement">
			<text>{{posts.circleDescription}}</text>
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
		<view class="post-container" >
		  <view class="post-header">
		    <image class="avatar" src="/static/2.jpg" />
		    <view class="header-info">
		      <view class="user-info">
		        <text class="username">晓依依Cors</text>
		
		      </view>
		      <text class="post-time">2小时前</text>
		    </view>
		    <button class="follow-button">关注TA</button>
		  </view>
		  <view class="post-content" @click="gotoDp()">
		    <view class="post-tag">
		      <text class="tag-text">日常投稿</text>
		    </view>
		    <text class="content-text">
		      考试啦~不准挂科！不准挂科！不准挂科！重要的是一定要说三遍！！！
		    </text>
		    <text class="hashtag">#考试不挂科</text>
		  </view>
		  <view class="post-footer">
		    <text class="views">6465浏览</text>
		    <view class="footer-actions">
		     
		      
		      <view class="action-item">
		        <image class="action-icon" src="/static/2.jpg" />
		        <text class="action-text">862</text>
		      </view>
		    </view>
		  </view>
		</view>
		<uni-fab ref="fab" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical"
			:direction="direction" @trigger="trigger" />
	</view>
	
	</view>

</template>
<script>
	export default {
		data() {
			return {
				posts:this.$popg.sharedData, 

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
				content: [{
					iconPath: '/static/annImg/add.png',
					selectedIconPath: '/static/annImg/add.png',
					text: '发帖',
					active: false
				}, {
					iconPath: '/static/annImg/search.png',
					selectedIconPath: '/static/annImg/search.png',
					text: '搜索',
					active: false
				}],
				// 可以在这里添加数据绑定，如果有动态数据需求的话
			};
		},
		methods: {
			gotoDp(){
				uni.navigateTo({
					url: '/pages/details/uni-post'
				})
			},
			gotoDg(){
				uni.navigateTo({
					url: '/pages/details/group'
				})
				// console.log(this.posts);
			},
			trigger(e) {
				// console.log(e)
				this.content[e.index].active = !e.item.active
				if (e.index === 0) {
					uni.navigateTo({
						url: '/pages/announce/mypost'
					})
				} else if (e.index === 1) {
					uni.navigateTo({
						url: '/pages/search/usese'
					})
				}

			},
			// 如果需要处理点击事件，可以在这里添加方法
		}
	};
</script>

<style>
	/* 通用样式 */
	.container {

		display: flex;
		/* 注意：flex-direction 默认就是 column，除非你需要更改它 */
		flex-direction: column;
		/* 如果需要指定方向的话 */
		background-image: url('/static/images/nong.png');
		background-size: cover;
		background-position: center;
		/* 可以选择性地设置图片居中 */
		background-repeat: no-repeat;
		/* 确保图片不重复 */
		padding: 10px;
		padding-top: 44px;
		/* 与导航栏高度相同，确保内容不会覆盖到导航栏下方 */
		overflow-y: auto;
		/* 允许垂直滚动，如果内容过多的话 */

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
		background-size: cover;
		/* 裁剪图片以完全覆盖容器 */
		border-radius: 10px;
		margin-bottom: 5px;
	}

	.category-text {
		font-size: 14px;
	}
	/* / */
	
	.post-container {
	  
	  margin: -18px;
	  padding: 20px;
	  margin-top:35px ;
	  background-color: #fff;
	  border-bottom: 1px solid #eaeaea;
	}
	
	.post-header {
	
	  display: flex;
	  align-items: center;
	}
	
	.avatar {
	  width: 40px;
	  height: 40px;
	  border-radius: 50%;
	  margin-right: 10px;
	}
	
	.header-info {
	  flex: 1;
	}
	
	.user-info {
	  display: flex;
	  align-items: center;
	}
	
	.username {
	  font-size: 16px;
	  font-weight: bold;
	}
	
	.gender-icon {
	  width: 16px;
	  height: 16px;
	  margin-left: 5px;
	}
	
	.post-time {
	  font-size: 12px;
	  color: #999;
	  margin-top: 2px;
	}
	
	.follow-button {
	  background-color: white;
	  color: #ff4500;
	  font-weight: bold;
	  font-size: 16px;
	  border: none;
	  border-radius: 20px;
	  padding: 1px -2px;
	  border-bottom: 2px solid #ff4500;
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
	
</style>