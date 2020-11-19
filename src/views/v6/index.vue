<template>
  <div class="root">
    <el-col :span="24" class="header">
      <common-header></common-header>
    </el-col>
    <el-col :span="3" class="aside">
      <el-row class="title">权限管理</el-row>
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
        :collapse="collapse"
      >
        <router-link to="/v6/welcome">
          <el-menu-item index="1">
            <i class="el-icon-menu ready"></i>
            <span class="ready" slot="title">欢迎</span>
          </el-menu-item>
        </router-link>
        <router-link to="/v6/s1" v-if="authority_user">
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/v6/s2" v-if="authority_role">
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">角色管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/v6/s3" v-if="authority_function">
          <el-menu-item index="4">
            <i class="el-icon-menu"></i>
            <span slot="title">权限管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/v6/s4" v-if="authority_admin">
          <el-menu-item index="5">
            <i class="el-icon-menu"></i>
            <span slot="title">管理员管理</span>
          </el-menu-item>
        </router-link>
        <!-- <el-menu-item
          :index="value.id"
          v-for="value in menu"
          :key="value.sort"
          @click="toRouter(value.sort)"
        >
          <i class="el-icon-menu"></i>
          <span slot="title">{{ value.remarks }}</span>
        </el-menu-item> -->
        <!-- <el-menu-item v-if="!isShow" index="1">
          <i class="el-icon-menu"></i>
          <span slot="title" >申请管理员</span>
        </el-menu-item> -->
        <!-- <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">1111</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-menu"></i>
          <span slot="title">3333</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">2222</span>
        </el-menu-item> -->
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
    return {
      collapse: false,
      //权限控制字段，用来控制对应侧边菜单栏菜单是否可用
      authority_user:false,//用户管理
      authority_role:false,//角色管理
      authority_function:false,//权限管理
      authority_admin:false,//管理员管理
    };
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
    document.querySelectorAll(".el-button")[6].style.color = "#fff";
    document.querySelectorAll(".el-button")[6].style.border= "3px solid #57F9E9";
    //拿到权限列表循环判断是否有权限，有则将对应权限字段至true
    this.menulist.forEach((item) => {
      if(item.name =="authority"){
        if(!item.children.length == 0){
          for(let i=0; i<item.children.length;i++){
          this[item.children[i].name] =true
          }
        }
      }
    });
  },
  computed: {
    ...mapState(["menulist"]),
    // menu:function(){//将权限和控制映射起来
    //   return {
    //     authority_user:this.authority_user,
    //     authority_role:this.authority_role,
    //     authority_function:this.authority_function,
    //     authority_admin:this.authority_admin
    //   }
    // }
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/v-lg.scss";
</style>
