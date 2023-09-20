import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {Config} from '@/config/config';
import setAuthToken from '@/utils/setAuthToken';
import jwt from 'jsonwebtoken';
import store from './store';
import $ from 'jquery';
import Router from 'vue-router';

import { notification } from 'ant-design-vue';

const actions = {
  clearErrors: ({ commit }) => {
    commit('GET_ERRORS', {});
  },
  loginUser : ({ commit }, loggedUser ) => {
    axios.post(Config.serverUrl + '/api/users/login', loggedUser)
    .then(res => {
      notification['success']({message:'가입성공', description:'성공적으로 가입되였습니다.'});
      const {token} = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);

      const decoded = jwt_decode(token);
      console.log(decoded);
      commit('SET_CURRENT_USER', decoded);
      window.location.href = '/';
      // Router.push('/');
      // history.push('/');
    })
    .catch(err => commit('GET_ERRORS', err.response.data));
  },
  logoutUser: ({ commit }) => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    commit('SET_CURRENT_USER', {});
  },
  registerUser : ({ commit }, data) => {
    // this.$router.push('/Login');
    axios.post(Config.serverUrl + '/api/users/register', data.newUser)
    .then(result =>{
      notification['success']({message:'등록성공', description:'성과적으로 등록되였습니다'});
      data.route.push('/Login');
    })
    .catch(err => commit('GET_ERRORS', err.response.data));
  },
  lockScreen : ({commit}) => {
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
      prelocation: window.location.pathname,
    }
    jwt.sign(payload, 'secret',{expiresIn:360000}, (err,token) => {
      localStorage.setItem('jwtToken', "Bearer " + token);
      setAuthToken(token);
    })
    console.log(payload);
    window.location.href = '/LockScreen';
    // route.push('/LockScreen');
  },
  getUserProfile : ({ commit }, handle) => {
    commit('PROFILE_LOADING');
    axios.get(Config.serverUrl + `/api/users/profile/${handle}`)
    .then(res => commit('GET_PROFILE', res.data))
    .catch(err => commit('GET_PROFILE', {}))
  },
  editUserProfile : ({ commit }, data) => {
    axios.post(Config.serverUrl + `/api/users/profile/${data.handle}`, data.editUser)
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
    .catch(err => commit('GET_ERRORS', err.response.data));
  },
  
  setProfileLoading : ({commit}) =>{
    commit('PROFILE_LOADING');
  },
  
  isTodayEvent : ({commit}) => {
    
    axios.get(Config.serverUrl + '/task/task/isTodayEvent')
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
    .catch(err => commit('GET_ERRORS', err.response.data))
  },

  currentNotificationCheck : () => {
    //window.alert("ssfdf");
    axios.post(Config.serverUrl + '/main/notification/currentNotification/check')
    .then(res => {});
  },
  
  clearCurrentNotification : ({commit}) => {
    commit('GET_CURRENT_NOTIFICATION', {})
  },
  
  getCurrentNotification : ({commit}) => {
    //window.alert("get");
    axios.get(Config.serverUrl + '/main/notification/getCurrentNotification')
    .then(res => commit(
      'GET_CURRENT_NOTIFICATION',
      res.data
    ))
    .catch(err => commit(
      'GET_ERRORS',
      err.response.data
    ))
  },
  
  getAllNotifications : ({commit}) => {
    axios.get(Config.serverUrl+ '/main/notification')
    .then(res => commit(
      "GET_ALL_NOTIFICATIONS",
      res.data
    ))
    .catch(err => commit(
      "GET_ALL_NOTIFICATIONS",
      {}
    ))
  },
  
  addNotification : ({commit}, newNotification) => {
    axios.post(Config.serverUrl + '/main/notification', newNotification)
    .then(res => commit(
      'ADD_NOTIFICATION',
      res.data
    ))
    .catch(err => commit(
      'GET_ERRORS',
      err.response.data
    ))
  },
  
  countNotifications : ({commit}) => {
    axios.get(Config.serverUrl + '/main/notification/counts/notifications')
    .then(res => commit(
      "COUNT_NOTIFICATIONS",
      res.data
    ))
  },
  
  getNotifications : ({commit}, number) => {
    commit('NOTIFICATION_LOADING');
    // store.dispatch(setNotificationLoading());
    axios.get(Config.serverUrl + `/main/notification/show/${number}`)
    .then(res => commit(
      "GET_NOTIFICATIONS",
      res.data
    ))
    .catch(err => commit(
      'GET_NOTIFICATIONS',
      {}
    ));
  },
  
  editNotification : ({commit}, data) => {
    axios.post(Config.serverUrl + `/main/notification/edit/${data.id}`,data.editData) 
    .then(res => commit(
      'EDIT_NOTIFICATION',
      res.data
    ))
    .catch(err => commit(
      "GET_ERRORS",
      err.response.data
    ))
  },
  
  deleteNotification : ({commit}, id) => {
    axios.delete(Config.serverUrl + `/main/notification/${id}`)
    .then(res => commit(
      "DELETE_NOTIFICATION",
      res.data
    ))
    .catch(err => window.alert(err.response.data.notAllowed));
  },
  
  setNotificationLoading : ({commit}) => {
    commit('NOTIFICATION_LOADING');
  },
  
  uploadHandle : ({commit}, file) => {
    //window.alert(file.name);
    console.log(file,'ffefefefefef');
    $("#sendmsgbtn").attr("disabled", true);
    $("#waitingModal").show();
    $("#bub1").addClass('fadeIn animated infinite');
    setTimeout(() => {
      $("#bub2").addClass('fadeIn animated infinite');
    },300);
    setTimeout(() => {
      $("#bub3").addClass('fadeIn animated infinite');
    },600);
    $('#upload').attr('disabled', true);
      let formData = new FormData();
      formData.append('file', file);
      let options = { headers: { 'Content-Type': 'multipart/form-data' } };
      axios.post(`${Config.serverUrl}/upload`,formData)
      .then(res => {
        $('#upload').attr('disabled', false);
        $("#bub1").removeClass('fadeIn animated infinite');
        $("#bub2").removeClass('fadeIn animated infinite');
        $("#bub3").removeClass('fadeIn animated infinite');
        $("#waitingModal").hide();
      });
      //console.log(`http://Localhost:5000/main/notification/upload/${this.state.file.name}`);
      // $.ajax({
      //   url:`${Config.serverUrl}/main/notification/upload/${file.name}`,
      //   type: 'POST',
      //   data: formData,
      //   async: true,
      //   processData: false,
      //   contentType: false,
      //   success: function(data) {
      //     console.log("killer", data);
      //   },
      //   error: function(xhr) {
      //     console.log("sdfdsf", xhr);
      //     window.alert(xhr.statusText);
      //     $('#upload').attr('disabled', false);
      //   },
      //   complete: function(xhr) {
      //     if(xhr.statusText === "OK")
      //     {
      //       $('#upload').attr('disabled', false);
      //       $("#bub1").removeClass('fadeIn animated infinite');
      //       $("#bub2").removeClass('fadeIn animated infinite');
      //       $("#bub3").removeClass('fadeIn animated infinite');
      //       $("#waitingModal").hide();
      //     }
      //   },
      //   beforeSend: function(xhr) {
      //     console.log("before send",xhr);
      //   },
      //   // dataFilter: function(data, type) {
      //   //   console.log(data, type);
      //   // }
      //   // xhr: function() {
      //   //   var xhr = new XMLHttpRequest();
      //   //   console.log('aaa')
  
      //   //   xhr.upload.addEventListener('progress', function(evt) {
            
      //   //     if(evt.lengthComputable) {
      //   //       var percentComplete = evt.loaded/evt.total;
      //   //       percentComplete = parseInt(percentComplete*100);
      //   //       if(percentComplete === 100) {
      //   //         window.alert("올리적재완료");
      //   //         $('#upload').attr('disabled', false);
      //   //       }
      //   //     }
      //   //   })
      //   // }
      // });
  },
  getAllQuesAns : ({commit}) => {
    commit('QUESTION_LOADING');
    axios.get(Config.serverUrl + '/main/quesandans/all')
    .then(res => commit(
      'GET_ALL_QUES_ANS',
      res.data
    ))
    .catch(err => commit(
      'GET_ALL_QUES_ANS',
      {}
    ))
  },
  
  addQuestion : ({commit}, question) => {
    console.log(question);
    axios.post(Config.serverUrl + '/main/quesandans', question)
    .then(res => commit(
      'ADD_QUESTION',
      res.data
    ))
    .catch(err => commit(
      'GET_ERRORS',
      err.response.data
    ));
  },
  
  addAnswer : ({commit}, data) => dispatch => {
    axios.post(Config.serverUrl + `/main/quesandans/${data.id}`, data.QuesAns)
    .then(res => commit(
      'ADD_ANSWER',
      res.data
    ))
    .catch(err => {
      commit(
        'GET_ERRORS',
        err.response.data
      )
    });
  },
  
  deleteQuestion : ({commit}, id) => {
    axios.delete(Config.serverUrl + `/main/quesandans/${id}`)
    .then(res => commit(
      'DELETE_QUESTION',
      id
    ))
    .catch(err => window.alert(err.response.data.notAllowed));
  },

  addArticle : ({commit}, data) => {
    axios.post(Config.serverUrl + '/main/eboard', data.newArticle)
    .then(res => data.route.push('/Main/Eboard/Article/1___'))
    .catch(errors => commit(
      'GET_ERRORS',
      errors.response.data
    ))
  },
  
  countArticles: ({commit}, searchedItem) => {
    console.log("countArticlesssss", searchedItem);
    if(searchedItem.handle.length == 0 && searchedItem.title.length == 0 &&       searchedItem.content.length == 0) {
      axios.get(Config.serverUrl + '/main/eboard/count/articles')
      .then(res => {console.log(res.data);commit(
        'COUNT_ARTICLES',
        res.data
      )})
    } else {
      // console.log(searchedItem);
      axios.post(Config.serverUrl + '/main/eboard/searched/count/articles', searchedItem)
      .then(res => commit(
        'COUNT_ARTICLES',
        res.data
      ))
    }
  },
  
  getAllDraftArticles : ({commit}) => {
    // dispatch(setEboardLoading);
    commit('ARTICLE_LOADING');
    axios.get(Config.serverUrl + '/main/eboard/draft')
    .then(res => commit(
      'GET_ALL_DRAFTARTICLES',
      res.data
    ))
    .catch(err => console.log(err));
  },
  
  getArticles : ({commit}, data) => {
    // dispatch(setEboardLoading);
    commit('ARTICLE_LOADING');
    if(data.searchedItem.handle.length == 0 && data.searchedItem.title.length == 0 && data.searchedItem.content.length == 0) {
      axios.get(Config.serverUrl + `/main/eboard/show/${data.number}`)
      .then(res => commit(
        'GET_ARTICLES',
        res.data
      ))
      .catch(err => console.log(err));
    } else {
      axios.post(Config.serverUrl + `/main/eboard/searched/show/${data.number}`, data.searchedItem)
      .then(res => commit(
        'GET_ARTICLES',
        res.data
      ))
      .catch(err => console.log(err));
      //window.alert(searchedItem.handle)
      //console.log(searchedItem);
    }
  },
  
  getArticle : ({commit}, id, history) => dispatch => {
    // dispatch(setEboardLoading);
    commit('ARTICLE_LOADING');
    axios.get(Config.serverUrl + `/main/eboard/${data.id}`)
    .then(res => commit(
      'GET_ARTICLE',
      res.data
    ))
    .catch(err => {
      window.alert(err.response.data.noarticle);
      data.route.push('/Main/Eboard');
    });
  },
  
  submitComment : ({commit}, data) => dispatch => {
    axios.post(Config.serverUrl + `/main/eboard/comment/${data.id}`, data.comment)
    .then(res => commit(
      'GET_COMMENTS',
      res.data
    ))
    .catch(err => {
      if(err.response.data.nocomment) {
        window.alert(err.response.data.nocomment)
      }
      if(err.response.data.notallowed) {
        window.alert(err.response.data.notallowed)
      }
      if(err.response.data.noarticle) {
        window.alert(err.response.data.noarticle);
      }
    });
  },
  
  allowArticle : ({commit}, id) => {
    axios.post(Config.serverUrl + `/main/eboard/allow/${id}`)
    .then(res => {
      commit(
        'GET_ARTICLE',
        res.data
      );
    })
    .catch(err => window.alert(err.response.data.notallowed));
  },
  
  agreeArticle : ({commit}, id) => {
    axios.post(Config.serverUrl + `/main/eboard/agree/${id}`)
    .then(res => {
      commit(
        'AGREE_ARTICLE',
        res.data
      )
    })
    .catch(err => commit(
      'GET_ERRORS',
      err.response.data
    ));
  },
  
  disagreeArticle : ({commit}, id) => {
    axios.post(Config.serverUrl + `/main/eboard/disagree/${id}`)
    .then(res => {
      commit(
        'DISAGREE_ARTICLE',
        res.data
      )
    })
    .catch(err => commit(
      'GET_ERRORS',
      err.response.data
    ));
  },
  
  deleteArticle : ({commit}, data) => {
    axios.delete(`/main/eboard/${data.id}`)
    .then(res => {
      // dispatch({
      //   type: DELETE_ARTICLE,
      //   payload: res.data
      // })
      data.route.push(`/Main/Eboard/Article/${data.url}`);
    })
    .catch(err => window.alert(err.response.data));
  },
  
  keepRecent : ({commit}, data) => {
    console.log(data);
    commit(
      'KEEP_RECENT',
      data,
    )
  }
  
}

export default actions;