import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import questionReducer from './questionReducer';
import eboardReducer from './eboardReducer';
import notificationReducer from './notificationReducer';
import discussReducer from './discussReducer';
import taskReducer from './taskReducer';

export default combineReducers({
  auth:authReducer,
  errors:errorReducer,
  ques: questionReducer,
  eboard: eboardReducer,
  notification: notificationReducer,
  discuss: discussReducer,
  task: taskReducer,
});
