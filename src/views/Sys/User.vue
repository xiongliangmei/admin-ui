<template>
 <div>
   用户管理
 </div>
</template>
<script>
  export default {
    data() {
      return {
        editableTabsValue: '2',
        editableTabs: [{
          title: '用户管理',
          name: '用户管理',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex: 2
      }
    },
    computed: {
    },
    methods: {
    }
  }
</script>
<style lang="scss">
</style>
