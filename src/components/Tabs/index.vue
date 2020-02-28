<template>
  <el-tabs  class="tabs" v-model="editableTabsValue" type="card" closable @tab-clik="selectedTabHandle" @tab-remove="removeTabHandle">
    <el-dropdown class="tabs-tools" :show-timeout="0" trigger="hover">
      <div style="font-size:20px;width:50px; text-align: center"><i class="el-icon-arrow-down"></i></div>
      <el-dropdown-menu class="tabs-tools" :show-time="0" trigger="hover">
        <el-dropdown-item  @click="addTab(editableTabsValue)">添加</el-dropdown-item>
        <el-dropdown-item @click.native="tabsCloseCurrentHandle">关闭当前标签</el-dropdown-item>
        <el-dropdown-item @click.native="tabsCloseOtherHandle">关闭其它标签</el-dropdown-item>
        <el-dropdown-item @click.native="tabsCloseAllHandle">关闭全部标签</el-dropdown-item>
        <el-dropdown-item @click.native="tabsRefreshCurrentHandle">刷新当前标签</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-tab-pane
      v-for="(item, index) in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    // tabs, 选中tab
    selectedTabHandle (tab){
    }
  }
}
</script>
