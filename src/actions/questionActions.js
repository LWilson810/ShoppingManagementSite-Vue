import {GET_ALL_QUES_ANS, QUESTION_LOADING, ADD_QUESTION, DELETE_QUESTION, GET_ERRORS,ADD_ANSWER} from './types'
import axios from 'axios'

export const getAllQuesAns = () => dispatch  => {
  dispatch(setQuestionLoading);
  axios.get('/main/quesandans/all')
  .then(res => dispatch({
    type: GET_ALL_QUES_ANS,
    payload: res.data
  }))
  .catch(err => dispatch({
    type: GET_ALL_QUES_ANS,
    payload: {}
  }))
}

export const addQuestion = (question) => dispatch => {
  console.log(question);
  axios.post('/main/quesandans', question)
  .then(res => dispatch({
    type: ADD_QUESTION,
    payload: res.data
  }))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }));
}

export const addAnswer = (QuesAns, id) => dispatch => {
  axios.post(`/main/quesandans/${id}`, QuesAns)
  .then(res => dispatch({
    type: ADD_ANSWER,
    payload: res.data
  }))
  .catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  });
}

export const deleteQuestion = (id) => dispatch => {
  axios.delete(`/main/quesandans/${id}`)
  .then(res => dispatch({
    type: DELETE_QUESTION,
    payload: id
  }))
  .catch(err => window.alert(err.response.data.notAllowed));
}

export const setQuestionLoading = () => {
  return {
    type: QUESTION_LOADING,
  }
}