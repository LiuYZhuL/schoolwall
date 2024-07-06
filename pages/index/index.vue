<template>
	<view>
		<view class="post" v-for="(post, index) in posts" :key="post.id">  
		    <uni-list-chat clickable="true" :avatar-circle="true" :title="post.circleName" :avatar="post.circleAvatar"  
		                    :note="post.circleType" :time="post.circleUpdateTime" @click="login(index)">  
		    </uni-list-chat>  
		</view>
		<view class="container">
			<uni-fab ref="fab" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical"
				:direction="direction" @trigger="trigger" />
		</view>
	</view>
</template>

<script>
	import {BASE_URL} from '@/api/api.js'
	export default {
		data() {
			return {
				posts: [],

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
					iconPath: '/static/annImg/search.png',
					selectedIconPath: '/static/annImg/search.png',
					text: '搜索',
					active: false
				}],

			}
		},
		onShow() {
			uni.request({
				url: `${BASE_URL}/api/user/circle?apifoxApiId=182959254`,
				method: 'GET',
				header: {
					'content-type': 'application/json'
				},
				success: res => {
					var that = this;
					if (res.statusCode === 200) {

						const data = res.data.data;
						const records = data.records;
						that.posts = records;

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
		onLoad() { //onLoad() 是在小程序框架中使用的生命周期函数

		},
		methods: { //methods 是用于定义组件方法的选项。
			trigger(e) {
				// console.log(e)
				this.content[e.index].active = !e.item.active
				if (e.index === 0) {
					uni.navigateTo({
						url: '/pages/search/search',

					})
				}
			},
			login(index) {
				// let tokk = uni.tokk;
				// if (tokk != 1) {
				// 	uni.navigateTo({
				// 		url: '/pages/Login/Login'
				// 	})
				// } else {
				// 	uni.switchTab({
				// 		url: '/pages/list/list'
				// 	})

				// }
				this.$popg.sharedData=this.posts[index];
				console.log(this.$popg.sharedData); // 输出：初始值
					uni.switchTab({
						url: '/pages/list/list'
					})
				

			},
			search() {
				uni.navigateTo({
					url: '/pages/search/search'
				})

			}

		}
	}
</script>

<style>
	.userinfo-avatar {
		border-radius: 128upx;
		width: 128upx;
		height: 128upx;
	}
</style>