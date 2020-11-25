<template>
  <div class="root">
    <el-col :span="24" class="header">
      <common-header></common-header>
    </el-col>
    <el-col :span="3" class="aside">
      <el-row class="title">企业管理</el-row>
      <el-row class="tac">
        <el-col :span="24">
          <el-menu
            default-active="1"
            class="el-menu el-menu-vertical-demo"
            background-color="#003366"
            text-color="#BBBBBB"
            active-text-color="#fff"
          >
            <router-link to="/v1">
              <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">欢迎</span>
              </el-menu-item>
            </router-link>
            <router-link to="/v1/s1" v-if="enterprise_enterprise">
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">基地管理</span>
              </el-menu-item>
            </router-link>
          </el-menu>
        </el-col>
      </el-row>
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
      //权限控制字段，用来控制对应侧边菜单栏菜单是否可用
      enterprise_enterprise:false,//基地管理
    };
  },
  components: {
    commonHeader: commonHeader,
  },
  computed: {
    ...mapState(["menulist"]),
  },
  mounted() {
    document.querySelectorAll(".el-button")[2].style.color = "#fff";
    document.querySelectorAll(".el-button")[2].style.border ="3px solid #57F9E9";
    //拿到权限列表循环判断是否有权限，有则将对应权限字段至true
    this.menulist.forEach((item) => {
      if(item.name =="enterprise"){
        if(!item.children.length == 0){
          for(let i=0; i<item.children.length;i++){
          this[item.children[i].name] =true
          }
        }
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/v-lg.scss";
</style>
