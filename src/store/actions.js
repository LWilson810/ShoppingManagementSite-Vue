import { IS_AUTHENTICATED } from './mutation-types';
import jwt_decode from 'jwt-decode';
import isEmpty from '../validation/is-empty';

export default {
    isAuthenticate({ commit }, data ) {
        let payload;
        if( isEmpty(data) ) {
            payload = {
                isAuthenticated: false,
                userInfo: {}
            }
        } else {
            payload = {
                isAuthenticated: true,
                userInfo: jwt_decode(data)
            }
        }
        commit(IS_AUTHENTICATED, payload)
    }
}