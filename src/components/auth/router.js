/** When your routing table is too long, you can split it into small modules**/

import SignIn from './sign-in/sign-in';
import Home from '@/components/Home/home';
import store from '@/store/index'

const authRouter = {
  path: '/',
  component: SignIn,
//   redirect: 'noRedirect',
  name: 'SignIn',
  meta: {
    title: 'SignIn',
    icon: 'chart'
  },
  beforeEnter(to, from , next) {
    // store.dispatch('isAuthenticate', localStorage.authToken)
    if( localStorage.authToken ) {
      next('/dashboard');
    } else {
      store.dispatch('isAuthenticate', {});
      next();
    }
  },
//   children: [
//     {
//       path: 'keyboard',
//       component: () => import('@/views/charts/keyboard'),
//       name: 'KeyboardChart',
//       meta: { title: 'Keyboard Chart', noCache: true }
//     },
//     {
//       path: 'line',
//       component: () => import('@/views/charts/line'),
//       name: 'LineChart',
//       meta: { title: 'Line Chart', noCache: true }
//     },
//     {
//       path: 'mix-chart',
//       component: () => import('@/views/charts/mix-chart'),
//       name: 'MixChart',
//       meta: { title: 'Mix Chart', noCache: true }
//     }
//   ]
}

export default authRouter