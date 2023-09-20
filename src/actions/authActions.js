import {GET_ERRORS, SET_CURRENT_USER, GET_PROFILE, PROFILE_LOADING} from './types'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'
import $ from 'jquery'

const jwt = require('jsonwebtoken');

export const registerUser = (newUser, history) => dispatch => {
  axios.post('/api/users/register', newUser)
  .then(result =>history.push('/Login'))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))
}

export const loginUser = (loggedUser) => dispatch => {
  axios.post('/api/users/login', loggedUser)
  .then(res => {
    const {token} = res.data;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);

    const decoded = jwt_decode(token);
    console.log(decoded);
    setCurrentUser(decoded);
    window.location.href = '/';
    // history.push('/');
  })
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  setCurrentUser({});
  
  // window.location.href = '/';
}

export const lockScreen = () => {
  // window.alert(window.location.href);
  const decoded = jwt_decode(localStorage.jwtToken);
  const payload = {
    handle: decoded.handle,
    id: decoded.id,
    password: decoded.password,
    name: decoded.name,
    isTodayEventChecked: decoded.isTodayEventChecked,
    isNotificationChecked: decoded.isNotificationChecked,
    currentNotificationCheck: decoded.currentNotificationCheck,
    notificationCheck: decoded.notificationCheck,
    locked: true,
    prelocation: window.location.href,
  }
  jwt.sign(payload, 'secret',{expiresIn:360000}, (err,token) => {
    localStorage.setItem('jwtToken', "Bearer " + token);
    setAuthToken(token);
  })
  window.location.href = '/LockScreen';
}

export const getUserProfile = (handle) => dispatch => {
  dispatch(setProfileLoading());
  axios.get(`/api/users/profile/${handle}`)
  .then(res => dispatch({
    type: GET_PROFILE,
    payload: res.data
  }))
  .catch(err => dispatch({
    type: GET_PROFILE,
    payload: {}
  }))
}

export const editUserProfile = (editUser, handle, history) => dispatch => {
  axios.post(`/api/users/profile/${handle}`, editUser)
  .then(res => {
    const decoded = jwt_decode(localStorage.jwtToken);
    const payload = {
      handle: decoded.handle,
      id: decoded.id,
      password: res.data.password,
      name: decoded.name,
      isTodayEventChecked: decoded.isTodayEventChecked,
      isNotificationChecked: decoded.isNotificationChecked,
      currentNotificationCheck: decoded.currentNotificationCheck,
      notificationCheck: decoded.notificationCheck,
      locked: false,
      prelocation: window.location.href,
    }
    jwt.sign(payload, 'secret',{expiresIn:360000}, (err,token) => {
      localStorage.setItem('jwtToken', "Bearer " + token);
      setAuthToken(token);
    });
    window.location.href = '/';  
  })
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }));
}

export const setCurrentUser = data => {
  return {
    type: SET_CURRENT_USER,
    payload: data
  }
}

export const setProfileLoading = () =>{
  return {
    type: PROFILE_LOADING
  }
}

export const isTodayEvent = () => dispatch => {
  
  axios.get('/task/task/isTodayEvent')
  .then(res => {
    if(res.data == 'true') {
      if(localStorage.jwtToken) {
        const decoded = jwt_decode(localStorage.jwtToken);
        if(!decoded.isTodayEventChecked) {
          $("#eventItem").removeClass('flipInX');
          $("#eventItem").addClass('zoomOut1');
          $("#eventItem").addClass('infinite');
        } else {
          $("#eventItem").removeClass('infinite');
        }
      } 
    } 
  })
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload:err.response.data
  }))
}