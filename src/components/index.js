import Head from '@/components/Head_public'
import Foot from '@/components/Foot_public'
import Like from '@/components/Like_public'
import Nav from '@/components/Nav_public'
import NoMore from '@/components/No_data'

// 导出组件
export default {
  install: function (Vue) {
    Vue.component('head-public', Head)    //  公共头部
    Vue.component('foot-public', Foot)    //  公共底部
    Vue.component('like-public', Like)    //  公共手錶
    Vue.component('nav-public', Nav)    //  公共導航
    Vue.component('no-more', NoMore)    //  無數據的樣式
  }
}
