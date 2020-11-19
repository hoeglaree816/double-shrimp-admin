<template>
  <div class="root">
    <el-col :span="24" class="header">
      <common-header></common-header>
    </el-col>
    <el-col :span="3" class="aside">
            <el-row class="title">电子商务</el-row>
      <el-menu
        default-active="1"
        class="el-menu el-menu-vertical-demo"
        background-color="#003366"
        text-color="#BBBBBB"
        active-text-color="#fff"
        :collapse="collapse"
      >
        <router-link to="/v4">
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">欢迎</span>
          </el-menu-item>
        </router-link>
        <router-link to="/v4/s1" v-if="ecommerce_commodity">
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">商品</span>
          </el-menu-item>
        </router-link>
        <router-link to="/v4/s2" v-if="ecommerce_merchant">
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">商铺</span>
          </el-menu-item>
        </router-link>
        <router-link to="/v4/s3" v-if="ecommerce_order">
          <el-menu-item index="4">
            <i class="el-icon-menu"></i>
            <span slot="title">订单</span>
          </el-menu-item>
        </router-link>
        <router-link to="/v4/s4" v-if="ecommerce_address">
          <el-menu-item index="5">
            <i class="el-icon-menu"></i>
            <span slot="title">收货地址</span>
          </el-menu-item>
        </router-link>
        <router-link to="/v4/s5" v-if="ecommerce_commodityType">
          <el-menu-item index="6">
            <i class="el-icon-menu"></i>
            <span slot="title">商品类别</span>
          </el-menu-item>
        </router-link>
        <router-link to="/v4/s6" v-if="ecommerce_comment">
          <el-menu-item index="7">
            <i class="el-icon-menu"></i>
            <span slot="title">商品评论</span>
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
      ecommerce_commodity:false,//商品管理
      ecommerce_merchant:false,//商铺管理
      ecommerce_order:false,//订单管理
      ecommerce_address:false,//地址管理
      ecommerce_commodityType:false,//类别管理
      ecommerce_comment:false,//评论管理
    };
  },
  components: {
    commonHeader: commonHeader
  },
  computed: {
    ...mapState(["menulist"]),
  },
  mounted() {
    document.querySelectorAll(".el-button")[4].style.color = "#fff";
    document.querySelectorAll(".el-button")[4].style.border= "3px solid #57F9E9";
    //拿到权限列表循环判断是否有权限，有则将对应权限字段至true
    this.menulist.forEach((item) => {
      if(item.name =="ecommerce"){
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
