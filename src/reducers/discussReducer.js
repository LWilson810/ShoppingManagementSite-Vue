import {FRIENDS_LOADING, SEARCH_FRIENDS, GET_FRIENDS, INVITE_FRIEND, AGREE_FRIEND, CHAT_ACTION, LOAD_CHATLOG, DEL_USER_CHAT_LOG, SAVE_MEETING_LOG, LOAD_MEETING_LOG, GET_NEW_EMAIL, GET_EMAILS, COUNT_EMAILS, FRESH_HISTORY} from '../actions/types';

const initialState = {
  searchResult:null,
  friends:null,
  addedFriend:null,
  chatActionAnswer:"",
  chatLogData:[],
  nonReadEmail:[],
  loading: false,
  Emails:[],
  EmailNums:0,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case FRIENDS_LOADING:
      return {
        ...state,
        loading:true
      }
    case SEARCH_FRIENDS:
      return {
        ...state,
        searchResult: action.payload,
        loading:false
      }
    case GET_FRIENDS:
       return {
         ...state,
        chatActionAnswer:"",
        chatLogData:[],
        friends: action.payload
       }
    case INVITE_FRIEND: 
       return {
         ...state,
        searchResult: state.searchResult.filter(item => item.handle !== action.payload.handle),
        friends: [action.payload, ...state.friends]
       }
    case AGREE_FRIEND:
      return {
        ...state,
        addedFriend: action.payload
      }
    case CHAT_ACTION:
      return {
        ...state,
        chatLogData:[],
        chatActionAnswer: action.payload
      }
    case LOAD_CHATLOG:
      return {
        ...state,
        chatActionAnswer:"",
        chatLogData: action.payload
      }
    case DEL_USER_CHAT_LOG:
      return {
        ...state,
        chatLogData:[],
        chatActionAnswer:"",
        chatActionAnswer: action.payload
      }
    case SAVE_MEETING_LOG:
      return {
        ...state,
        chatLogData:[],
        chatActionAnswer:action.payload,
      }
    case LOAD_MEETING_LOG:
      return {
        ...state,
        chatActionAnswer:"",
        chatLogData: action.payload
      }
    case GET_NEW_EMAIL:
      return {
        ...state,
        chatActionAnswer:"",
        chatLogData:[],
        nonReadEmail: action.payload
      }
    case COUNT_EMAILS:
      return {
        ...state,
        EmailNums: action.payload
      }
    case GET_EMAILS:
      return {
        ...state,
        Emails: action.payload,
      }
    case FRESH_HISTORY:
      return {
        ...state,
        chatActionAnswer:'',
        chatLogData:[],
      }
    // case GET_RECEIVE_EMAIL:
    //   return {
    //     ...state,
    //     Emails:action.payload
    //   }
    default:
      return state
  }
}