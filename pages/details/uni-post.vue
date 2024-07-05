<template>
    <!-- Dynamic Content -->
    <view class="content">
		<!-- Posts -->
		<view class="post" v-for="post in posts" :key="post.id">
			<view class="post-header">
				<image class="post-avatar" :src="post.avatar" />
				<view class="post-user-info">
					<text class="post-username">{{ post.username }}</text>
				<view>
					<text class="post-time">{{ post.time }}</text>
				</view>
			</view>
			<button class="follow-button" v-if="!post.followed" @click="followUser(post)">关注TA</button>
			<button class="followed-button" v-else @click="unfollowUser(post)">已关注</button>
        </view>
		
		
        <view class="post-content">
			<text class="post-category">{{ post.category }}</text>
			<text class="post-text">{{ post.text }}</text>
			
        </view>
		<view class="post-images" v-if="post.images.length">
			<image class="post-image" v-for="image in post.images" :key="image" :src="image" :class="image-item" mode="heightFix"/>
		</view>
		
		<view class="location" style="padding-left:20px;color:#666;">
			<uni-icons type="location" size="20" style="color: #666; " v-show="showT"
				@click="other(item)"></uni-icons>
			<text>成都市高新区天府大道</text>
		</view>
		
		
	  	<view class="detail-bottom-icons">
			<view class="lilan" style="font-size: 12px;color:#666;padding-left: 0%;">
				<text>6465浏览</text>
			</view>
	  		<view class="detail-bottom-icons-box">
				<uni-icons class="to" type="undo" size="20" style="color: #666; " v-show="showT"
					@click="other(item)"></uni-icons>
				<uni-icons class="to" type="undo-filled" size="20" style="color: #666; " v-show="!showT"
					@click="other(item)">
						<text style="font-size: 12px;">895</text>
				</uni-icons>
	  		</view>
			<view class="detail-bottom-icons-box">
				<uni-icons class="comment" type="chatbubble" size="20" style="color: #666;" v-show="showC"
					@click="comment(item)">
				</uni-icons>
				<uni-icons class="comment" type="chatbubble-filled" size="20" style="color: #666;"
					v-show="!showC" @click="comment(item)">
					<text style="font-size: 12px;">895</text>
				</uni-icons>
			</view>
			<view class="detail-bottom-icons-box">
				<uni-icons class="like" type="heart" size="20" style="color: #666;" v-show="showL"
					@click="like(item)">	
				</uni-icons>
				<uni-icons class="like" type="heart-filled" size="20" style="color: #666;" v-show="!showL"
					@click="like(item)">
			<text style="font-size: 12px;">895</text>
				</uni-icons>				       
			</view>
	  	</view>
		
		
		<view class="" style="padding: 20rpx; background-color: whitesmoke; margin-top: 20rpx;">
			<text>精彩评论（{{post.likes}}）</text>
		</view>
		
		<view>
			<view v-for="(chatI, index) in chat":key="index" style="border-top: 1rpx solid black;">
				<view class="post-header" style="padding: 20rpx;">
					<image class="post-avatar" :src="chatI.avatar" />
					<view class="post-user-info">
						<view class="post-username">{{ chatI.name }}</view>
						<view class="post-time">{{ chatI.time }}</view>
					</view>
					<view class="detail-bottom-icons-box">
						<uni-icons class="like" type="heart" size="20" style="color: #666;" v-show="showL"
						@click="like(item)"></uni-icons>
						<uni-icons class="like" type="heart-filled" size="20" style="color: #666;" v-show="!showL"
						@click="like(item)">
						<text style="font-size: 12px;">?</text>
						</uni-icons>				       
					</view>
				</view>
				<view style="padding: 10rpx;">	
					<text v-if="chatI.type == 'text'" style="padding: 10rpx;">{{chatI.message}}</text>
					<image :src="chatI.message" v-if="chatI.type == 'image'" style="max-width: 450rpx; padding: 10rpx;" mode="widthFix"></image>
				</view>
			</view>
			<view class="chatFrame">
				<textarea type="text" v-model="content" class="chatInput" placeholder="请输入内容" @confirm="submit"></textarea>
				<button class="btn" @click="chooseImage">图片</button>
				<button class="btn" @click="submit">发送</button>
			</view>
		</view>
		
    </view>
	
	
	
    </view>	  
</template>

<script>
export default {
  onShow() {
		uni.request({
		  url: 'http://127.0.0.1:4523/m1/4600643-4250220-default/api/user/post',//用的查询自己帖子，后续得换
		  method: 'GET',
		  header: {
		    'authentication': 'application'
		  },				  
		  success: res => {
							 if (res.statusCode === 200 ) {
							             const data = res.data.data;
							             console.log('Total:', data.total);
										this.total=data.total;
							             const records = data;
										 this.popd=records;
							     //         records.forEach(record => {
											 // this.popd[0].username=record.circleName;
											 // this.popd[0].name=record.circleName;
											 // this.popd[0].join=record.circleType;
											 // this.popd[0].likes='热度：'+record.circlePostCount;
							     //         });
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
  data() {
    return {
		//输入框的文本
		content:"",
		//评论列表
		chat: [{uid: 3, 
		avatar: '/static/images/1.jpg',
		name:"mc", 
		time:"xx:xx", 
		message:"#%￥&@~", 
		type:"text"}],
  
      posts: [
        {
          id: 1,
          avatar: '/static/images/1.jpg',
          username: '峰潇潇Sorcererer',
          time: '2小时前',
          followed: false,
          category: '失物招领',
          text: '雅思口语全套出售了，欢迎咨询',
          images: [
            '/static/images/1.jpg',
            '/static/images/2.jpg',
            '/static/images/3.jpg',
          ],
          location: '',
          views: 6465,
          shares: 9665,
          comments: 895,
          likes: 862,
        },
      ],
	  title: 'uni-fab',
	  directionStr: '垂直',
	  horizontal: 'right',
	  vertical: 'bottom',
	  direction: 'horizontal',  
	  pattern: {
	  	color: '#7A7E83',
	  	backgroundColor: '#fff',
	  	selectedColor: '#007AFF',
	  	buttonColor: '#007AFF',
	  	iconColor: '#fff'
	  },
	  is_color_type: false,
	  
    };
  },
  methods: {
    followUser(post) {
      post.followed = true; // 更新为已关注
    },
    unfollowUser(post) {
      post.followed = false; // 更新为未关注
    },
	chooseImage() {
		uni.chooseImage({
			success: (img) => {
				let obj = {
					uid:1,
					avatar: "/static/logo.png",
					name:"aaaaaa", 
					time:"xx-xx",
					message:img.tempFilePaths,
					type:"image",
				}
				this.chat.push(obj);
				
			}
		});
	},
	submit(){
		if(this.content === ''){
			return uni.showToast({
				title: "消息不能为空",
				icon:'none'
			})
		}  
		let obj = {
			avatar: "/static/logo.png",
			name:"aaaaaa", 
			time:"xx-xx",
			message:this.content,
			type:"text",
		}
		
		this.chat.push(obj);
		this.content = '';
	},
  },
  
};
</script>

<style scoped>
.content {
	flex: 1;
	background-color: #f9f9f9;
	height: 100%;
}

.post {
	background-color: white;
	border-radius: 5px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	overflow-y: scroll;
	display: block;
	box-sizing: border-box;
	height: 90%;
}

.post-header {
	display: flex;
	align-items: center;
	padding: 20rpx;
}

.post-avatar {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	margin-right: 10px;
}

.post-user-info {
	flex: 1;
}

.post-username {
	font-size: 14px;
	font-weight: bold;
}

.post-time {
	font-size: 12px;
	color: #888;
}
.follow-button,
.followed-button {
	background-color: #007AFF;
	color: white;
	border: none;
	padding: 5px 10px;
	border-radius: 5px;
	font-size: 12px;
}

.followed-button {
	background-color: #ccc;
}
.post-content {
	margin-top: 10px;
	padding: 20rpx;
}

.post-category {
	color: #ff7f50;
	font-size: 12px;
	margin-bottom: 5px;
}

.post-text {
	font-size: 12px;
	margin-bottom: 10px;
	color: black;
	margin-left: 20px;
}

.post-images {
	display: inline;
	justify-self: start;
}

.post-image {
	margin: 10rpx;
	max-height: 200rpx;
	border-radius: 5rpx;
	padding: 10rpx;
}
.image-item{
	margin: 10px;
}
.detail-bottom-icons{
	 display: flex;
	 flex-shrink: 0;
	 margin-left: 10px;
 }
 .detail-bottom-icons-box{
	 position: relative;
	 display: flex;
	align-items: center;
	justify-content: center;
	width: 44px;
	margin-left: 50px;	
	}
.shuizi{
	font-size:12px ;
	color: #000;
}
.avatar{
	height: 80rpx;
	width: 80rpx; 
	border-radius: 100%; 
	margin-right: 10px;
}
.name{
	text-align:left; 
	font-size: 18rpx;
}
.messageTime{
	text-align:right;
	color: RGB(0,0,0,0.5);
}
.message{
	word-break: break-all;
	color: RGB(0,0,0,0.5);
}
.messageimg{
	max-height: 100rpx;
}
.chatFrame{
	height: 80rpx;
	padding: 10rpx;
	padding-bottom: 20px;
	position: fixed;
	right: 0; 
	bottom: 0;
	left: 0; 
	z-index: 1030;
	display: flex;
	align-items: center;
	border-top: 1px solid beige;
	background-color: whitesmoke;
}
.chatInput{
	justify-items: auto;
	border: 1px solid whitesmoke;
	height: 70rpx;
	margin-right: 20rpx;
	border-radius: 20rpx;
	flex: 1;
	background-color: white;
}
.btn{
	font-size: 18rpx;
	width: 100rpx;
	height: 70rpx;
	border-radius: 5rpx;
	background-color: brown;
	text-align: center;
	line-height: 70rpx;
}
</style>
