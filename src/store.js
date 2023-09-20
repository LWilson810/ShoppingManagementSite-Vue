import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const state = {
  isAuthenticated: false,
  user: {},
  profile: null,
  loading: false,
  errors: null,

  QuesAnss: null,
  answeredItem: {},

  notifications: null,
  counts:0,
  addItem:null,
  editedItem: null,
  currentNotification:null,

  articles: null,
  article: null,
  comments: null,
  articleCounts: null,
  agree_disagreeAnswer:'',
  recentData:null,
}

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})



export default store;