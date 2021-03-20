// import { login, getUserInfo } from "api/user.js";
import { layoutStorage } from "utils/storage";
// const { handleToken } = storage;
const state = {
  //false 侧边栏展开
  collapse: false,
  // 阻止重复点击
  allowChange: true,
  // 当前所有routes
  routeList: [],
  // 设备
  device: '',
  // 全屏
  fullscreen: false
}

const getters = {
  isCollapse: state => {
    return state.collapse
  },
  routeList: state => {
    return state.routeList
  },
  device: state => {
    return state.device
  },
  fullscreen: state => {
    return state.fullscreen
  },
}

const mutations = {
  SET_COLLAPSE(state, payload) {
    state.collapse = payload;
  },
  SET_ALLOWCHANGE(state, payload) {
    state.allowChange = payload;
  },
  SET_ROUTELIST(state, payload) {
    state.routeList = payload;
  },
  SET_DEVICE(state, payload) {
    state.device = payload;
  },
  SET_FULLSCREEN(state, payload) {
    state.fullscreen = payload;
  }
}

const actions = {
  setCollapse({ commit, dispatch, state }, isCollapse) {
    if (state.allowChange) {
      commit('SET_ALLOWCHANGE', false)
      layoutStorage.setItem('sidebarCollapse', isCollapse).then(res => {
        commit('SET_COLLAPSE', res)
        dispatch('setAllowChange')
      }).catch(err => {
        commit('SET_COLLAPSE', false)
        dispatch('setAllowChange')
        console.log(err);
      })
    }
  },
  setAllowChange({ commit }) {
    setTimeout(() => {
      commit('SET_ALLOWCHANGE', true)
    }, 300);
  },
  setRouteList({ commit }, list) {
    commit('SET_ROUTELIST', list)
  },
  setDevice({ commit }, device) {
    commit('SET_DEVICE', device)
  },
  setFullscreen({ commit }, fullscreen) {
    commit('SET_FULLSCREEN', fullscreen)
  }
}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
