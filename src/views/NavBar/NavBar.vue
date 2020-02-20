<template>
  <div class="menu-bar-container">
    <!--logo-->
    <div class="logo" :style="{'backgroud-color':themeColor}" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'">
      <img v-if="collapse" src="@/assets/logo.png"> <div>{{collapse?'':appName}}</div>
    </div>
    <!--导航菜单-->
    <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handleselect" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'"
             :collapse="isCollapse" :collapse-transition="false" :unique-opened="true">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      appName: state => state.app.appName,
      themeColor: state => state.app.themeColor,
      collapse: state => state.app.collapse
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
