<template>
  <div class="root">
    <el-col :span="24" class="header">
      <common-header></common-header>
    </el-col>
    <el-col :span="3" class="aside">
      <el-row class="title">数据管理</el-row>
      <!-- <el-menu
        default-active="1"
        class="el-menu el-menu-vertical-demo"
        background-color="#333"
        text-color="#BBBBBB"
        active-text-color="#82aae1"
        :collapse="collapse"
      >
        <router-link to="/v6">
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">用户信息</span>
          </el-menu-item>
        </router-link>
        <router-link to="/v6/s2">
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">角色信息</span>
          </el-menu-item>
        </router-link>
        <router-link to="/v6/s3">
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">权限菜单</span>
          </el-menu-item>
        </router-link>       
        <router-link to="/v6/s4">
          <el-menu-item index="4">
            <i class="el-icon-menu"></i>
            <span slot="title">授权菜单</span>
          </el-menu-item>
        </router-link> 
      </el-menu> -->
      <el-menu
        default-active="1"
        class="el-menu el-menu-vertical-demo"
        background-color="#003366"
        text-color="#BBBBBB"
        active-text-color="#fff"
      >
        <router-link to="/v7/welcome">
          <el-menu-item index="1">
            <i class="el-icon-menu ready"></i>
            <span class="ready" slot="title">欢迎</span>
          </el-menu-item>
        </router-link>
        <router-link to="/v7/s1">
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">产业信息管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/v7/s2">
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">价格信息管理</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-col>
    <el-col :span="21" class="main">
      <!-- <router-view /> 显示当前路由匹配到的内容的显示位置 -->
      <router-view />
    </el-col>
  </div>
</template>

<script>
import { mapState } from "vuex";
import commonHeader from "@/components/common-header";
export default {
  data() {
    return {};
  },
  components: {
    commonHeader: commonHeader,
  },
  methods: {
    // toRouter(sort) {
    //   this.$router.push(`/v6/s${sort}`);
    // },
  },
  mounted() {
    document.querySelectorAll(".el-button")[8].style.color = "#fff";
    document.querySelectorAll(".el-button")[8].style.border =
      "3px solid #57F9E9";
    //拿到权限列表循环判断是否有权限，有则将对应权限字段至true
    this.menulist.forEach((item) => {
      if (item.name == "dataPresentation") {
        if (!item.children.length == 0) {
          for (let i = 0; i < item.children.length; i++) {
            this[item.children[i].name] = true;
          }
        }
      }
    });
  },
  computed: {
    ...mapState(["menulist"]),
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/v-lg.scss";
</style>
