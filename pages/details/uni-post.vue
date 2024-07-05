<template>
    <!-- Dynamic Content -->
    <view class="content" >
		<!-- Posts -->
		<view class="post">
			<view class="post-header">
				<image class="post-avatar" :src="post.avatar" />
				<view class="post-user-info">
					<text class="post-username">{{ post.username }}</text>
					<view>
						<text class="post-time">{{ post.time }}</text>
					</view>
				</view>
				<button class="follow-button" v-if="!post.followed" @click="followUser()">关注TA</button>
				<button class="followed-button" v-else @click="unfollowUser()">已关注</button>
			</view>
		
			
			<view class="post-content">
				<view class="">
					<text class="post-title">{{ post.postTitle }}</text>
					<text class="post-category">{{ post.topicName }}</text>
					
				</view>
				<text class="post-text">{{post.postContent}}</text>
			</view>
			<view class="post-images" v-if="post.postImgUrls.length">
				<image class="post-image" v-for="image in post.postImgUrls" :key="image" :src="image" :class="image-item" mode="heightFix"/>
			</view>
		
			<view class="detail-bottom-icons" >
				<!-- <view class="lilan" style="font-size: 12px;color:#666;padding-left: 0%;">
					<text>6465浏览</text>
				</view> -->
				<!-- <view class="detail-bottom-icons-box">
					<uni-icons class="to" type="undo" size="20" style="color: #666; " v-show="showT"
					@click="other(item)"></uni-icons>
					<uni-icons class="to" type="undo-filled" size="20" style="color: #666; " v-show="!showT"
					@click="other(item)">
						<text style="font-size: 12px;">895</text>
					</uni-icons>
				</view> -->
				<view class="detail-bottom-icons-box">
					<uni-icons type="chatbubble" size="20" style="color: #666;" @click="activateInput()">
						<text style="font-size: 12px;">{{post.postCommentCount}}</text>
					</uni-icons>
				</view>
				<view class="detail-bottom-icons-box">
					<uni-icons type="heart" size="20" style="color: #666;" @click="postLike">
						<text style="font-size: 12px;">{{post.postLikeCount}}</text>
					</uni-icons>			       
				</view>
			</view>
		
		
			<view class="" style="padding: 20rpx; background-color: whitesmoke; margin-top: 20rpx;">
				<text>精彩评论（{{post.postCommentCount}}）</text>
			</view>
		
			<view >
				<view v-for="(chatI, index) in chat":key="index" style="border-top: 1rpx solid black;">
					<view class="post-header" style="padding: 20rpx;">
						<image class="post-avatar" :src="chatI.avatar" />
						<view class="post-user-info">
							<view class="post-username">{{ chatI.name }}</view>
							<view class="post-time">{{ chatI.time }}</view>
						</view>
						<view class="detail-bottom-icons-box">
							<uni-icons class="like" type="heart" size="20" style="color: #ff0000;" >
								<text style="font-size: 12px;">1</text>
							</uni-icons>		
						</view>
					</view>
					<view class="" style="margin: 10px; margin-left: 40px;" >
						<view style="padding: 10rpx;" @click="activateInput(chatI.commentId)">	
							<text v-if="chatI.type == 'text'" style="padding: 10rpx;">{{chatI.message}}</text>
							<image :src="chatI.message" v-if="chatI.type == 'image'" style="max-width: 450rpx; padding: 10rpx;" mode="widthFix"></image>
						</view>
						<view style="text-align: right; padding: 10rpx;">
							<uni-icons v-if="chatI.userId === id" type="trash" size='20' @click="del(chatI.commentId)"></uni-icons>
						</view>
						<view v-for="(chatJ,i) in chatI.chats" :key="i" style="border-radius: 10rpx; background-color: whitesmoke;">
							<view class="post-header" style="padding: 20rpx;">
								<image class="post-avatar" :src="chatJ.avatar" />
								<view class="post-user-info">
									<view class="post-username">{{ chatJ.name }}</view>
									<view class="post-time">{{ chatJ.time }}</view>
								</view>
							</view>
							<view style="padding: 10rpx;" @click="activateInput(chatI.commentId)">
								<text v-if="chatI.type == 'text'" style="padding: 10rpx;">{{chatI.message}}</text>
								<image :src="chatI.message" v-if="chatI.type == 'image'" style="max-width: 450rpx; padding: 10rpx;" mode="widthFix"></image>
							</view>
							<view style="text-align: right; padding: 10rpx;">
								<uni-icons v-if="chatI.userId === id" type="trash" size='20' @click="del(chatI.commentId)"></uni-icons>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="chatFrame" v-if="isInputActive">
			<textarea type="text" v-model="content" class="chatInput" placeholder="请输入内容" @focus="handleFocus" @blur="handleBlur"  @confirm="submit"></textarea>
			<uni-icons type="image" size="25" style="padding: 5rpx;" @click="chooseImage"></uni-icons>
			<uni-icons type="chat" size='25' style="padding: 5rpx;" @click="submit"></uni-icons>
		</view>
    </view>
	
</template>

<script>
export default {
	onShow() {
		uni.request({
			url: 'http://127.0.0.1:4523/m1/4600643-4250220-default/api/admin/post/'+this.postId,//用的查询自己帖子
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
				// records.forEach(record => {
				// 	this.popd[0].username=record.circleName;
				// 	this.popd[0].name=record.circleName;
				// 	this.popd[0].join=record.circleType;
				// 	this.popd[0].likes='热度：'+record.circlePostCount;
				// 	});
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
	onLoad(options) {
		this.postId = options.postId;
		console.log(options)
	},
	data() {
	    return {
			isPost: false,
			cmtCtId:null,
			id: 1,
			content:"", //输入框的文本
			isInputActive: false,  // 输入框是否激活
			postId:null, 
			chat: [{
				userId: 1, 
				commentId: 1,
				avatar: '/static/images/1.jpg',
				name:"mc", 
				time:"xx:xx", 
				message:"#%￥&@~", 
				type:"text",
				chats:[{
					replyCommentId: 1,
					secReplyId: 2,
					avatar: '/static/images/1.jpg',
					name:"mc", 
					time:"xx:xx", 
					replyContent: "#%￥&@~",
					type:"text",
				}]
			}],
	  
			post: {
				userId: 1,
				postId: 1,
				groupId: 1,
				avatar: '/static/2.jpg',
				username: '晓依依Cors',
				time: '2小时前',
				followed: false,
				postTitle: '日常投稿',
				topicName: '#考试不挂科',
				postContent: '考试啦~不准挂科！不准挂科！不准挂科！重要的是一定要说三遍！！！',
				postImgUrls: [
					'/static/images/1.jpg',
					'/static/images/2.jpg',
					'/static/images/3.jpg',
				],
				location: '',
				postCommentCount: 895,
				postLikeCount: 862,
	        },
	    };
	},
	methods: {
		activateInput(cmtCtId) {
			this.isPost = false;
			this.cmtCtId = cmtCtId;
			console.log(cmtCtId);
		    this.isInputActive = true;  // 激活输入框
		},
		handleFocus() {
			this.isInputActive = true;  // 当输入框获得焦点时，保持激活状态
	    },
	    handleBlur() {
			if (this.content == '') {
		        this.isInputActive = false;  // 当输入框失去焦点且没有输入时，隐藏输入框
		    }
		},
	    followUser() {
			this.post.followed = true; // 更新为已关注
			uni.request({
				url:'http://127.0.0.1:4523/m1/4600643-4250220-default/api/user/follow/'+this.post.userId,
				method: 'POST',
				header: {
				    'Content-Type': 'application/json'
				},
				success: (res) => {
				    console.log(res.data);
				},
				fail: (err) => {
				    console.error(err);
				}
			})
	    },
	    unfollowUser() {
			this.post.followed = false; // 更新为未关注
			uni.request({
			    url: 'http://127.0.0.1:4523/m1/4600643-4250220-default/api/user/follow/' + this.post.userId, // 注意：你可能需要提供完整的 URL
			    method: 'DELETE',
			    header: {

			    },
			    success: function (res) {
			        console.log(res.data);
			    },
			    fail: function (err) {
			        console.error(err);
			    }
			});
	    },
		
		chooseImage() {
			uni.chooseImage({
				success: (img) => {
	
				}
			});
		},
		submit(){
			if(this.content === ''){
				return uni.showToast({
					title: "评论不能为空",
					icon:'none'
				})
			}  
			if(this.isPost){
				uni.request({
				    url: 'http://127.0.0.1:4523/m1/4600643-4250220-default/api/user/post/commentTopic', // 注意：这里的 URL 需要是完整的 URL，包括协议和域名
				    method: 'POST',
				    header: {
				        'Content-Type': 'application/json'
				    },
					data: JSON.stringify({
						"postId": this.postId,
						"commentContent": this.content
					}),
				    success: (res) => {
				        console.log(res.data);
				    },
				    fail: (err) => {
				        console.error(err);
				    }
				});
			}else {
				uni.request({
				    url: 'http://127.0.0.1:4523/m1/4600643-4250220-default/api/user/replyPostComment', // 注意：这里的 URL 需要是完整的 URL，包括协议和域名
				    method: 'POST',
				    header: {
				        'Content-Type': 'application/json'
				    },
					data: JSON.stringify({
						"replyCommentId": 1,
						"secReplyId": this.cmtCtId,
						"postId": this.postId,
						"replyContent": this.content
					}),
				    success: (res) => {
				        console.log(res.data);
				    },
				    fail: (err) => {
				        console.error(err);
				    }
				});
			}
			this.isPost = false;
			this.cmtCtId = null;
			this.content = '';
			this.isInputActive = false; 
		},
		postLike(){
			uni.request({
			    url: 'http://127.0.0.1:4523/m1/4600643-4250220-default/api/user/post/like?postId='+this.postId, // 注意：这里的 URL 需要是完整的 URL，包括协议和域名
			    method: 'POST',
			    header: {
					'content-type': 'application/json'
			    },
			    success: (res) => {
			        console.log(res.data);
			    },
			    fail: (err) => {
			        console.error(err);
			    }
			});
		},
		chatLike(){
			uni.request({
			    url: '', // 注意：这里的 URL 需要是完整的 URL，包括协议和域名
			    method: 'POST',
			    header: {
					'content-type': 'application/json'
			    },
			    success: (res) => {
			        console.log(res.data);
			    },
			    fail: (err) => {
			        console.error(err);
			    }
			});
		},
		del(postCommentId) {
			// 模拟弹窗
			uni.showModal({
				title: '是否删除？',
				success: function(res) {
					if (res.confirm) {
						console.log('用户点击确定')
						uni.request({
						    url: 'http://127.0.0.1:4523/m1/4600643-4250220-default/api/user/post/commentTopic?postCommentId='+postCommentId, // 注意：这里的 URL 需要是完整的 URL，包括协议和域名
						    method: 'DELETE',
						    header: {
								
						    },
						    success: (res) => {
						        console.log(res.data);
						    },
						    fail: (err) => {
						        console.error(err);
						    }
						});
					} else if (res.cancel) {
						console.log('用户点击取消')
					}
				}
			})
		},
	  },
	  
	};
</script>

<style scoped>
.content {
	background-color: #f9f9f9;
	display: flex;
	flex-direction: column;
	height: 100vh;  
	
}

.post {
	background-color: white;
	border-radius: 5px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	padding-bottom: 90rpx;
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
.post-title {
	font-size: 12px;
	font-style: normal;
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
	 
	 display: flex;
	align-items: right;
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
	width: 100%;
	height: 70rpx;
	padding: 10rpx;
	padding-bottom: 20px;
	position: fixed;
	bottom: 0;
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
</style>
