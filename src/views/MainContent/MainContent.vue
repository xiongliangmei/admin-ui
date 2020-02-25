<template>
  <div class="main-container" :class="collapse?'position-collapse-left':'position-left'">
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
  computed: {
    ...mapState({
      collapse: state => state.app.collapse
    })
  },
}
</script>
<style lang="scss" scoped>
  .main-container {
    position: absolute;
    padding: 10px 5px 5px 10px;
    position: absolute;
    top: 60px;
    left: 1px;
    right: 1px;
    bottom: 0px;
  }
  .position-left {
    left: 200px !important;
  }
  .position-collapse-left {
    left: 65px !important;
  }
</style>
