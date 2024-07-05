<template>
	
 <view class="container">
	 <view class="gam">
	 <view class="custom-nav-bar" :style="{ display: showNavBar ? 'flex' : 'none' }">  
	     <!-- 这里可以放置返回按钮、标题等 -->  
	   </view>  
   <view class="header">
     <image class="logo" src="/static/2.jpg" />
     <view class="info">
	
       <text class="title">武汉大学</text>
       <view class="stats">
         <text class="stat">5448动态</text>
         <text class="divider">|</text>
         <text class="stat">4167学子</text>
       </view>
     </view>
     <button class="join-button" @click="goto()">加入</button>
   </view>
   <view class="announcement">
     <text>这里是站点表白墙公告，这里是站点表</text>
   </view>

	 
<!-- 	 <view class="categories">
	   <block v-for="(categorie, index) in categories" :key="index">  
	     <view class="category">  
	       <view class="category-icon" ></view>  
	       <text class="category-text">{{categorie.text}}</text>  
	     </view>  
		 <view style="height: 5px;"></view>
	   </block>  
	 </view> -->
   </view>
   <view class="op":style="{ position: 'relative', top: '-12px', zIndex: '10' }">
	   <view style="height: 5px;"></view>
   	   <view class="headerg">  
   	       <scroll-view class="scroll-view_H" scroll-x="true">  
   	         <block v-for="(tab, index) in tabs" :key="index">  
   	           <text   
   	             class="sub-title"   
   	             :class="{ active: activeTab === tab.name }"   
   	             @tap="setActiveTab(tab.name)"  
   	           >  
   	             {{ tab.text }}  
   	           </text>  
   	         </block>  
   	       </scroll-view>  
   	     </view>  
   		
   	
   	   <view class="headerg" style="margin-top:15px ;margin-left:-10px ;" >
   		     <scroll-view class="scroll-view_H" scroll-x="true">  
   		       <block v-for="(tag, index) in tags" :key="index">  
   		         <text   
   		           class="tag"   
   		           :class="{ active: activeTag === tag.name }"   
   		           @tap="setActiveTag(tag.name)"  
   		         >  
   		           {{ tag.name }}  
   		         </text>  
   		       </block>
				 
   		     </scroll-view>   
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
   		     <view class="post-content" @click="goto1()">
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

   		   </view>  
   
   	   <uni-fab ref="fab" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical"
   	   	:direction="direction" @trigger="trigger"  />
   </view>
  
   	
   
   



</template>
<script>
export default {
	
	onShow() {
		uni.request({  
		  url: 'http://127.0.0.1:4523/m1/4600643-4250220-default/api/user/group',  
		  method: 'GET',  
		  header: {  
		    'authentication': 'application'  
		  },  
		  success: res => {  
		    if (res.statusCode === 200) {  
		      const data = res.data;  
		      console.log('Total:', data.total); // 打印总数  
		  
		      // 遍历records数组  
		      data.records.forEach(record => {  
		        console.log('GroupName:', record.groupName); // 打印每个组的groupName  
		      });  
		  
		      // 假设您有一个数组或对象，您想将第一个组的groupName设置为其text属性  
		      // 这里假设this.range是一个已经定义并包含至少一个对象的数组  
		     
		    } else {  
		      console.error('Error in response:', res);  
		    }  
		    // 可以在这里打印整个响应数据以进行调试  
		    console.log(res.data);  
		  },  
		  fail: error => {  
		    console.error('Request failed:', error);  
		  }  
		}),
		
		uni.request({
		  url: 'http://127.0.0.1:4523/m1/4600643-4250220-default/api/user/circle/1',
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
       showNavBar: false ,// 控制导航栏的显示与隐藏  
	   activeTab: '圈子动态', // 默认激活的选项卡  
	   activeTag:'树洞',
	         tabs: [  
	           { name: '圈子动态', text: '圈子动态' },  
	           { name: '二手集市', text: '二手集市' },  
	           { name: '组局', text: '组局' },  
	           ],
			    tags: [  
			           { name: '树洞'},  
			           { name: '吐槽'},  
			           { name: '求助' },  
			           { name: '表白' },  
			           { name: '交友' },  
			          
			           
			         ],  
				categories: [  
				      { icon: 'icon1', text: '校园购物' },  
				      { icon: 'icon2', text: '校园跑腿' },  
				      { icon: 'icon3', text: '旅游' },  
				      { icon: 'icon4', text: '出行' },  
				      { icon: 'icon5', text: '美食' }, ],
					  title: 'uni-fab',
					  directionStr: '垂直',
					  horizontal: 'right',
					  vertical: 'bottom',
					  direction: 'horizontal',
					  pattern: {
					  	color: '#7A7E83',
					  	backgroundColor: '#fff',
					  	selectedColor: '#7A7E83',
					  	buttonColor: '#F4683E',
					  	iconColor: '#fff'
					  },
					  posts : [
					      {
					          id: 1,
					          avatar: '/static/images/2.jpg',
					          username: '峰潇潇Sorcererer',
					          time: '2小时前',
					          followed: false,
					          category: '失物招领',
					          text: '雅思口语全套出售了，欢迎咨询',
					          location: '',
					          views: 6465,
					          shares: 9665,
					          comments: 895,
					          likes: 862
					      },
					  ],
					  
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
    }
	
  },
  methods: {
	  goto1(){
	  		  uni.navigateTo({
	  		  	url: '/pages/details/uni-post'
	  		  })
	  },
	  goto(){
		  uni.navigateTo({
		  	url: '/pages/details/group'
		  })
	  },
	  setActiveTag(tag) {
	          this.activeTag = tag;  
	          // 这里可以添加其他逻辑，比如根据选择的标签加载不同的内容  
	        },  
	   setActiveTab(tab) {  
	        this.activeTab = tab;  
	        // 在这里可以添加其他逻辑，例如导航到不同的页面或加载不同的数据  
	      },  
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
	
    
  }
};
</script>

<style>/* 通用样式 */
.container {
	background-color: white;


}
.gam{

	
}
.custom-nav-bar {  
  display: flex;  
  align-items: center;  
  justify-content: space-between;  
  padding: 0 20rpx; /* 根据需要调整内边距 */  
  height: 44px; /* 根据需要调整高度 */  
  background-color: transparent; /* 设置为透明背景 */  
  position: fixed;  
  top: 0;  
  left: 0;  
  right: 0;  
  z-index: 999; /* 确保导航栏在内容之上 */  
}  

.header {
  display: flex;
  align-items: center;
  padding: 10px 0;
  padding-top: 44px; /* 与导航栏高度相同 */
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
  color: #eee;
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
  height: 30px;
  width: 70px;
 
  border-radius: 20px;
  text-align: center; /* 水平居中 */  
    line-height: 30px; /* 与按钮的高度相同以实现垂直居中 */
  
}

.announcement {
  background-color: rgba(0, 0, 0, 0.3);
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
.op{
	

	height: 100px;
    background-color: white; /* 设置一个背景色以便查看效果 */  
    /* 圆角设置 */  
    border-radius: 20px;
	padding: 20px ;/* 内边距 */  
    box-sizing: border-box;/* 确保宽度和高度包含内边距和边框 */  
	z-index: 10;
}

.sub-title {
  font-size: 16px;
  color: #666;
  margin-right: 20px;
}
.sub-title.active {
 font-size: 20px;
 font-weight: bold;
 margin-right: 20px;             /* 活动标签文字颜色 */
}
.tag {
 background-color: #f0f0f0;
  color: #999;
  padding: 5px 10px;
  border-radius: 20px;
  margin: 5px;

}

.tag.active {
background-color: #FFD700;  /* 活动标签背景色 */
  color: #000;    
  
}
.scroll-view_H {  
  display: flex;  
  overflow-x: auto;  
  scroll-snap-type: x mandatory; /* 可选，用于平滑滚动到每个元素 */  
  scroll-padding: 50px; /* 可选，为滚动内容提供内边距 */  
  scroll-behavior: smooth; /* 可选，使滚动更加平滑 */  
}  

/* dsf */
.post{
	display: flex;
 
}
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