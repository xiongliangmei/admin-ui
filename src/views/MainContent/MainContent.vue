<template>
  <div class="main-container" :class="collapse?'position-collapse-left':'position-left'">
    <!-- 标签页 -->
    <div style="clear: both;background: #8c939d; width: 100%">
      <el-tabs  class="tabs" v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" style="width: 100%">
        <el-dropdown class="tabs-tools" :show-timeout="0" trigger="hover">
          <div style="font-size:20px;width:50px; text-align: center"><i class="el-icon-arrow-down"></i></div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item  @click="addTab(editableTabsValue)">添加</el-dropdown-item>
            <el-dropdown-item @click.native="tabsCloseCurrentHandle">关闭当前标签</el-dropdown-item>
            <el-dropdown-item @click.native="tabsCloseOtherHandle">关闭其它标签</el-dropdown-item>
            <el-dropdown-item @click.native="tabsCloseAllHandle">关闭全部标签</el-dropdown-item>
            <el-dropdown-item @click.native="tabsRefreshCurrentHandle">刷新当前标签</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-tab-pane
          v-for="item in mainTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
          <span slot="label"><i :class="item.icon"></i>{{item.title}}</span>
        </el-tab-pane>
      </el-tabs>
    </div>
    <keep-alive>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </keep-alive>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
export default {
  name: 'Main',
  data () {
    return {

    }
  },
  watch: {
    $route: 'handleRoute'
  },
  created () {
    this.handleRoute(this.$route)
  },
  computed: {
    ...mapState({
      collapse: state => state.app.collapse
    }),
    mainTabs: {
      get() { return this.$store.state.tab.mainTabs},
      set (val) { this.$store.commit('updateMainTabs',val)}
    }
  },
  methods: {
    handleRoute(route) {
      var tab = this.mainTabs.filter(item => item.name === route.name)[0]
      if (!tab){
        tab = {
          name: route.name,
          title: route.name,
          icon: route.meta.icon
        }
        this.mainTabs = this.mainTabs.concat(tab)
      }
      this.mainTabsActiveName = tab.name
      // 切换标签页时同步更新高亮菜单
      if(this.$refs.navmenu != null) {
        this.$refs.navmenu.activeIndex = '' + route.meta.index
        this.$refs.navmenu.initOpenedMenu()
      }
    },
    addTab(targetName) {
      let newTabName = ++this.tabIndex + '';
      this.editableTabs.push({
        title: '',
        name: newTabName,
        content: 'New Tab content'
      });
      this.editableTabsValue = newTabName;
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    }
  }
}
</script>
<style lang="scss" scoped>
  .main-container {
    position: absolute;
    padding: 10px 5px 5px 0px;
    position: absolute;
    top: 60px;
    left: 1px;
    right: 1px;
    bottom: 0px;
    .tabs {
      position: fixed;
      top: 60px;
      padding-left: 0px;
      padding-right: 2px;
      z-index: 1020;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      background: rgb(255, 254, 255);
      border-color: rgba(200, 206, 206, 0.5);
      // border-left-width: 1px;
      // border-left-style: solid;
      border-bottom-width: 1px;
      border-bottom-style: solid;
    }
    .tabs-tools {
      position: fixed;
      top: 60px;
      right: 0;
      z-index: 1020;
      height: 40px;
      // padding: 0 10px;
      font-size: 14px;
      line-height: 40px;
      cursor: pointer;
      border-color: rgba(200, 206, 206, 0.5);
      border-left-width: 1px;
      border-left-style: solid;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      background: rgba(255, 255, 255, 1);
    }
    .tabs-tools:hover {
      background: rgba(200, 206, 206, 1);
    }
  }
  .position-left {
    left: 200px !important;
  }
  .position-collapse-left {
    left: 65px !important;
  }
</style>
