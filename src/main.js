import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "utils/permission";
import "animate.css";
import "assets/styles/index.scss";
// import "./plugins/echarts"


import "normalize.css/normalize.css"; //重置样式
import "assets/icon"; //svg图标


//element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI, { size: "small", zIndex: 3000 });

// mock
import Mock from "./mock";
Mock();

// storage
// import storage from "utils/storage";
// Vue.prototype.$storage = storage;

// vuescroll
import vuescroll from 'vuescroll/dist/vuescroll-native';
Vue.use(vuescroll);

// fullscreen
import fullscreen from "vue-fullscreen";
Vue.use(fullscreen);


Vue.config.productionTip = false;



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
