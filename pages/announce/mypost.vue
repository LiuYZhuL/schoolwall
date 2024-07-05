<template>
  <view>
    <view class="container">
      <view class="input-container">
        <view class="input-item">
          <text class="input-label">帖子标题：</text>
		  <view style="color:#808080;padding: 15px;fond-size:15px">
          <input type="text" v-model="post.title" class="input-field" placeholder="请输入帖子标题" />
		  </view>
        </view>
        <view class="input-item">
          <text class="input-label">帖子内容：</text>
		  <view style="color:#808080;padding: 15px;fond-size:15px">
          <textarea v-model="post.content" class="input-field"style="padding-top: 20px;" placeholder="请输入帖子内容"></textarea>
         </view>
	   </view>
        <view class="input-item">
          <text class="input-label">选择图片：</text>
          <button @click="chooseImage"style="color:#17abe3;border-radius: 30px;" >上传</button>
        </view>
          <!--          <image v-if="post.image" :src="post.image" class="post-image" mode="aspectFill" /> -->
        </view>
        <view class="image-container">
          <view v-for="(image, index) in images" :key="index" class="image-item">
            <image :src="image" mode="scaleToFill" class="image-src"></image>
          </view>
        </view>
        <view class="input-item" >
          <text class="input-label">选择分类：</text>
          <picker mode="selector" :range="classification" v-model="selectedCategoryIndex" @change="categoryChange">
            <view class="picker">当前选择：{{ classification[selectedCategoryIndex] }}</view>
          </picker>
        </view>
      </view>
      <view class="button-container">
        <button @click="upost" style="color:#17abe3;border-radius: 30px;" >发布帖子</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
	onShow() {
		uni.request({
		  url: 'http://127.0.0.1:4523/m1/4600643-4250220-default/api/user/post?apifoxApiId=183926713',
		  method: 'POST',
		  header: {
		    'authentication': 'application'
		  },
					  
		  success: res => {
							 if (res.statusCode === 200 ) {
							             const data = res.data.data;
							        
										
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
		total:'',
      images: [], // 存储已上传图片的数组
      post: {
        title: '',
        content: '',
        images: '', // 存储已上传图片的数组
        classification: ''
      },
      classification: ['日常投稿', '考研学习', '失物招领', '吐槽'],
      selectedCategoryIndex: 0
    };
  },
  methods: { 
    //选择图片进行上传
    chooseImage() {
		//选择图片
      uni.chooseImage({
        count: 4,
        sizeType: 'compressed',
        sourceType: ['album', 'camera'],
        success: (res) => {
           const tempFilePaths = res.tempFilePaths;
           this.images.push(tempFilePaths[0],tempFilePaths[1],tempFilePaths[2],tempFilePaths[3]);
		  //图片预览
		  uni.previewImage({
		  	urls:res.tempFilePaths
		  });
        }
      });
	  uni.getImageInfo({
	  	url:"http://127.0.0.1:4523/m1/4600643-4250220-default/api/user/post?apifoxApiId=183926713",
		sucess:function(res){
		}
	  })
    },
    //选择分类
    categoryChange(e) {
      this.selectedCategoryIndex = e.detail.value;
    },
    //发布帖子
    async  upost() {
      this.post.classification = this.classification[this.selectedCategoryIndex];
      this.post.images = this.images.join(',');
      console.log(this.post.categorie);
      if (!this.post.title || !this.post.content ||  !this.post.classification) {
        uni.showToast({
          title: '请填写完整信息',
          icon: 'none'
        })
		;
        return;
      }
      // const res = await this.$myRequest({
      //   method: 'post',
      //   url: '/fatie',
      //   data: {
      //     title: this.post.title,
      //     content: this.post.content,
      //     images: this.post.images,
      //     classification: this.post.classification,
      //     userId: this.$store.state.user.id,
      //     communityId: this.$store.state.communityId
      //   }
      // })     
	  uni.showToast({
     	   	icon:'success',
     	   	title:'修改成功'
     	   })
     	   setTimeout(()=>{
     		   	uni.navigateTo({
     		   		url:'/pages/user/my/myannounce',
     		   	})
     	   },500)
     }
    }
  };
</script>
<style>
	.input-container{
		fond-size:30px;
		color:black;
	}
	.image-container{
		fond-size:30px;
		 color:black;
}
</style>