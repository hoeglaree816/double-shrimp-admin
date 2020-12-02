<template>
  <div id="index">
    <main>
      <p class="form-p"></p>
      <nav>
        <i class="el-icon-setting"></i>
        &nbsp;
        <span>对虾全产业链云平台后台管理系统</span>
      </nav>
      <br />
      <p class="tips">请登录</p>
      <div class="form-div">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="loginId">
            <el-input
              v-model="form.loginId"
              placeholder="账号..."
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              placeholder="密码..."
              show-password
              clearable
            ></el-input>
          </el-form-item>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item prop="captcha">
                <el-input
                  v-model="form.captcha"
                  placeholder="验证码..."
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="text-align:center;">
              <el-image
                style="width: 160px; height: 40px"
                :src="'data:image/png;base64,' + url"
                fit="contain"
              ></el-image>
            </el-col>
            <el-col :span="4" style="text-align:center;">
              <el-button
                type="success"
                size="medium"
                circle
                icon="el-icon-refresh"
                @click="refreshCaptcha"
              ></el-button>
            </el-col>
          </el-row>
          <el-form-item>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-button type="primary" @click="submitForm('form')" style="width: 100%;">登录</el-button>
            </el-col>
            <el-col :span="12">
              <el-button type="warning" @click="onRetrievePassword" style="width: 100%;">找回密码</el-button>
            </el-col>
          </el-row>
          </el-form-item>
          <!-- <el-button type="success" @click="onRegister" style="width: 100%;">注册</el-button> -->
        </el-form>
      </div>
    </main>
  </div>
</template>

<script>
import slider from "@/components/slider-check";
import axiosInstance from "axios";
const axios = axiosInstance.create({
  // baseURL:"http://106.75.154.40:9012/authority"
  baseURL:"http://106.75.154.40:9003"
})
import { initDynamicRoutes } from "../router/index.js";
export default {
  name: "Index",
  data() {
    return {
      form: {
        loginId: "",
        password: "",
        captcha: "",
      },
      rules: {
        //表单验证规则
        loginId: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      isChecked: true,
      url: "", //验证码url
      ctoken: "",
    };
  },
  methods: {
    //刷新验证码
    refreshCaptcha() {
      axios({
        method: "post",
        url: "/captcha/getCaptcha",
        headers:{
          xip:sessionStorage.getItem('xip')
        }
      })
        .then((res) => {
          if (res.status == 200) {
            this.$notify({
              title: '成功',
              message: res.data.message,
              type: "success",
              showClose: false,
              duration: 1000,
            });
            this._data.url = res.data.data.img; //转存验证码url
            this._data.ctoken = res.data.data.cToken;
          } else {
            this.$notify({
              title: '错误',
              message: res.data.message,
              type: "error",
              showClose: false,
              duration: 1000,
            }); 
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //提交登录
    onSubmit() {
      const loading = this.$loading({//设置加载中效果-服务方式
          lock: true,
          text: '拼命登录中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
      });
      //提交登录
      axios({
        method: "post",
        url: "/admin/login",
        params: {
          cToken : this._data.ctoken,
          captcha : this._data.form.captcha
        },
        data: {
          loginId: this._data.form.loginId,
          password: this._data.form.password,
        },
        headers:{
          xip:sessionStorage.getItem('xip')
        }
      })
        .then((res) => {
          // console.log('res.data: ', res.data);
          loading.close();//关闭加载中效果
          if (res.data.code == 20001) {
            //登陆失败
            this.$message({
              message: res.data.message,
              type: "error",
            });
            this.refreshCaptcha();//刷新验证码
          } else {
            //登陆成功;
            this.$store.commit("setUserId", res.data.data.userId); //把"用户Id"存放在sessionStorage里面
            this.$store.commit("setUserLoginId", res.data.data.loginId); //把"用户登陆Id"存放在sessionStorage里面
            this.$store.commit("setUserName", res.data.data.userName); //把"用户名"存放在sessionStorage里面
            this.$store.commit("setUserRole", res.data.data.role); //把"用户角色"存放在sessionStorage里面
            this.$store.commit("setMenulist", res.data.data.menuList); //把"用户权限列表"存放在sessionStorage里面
            this.$store.commit("setBaseId", res.data.data.baseId); //把"用户基地Id"存放在sessionStorage里面
            this.$store.commit("setBaseIdentity", res.data.data.baseIdentity); //把"用户基地身份"存放在sessionStorage里面
            this.$store.commit("setPhoto", res.data.data.photo); //把"用户头像"存放在sessionStorage里面
            const token = res.headers.token; //拿到请求头的token
            window.sessionStorage.setItem("token", token); //把token存放在sessionStorage里面
            if (!res.data.data.role == "manager") {
              this.$router.replace("/noAccess");
              this.$message({
                message: "您无权进去后台管理页面！！！",
                type: "warning",
              });
            } else {
              this.$router.replace("/welcome");//欢迎管理员进入后台系统页面
              //根据权限动态加载路由规则
              initDynamicRoutes();
              //提示信息
              this.$message({
                message: res.data.message,
                type: "success",
                showClose: true,
                duration: 1500, //停留1.5秒
              });
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // this.setCookie();
    },
    submitForm(formName) {
      //整个表单验证
      const submit = this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证成功
          this.onSubmit();
        } else {
          //提示表单验证失败
          this.$message({
            showClose: true,
            message: "请输入完整的登录信息！！！",
            type: "error",
          });
          return false;
        }
      });
    },
    // isIllegalForm(form) {
    //   let isIllegalId = form.loginId == "";
    //   // form.loginId == "" || form.loginId.match(/[^0123456789]/g);
    //   let isIllegalPassword = form.password == "";
    //   return isIllegalId || isIllegalPassword;
    // },
    // setCookie() {
    //   // 一小时后过期
    //   document.cookie = `loginId=666;expires=${new Date(
    //     new Date().getTime() + 1000 * 60 * 60
    //   ).toUTCString()}`;
    // },
    // onChecked() {
    //   this.isChecked = true;
    // },
    onRegister() {
      this.$router.replace("/register");
    },
    onRetrievePassword() {
      this.$router.replace("/retrievePassword");
    },
  },
  components: {
    sliderCheck: slider,
  },
  beforeCreate() {
    // if (document.cookie.search("loginId") != -1) {
    //   this.$router.replace("/v1");
    // }
  },
  mounted() {
    // sessionStorage.clear(); //清空sessionStorage里面的数据
    this.refreshCaptcha(); //打开即可获得一次验证码
    // this.setCookie();
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/base.scss";
#index {
  background-image: url("../assets/login1.jpg");
  background-size: 100% 100%;
  height: 100%;
  main {
    nav {
      text-align: center;
      i,
      span {
        font-size: 58px;
        line-height: 58px;
        color: #ffffff;
      }
    }
    z-index: 3;
    width: 1000px;
    height: auto;
    top: 20%;
    margin: 0 auto;
    border-radius: 15px;
    // transform: translateY(-50%);
    &::after {
      content: "";
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url("../assets/login1.jpg");
      background-size: 100% 100%;
      background-attachment: fixed; // 666
      filter: blur(10px);
      border-radius: 15px;
    }
  }
}
.tips{//请登录文字提示
  font-size: 20px;
  font-weight: 510;
  color: whitesmoke;
  margin-bottom: 10px;
  text-align:center;
  &:hover{
    cursor: pointer;
    color: yellow;
  }
}
.form-p {
  height: 10px;
}
.form-div{
  display: flex;
  justify-content: center;
  .el-form{
    width: 50%;
  }
}
</style>
