/** When your routing table is too long, you can split it into small modules**/

import Dashboard from './layout/layout';
import StaffManage from '@/components/staff-manage/layout/staff-manage'
import store from '@/store/index';

const home = {	template:	"<div>Welcome	to	Choppy's</div>"	}

const mainRouter = [{
  path: '/dashboard',
  component: Dashboard,
  name: 'Dashboard',
  meta: {
    title: 'Dashboard',
  },
  beforeEnter(to, from , next) {
    if( !localStorage.authToken ) {
      next('/');
      store.dispatch('isAuthenticate', {});
    } else {
      next();
    }
  },
}, {
  path: '/dashboard/staff-manage',
  component: StaffManage,
  name: 'staff-manage',
  meta: { title: 'Staff Manage', noCache: true },
  beforeEnter(to, from , next) {
    if( !localStorage.authToken ) {
      next('/');
      store.dispatch('isAuthenticate', {});
    } else {
      next();
    }
  }
}]

export default mainRouter