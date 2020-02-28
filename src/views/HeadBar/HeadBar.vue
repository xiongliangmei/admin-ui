<template>
  <div class="headbar" :style="{'background':themeColor}"
   :class="$store.state.app.collapse?'position-collapse-left':'position-left'">
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
    <span class="tool-bar">
       <!--主题切换-->
       <ThemePicker class="theme-picker" :default="themeColor" @onThemeChange="onThemeChange"></ThemePicker>
       <!--语言切换-->
       <LangSelector class="lang-selector"></LangSelector>
       <!--用户信息-->
        <el-dropdown class="user-info-dropdown" trigger="hover">
          <span class="el-dropdown-link"><img :src="this.userAvatar" /> {{username}}</span>
          <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>{{$t("common.myMsg")}}</el-dropdown-item>
          <el-dropdown-item>{{$t("common.config")}}</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">{{$t("common.logout")}}</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
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
      langVisible: false,
      username: "Louis",
      userAvatar: "http://static.ss-clouddoctor.com/img/20190723/1735045946.png",
      sysName: ""
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
    handleCommand(command) {
      command === '' ? 'zh_cn' : command
      this.$i18n.locale = command
      this.$message('换肤成功');
    }
  },
  mounted() {
     this.sysName = 'I like Kitty'
     let user = sessionStorage.getItem('username')
     if (user){
       this.username = user
       this.userAvatar = require("@/assets/user.png");
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
  .tool-bar {
    float: right;
    .theme-picker {
      padding-right: 10px;
    }
    .lang-selector {
      padding-right: 10px;
      font-size: 15px;
      color: #fff;
      cursor: pointer;
    }
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
  .user-info-dropdown {
    font-size: 20px;
    padding-right: 20px;
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
