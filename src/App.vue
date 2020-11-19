<template>
  <router-view />
</template>

<script>
import { initDynamicRoutes } from "../src/router/index.js";//引入动态添加路由函数
export default {
  name: "App",
  created() {
    //根据权限动态加载路由规则
    initDynamicRoutes();//调用动态添加路由函数
  }
};
</script>

<style lang="scss">
@import "@/scss/base.scss";
</style>
