import { login, getUserInfo } from "api/user.js";
import { handleToken } from "utils/storage";


const state = {
  token: "",
  name: "",
  intr: "",
  avatar: "",
  roles: null
};

const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  setName(state, name) {
    state.name = name;
  },
  setIntr(state, intr) {
    state.intr = intr;
  },
  setAvatar(state, avatar) {
    state.avatar = avatar;
  },
  setRoles(state, roles) {
    state.roles = roles;
  }
};
const actions = {
  // 登录请求
  login({ commit, dispatch }, userForm) {
    let { account, password } = userForm;
    return new Promise((resolve, reject) => {
      login({ userName: account.trim(), password })
        .then(res => {
          return handleToken.setItem("token", res.token)
        })
        .then((res) => {
          dispatch("setToken", res);
          resolve(res);
        })
        .catch(err => {
          commit("setToken", "");
          reject(err);
        });
    });
  },
  // 用户信息
  async getUserInfo({ commit, getters }) {
    try {
      const res = await getUserInfo({ token: await getters.userToken })
      const { roles, name, avatar, intr } = res;
      commit('setRoles', roles);
      commit('setName', name);
      commit('setAvatar', avatar);
      commit('setIntr', intr);
      return res
    } catch (error) {
      return Promise.reject(error);
    }
  },
  // 清空
  resetInfo({ commit }) {
    return new Promise((resolve, reject) => {
      handleToken
        .removeItem("token")
        .then(() => {
          commit('setRoles', null);
          commit('setName', "");
          commit('setAvatar', "");
          commit('setIntr', "");
          resolve('reset ok')
        })
        .catch(err => {
          console.log(err);
          reject(err)
        });
    })
  },
  // 从localstorage设置token
  setToken({ commit }, token) {
    commit('setToken', token);
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      handleToken.removeItem("token").then(res => {
        commit("setToken", "");
        commit('setRoles', null);
        resolve('logout')
      }).catch(err => {
        commit("setToken", "");
        commit('setRoles', null);
        reject(err);
      })
    })
  }
};

const getters = {
  async userToken(state) {
    let token = state.token
    if (token && typeof token === "string") return token
    return await handleToken.getItem("token")
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
