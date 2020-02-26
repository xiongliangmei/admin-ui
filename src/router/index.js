import Vue from 'vue'
import Router from 'vue-router'
import error from '@/views/404'
import Home from '@/views/Home'
import Login from '@/views/Login'
import api from '../http/api'
import store from '../store/index'
Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      children: [
      ]
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

//守卫路由
router.beforeEach((to, from, next) => {
  let isLogin = sessionStorage.getItem('user'); // 获取登录用户名
  if (to.path === '/login'){ // 如果是登录页面
     if (isLogin){ // 如果已经登录了,转发到首页
        next({path: '/'})
     }else {
       next()
     }
  }else { // 非登录页面,且用户没用登录
     if (!isLogin){
       next({path: '/login'})
     }else {
       // 加载动态菜单和路由
       addDynamicMenuAndRoutes()
       next()
     }
  }

})

function addDynamicMenuAndRoutes(){
     if (store.state.app.menuRouteLoaded){
       console.log("动态菜单和路由已经存在.")
       return
     }
     api.menu.findMenuTree().then((res)=>{
       let dynamicRoutes = addDynamicRoutes(res.data)
       router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
       router.addRoutes(router.options.routes);
       // 保存加载状态
       store.commit('menuRouteLoaded',true)
       store.commit('setNavTree',res.data)
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
  console.log("router",routes)
  return routes
}
export default router
