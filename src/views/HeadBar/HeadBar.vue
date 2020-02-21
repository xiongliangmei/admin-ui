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
        <el-menu-item index="2" @click="openWindow('https://gitee.com/liuge1988/kitty')">{{$t("common.doc")}}</el-menu-item>
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
          <el-menu-item index="2" >
          <!-- 语言切换 -->
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link" style="color: white">
                语言<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="zh_cn">简体中文</el-dropdown-item>
                <el-dropdown-item command="en_us">English</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </el-menu-item>
      </el-menu>
    </span>
  </div>
</template>
<script>
import Hamburger from '@/components/Hamburger'
import {mapState} from 'vuex'
import ThemePicker from '@/components/ThemePicker'
import LangSelector from '@/components/LangSelector'
export default {
  components: {
    Hamburger,
    ThemePicker,
    LangSelector
  },
  data () {
    return {
      langVisible: false
    }
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
    },
    // 语言切换
    changeLanguage (lang) {
      lang === '' ? 'zh_cn' : lang
      this.$i18n.locale = lang
      this.langVisible = false
    },
    handleCommand(command) {
      command === '' ? 'zh_cn' : command
      this.$i18n.locale = command
      this.$message('click on item ' + command);
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
  .hamburg, .navbar {
    float: left;
  }
  .toolbar {
    float: right;
  }
  .lang-item {
    font-size: 16px;
    padding-left: 8px;
    padding-top: 8px;
    padding-bottom: 8px;
    cursor: pointer;
  }
  .lang-item:hover {
    font-size: 18px;
    background: #b0d6ce4d;
  }
  .user-info {
    font-size: 20px;
    color: #fff;
    cursor: pointer;
    img {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      margin: 10px 0px 10px 10px;
      float: right;
    }
  }
  .badge {
    line-height: 18px;
  }
  .position-left {
    left: 200px;
  }
  .position-collapse-left {
    left: 65px;
  }
</style>
