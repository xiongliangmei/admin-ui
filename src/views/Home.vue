<template>
  <div class="page">
    <h2>Home Page</h2>
    <el-button type="primary" @click="testAxios()">测试axios 调用</el-button>
    <el-button type="primary" @click="testAxios2()">测试axios 调用</el-button>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Home',
  methods: {
    testAxios () {
      axios.get('localhost:8080/user').then(function (res) {
        console.log(res.data)
      }).catch(function (res) {
        alert(res)
      })
    },
    testAxios2 () {
      axios.get('localhost:8080/menu').then(function (res) {
        console.log(res.data)
      }).catch(function (res) {
        alert(res)
      })
    }
  }
}
</script>
