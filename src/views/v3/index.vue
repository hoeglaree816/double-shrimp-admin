<template>
  <div class="root">
    <el-col :span="24" class="header">
      <common-header></common-header>
    </el-col>
    <el-col :span="3" class="aside">
            <el-row class="title">远程教育</el-row>
      <el-menu
        default-active="1"
        class="el-menu el-menu-vertical-demo"
        background-color="#003366"
        text-color="#BBBBBB"
        active-text-color="#fff"
        :collapse="collapse"
      >
        <router-link to="/v3">
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">欢迎</span>
          </el-menu-item>
        </router-link>
        <router-link to="/v3/s1" v-if="education_course">
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">远程教育</span>
          </el-menu-item>
        </router-link>
        <router-link to="/v3/s2" v-if="education_courseCategory">
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">渔技文章</span>
          </el-menu-item>
        </router-link>
        <router-link to="/v3/s3" >
          <el-menu-item index="4">
            <i class="el-icon-menu"></i>
            <span slot="title">演示文稿</span>
          </el-menu-item>
        </router-link>
        <router-link to="/v3/s4" >
          <el-menu-item index="5">
            <i class="el-icon-menu"></i>
            <span slot="title">知识产权</span>
          </el-menu-item>
        </router-link>
        <router-link to="/v3/s5" >
          <el-menu-item index="5">
            <i class="el-icon-menu"></i>
            <span slot="title">类型管理</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-col>
    <el-col :span="21" class="main">
      <router-view />
    </el-col>
  </div>
</template>

<script>
import { mapState } from "vuex";
import commonHeader from "@/components/common-header";
export default {
  data() {
    return {
      collapse: false,
      //权限控制字段，用来控制对应侧边菜单栏菜单是否可用
      education_course:false,//课程管理
      education_courseCategory:false,//课程类别
    };
  },
  components: {
    commonHeader: commonHeader
  },
  computed: {
    ...mapState(["menulist"]),
  },
  mounted() {
    document.querySelectorAll(".el-button")[3].style.color = "#fff";
    document.querySelectorAll(".el-button")[3].style.border= "3px solid #57F9E9";
    //拿到权限列表循环判断是否有权限，有则将对应权限字段至true
    this.menulist.forEach((item) => {
      if(item.name =="education"){
        if(!item.children.length == 0){
          for(let i=0; i<item.children.length;i++){
          this[item.children[i].name] =true
          }
        }
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/v-lg.scss";
</style>
