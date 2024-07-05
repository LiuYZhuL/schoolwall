<template>
	<view >
		<uni-row :gutter="10">
			<!-- gutter 每个col 之间的间隔 10——5px -->
			<uni-col :span="24" v-for="item in announceList" :key="item.topic"><!--  -->
				<!-- 一行分为24格，想分为2格，则24/12=2 rpx有成本，能用px用px -->
				<view style="margin-bottom: 3px; background-color: white; padding: 10px; border-radius: 10px;" >

					<!-- flex布局 -->
					<!-- <image :src="item.img" mode="top" style="width: 100%;"></image> -->
					<view class="lineEllipsis" @click="detial(item)">
						{{item.topic}}
					</view>
					
					
						<view class="time">
						{{item.time}}
					    </view>

					<!-- 图标，喜欢，评论，收藏 -->
					<view class="message" style="text-align: right; ">
					
						<uni-icons class="del" type="trash" size="20" style="color: #666;" @click="del"></uni-icons>
						<uni-icons class="change" type="tune" size="20" style="color: #666;" 
							@click="change(item)"></uni-icons>


						<!-- 评论 -->
						<uni-icons class="comment" type="chatbubble" size="20" style="color: #666;" v-show="showC"
							@click="comment(item)"></uni-icons>
						<uni-icons class="comment" type="chatbubble-filled" size="20" style="color: #ff666;"
							v-show="!showC" @click="comment(item)"></uni-icons>
						<!-- 喜欢 -->

						<uni-icons class="like" type="heart" size="20" style="color: #666;" v-show="showL"
							@click="like(item)"></uni-icons>
						<uni-icons class="like" type="heart-filled" size="20" style="color: #666;" v-show="!showL"
							@click="like(item)"></uni-icons>
						
						
						

					</view>

				</view>

			</uni-col>
		</uni-row>

		<!-- 悬浮按钮   跳转发布信息-->
		<!-- <view class="container">
			<uni-fab ref="fab" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical"
				:direction="direction" @trigger="trigger" @fabClick="fabClick" />
		</view> -->
	</view>
</template>

<script>
	export default {
		
		onShow() {
			uni.request({
			  url: 'http://127.0.0.1:4523/m1/4600643-4250220-default/api/user/post',
			  method: 'GET',
			  header: {
			    // 'content-type': 'application/json'
				'token': '{{token}}'
			  },
						  
			  success: res => {
								 if (res.statusCode === 200 ) {
								             const data = res.data.data;
								             console.log('Total:', data.total);
											 
											this.total=data.total;
								             const records = data.records;
											 this.announceList=records;
								     
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

				// 动态目录
				announceList: [{
						topic: "绝不挂科",
						time: "2024.06.12-12:30:12"
						// img: "https://img.keaitupian.cn/newupload/11/1668761362146302.jpg"
					},
					
				],

				showL: true,
				showC: true,

				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF',
					iconColor: '#fff'
				},
				is_color_type: false,

				
			}
		},
		onBackPress() {
			if (this.$refs.fab.isShow) {
				this.$refs.fab.close()
				return true
			}
			return false
		},
		// *************************************
		onLoad() {


		},
		methods: {
			// 方法
			like(item) {
				this.showL = !this.showL
			},
			comment(item) {
				this.showC = !this.showC
			},
			del(e) {
				// 模拟弹窗
				uni.showModal({
					title: '是否删除动态？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定')
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			change(item) {
				// 模拟弹窗
				uni.showModal({
					title: '是否修改动态？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定')
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			
			fetchCircles(){
				uni.request({
				  url: 'http://127.0.0.1:4523/m1/4644921-4295534-default/api/user/post',
				  method: 'GET',
				  header: {
				    'content-type': 'application/json'
				  },
							  
				  success: res => {
									 if (res.statusCode === 200 ) {
									             const data = res.data.data;
									             console.log('Total:', data.total);
												this.total=data.total;
									             const records = data.records;
									             records.forEach(record => {
													 // this.announceList[0].id=record.circleId;
													 // this.announceList[0].name=record.circleName;
													 // this.announceList[0].join=record.circleType;
													 // this.announceList[0].likes='点赞：'+record.circlePostCount;
									             });
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
			
			detial(){
				uni.navigateTo({
					url: '/pages/details/uni-post'
				})
			},
			

		}

	}
</script>

<style>
	.lineEllipsis {
		font-size: 20px;
		margin-left: 5px;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		/* 超出两行自动加省略号 */
		overflow: hidden;
	}
	
	.time{
		margin-top: 8px;
	}

	.warp {
		padding: 10px;
	}

	.button {
		margin-bottom: 10px;
	}
</style>