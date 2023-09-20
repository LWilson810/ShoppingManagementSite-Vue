import {GET_ALL_DRAFTARTICLES, ARTICLE_LOADING, GET_ARTICLE, GET_COMMENTS, GET_ARTICLES, KEEP_RECENT, DELETE_ARTICLE, COUNT_ARTICLES, AGREE_ARTICLE, DISAGREE_ARTICLE} from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  articles: null,
  article: null,
  comments: null,
  articleCounts: 0,
  agree_disagreeAnswer:'',
  loading: false,
  recentData:null,
}

export default function (state = initialState, action) {
  switch(action.type) {
    case GET_ALL_DRAFTARTICLES:
      return {
        ...state,
        loading:false,
        articles: action.payload
      }
    case ARTICLE_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_ARTICLE:
      return {
        ...state,
        article: action.payload,
        loading: false
      }
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload
        //comments: [action.payload, ...state.article.comments]
      }
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.payload
      }
    case KEEP_RECENT:
      return {
        ...state,
        recentData: action.payload
      }
    case COUNT_ARTICLES:
      return {
        ...state,
        articleCounts: action.payload
      }
    case DELETE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter(article => article._id !== action.payload)
      }
    case AGREE_ARTICLE:
      return {
        ...state,
        agree_disagreeAnswer: action.payload
      }
    case DISAGREE_ARTICLE:
      return {
        ...state,
        agree_disagreeAnswer: action.payload
      }
    default:
      return state
  }
}