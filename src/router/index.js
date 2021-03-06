import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'

Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      redirect: '/news',
      component: Index
    },
    {
      path: '/build',
      name: 'Build',
      component: resolve=>require(['@/components/Build'],resolve)
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve=>require(['@/pages/Login/Login'],resolve)
    },
    //新闻类
    {
      path: '/news',
      name: 'News',
      component: resolve=>require(['@/pages/News/Index'],resolve)
    },
    {
      path: '/news/add',
      name: 'NewsAdd',
      component: resolve=>require(['@/pages/News/Add'],resolve)
    },
    {
      path: '/news/category',
      name: 'NewsCategory',
      component: resolve=>require(['@/pages/News/Category'],resolve)
    },
    {
      path: '/news/categoryList',
      name: 'NewsCategoryList',
      component: resolve=>require(['@/pages/News/CategoryList'],resolve)
    },
    {
      path: '/news/crawler',
      name: 'NewsCrawler',
      component: resolve=>require(['@/pages/News/Crawler'],resolve)
    },
    //用户类
    {
      path: '/user',
      name: 'User',
      component: resolve=>require(['@/pages/User/Index'],resolve)
    },
    {
      path: '/user/password',
      name: 'UserPassword',
      component: resolve=>require(['@/pages/User/Password'],resolve)
    },
    {
      path: '/user/identify',
      name: 'UserIdentify',
      component: resolve=>require(['@/pages/User/Identify'],resolve)
    },
    //问卷管理
    {
      path: '/questionnaire',
      name: 'questionnaire',
      component: resolve=>require(['@/pages/Questionnaire/Index'],resolve)
    },
    {
      path: '/questionnaire/add',
      name: 'questionnaireAdd',
      component: resolve=>require(['@/pages/Questionnaire/Add'],resolve)
    },
    {
      path: '/questionnaire/score',
      name: 'Score',
      component: resolve=>require(['@/pages/Questionnaire/Score'],resolve)
    },
    {
      path: '/questionnaire/scoreAdd',
      name: 'ScoreAdd',
      component: resolve=>require(['@/pages/Questionnaire/ScoreAdd'],resolve)
    },
  ]
})
