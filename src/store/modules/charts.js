const state = {
  // 所有echart
  charts: []
};

const getters = {
  charts: state => {
    return state.charts;
  }
};

const mutations = {
  SET_CHARTS(state, payload) {
    state.charts.push(payload);
  }
};

const actions = {
  setCharts({ commit }, chart) {
    commit("SET_CHARTS", chart);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
