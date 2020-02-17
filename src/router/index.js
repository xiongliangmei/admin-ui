import Vue from 'vue'
import Router from 'vue-router'
import error from '@/views/404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/404',
      name: '404',
      component: error
    }
  ]
})
