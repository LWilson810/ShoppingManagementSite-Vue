import * as httpHelperService from '@/api/httpHelper';
import jwt_decode from 'jwt-decode';
import Config from '@/utils/config';
// import store from '@/store/index';

const signInApi = Config.serverUrl + 'api/users/signin';
const signOutApi = Config.serverUrl + 'api/users/signout';

export const signIn = async ( data, router, store ) => {
    // console.log(data);   
    const response = await httpHelperService.jsonPost( signInApi, data );
    // const response = this.$http.post( signInApi, data );
    
    if( response ) {
        store.dispatch('isAuthenticate', response.token);
        localStorage.setItem('authToken', 'Bearer ' + response.token);
        router.push('/dashboard');
    }
    // console.log(store.state);
    
    // return response;
}

export const signOut = async ( data, router, store ) => {
    const response = await httpHelperService.authJsonPost( signOutApi, data );
    if( response ) {
        localStorage.removeItem('authToken');
        store.dispatch('isAuthenticate', {});
        router.push('/');
    }
    
}

export const getUserID = () => {
    if(localStorage.getItem('authToken') != null)
      return jwt_decode(localStorage.getItem('authToken')).userID;
    else 
      return null;
}