<template>
  <div class="root">
    <el-col :span="24" class="header">
      <common-header></common-header>
    </el-col>
    <el-col :span="24" class="main">
      <el-col :span="6">
        <div class="row-null"></div>
      </el-col>
      <el-col :span="12" class="main-mainPart">
        <div class="form-col-top">
          <span>修改密码</span>
        </div>
        <el-card class="box-card" shadow="always">
          <div class="form-div">
            <el-form ref="form" :rules="rules" :model="form" label-width="160px">
              <!-- <el-form-item label="需要找回密码的账号:" prop="loginId">
                <el-input v-model="form.loginId" placeholder="请输入账号..."></el-input>
              </el-form-item> -->
              <el-form-item label="与账号关联的邮箱:" prop="email">
                <el-input v-model="form.email" placeholder="请输入正确的邮箱..."></el-input>
              </el-form-item>
              <el-form-item label="新密码:" prop="password">
                <el-input type="password" v-model="form.password" placeholder="请输入密码..."></el-input>
              </el-form-item>
              <el-form-item label="确认密码:" prop="passwords">
                <el-input type="password" v-model="form.passwords" placeholder="请输入密码..."></el-input>
              </el-form-item>
              <el-form-item>
                <el-col :span="14">
                  <el-form-item label="邮箱验证码:" label-width="100px" prop="code">
                    <el-input v-model="form.code" placeholder="请输入邮箱验证码..."></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="1">
                  <div class="code-div"></div>
                </el-col>
                <el-col :span="9">
                  <el-button
                    type="warning"
                    size="medium"
                    @click="getCode"
                    :loading="loadingtime"
                    v-show="isShow"
                  >获取验证码</el-button>
                </el-col>
              </el-form-item>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item prop="captcha" label="验证码:">
                    <el-input v-model="form.captcha" placeholder="验证码" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8" style="text-align:center;">
                  <el-image
                    style="width: 160px; height: 40px"
                    :src="'data:image/png;base64,' + url"
                    fit="contain"
                  ></el-image>
                </el-col>
                <el-col :span="4">
                  <el-button type="success" circle icon="el-icon-refresh" @click="refreshCaptcha"></el-button>
                </el-col>
              </el-row>
              <el-form-item>
                <div class="form-button">
                  <el-button type="primary" @click="submitForm('form')">修改密码</el-button>
                  <el-button type="info" @click="resetForm('form')">重置表单</el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        <div class="bottom">
          <span>@对虾全产业链云平台-管理后台</span>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="row-null"></div>
      </el-col>
    </el-col>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axiosInstance from "axios";
const axios = axiosInstance.create({
  baseURL:"http://106.75.154.40:9012/authority"
})
import commonHeader from "@/components/common-header";
export default {
  name: "changePassword",
  data() {
    // validatePass和validatePass2用来辅助确认两次密码是否一致
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.form.passwords !== "") {
          this.$refs.form.validateField("passwords");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码确认"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        email: "",
        password: "",
        passwords: "",
        code: "",
        captcha: "",
      },
      rules: {
        //表单验证规则
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          // {
          //   required: true,
          //   message: "请输入您注册的账号的密码",
          //   trigger: "blur",
          // },
          {
            min: 6,
            max: 14,
            message: "长度在 6 到 14 个字符",
            trigger: ["blur", "change"],
          },
          { validator: validatePass, trigger: ["blur", "change"] },
        ],
        passwords: [{ validator: validatePass2, trigger: ["blur", "change"] }],
        code: [
          {
            required: true,
            message: "请输入获取的验证码",
            trigger: "blur",
          },
        ],
        captcha:[
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
        ],
      },
      loadingtime: false,
      url: "", //验证码url
      ctoken: "",
    };
  },
  methods: {
    refreshCaptcha() {
      //刷新验证码
      axios({
        method: "post",
        url: "/captcha/getCaptcha",
      })
        .then((res) => {
          //提示
          if (res.status == 200) {
            this.$notify({
              title: '成功',
              message: res.data.message,
              type: "success",
              showClose: false,
              duration: 1000,
              offset:80,
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
              offset:80
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取邮箱验证码
    getCode() {
      console.log(this._data.form.email);
      this._data.loadingtime = true; //使得按钮变成加载中
      axios
        .get("/email/" + this._data.form.email, {
          // timeout: 5000,
        })
        .then((res) => {
          this._data.loadingtime = false; //使得按钮变回正常
            if (res.data.flag == true) {
              this.$message({
                message: res.data.message + "   状态码:" + res.status,
                type: "success",
              });
            } else {
              this.$message({
                showClose: true,
                duration: 4000,
                message: res.data.message + "   状态码:" + res.status,
                type: "error",
              });
            }
        })
        .catch((err) => {
          this._data.loadingtime = false; //使得按钮变回正常
          console.log(err);
          // alert("获取验证码超时")
          this.$message({
            // showClose: true,
            message: "很遗憾，获取验证码超时！",
            type: "warning",
          });
        });
    },
    submitForm(formName) {
      let _this = this;
      //整个表单验证
      const submit = this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证成功
          const loading = this.$loading({//设置加载中效果-服务方式
            lock: true,
            text: '拼命操作中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          axios({
            method: "post",
            url:
              "/user/retrievePassword/" +
              this._data.form.code,
            params: {
              cToken: this._data.ctoken,
              captcha: this._data.form.captcha,
            },
            data: {
              loginId: this.userLoginId,
              password: this._data.form.password,
              email: this._data.form.email,
            },
          })
            .then((res) => {
              loading.close();//关闭加载中效果
              //提示找回密码情况
              if (!res.data.flag == true) {
                this.$message({
                  message: res.data.message + " 状态码为：" + res.status,
                  type: "warning",
                });
              } else {
                this.$message({
                  message: res.data.message + " 状态码为：" + res.status,
                  type: "success",
                });
                this.$notify({
                  title: '成功',
                  message: "2秒后自动跳转到登录页面",
                  type: "success",
                  duration: 2000,
                  showClose: false,
                });
                let timer =  setTimeout(function () {
                  _this.$router.push("/");
                }, 3000);
                
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message({
                showClose: true,
                message: res.data.message + " 状态码为：" + res.status,
                type: "warning",
              });
            });
        } else {
          //提示表单验证失败
          this.$message({
            showClose: true,
            message: "表单信息有错，请检查拼写/字数限制！",
            type: "error",
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      //重置表单
      this.$refs[formName].resetFields();
    },
  },
  computed: {
    ...mapState(["userLoginId"]),
    isShow: function () {
      //是否显示获取验证码按钮
      if (this._data.form.email == "") {
        return false;
      } else {
        return true;
      }
    },
  },
  components: {
    commonHeader: commonHeader,
  },
  mounted() {
    this.refreshCaptcha(); //打开即可获得一次验证码
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
    background-color: #e4e7ed;
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
.row-null {
  height: 5px;
  width: 100%;
}

.form-col-top {
  width: 100%;
  height: 100px;
  text-align: center;
  border-bottom: 1px solid rgba($color: #003366, $alpha: 0.3);
  span {
    font-size: 38px;
    top: 50%;
    transform: translate(0, -50%);
  }
}

.form-div {
  // background-color: rgba(233, 245, 243, 0.658);
  padding: 15px;
  padding-top: 20px;
  padding-bottom: 5px;
  border-radius: 5px;
  .form-button {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
  .code-div {
    height: 10px;
  }
}
//合并版本1.5新增
.box-card{
    margin: 15px;
    border-radius: 15px;
    background-color: rgba(252,252,252,0.3);
}
//合并版本1.5增加
.bottom{
    span{
        font-size: x-small;
        font-weight: bold;
    }
    text-align: center;
}
</style>
