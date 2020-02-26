<template>
  <div class="menu-bar-container">
    <!--logo-->
    <div class="logo" :style="{'background-color':themeColor}" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'">
      <img v-if="collapse" src="@/assets/logo.png"> <div>{{collapse?'':appName}}</div>
    </div>
    <!--导航菜单-->
    <el-menu ref="navmenu" default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handleselect" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'"
             :collapse="collapse" :collapse-transition="false" :unique-opened="true">
      <MenuTree v-for="item in navTree" :key="item.id" :menu="item"></MenuTree>
    </el-menu>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import MenuTree from '../../components/MenuTree/index'
export default {
  components: {MenuTree},
  computed: {
    ...mapState({
      appName: state => state.app.appName,
      themeColor: state => state.app.themeColor,
      collapse: state => state.app.collapse,
      navTree: state=>state.menu.navTree
    })
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleselect (a, b) {
      console.log('handleselect')
    }
  }
}
</script>
<style lang="scss" scoped>
.menu-bar-container{
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  z-index: 1020;
  .el-menu{
    position: absolute;
    top: 60px;
    bottom: 0px;
    text-align: left;
  }
  .logo{
    position: absolute;
    top: 0px;
    height: 60px;
    line-height: 60px;
    background: #545c64;
    cursor: pointer;
    img{
      width: 40px;
      height: 40px;
      border-radius: 0px;
      margin: 10px 10px 10px 10px;
      float: left;
    }
    div{
      font-size: 40px;
      color: white;
      text-align: left;
      padding-left: 20px;
    }
  }
  .menu-bar-width {
    width: 200px;
  }
  .menu-bar-collapse-width{
    width: 65px;
  }
}
</style>
