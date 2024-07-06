<template>
	<view class="">
		<scroll-view scroll-y="true" 
		style="position: absolute;left: 0;top: 0;right: 0;bottom: 100rpx;"
		:scroll-into-view="scrollinto"  scroll-with-animation>
			<block class="" v-for="(item, index) in list":key="index">
				<view :id="'chat'+index">
					<view class="chatTime" v-if="index == 0 || item.create_time - list[index-1].create_time >= 300000">
						{{formatDate(item.create_time)}}
					</view>
					<view class="chat" :style="item.userid == 1 ? 'flex-direction:row-reverse' : ''">
						<image :src="item.avatar" class="avatar"></image>
						<view class="chatContent">
							<text v-if="item.type == 'text'">{{item.data}}</text>
							<image :src="item.data" v-if="item.type == 'image'" style="max-width: 450rpx;" mode="widthFix"></image>
						</view>
					</view>
				</view>
				
			</block>
		</scroll-view> 
		<view class="chatFrame">
			<input type="text" v-model="content" class="chatInput" placeholder="请输入内容" @confirm="submit"/>
			<button class="btn" @click="chooseImage">图片</button>
			<button class="btn" @click="submit">发送</button>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				content:"",
				scrollinto:"",
				list:[
					{
					userid: 1,
					avatar:"/static/logo.png",
					username:"aaaaaa",
					data:"你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好",
					type:"text",
					create_time: 1683795488873,
					},{
					userid: 2,
					avatar:"/static/logo.png",
					username:"aaaaaa",
					data:"你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好",
					type:"text",
					create_time: 1703795488873,
					},{
					userid: 2,
					avatar:"/static/logo.png",
					username:"aaaaaa",
					data:"你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好",
					type:"text",
					create_time: 1704795488873,
					},
					{
					userid: 1,
					avatar:"/static/logo.png",
					username:"aaaaaa",
					data:"你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好",
					type:"text",
					create_time: 1705795488873,
					}
				]
			}
		},
		onLoad() {
			
		},
		onReady() {
			this.gotoBottom();
		},
		methods: {
			chooseImage() {
				
				uni.chooseImage({
					success: (img) => {
						let obj = {
							userid: 1,
							avatar:"/static/logo.png",
							username:"aaaaaa",
							data:img.tempFilePaths,
							type:"image",
							create_time: (new Date()).getTime(),
						}
						this.list.push(obj);
						this.gotoBottom();
						
					}
				});
				
			  
			},
			submit(){
				let obj = {
					userid: 1,
					avatar:"/static/logo.png",
					username:"aaaaaa",
					data:this.content,
					type:"text",
					create_time: (new Date()).getTime(),
				}
				if(this.content === ''){
					return uni.showToast({
						title: "消息不能为空",
						icon:'none'
					})
				}
				this.list.push(obj);
				this.content = '';
				this.gotoBottom();
			},
			gotoBottom(){
				let lastIndex = this.list.length - 1;
				if(lastIndex < 0) return;
				this.scrollinto = 'chat' + lastIndex;
			}
		}
	}
</script>

<style>
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
		font-size: 24rpx;
		width: 100rpx;
		height: 70rpx;
		border-radius: 5rpx;
		background-color: brown;
		text-align: center;
		line-height: 70rpx;
	}
	.avatar{
		width: 80rpx;
		height: 80rpx;
		border-radius: 100%;
		
	}
	.chatTime{
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		text-align: center;
		justify-content: center;
		font-size: 22rpx;
		color: lightgrey;
	}
	.chat{
		display: flex;
		align-self: start;
		margin-bottom: 20rpx;
		padding: 20rpx;
		/* flex-direction: row-reverse;  对方说话值为'',自己为row-reverse*/
	}
	.chatContent{
		background-color: whitesmoke;
		padding: 20rpx;
		border-radius: 5rpx;
		margin: 20rpx;
		max-width: 450rpx;
	}
	.chatContent text{
		word-break: break-all;
	}
	
</style>