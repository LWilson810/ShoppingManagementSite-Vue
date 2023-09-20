import * as authHeaderService from './authHeader';
import * as NotificationService from '@/service/notification';

export const jsonPost = (url, data, config) => {
    const httpPointer = authHeaderService.jsonHeaderRequest();
    return httpPointer.post(url, data, config)
    .then(res => {
        // console.log(res.data);
        if (res.data.message) {
            console.log(res.data.message);
            NotificationService.notification(res.data.message, 'success');
        }
        return res.data.data;
    })
    .catch(err => {
        // const html = '<div class="container"><div class="row"><div class="col-1 left"><div class="success-icon"></div></div><div class="col-9 right"><div><div class="title">' + 'Error' + '</div><div class="description">' + err.response.data.text + '</div></div></div></div></div>';
        NotificationService.notification(err.response.data.text || 'Internal Server Error', 'error');
    })
}

export const authJsonPost = (url, data, config) => {
    const httpPointer = authHeaderService.authJsonHeaderRequest();
    return httpPointer.post(url, data, config)
    .then(res => {
        if(res.data.message) {
            console.log(res.data.message);
            NotificationService.notification(res.data.message, 'success')
        }
        return res.data.data;
    })
    .catch(err => {
        NotificationService.notification(err.response.data.text || 'Internal Server Error', 'error');
    })
}

export const authJsonGet = (url, config) => {
    const httpPointer = authHeaderService.authJsonHeaderRequest();
    return httpPointer.get(url, config)
    .then(res => {
        if(res.data.message) {
            console.log(res.data.message);
            NotificationService.notification(res.data.message, 'success')
        }
        return res.data.data;
    })
    .catch(err => {
        NotificationService.notification(err.response.data.text || 'Internal Server Error', 'error');
    })
}
