// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from '@/plugin/vue-i18n'
import store from '@/store/index'
import Axios from '@/plugin/axios'
import '@/assets/css/app.less'
import Moment from 'moment'
import fun from '@/plugin/main'
// import { Upload } from 'element-ui'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import UserComponent from '@/components/index'
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(UserComponent)
Vue.use(VueQuillEditor)

//引用element上传组件
Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  let authorization = sessionStorage.getItem('authorization')
  if(to.path=='/'||to.path=='/news'||to.path=='/news/category'){
    if(!authorization){
      router.push({name:'Login',query:{random:Math.random()}})
    }
  }
  next()
})

//挂载js
Vue.prototype.$http = Axios
Vue.prototype.$fun = fun
//挂载时间
Vue.prototype.$moment = Moment

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  template: '<App/>',
  components: { App }
})
