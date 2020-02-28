import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import menu from './modules/menu'
import tab from './modules/tab'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app: app,
    menu: menu,
    tab: tab
  }
})
export default store
