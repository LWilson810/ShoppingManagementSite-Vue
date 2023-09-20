import Vue from 'vue'
import Router from 'vue-router'
import page404 from '@/components/shared/page404'

import LockScreenComponent from '@/components/LockScreenComponent';

import PrivateComponent from '@/components/PrivateComponent';

import store from '../store';
import jwt_decode from 'jwt-decode';
import setAuthToken from '@/utils/setAuthToken'; 
import authRouter from '@/components/auth/router';
import mainRouter from '@/components/dashboard/router';

// Vue.use(Router)
function authenticate (next) {
  if(localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.commit('SET_CURRENT_USER', decoded);
    //[Authorization] 에 token 을 지정해주고 user와 isAuthenticated를 설정,,
    console.log(store.state);
    //token의 유효성검사
    const currentTime = Date.now()/1000;
    if(decoded.exp < currentTime) {
      store.dispatch('logoutUser');
      window.location.href = "/";
    } 
  }
  if(store.state.isAuthenticated) {
    if(jwt_decode(localStorage.jwtToken).locked) {
      next('/LockScreen');
    } else {
      next(); 
    }
  } else {
    next('/Login');
  }
}

function configRoutes () {
  return [
    authRouter,
    ...mainRouter,
    {
      path:'*',
      component: page404
    }
    // {
    //   path: '/',
    //   name: 'Home',
    //   component: Home,
    //   beforeEnter(to, from , next) {
    //     if(localStorage.jwtToken && jwt_decode(localStorage.jwtToken).locked) {
    //       next('/LockScreen');
    //     } else {
    //       next();
    //     }
    //   }
    // }, 
  ]
}

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

Vue.use(Router);



export default router;

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })
