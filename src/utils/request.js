import axios from "axios";
import store from "src/store";
import { MessageBox, Message } from "element-ui";

let service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10000
});






let ajaxMethod = ["get", "post", "put", "delete"];
let request = {};

ajaxMethod.forEach(method => {
  // 数组取值的方式
  request[method] = function (url, data, config) {
    return new Promise(function (resolve, reject) {
      service[method](url, data, config)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
});

// request拦截器
service.interceptors.request.use(config => {

  if (store.getters.token) {
    config.headers['Token'] = getToken()
  }
  return config
}, error => {

  console.log(error)
  Promise.reject(error)
})



//response拦截器
service.interceptors.response.use(
  function (response) {
    const res = response.data;
    // 异常
    if (res.code !== 200) {
      Message({
        type: "error",
        duration: 2000,
        message: res.message || 'error'
      });
      return Promise.reject(new Error(res.message) || "error");
    }
    // 成功
    return res;
  },
  function (error) {
    // 响应错误
    return Promise.reject(error);
  }
);



export default request;
