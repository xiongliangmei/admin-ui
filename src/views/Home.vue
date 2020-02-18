<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <!--侧边栏目-->
      <el-col :span="5" class="logo" :class="isCollapse?'logo-collapse-width':'logo-width'">
        <img :src="this.logo" /> {{isCollapse?sysName:sysName}}
      </el-col>
    </el-col>
  </el-row>
</template>
