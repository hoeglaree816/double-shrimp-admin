<template>
  <div class="root">
    <el-col :span="24" class="header">
      <common-header></common-header>
    </el-col>
    <el-col :span="24" class="main">
      <el-col :span="5" class="main-el-col">
        <div class="null-div"></div>
      </el-col>
      <el-col :span="14" class="main-mainPart">
        <div class="personalInfo-title">
          <div>
            <p>个人信息详情</p>
          </div>
        </div>
        <!-- <el-divider></el-divider> -->
        <div
          class="personalInfo-item"
          v-for="(value, name, index) in personalInfoData"
          :key="index"
        >
          <div>
            <span class="spanOne">{{ value }}：</span>
            <i class="el-icon-document"></i>
            <span  class="spanTwo">{{ personalInfoDataGet[name] }}</span>
          </div>
        </div>
        <el-divider><i class="el-icon-user-solid"></i></el-divider>
      </el-col>
      <el-col :span="5">
        <div class="null-div"></div>
      </el-col>
    </el-col>
  </div>
</template>

<script>
import axiosInstance from "axios";
const axios = axiosInstance.create({
  baseURL:"http://106.75.154.40:9012/authority"
})
import commonHeader from "@/components/common-header";
export default {
  name: "personalInformation",
  data() {
    return {
      personalInfoData: {
        userId: "身份ID",
        loginId: "登录账号",
        name: "姓名",
        sex: "性别",
        email: "邮箱",
        mobile: "手机",
        phone: "电话",
        merchantId: "店铺Id",
        baseId: "基地Id",
        baseIdentity: "基地身份",
        creatDate: "创建时间",
      },
      personalInfoDataGet: [],
    };
  },
  methods: {},
  components: {
    commonHeader: commonHeader,
  },
  mounted() {
    return new Promise((resolve) => {
      const myInterceptor = axios.interceptors.request.use(
        (config) => {
          const token = window.sessionStorage.getItem("token");
          if (token) {
            config.headers.authorization = "Bearer " + token; //将token放入请求头
          } else {
            console.log("token不存在");
          }
          return config; //；拦截返回，才能执行下面请求
        },
        (error) => {
          console.log(error);
        }
      );
      axios.get("/admin/self").then((res) => {
        //111
        this._data.personalInfoDataGet = res.data.data;
        const token = res.headers.token; //拿到请求头的token
        window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
      });
      axios.interceptors.request.eject(myInterceptor);
    });
  },
};
</script>
<style lang="scss" scoped>
.root {
  height: 100%;
  .header {
    position: absolute; //导航栏在顶部
    z-index: 10;
    height: 80px; //头部导航栏高改了50px-->80px
  }
  .main {
    position: absolute;
    // background-color: #f2f2f2;
    background-color: #e4e7ed; //h换个背景颜色
    // min-height: 100%;
    height: 100%;
    overflow-y: auto;
    padding-top: 80px;//设置内边距和上面的高度抵消
    .main-el-col {
      // height: 100%;
      overflow-y: auto;
    }
    .main-mainPart {
      margin-top: 10px;
      box-shadow: 2px 2px 10px rgba($color: #606266, $alpha: 0.5);
      border-radius: 5px;
    }
  }
}
.null-div {
  //左右空div
  height: 10px;
}
.personalInfo-title {
  //个人信息标题
  margin-top: 10px;
  margin-bottom: 15px;
  border-bottom: 1px solid rgba($color: #003366, $alpha: 0.3);
  height: 65px;
  div {
    height: 100%;
  }
  p {
    height: 100%;
    font-size: 40px;
    text-align: center;
    color: #003366;
  }
}
.personalInfo-item {
  //个人信息字段
  display: flex;
  justify-content: center;
  height: 45px;
  margin-bottom: 13px;

  div {
    height: 45px;
    margin-left: 1%;
    line-height: 45px;
    width: 80%;
    background-color: whitesmoke;
    border-radius: 5px;
    box-shadow: 5px 5px 5px rgba($color: #006266, $alpha: 0.5);
    &:hover{
      background-color: #dadde6;
    }
    .spanOne{
      font-size: 14px;
      width: 80px;
      margin-left: 5%;
      margin-right: 30px;
      text-align: right;
      border-radius: 5px;
      box-shadow: 5px 5px 5px rgba($color: #006266, $alpha: 0.5);
      &:hover{
        cursor: pointer;
        border-right: 1px solid whitesmoke;//动起来
      }
    }
    .spanTwo{
      font-size: 14px;
      text-align: center;
      margin-left: 5px;
      color: #003366;
    }
  }
}
.el-divider{
  //分割线
  background-color: rgba($color: #003366, $alpha: 0.3);
}
</style>
