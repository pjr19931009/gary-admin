import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

/**
 * directory: 要查找的文件路径
 * useSubdirectories: 是否查找子目录
 * regExp: 要匹配文件的正则
 */
const modulesList = require.context("./modules", true, /\.js$/);

// console.log(modulesList.keys()); // => ['./login.js','./user.js',...]

const modules = {};
modulesList.keys().map(item => {
  const key = item.replace(/^\.\/(.*)\.\w+$/, "$1"); // ./login.js => login
  const value = modulesList(item).default; // =>export default {}
  modules[key] = value;
});

export default new Vuex.Store({
  modules
});
