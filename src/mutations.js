import isEmpty from './validation/is-empty';

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
  articleCounts: 0,
  agree_disagreeAnswer:'',
  recentData:null,
}

const mutations = {
  GET_ERRORS: (state, payload) => {
    state.errors = payload;
  },

  SET_CURRENT_USER: (state, payload) => {
    state.isAuthenticated = !isEmpty(payload);
    state.user = payload;
  },

  GET_PROFILE: ( state, payload ) => {
    state.profile = payload;
    state.loading = false;
  },

  PROFILE_LOADING: ( state, payload ) => {
    state.loading = true;
  },

  GET_ALL_QUES_ANS: ( state, payload ) => { 
    state.QuesAnss = payload;
    state.loading = false
  },

  QUESTION_LOADING: ( state, payload ) => {
    state.loading = true
  },

  ADD_QUESTION: ( state, payload ) => {
    state.QuesAnss = [payload, ...state.QuesAnss]
  },

  ADD_ANSWER: ( state, payload ) => {
    state.answeredItem = payload
  },

  DELETE_QUESTION: ( state, payload ) => {
    state.QuesAnss = state.QuesAnss.filter(ques => ques._id !== payload)
  },

  GET_CURRENT_NOTIFICATION: ( state, payload ) => {
    state.currentNotification = payload
  },

  GET_ALL_NOTIFICATIONS: ( state, payload ) => {
    state.notifications = payload
  },
  
  ADD_NOTIFICATION: ( state, payload ) => {
    state.notifications = payload
  },

  COUNT_NOTIFICATIONS: ( state, payload ) => { 
    state.counts = payload
  },

  GET_NOTIFICATIONS: ( state, payload ) => {
    state.loading = false;
    state.notifications = payload
  },
  
  NOTIFICATION_LOADING: (state) => {
    state.loading = true
  },

  EDIT_NOTIFICATION: (state, payload) => {
    state.editedItem = payload
  },

  DELETE_NOTIFICATION: (state, payload) => {
    state.notifications = state.notifications.filter(noti => noti._id != payload)
  },

  GET_ALL_DRAFTARTICLES: (state, payload) => {
    state.loading = false;
    state.articles = payload
  },

  ARTICLE_LOADING: (state, payload) => {
    state.loading = true
  },

  GET_ARTICLE: (state, payload) => {
    state.article = payload;
    state.loading = false
  },

  GET_COMMENTS: (state, payload) => {
    state.comments = payload
    //comments: [action.payload, ...state.article.comments]
  },

  GET_ARTICLES: (state, payload) => {
    state.articles = payload,
    state.loading = false
  },

  KEEP_RECENT: (state, payload) => {
    state.recentData = payload
  },

  COUNT_ARTICLES: (state, payload) => {
    state.articleCounts = payload
  },

  DELETE_ARTICLE: (state, payload) => {
    state.articles = state.articles.filter(article => article._id != payload)
  },

  AGREE_ARTICLE: (state, payload) => {
    state.agree_disagreeAnswer = payload
  },

  DISAGREE_ARTICLE: (state, payload) => {
    state.agree_disagreeAnswer = payload
  }
}

export default mutations;