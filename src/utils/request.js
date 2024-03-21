// import store from "@/store";
import config from "@/config";
import { getToken } from "@/utils/auth";
import errorCode from "@/utils/errorCode";
import { toast, showConfirm, tansParams } from "@/utils/common";

let timeout = 10000;
const baseUrl = config.baseUrl;

const request = (config) => {
  // 是否需要设置loading
  const {loading = true } = config
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false;
  config.header = config.header || {};
  if (getToken() && !isToken) {
    config.header["Authorization"] = getToken();
  }
  // get请求映射params参数
  if (config.params) {
    let url = config.url + "?" + tansParams(config.params);
    url = url.slice(0, -1);
    config.url = url;
  }

  return new Promise((resolve, reject) => {
    loading && uni.showLoading({
      title: "加载中...",
      mask: true,
    });
    uni.request({
      method: config.method || "get",
      timeout: config.timeout || timeout,
      url: config.baseUrl || baseUrl + config.url,
      data: config.data,
      header: config.header || "application/json", //请求头信息 content-type
      success: (response) => {
        uni.hideLoading();
        console.log(response, "response");
        // 判断 请求api 格式是否正确
        // if (response.statusCode && response.statusCode != 200) {
        //   uni.showToast({
        //     title: response.errMsg,
        //     icon: "none",
        //   });
        //   return;
        // }
        console.log(response, "response232");
        const code = response.statusCode || 200;
        const msg = errorCode[code] || errorCode["default"];
        if (code == 201) {
          resolve(response.data);
        } else if (code === 401) {
          showConfirm(
            "登录状态已过期，您可以继续留在该页面，或者重新登录?"
          ).then((res) => {
            if (res.confirm) {
              // store.dispatch('LogOut').then(res => {
              uni.reLaunch({ url: "/pages/login/index" });
              // })
            }
          });
          reject("无效的会话，或者会话已过期，请重新登录。");
        } else if (code === 500) {
          toast(msg);
          reject("500");
        } else if (code !== 200) {
          toast(msg);
          reject(code);
        }
        resolve(response.data);
      },
      fail: (error) => {
        uni.hideLoading();

        let { message } = error;
        // if (message === "Network Error") {
        //   message = "后端接口连接异常";
        // } else if (message.includes("timeout")) {
        //   message = "系统接口请求超时";
        // } else if (message.includes("Request failed with status code")) {
        //   message = "系统接口" + message.substr(message.length - 3) + "异常";
        // }
        toast(message);
        reject(error);
      },
      complete: () => {
        uni.hideLoading();
      },
    });
  });
};

export default request;
