import Vue from 'vue'
import Router from 'vue-router'
import error from '@/views/404'
import Home from '@/views/Home'
import Login from '@/views/Login'
import api from '../http/api'
import Cookies from 'js-cookie'
Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      children: []
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/404',
      name: '404',
      component: error
    }
  ]
})
router.beforeEach((to, from, next) => {
  // 登录界面登录成功之后，会把用户信息保存在会话
  // 存在时间为会话生命周期，页面关闭即失效。
  let token = Cookies.get('token')
  // let userName = sessionStorage.getItem('user')
  let userName = 'admin'
  if (to.path === '/login') {
    // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if (token) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (!token) {
      // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
      next({ path: '/login' })
    } else {
      // 加载动态菜单和路由
      addDynamicMenuAndRoutes(userName, to, from)
      next()
    }
  }
})
function addDynamicMenuAndRoutes (userName, to, from) {
     api.menu.findMenuTree().then((res) => {
       // 添加动态路由
       let dynamicRoutes = addDynamicRoutes(res.data)
       router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
       console.log("dynamicRoutes",dynamicRoutes)
       console.log("router",router)
       for (let i = 0; i <router.options.routes[0].children ; i++) {
           console.log(router.options.routes[0].children[i])
       }
     }).catch(function (e) {
        alert(e)
     })
}
function addDynamicRoutes (menuList = [], routes = []) {
  var  temp = []
  for (let i = 0; i < menuList.length; i++) {
     if (menuList[i].children && menuList[i].children.length >=1){
       temp = menuList[i].children;
     }else if (menuList[i].url  && /\S/.test(menuList[i].url) ){
       menuList[i].url = menuList[i].url.replace(/^\//, '')
       // 创建路由配置
      var route = {
        path: menuList[i].url,
        component: null,
         name: menuList[i].name,
         meta: {
           icon: menuList[i].icon,
           index: menuList[i].id
         }
       }
       try {
         // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
         // 如url="sys/user"，则组件路径应是"@/views/sys/user.vue",否则组件加载不到
         let array = menuList[i].url.split('/')
         let url = ''
         for(let i=0; i<array.length; i++) {
           url += array[i].substring(0,1).toUpperCase() + array[i].substring(1) + '/'
         }
         url = url.substring(0, url.length - 1)
         route['component'] = resolve => require([`@/views/${url}`], resolve)
       } catch (e) {}
       routes.push(route)
     }
  }
  if (temp.length >= 1) {
    addDynamicRoutes(temp, routes)
  }
  return routes
}
export default router
