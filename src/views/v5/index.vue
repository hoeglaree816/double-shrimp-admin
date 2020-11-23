<template>
  <div class="root">
    <el-col :span="24" class="header">
      <common-header></common-header>
    </el-col>
    <el-col :span="3" class="aside">
            <el-row class="title">专家问诊</el-row>
      <el-menu
        default-active="1"
        class="el-menu el-menu-vertical-demo"
        background-color="#003366"
        text-color="#BBBBBB"
        active-text-color="#fff"
        :collapse="collapse"
      >
        <router-link to="/v5">
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">欢迎</span>
          </el-menu-item>
        </router-link>
        <router-link to="/v5/s1" v-if="expertConsultation_post">
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">审核帖子</span>
          </el-menu-item>
        </router-link>
        <router-link to="/v5/s2" v-if="expertConsultation_expert">
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">审核专家</span>
          </el-menu-item>
        </router-link>
        <router-link to="/v5/s3" v-if="expertConsultation_reply">
          <el-menu-item index="4">
            <i class="el-icon-menu"></i>
            <span slot="title">审核回帖</span>
          </el-menu-item>
        </router-link>
        <router-link to="/v5/s4" v-if="expertConsultation_type">
          <el-menu-item index="5">
            <i class="el-icon-menu"></i>
            <span slot="title">类型管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/v5/s5" v-if="expertConsultation_type">
          <el-menu-item index="6">
            <i class="el-icon-menu"></i>
            <span slot="title">技术文章</span>
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
      expertConsultation_post:false,//审核帖子
      expertConsultation_expert:false,//审核专家
      expertConsultation_reply:false,//审核回帖
      expertConsultation_type:false,//专家类型
    };
  },
  components: {
    commonHeader: commonHeader
  },
  computed: {
    ...mapState(["menulist"]),
  },
  mounted() {
    document.querySelectorAll(".el-button")[5].style.color = "#fff";
    document.querySelectorAll(".el-button")[5].style.border= "3px solid #57F9E9";
    //拿到权限列表循环判断是否有权限，有则将对应权限字段至true
    this.menulist.forEach((item) => {
      if(item.name =="expertConsultation"){
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
