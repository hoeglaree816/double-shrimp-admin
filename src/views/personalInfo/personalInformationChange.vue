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
            <p>
              修改个人信息
            </p>
          </div>
        </div>
        <el-divider content-position="center">身份ID：{{ personalInfoDataChange["userId"] }}</el-divider>
        <el-card class="box-card">
          <div class="personalInfo-changediv">
            <div>
              <el-form
                ref="personalInfoDataChange"
                :model="personalInfoDataChange"
                label-width="150px"
                :rules="rules"
              >
                <el-form-item
                  v-for="(value, name, index) in personalInfoData"
                  :key="index"
                  :label="value"
                  :prop="name"
                >
                  <el-radio-group v-if="value == '性别'" v-model="personalInfoDataChange[name]">
                    <el-radio border label='男'>男<i class="el-icon-male"></i></el-radio>
                    <el-radio border label='女'>女<i class="el-icon-female"></i></el-radio>
                  </el-radio-group>
                  <el-input
                    v-else
                    v-model="personalInfoDataChange[name]"
                    placeholder="请输入内容..."
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-card>
        <el-divider content-position="center"></el-divider>
        <div class="personalInfo-btn">
          <el-button
            size="medium"
            type="success"
            @click="submitForm('personalInfoDataChange')"
            >提交修改</el-button
          >
          <el-button
            size="medium"
            type="info"
            round
            @click="resetForm('personalInfoDataChange')"
            >重置表单</el-button
          >
          <el-button
            size="medium"
            type="danger"
            @click="changePassword()"
            >修改密码</el-button
          >
        </div>
        <div class="bottom">
          <span>@对虾全产业链云平台-管理后台</span>
        </div>
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
  name: "personalInformationChange",
  data() {
    return {
      personalInfoData: {
        //用来循环展示出表单的中文lable，和绑定表单验证字段
        // userId: "身份ID",
        loginId: "登录账号",
        name: "姓名",
        sex: "性别",
        email: "邮箱",
        mobile: "手机",
        phone: "电话",
        merchantId: "店铺Id",
        baseId: "基地Id",
        baseIdentity: "基地身份",
        // creatDate: "创建时间",
      },
      personalInfoDataChange: {
        userId: "",
        loginId: "",
        name: "",
        sex: "",
        email: "",
        mobile: "",
        phone: "",
        merchantId: "",
        baseId: "",
        baseIdentity: "",
        creatDate: "",
      },
      rules: {
        //表单验证规则
        loginId: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur",
          },
          {
            min: 8,
            max: 16,
            message: "长度在 8 到 16 个字符",
            trigger: ["blur", "change"],
          },
        ],
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: ["blur", "change"],
          },
        ],
        sex: [
          { required: true, message: "请选择性别", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入您的电话号码", trigger: "blur" },
          {
            min: 4,
            max: 8,
            message: "请输入 2 到 8 位的电话号码",
            trigger: ["blur", "change"],
          },
        ],
        mobile: [
          { required: true, message: "请输入您的手机号码", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请输入11位数的手机号码",
            trigger: ["blur", "change"],
          },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
    handlePersonalInfoChange() {
      let tempdata = this._data.personalInfoDataChange; //使用这个方法把数据裁剪掉一些不要的
      this.$delete(tempdata, "password");
      this.$delete(tempdata, "createDate");
      this.$delete(tempdata, "isAdmin");
      //修改
      return new Promise((resolve) => {
        const loading = this.$loading({//设置加载中效果-服务方式
          lock: true,
          text: '修改信息中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        const myInterceptor = axios.interceptors.request.use(
          //放token
          (config) => {
            const token = window.sessionStorage.getItem("token");
            if (token) {
              config.headers.authorization = "Bearer " + token; //将token放入请求头
              // console.log(token);
            } else {
              console.log("token不存在");
            }
            return config; //；拦截返回，才能执行下面请求
          },
          (error) => {
            console.log(error);
          }
        );
        axios
          .put(
            "/admin/self/" +
              this._data.personalInfoDataChange["userId"],
            tempdata
          )
          .then((res) => {
            resolve(res);
            loading.close();//关闭加载中效果
            const token = res.headers.token; //拿到请求头的token
            window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
            
          });
        axios.interceptors.request.eject(myInterceptor); //注销axios拦截器
      });
    },
    submitForm(formName) {
      //整个表单验证，formName是指和表单绑定数据（对象/数组）的名称
      const submit = this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证成功
          this.$confirm('修改相关信息可能导致你账号丢失, 是否继续?', '提示', {//提示用户
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.handlePersonalInfoChange().then(res=>{
              //提示用户修改情况
              if (!res.data.flag) {
                this.$message({
                  showClose: true,
                  message: res.data.message + " 状态码为：" + res.status,
                  type: "warning",
                });
              } else {
                this.$router.push("/personalInformation"); //修改成功则跳转到查看个人信息页面
                this.$message({
                  showClose: true,
                  message: res.data.message + " 状态码为：" + res.status,
                  type: "success",
                });
              }
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消该操作'
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
    changePassword(){
      this.$router.push("/changePassword")
    }
  },
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
        this._data.personalInfoDataChange = res.data.data;
        // resolve([res.data.data]); //规定要用数组
        const token = res.headers.token; //拿到请求头的token
        window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
        // alert(res.data.message + " 状态码为：" + res.status);
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
.null-div {
  //左右空div
  height: 10px;
}
.personalInfo-title {
  //个人信息标题
  margin-top: 10px;
  height: 65px;
  div {
    height: 100%;
  }
  p {
    height: 100%;
    font-size: 40px;
    text-align: center;
    color: #003366;
    span {
      font-size: 16px;
      font-weight: 310;
    }
  }
}
.personalInfo-changediv{
  //表单外层div
  display: flex;
  justify-content: center;
  margin-top: 15px;
  // border-bottom: 1px solid rgba($color: #003366, $alpha: 0.3);
  div{
    width: 95%;
  }
}
.personalInfo-btn {
  //按钮样式外层div
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}
.el-divider {
  //分割线
  background-color: rgba($color: #003366, $alpha: 0.3);
}
//合并版本1.5增加
.box-card{//面板卡片
    margin: 0.6%;
    border-radius: 15px;
    background-color: rgba(252, 252, 252,0.3);
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
