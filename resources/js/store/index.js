// resources/js/store/index.js

import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import task from './modules/task';
import notification from './modules/notification';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    task,
    notification,
  },
});
