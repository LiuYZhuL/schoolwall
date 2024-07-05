<template>
	<view>
		<button @click="name" class="button_1" >修改昵称</button>

	
		
		
	</view>
	
</template>

<script>
	export default {
		data() {//data() 是一个用于定义组件数据的函数。该函数返回一个包含组件数据的对象。
			return {
				title: 'Hello'
			}
		},
		onLoad() {//onLoad() 是在小程序框架中使用的生命周期函数
	
		},
		methods: {//methods 是用于定义组件方法的选项。
	       name(){
			   uni.navigateTo({
			   	url:'/pages/user/modify/name'
			   })
		   },
		   sex(){
			   uni.navigateTo({
			   	url:'/pages/user/modify/sex'
			   })
		   },
		   school(){
			   uni.navigateTo({
			   	url:'/pages/user/modify/school'
			   })
		   },
		   autograph(){
			   uni.navigateTo({
			   	url:'/pages/user/modify/autograph'
			   })
		   }
		   
		}
	}
	
</script>

<style>
	.button_1{
		type:white;
		text-align: left;
	}
</style>