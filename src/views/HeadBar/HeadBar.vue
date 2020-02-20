<template>
  <div class="headbar" :style="{'backgroud':themeColor}"
   :class="$store.state.app.collapse?'position-collapse-left':'pisition-left'">
    <!-- 导航收缩 -->
    <span class="hamburg">
      <el-menu class="el-menu-demo" :background-color="themeColor" text-color="#fff" :active-text-color="themeColor" mode="horizontal">
        <el-menu-item index="1" @click="onCollapse"><hamburger :is-active="collapse"></hamburger></el-menu-item>
      </el-menu>
    </span>
    <span class="navbar">
      <el-menu :default-active="activeIndex" class="el-menu-demo"
               :background-color="themeColor" text-color="#fff" active-text-color="#ffd04b" mode="horizontal" @select="selectNavBar()">
        <el-menu-item index="2" @click="openWindow('https://gitee.com/liuge1988/kitty')">{{$t('common.home')}}</el-menu-item>
        <el-menu-item index="3" @click="openWindow('https://gitee.com/liuge1988/kitty/wikis/Home')">文档</el-menu-item>
        <el-menu-item index="4" @click="openWindow('https://www.cnblogs.com/xifengxiaoma/')">博客</el-menu-item>
      </el-menu>
    </span>
    <span class="toolbar">
      <el-menu class="el-menu-demo" :background-color="themeColor" :text-color="themeColor" :active-text-color="themeColor" mode="horizontal">
        <el-menu-item index="1">
          <!-- 主题切换 -->
          <theme-picker class="theme-picker" :default="themeColor" @onThemeChange="onThemeChange"></theme-picker>
        </el-menu-item>
      </el-menu>
    </span>
  </div>
</template>
<script>
import Hamburger from '@/components/Hamburger'
import {mapState} from 'vuex'
import ThemePicker from '@/components/ThemePicker'
export default {
  components: {
    Hamburger,
    ThemePicker
  },
  computed: {
    ...mapState({
      themeColor: state => state.app.themeColor,
      collapse: state => state.app.collapse
    })
  },
  methods: {
    onCollapse: function () {
      this.$store.commit('onCollapse')
    },
    onThemeChange: function (themeColor) {
      this.$store.commit('setThemeColor', themeColor)
    }
  }
}
</script>
<style lang="scss">
.headbar {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1030;
  height: 60px;
  line-height: 60px;
  border-color: rgba(180, 190, 190, 0.8);
  border-left-width: 1px;
  border-left-style: solid;
}
.hamburg, .navbar{
  float: left;
 }
.toolbar {
  float: right;
}
.pisition-left{
  left: 200px;
}
.position-collapse-left{
  left: 65px;
}
</style>
