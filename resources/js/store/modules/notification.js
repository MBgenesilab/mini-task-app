const state = {
  show: false,
  message: '',
  color: 'success',
  timeout: 3000,
};

const getters = {
  notificationState: (state) => state,
};

const actions = {
  showNotification({ commit }, { message, color }) {
    commit('setNotification', { message, color });
  },
  hideNotification({ commit }) {
    commit('clearNotification');
  },
};

const mutations = {
  setNotification(state, { message, color }) {
    state.show = true;
    state.message = message;
    state.color = color;
  },
  clearNotification(state) {
    state.show = false;
    state.message = '';
    state.color = 'success';
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
