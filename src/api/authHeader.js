import axios from 'axios';

export const jsonHeaderRequest = () => {
    axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.defaults.headers.common['Accept'] = 'application/json';
    return axios;
}

export const authJsonHeaderRequest = () => {
    axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.defaults.headers.common['Accept'] = 'application/json';
    // console.log(localStorage.getItem('authToken'));
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('authToken');
    return axios;
}