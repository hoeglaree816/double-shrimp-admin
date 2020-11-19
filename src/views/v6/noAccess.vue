<template>
<!-- 无权进入后台提示界面 -->
  <div id="noAccess">
    <el-menu mode="horizontal" background-color="#003366" text-color="#fff">
      <el-menu-item index="1" @click="returnLogin">返回<i class="el-icon-right"></i>对虾全产业链云平台后台管理系统</el-menu-item>
    </el-menu>

    <el-row>
      <el-col :span="7">
        <div class="row-null"></div>
      </el-col>
      <el-col :span="10" class="form-col">
        <div class="row-null"></div>
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <span>情况说明</span>
          </div>
          <div class="box-card-divII">
            <span>你无权访问该页面!!!</span>
          </div>
          <div class="box-card-btn">
            <el-button type="primary" @click="returnLogin">返回</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="7">
        <div class="row-null"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "noAccess",
  data() {
    return {
      
    };
  },
  methods: {
    returnLogin() {
      //返回登录界面
      this.$router.push("/");
    },
  },
  mounted(){
    //清空sessionStorage
    window.sessionStorage.clear()
  }
};
</script>
<style lang="scss" scoped>
#noAccess {
  //主体
  background-image: url("../../assets/login1.jpg");
  background-size: 100% 100%;
  height: 100%;
}

.row-null {
  //左右留白
  height: 100px;
  width: 100%;
}

.box-card {//卡片
  height: 500px;
  width: 100%;
  div span {
    display: block;
    text-align: center;
    font-size: 24px;
  }
}

.box-card-divII{//卡片提示内容
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 300px;
  width:100%;
}
.box-card-btn{
  display: flex;
  justify-content: center;
}
</style>
