import {SET_CURRENT_USER, GET_PROFILE, PROFILE_LOADING} from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  isAuthenticated: false,
  user: {},
  profile: null,
  loading: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }

    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      }

    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}