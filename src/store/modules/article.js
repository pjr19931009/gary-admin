import {getArticleList} from "@/api/article";


const state = {
  article: []
};

const getters = {
  article: state => {
    return state.article;
  }
};

const mutations = {
  SET_ARTICLE(state, payload) {
    state.article = payload;
  }
};

const actions = {
  getArticle({ commit }) {
    return new Promise((resolve, reject) => {
      getArticleList()
        .then(res => {
          commit("SET_ARTICLE", res);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
