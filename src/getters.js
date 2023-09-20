export default {
  getErrors (state) {
    return state.errors;
  },

  getIsAuthenticate (state) {
    return state.isAuthenticate
  },

  getHandle (state) {
    return state.user.handle
  },

  getProfile ( state ) {
    return state.profile
  },

  getQuesAnss ( state ) {
    return state.QuesAnss
  },

  getLoading ( state ) {
    return state.loading
  },

  getAnsweredItem ( state ) {
    return state.answeredItem
  },

  getterCounts ( state ) {
    return state.counts
  },

  getterAddItem ( state ) {
    return state.addItem
  },

  getterNotifications ( state ) {
    return state.notifications
  },

  getterEditedItem ( state ) {
    return state.editedItem
  },

  getterArticleCounts ( state ) {
    return state.articleCounts
  },

  getterArticles ( state ) {
    return state.articles
  }
}