	// API 封装
import * as api from "./api.js";
function request({
  url = "",
  data = {  },
  method = "POST",
  dataType = "json",
  successCb = null, // 成功回调
  failCb = null, // 失败回调
} = {}) {
  uni.request({
    //请求路径
    url: api.BASE_URL + url,
    // 参数
    data,
    // 请求方式
    method,
    // 超时时间
    timeout: 30000,
    // 一般直接写dataType:‘json’，
    dataType,
    // 设置请求头 
    header: {
      token: uni.getStorageSync("token") || "",
    },
    success: (res) => {
    
    //  可以根据自己需求  根据 code 进行拦截
      if (res.statusCode === 200 && res.data.code === 1) {
        // 需要成功回调时才调用
        successCb && successCb(res.data.data);
      } else {
        // 请求成功  业务失败
         uni.showToast({
           title: "请求失败",
           icon: "none",
           duration: 2000,
         });
      }
    },
    // 请求失败
    fail(err) {
      uni.showToast({
        title: "请求失败",
        icon: "none",
        duration: 2000,
      });
      //   需要失败回调时才调用
      failCb && failCb();
    },
  });
}
// 导出 request
export default request;
