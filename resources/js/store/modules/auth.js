import axios from 'axios';
import { storageService, apiService } from '../../services';

const state = {
  token: storageService.get('token') || '',
  user: {},
  status: '',
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  authStatus: (state) => state.status,
  user: (state) => state.user,
};

const actions = {
  async login({ commit, dispatch }, user) {
    commit('auth_request');
    try {
      const data = await apiService.login(user);
      const token = data.access_token;
      storageService.save('token', token);
      apiService.setAuthHeader(token);
      commit('auth_success', token);
      await dispatch('getUser');
    } catch (error) {
      commit('auth_error');
      storageService.remove('token');
      throw error;
    }
  },
  async register({ commit, dispatch }, user) {
    commit('auth_request');
    try {
      const data = await apiService.register(user);
      const token = data.access_token;
      storageService.save('token', token);
      apiService.setAuthHeader(token);
      commit('auth_success', token);
      await dispatch('getUser');
    } catch (error) {
      commit('auth_error');
      storageService.remove('token');
      throw error;
    }
  },
  async logout({ commit }) {
    try {
      await apiService.logout();
      commit('logout');
      storageService.remove('token');
      apiService.removeAuthHeader();
    } catch (error) {
      commit('auth_error');
      storageService.remove('token');
      throw error;
    }
  },
  async getUser({ commit }) {
    try {
      const response = await axios.get('/api/auth/me');
      commit('set_user', response.data);
    } catch (error) {
      commit('auth_error');
      storageService.remove('token');
      throw error;
    }
  },
};

const mutations = {
  auth_request(state) {
    state.status = 'loading';
  },
  auth_success(state, token) {
    state.status = 'success';
    state.token = token;
  },
  auth_error(state) {
    state.status = 'error';
  },
  logout(state) {
    state.status = '';
    state.token = '';
    state.user = {};
  },
  set_user(state, user) {
    state.user = user;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
