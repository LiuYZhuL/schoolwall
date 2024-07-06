<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap">
			<view style="background:#FFF; padding:40upx;">
				<!-- 已登录和未登录的提示信息，可以根据需要添加 -->
			</view>
			<view class="uni-btn-v uni-common-mt">
                <!-- #ifdef MP-TOUTIAO -->
				<button type="primary" class="page-body-button" v-for="(value,key) in providerList" @click="tologin(value)" :key="key">
                    登录
                </button>
                <!-- #endif -->
                <!-- #ifndef MP-TOUTIAO -->
                <button type="primary" class="page-body-button" v-for="(value,key) in providerList" @click="tologin(value)" :key="key">{{value.name}}</button>
                <!-- #endif -->
			</view>
		</view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap">
			<view style="background:#FFF; padding:40upx;">
				<block v-if="hasUserInfo === false">
					<view class="uni-hello-text uni-center">
						<text>请点击下方按钮获取用户头像及昵称</text>
					</view>
				</block>
				<block v-if="hasUserInfo === true">
					<view class="uni-h4 uni-center uni-common-mt">{{userInfo.nickName}}</view>
					<view style="padding:30upx 0; text-align:center;">
						<image class="userinfo-avatar" :src="userInfo.avatarUrl"></image>
					</view>
				</block>
			</view>
			<view class="uni-btn-v">
				<!-- #ifdef APP-PLUS || MP-ALIPAY || MP-TOUTIAO -->
				<button type="primary" @click="getUserInfo">获取用户信息</button>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN || MP-BAIDU || MP-QQ -->
				<button type="primary" open-type="getUserInfo" @getuserinfo="mpGetUserInfo">获取用户信息</button>
				<!-- #endif -->
				<button @click="clear">清空</button>
			</view>
		</view>
	</view>
</template>

<script>

	import { mapState, mapMutations } from 'vuex';
	import {BASE_URL} from "@/api/api.js"
	export default {
		data() {
			return {
				title: 'login',
				providerList: [],
				hasUserInfo: false,
				userInfo: {}
			}
		},
		computed: {
			...mapState(['hasLogin']),
			...mapState({
				loginProvider: state => state.loginProvider
			})
		},
		onLoad() {
			uni.getProvider({
				service: 'oauth',
				success: (result) => {
					this.providerList = result.provider.map((value) => {
						let providerName = '';
						if (value === 'weixin') {
							providerName = '微信登录';
						}
						return {
							name: providerName,
							id: value
						}
					});
				},
				fail: (error) => {
					console.log('获取登录通道失败', error);
				}
			});
		},
		methods: {
			getUserInfo() {
					uni.getUserInfo({
						provider: this.loginProvider,
						success: (result) => {
							console.log('getUserInfo success', result);
							this.hasUserInfo = true;
							this.userInfo = result.userInfo;
						},
						fail: (error) => {
							console.log('getUserInfo fail', error);
							let content = error.errMsg;
							if (~content.indexOf('uni.login')) {
								content = '请在登录页面完成登录操作';
							}
			                // #ifndef APP-PLUS
							uni.getSetting({
								success: (res) => {
									let authStatus = res.authSetting['scope.userInfo'];
									if (!authStatus) {
										uni.showModal({
											title: '授权失败',
											content: 'Hello uni-app需要获取您的用户信息，请在设置界面打开相关权限',
											success: (res) => {
												if (res.confirm) {
													uni.openSetting()
												}
											}
										})
									} else {
										uni.showModal({
											title: '获取用户信息失败',
											content: '错误原因' + content,
											showCancel: false
										});
									}
								}
							})
			                // #endif
			                // #ifdef APP-PLUS
			                uni.showModal({
			                	title: '获取用户信息失败',
			                	content: '错误原因' + content,
			                	showCancel: false
			                });
			                // #endif
						}
					});
				},
				mpGetUserInfo(result) {
					console.log('mpGetUserInfo', result);
					if (result.detail.errMsg !== 'getUserInfo:ok') {
						uni.showModal({
							title: '获取用户信息失败',
							content: '错误原因' + result.detail.errMsg,
							showCancel: false
						});
						return;
					}
					this.hasUserInfo = true;
					this.userInfo = result.detail.userInfo;
				},
				clear() {
					this.hasUserInfo = false;
					this.userInfo = {};
				},
				...mapMutations(['login']),
				tologin(provider) {
					uni.login({
						provider: provider.id,
						success: (res) => {
							console.log('login success:', res);
							// 调用后端登录接口
							this.userLogin(provider.id, res.code);
							this.getToken();
						},
						fail: (err) => {
							console.log('login fail:', err);
						}
					});
				},
				userLogin(providerId, code) {
					uni.request({
						url: `${BASE_URL}/api/user/login`, 
						method: 'POST',
						header: {
							'authentication': providerId,
							'Content-Type': 'application/json'
						},
						data: {
							code: code
						},
						success: (res) => {
							if (res.statusCode === 200) {
								console.log('登录成功:', res.data);
								// 更新保存在 store 中的登录状态
								this.login(providerId);
								// 跳转到新的页面
								uni.switchTab({
									url: '/pages/list/list'
								});
							} else {
								console.log('登录失败:', res);
							}
						},
						fail: (error) => {
							console.log('请求出错:', error);
						}
					});
				},
				     getToken() {
				        uni.request({
				          url: `${BASE_URL}/api/user/login`, 
				          method: 'GET',
				          header: {
				            'token': '{{token}}',
				            'authentication': '{{token1}}'
				          },
				          success: (res) => {
				            if (res.statusCode === 200) {
								uni.token=res.data
				              console.log('获取成功:', res.data);
				              // 在这里处理成功的响应
				            } else {
				              console.log('获取失败:', res);
				            }
				          },
				          fail: (error) => {
				            console.log('请求出错:', error);
				          }
				        });
						uni.tokk=1
				      },
			},
			
		
		
	}
</script>

<style>
	button {
		background-color: #007aff;
		color: #ffffff;
	}
</style>
