<template>
<!-- 欢迎管理员进入后台系统页面 -->
  <div class="root">
    <el-col :span="24" class="header">
      <common-header></common-header>
    </el-col>
    <div class="main">
      <el-col :span="6">
      <div class="row-null"></div>
      </el-col>
      <el-col :span="12" class="form-col">
        <div class="row-null"></div>
        <el-card class="box-card" shadow="hover" body-style="border-top:1px solid #003366;">
          <div slot="header">
            <span>
              欢迎
              <span style=" display:inline;color:#57F9E9">！</span>
              <span style=" display:inline;color:#E6A23C">！</span>
              <span style=" display:inline;color:#003366">！</span>
            </span>
          </div>
          <div class="box-card-divII">
            <div>
              <el-avatar :size="150" :src="imgUrl" alt="图片"></el-avatar>
            </div>
          </div>
          <p>{{name}}</p>
          <div class="box-card-divIII">
            <span>欢迎您进入对虾全产业链云平台-后台管理页面</span>
            <span>请点击顶部导航栏操作!!!</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <div class="row-null"></div>
      </el-col>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import commonHeader from "@/components/common-header";
export default {
  name: "welcome",
  data() {
    return {
      imgUrl:"",//头像url
      name:"",//管理员名称
    };
  },
  components:{
    commonHeader:commonHeader,
  },
  mounted() {
    document.querySelectorAll(".el-button")[9].style.color = "#fff";
    document.querySelectorAll(".el-button")[9].style.border= "3px solid #57F9E9";
    this._data.imgUrl = this.photo;
    this._data.name = this.userName;
  },
  computed: {
    ...mapState(["userName","photo"]), //和vuex联动,拿到头像和名称
  },
};
</script>
<style lang="scss" scoped>
.root {
  //主体
  height: 100%;
  .header {
    position: absolute; //导航栏在顶部
    z-index: 10;
    height: 80px; //头部导航栏高改了50px-->80px
  }
  .main{
    width: 100%;
    height: 100%;
    background-image: url("../../assets/login1.jpg");
    background-size: 100% 100%;
    position: absolute;
  }
}

.row-null {
  //左右留白
  height: 100px;
  width: 100%;
}

.box-card {//卡片
  background-color: #F7FBFA;
  margin-top: 80px;
  height: 460px;
  width: 100%;
  span {
    display: block;
    text-align: center;
    font-size: 24px;
  }
  p{
    margin-top: 5px;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
  }
}

.box-card-divII{//卡片提示内容
  height: 160px;
  width:100%;
  display: flex;
  justify-content: center;
  .el-avatar{
    border: 4px solid #E6A23C;
  }
}

.box-card-divIII{//卡片提示内容
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100px;
  width:100%;
  span{
    margin-top: 10px;
  }
}
</style>
