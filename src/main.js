import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './router'
import store from './store/index'
import Element from 'element-ui'
import mongoose from 'mongoose'
import 'element-ui/lib/theme-chalk/index.css'
import * as filters from '@/filters'
// import "bootstrap/dist/css/bootstrap.min.css";
// import "animate.css/animate.min.css";
import "ant-design-vue/dist/antd.css"
import "./styles.less"
import { mockXHR } from '../mock'

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
  console.log('mock server')
  mockXHR()
}


Vue.config.productionTip = false
export const bus = new Vue();

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Element, {
  size: 'medium' // set element-ui default size
})

Object.keys(filters).map(key => {
  Vue.filter(key, filters[key]);
})
// Vue.filter('uppercase', (value) => {
//   return value.toUpperCase();
// })


// const router = new VueRouter({
//   routes: Routes,
//   mode: 'hash'
// });
//Filters

// Vue.filter('snippet', function(value){
//   return value.slice(0, 100) + '...'
// });

// Vue.directive('rainbow',{
//   bind(el, binding, vnode){
//     el.style.color = "#" + Math.random.toString().slice(2,8);
//   }
// })

// Vue.directive('theme',{
//   bind(el, binding, vnode) {
//     if(binding.value == 'wide'){
//       el.style.maxWidth = "1200px";
//     } else if(binding.value == 'narrow'){
//       el.style.maxWidth = "560px";
//     }
//     if(binding.arg == 'column'){
//       el.style.background = '#ddd';
//       el.style.padding = '20px';
//     }
//   }
// })
new Vue({ 
  render: h => h(App),
  router: Routes,
  store: store
}).$mount('#app')
