const state = {
  theme: null
};

const getters = {
  theme: state => {
    return state.theme;
  }
};

const mutations = {
  SET_THEME(state, payload) {
    state.theme = payload
  }
};

const actions = {
  setTheme({ commit }, theme) {
    commit("SET_THEME", theme);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
