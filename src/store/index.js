import Vue from 'vue';
import Vuex from 'vuex';
import localStoragePlugin from './plugins/localStorage.js';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [localStoragePlugin],
});
