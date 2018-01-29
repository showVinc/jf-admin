import NoMore from '@/components/No_data'
import Left_nav from '@/components/Left_nav'

// 导出组件
export default {
  install: function (Vue) {
    Vue.component('no-more', NoMore)    //  無數據的樣式
    Vue.component('left-nav', Left_nav)    //  公共左边导航栏
  }
}
