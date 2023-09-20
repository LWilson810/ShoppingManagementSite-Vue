import { IS_AUTHENTICATED } from './mutation-types';

const mutations = {
    [IS_AUTHENTICATED] ( state, payload ) {
        console.log( 'authenticated_mutation', payload );
        state.isAuthenticated = payload.isAuthenticated;
        state.userInfo = payload.userInfo;
    }
}

export default mutations;