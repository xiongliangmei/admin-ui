export default {
  state: {
    appName: 'Kitty Platform',
    themeColor: '#14889A', // 主题颜色
    oldThemeColor: '#14889A', // 上一次主题颜色
    collapse: false, // 导航栏状态
    menuRouteLoaded: false // 菜单和路由是否已经加装
  },
  getters: {
    collapse (state) { // 改变状态
      return state.collapse
    }
  },
  mutations: {
    setThemeColor (state, themeColor) { // 改变主题颜色
      state.oldThemeColor = state.oldThemeColor
      state.themeColor = themeColor
    },
    menuRouteLoaded( state, menuRouteLoaded) {
      state.menuRouteLoaded = menuRouteLoaded
    }
  },
  actions: {
  }
}
