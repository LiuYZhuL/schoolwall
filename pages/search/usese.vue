<template>  
  <view class="container">  
    <!-- 搜索输入框 -->  
    <view class="search-bar">  
      <input type="text" class="search-input" placeholder="请输入搜索内容" v-model="searchValue" />  
      <!-- 搜索按钮 -->  
      <button class="search-btn" @click="onSearchButtonClick">搜索</button>  
    </view>  
    <!-- 搜索结果列表 -->  
    <view class="search-result" v-if="searchResults.length > 0">  
      <view class="result-item" v-for="(item, index) in searchResults" :key="index">  
        {{ item.name }}  
      </view>  
    </view>  
    <!-- 无结果时显示 -->  
    <view class="no-result" v-else-if="searchValue.trim() !== '' && searchResults.length === 0">  
      没有找到结果  
    </view>  
  </view>  
</template>  
  
<script>  
export default {  
  data() {  
    return {  
      searchValue: '', // 搜索值  
      searchResults: [] // 搜索结果  
    }  
  },  
  methods: {  
    // 按钮点击时的搜索方法  
    onSearchButtonClick() {  
      // 这里是模拟的搜索逻辑，实际开发中应替换为调用API等  
      const mockData = [  
        { id: 1, name: '苹果' },  
        { id: 2, name: '香蕉' },  
        { id: 3, name: '橙子' },  
        // ... 其他数据  
      ];  
        
      // 根据搜索值过滤数据  
      this.searchResults = mockData.filter(item => item.name.includes(this.searchValue));  
    }  
  },  
  // 组件的其他选项...  
}  
</script>  
  
<style>  
/* 样式部分与之前相同，这里不再重复 */  
</style>