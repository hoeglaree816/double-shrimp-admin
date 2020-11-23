<template>
  <el-row class="root">
    <!-- <router-link to="/v1"> -->
    <el-dialog
      title="提示"
      :modal-append-to-body="false"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      @closed="handleClosed"
    >
      <el-alert
        title="注意：上传的头像须符合法律法规！由此造成的责任由用户自负!！"
        type="warning"
        :closable="false"
        center
      >
      </el-alert>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="5">
          <span>拥有头像</span>
          <i class="el-icon-picture"></i>
        </el-col>
        <el-col :span="14">
          <div class="avatar-now">
            <el-image
              style="width: 178px; height: 178px"
              :src="imgUrl"
              fit="contain"
            ></el-image>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="avatar-now-btn">
            <el-button size="small" type="danger" @click="handleDleteAvatar"
              ><i class="el-icon-delete"></i>删除</el-button
            >
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="5">
          <span>更换头像</span>
          <i class="el-icon-camera-solid"></i>
        </el-col>
        <el-col :span="14">
          <div class="avatar-change">
            <el-upload
              class="avatar-uploader"
              action="http://106.75.154.40:9005/information/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="uploader-avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="avatar-change-btn">
            <el-button size="small" type="success" @click="handleChangeAvatar"
              ><i class="el-icon-upload2"></i>提交</el-button
            >
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button plain size="small" type="primary" @click="dialogVisible = false"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <div class="logo">
      <i class="el-icon-setting"></i>
      <span>对虾全产业链云平台</span>
    </div>
    <!-- </router-link> -->
    <div class="nav">
        <span class="nav-text">
          <el-button type="text" size="mini" :disabled="!enterprise" @click="toModule('enterprise')" >基地管理</el-button>
        </span>
        <span class="nav-text">
          <el-button type="text" size="mini" :disabled="!information" @click="toModule('information')">产业资讯</el-button>
        </span>
        <span class="nav-text">
          <el-button type="text" size="mini" :disabled="!education" @click="toModule('education')" >渔技文章</el-button>
        </span>
        <span class="nav-text">
          <el-button type="text" size="mini" :disabled="!ecommerce" @click="toModule('ecommerce')" >电子商务</el-button>
        </span>
        <span class="nav-text">
          <el-button type="text" size="mini" :disabled="!expertConsultation" @click="toModule('expertConsultation')" >专家问诊</el-button>
        </span>
        <span class="nav-text">
          <el-button type="text" size="mini" :disabled="!authority" @click="toModule('authority')" >权限管理</el-button>
        </span>
        <span class="nav-text">
          <el-button type="text" size="mini" :disabled="!dataPresentation" @click="toModule('dataPresentation')" >大数据</el-button>
        </span>
        <span class="nav-text">
          <el-button type="text" size="mini" :disabled="!policies " @click="toModule('policies')" >政策法规</el-button>
        </span>
        <span class="nav-text">
          <el-button type="text" size="mini" @click="toModule('welcome')" >欢迎进入</el-button>
        </span>
    </div>
    <span class="user">
      <span>{{ this.userName }}</span>
      <p>,您好!&nbsp;</p>
      <i class="el-icon-s-help"></i>
      <el-dropdown @visible-change="handleOpen" @command="handleCommand" trigger="click">
        <span class="el-dropdown-link">
          更多功能<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="c" icon="el-icon-bell" :disabled="!authority">
            <el-badge :value="informationTips" :max="99" class="item">
              申请消息
            </el-badge>
          </el-dropdown-item>
          <el-dropdown-item command="a" icon="el-icon-user-solid">
            查看个人资料
          </el-dropdown-item>
          <el-dropdown-item command="b" icon="el-icon-postcard">
            修改个人资料
          </el-dropdown-item>
          <el-dropdown-item command="d" icon="el-icon-sort">
            切换账号
          </el-dropdown-item>
          <el-dropdown-item command="e" icon="el-icon-warning">
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>
    <el-tooltip content="点击更换头像" placement="bottom" effect="light">
      <el-avatar
        shape="square"
        size="medium"
        :src="imgUrl"
        class="avatar"
        @click.native="avatarChange"
      ></el-avatar>
    </el-tooltip>
  </el-row>
</template>

<script>
import axiosInstance from "axios";
const axios = axiosInstance.create({
  baseURL:"http://106.75.154.40:9012/authority"
})
import { mapState } from "vuex";
export default {
  data() {
    return {
      styleObject: {
        color: "#ffffff",
      },
      nowItem: 0,
      imgUrl: "", //头像图片地址
      dialogVisible: false, //对话框
      imageUrl: "", //要更换的头像地址
      informationTips: "", //消息提示
      //权限控制字段，用来控制对应一级菜单栏菜单是否可用
      enterprise:false,//企业管理
      information:false,//产业资讯
      education:true,//远程教育
      ecommerce:false,//电子商务
      expertConsultation:false,//专家问诊
      authority:false,//权限管理
      dataPresentation: true, // 大数据
      policies:true,//政策法规
    };
  },
  methods: {
    //获取申请消息
    handleOpen(visibleChange){
      if(visibleChange&&this.authority){
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
        axios({
          method: "get",
          url: "/admin/addBase/number",
        })
          .then((res) => {
            console.log(res)
            this._data.informationTips = res.data.data; //拿到申请数量
            if(!res.data.flag){
              this.$message({
              message: "获取申请消息失败，请重试！！！",
              type: "error",
              duration: 3000,
            });
            }
            const token = res.headers.token; //拿到请求头的token
            window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
          })
          .catch((err) => {
            console.log(err);
          });
        axios.interceptors.request.eject(myInterceptor);
      }
    },
    //模块导航
    toModule(name){
      switch(name){
        case 'enterprise':this.$router.push("/v1");
        break;
        case 'information':this.$router.push("/v2");
        break;
        case 'education':this.$router.push("/v3");
        break;
        case 'ecommerce':this.$router.push("/v4");
        break;
        case 'expertConsultation':this.$router.push("/v5");
        break;
        case 'authority':this.$router.push("/v6");
        break;
        case 'dataPresentation':this.$router.push("/v7");
        break;
        case 'policies':this.$router.push("/v8");
        break;
        case 'welcome':this.$router.push("/welcome");
        break;
        default:console.log("无匹配路由")
      }
    },
    //关闭对话框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //对话框关闭后的回调函数
    handleClosed(){
      this.imageUrl="";//使得下一次打开对话框时候，更换的头像框为空
    },
    //删除现有头像
    handleDleteAvatar() {
      const loading = this.$loading({//设置加载中效果-服务方式
          lock: true,
          text: '修改信息中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
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
      axios({
        method: "delete",
        url: "/user/deletePhoto",
      })
        .then((res) => {
          loading.close();//关闭加载中效果
          if (res.data.flag) {
            this.handleRefreshAvatar();//成功就刷新头像
            this.$message({
              message: res.data.message,
              type: "success",
              duration: 1200,
            });
          } else {
            this.$message({
              message: res.data.message,
              type: "error",
              duration: 1200,
            });
          }
          const token = res.headers.token; //拿到请求头的token
          window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
        })
        .catch((err) => {
          console.log(err);
        });
      axios.interceptors.request.eject(myInterceptor);
    },
    //更换新头像
    handleChangeAvatar() {
      if (this._data.imageUrl == "") {
        this.$message({
          message: "请选择上传的图片",
          type: "error",
          duration: 1200,
        });
      } else {
        const loading = this.$loading({//设置加载中效果-服务方式
          lock: true,
          text: '修改信息中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        let file = this._data.fd;
        let fd = new FormData();
        fd.append("file", file);
        // console.log(fd.get("file", file));
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
        axios({
          method: "post",
          url: "http://106.75.154.40:9003/user/updatePhoto",
          data: fd,
        })
          .then((res) => {
            loading.close();//关闭加载中效果
            if (res.data.flag) {
              this.handleRefreshAvatar();//成功就刷新头像
              this.$message({
                message: res.data.message,
                type: "success",
                duration: 1200,
              });
            } else {
              this.$message({
                message: res.data.message,
                type: "error",
                duration: 1200,
              });
            }
            const token = res.headers.token; //拿到请求头的token
            window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
          })
          .catch((err) => {
            console.log(err);
          });
        axios.interceptors.request.eject(myInterceptor);
      }
    },
    //刷新头像
    handleRefreshAvatar() {
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
      axios({
        method: "get",
        url: "/user/getPhoto",
      })
        .then((res) => {
          console.log(res)
          if (res.data.flag) {
            this.$store.commit("setPhoto", res.data.data); //把"用户头像"存放在sessionStorage里面
          } else {
            this.$message({//加载失败提示
              message: res.data.message,
              type: "error",
              duration: 1200,
            });
          }
          const token = res.headers.token; //拿到请求头的token
          window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
          setTimeout(function() {
            //延迟一秒刷新页面
            window.location.reload();
          }, 500);
        })
        .catch((err) => {
          console.log(err);
        });
      axios.interceptors.request.eject(myInterceptor);
    },
    //点击进入更换头像
    avatarChange() {
      this._data.dialogVisible = true;
    },
    //查看个人信息
    handleApplyBaseManager() {
      this.$router.push("/applyBaseManager");
    },
    //查看个人信息
    handleCheckPersonalInfo() {
      this.$router.push("/personalInformation");
    },
    //修改个人信息
    handleCheckPersonalInfoChange() {
      this.$router.push("/personalInformationChange");
    },
    //退出登录
    logout() {
      // document.cookie = `loginId=1;expires=${new Date(
      //   new Date().getTime() - 999
      // ).toUTCString()}`;
      sessionStorage.clear(); //清空sessionStorage里面的数据
      // localStorage.clear(); // 清空localStorage里面的数据，暂时不需要
      this.$router.replace("/");
      //刷新vuex
      window.location.reload();
    },
    //导航栏更多工具下拉框处理函数
    handleCommand(command) {
      let _this = this; //避免和setTimeout的this冲突
      switch (command) {
        case "a":
          _this.handleCheckPersonalInfo();
          break;
        case "b":
          _this.handleCheckPersonalInfoChange();
          break;
        case "c":
          _this.handleApplyBaseManager();
          break;
        case "d":
          this.$confirm("此操作将更换账号重新登录, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.$message({
                type: "success",
                message: "已成功退出登录!",
              });
              setTimeout(function() {
                _this.logout(); //延迟一秒调用退出登录函数
              }, 500);
            })
            .catch(() => {
              this.$message({
                showClose: true,
                type: "info",
                message: "已取消切换账号登录",
                duration: 1000,
              });
            });
          break;
        case "e":
          this.$confirm("此操作将退出后台管理系统, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.$message({
                type: "success",
                message: "已成功退出登录!",
              });
              setTimeout(function() {
                console.log("我被调用了");
                _this.logout(); //延迟一秒调用退出登录函数
              }, 500);
            })
            .catch(() => {
              this.$message({
                showClose: true,
                type: "info",
                message: "已取消退出登录",
                duration: 1000,
              });
            });
          break;
        default:
          console.log("默认");
          break;
      }
    },
    //预览头像成功回调函数
    handleAvatarSuccess(res, file) {
      this._data.fd = file.raw;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    //上传头像前的回调函数
    beforeAvatarUpload(file) {
      const isStandard = file.type === "image/jpeg"||"image/png";
      const isLt1M = file.size / 1024 < 1024;

      if (!isStandard) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt1M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      return isStandard && isLt1M;
    },
  },
  mounted() {
    this._data.imgUrl = this.photo; //获取到头像
    //拿到权限列表循环判断是否有权限，有则将对应权限字段至true
    this.menulist.forEach((item) => {
      const temp = this.menu[item.name];
      if(typeof(temp)=="undefined"){
        // console.log(temp)
      }else{
        this[item.name]=true
      }
    });
  },
  computed: {
    ...mapState(["userName", "userId", "photo","menulist"]), //和vuex联动
    menu:function(){//将权限和控制映射起来
      return {
        enterprise:this.enterprise,
        information:this.information,
        education:this.education,
        ecommerce:this.ecommerce,
        expertConsultation:this.expertConsultation,
        authority:this.authority
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.root {
  background-color: #003366; //改了变成主色调#003366
  .logo {
    float: left;
    top: 50%;
    transform: translateY(-50%);
    margin: {
      left: 4px;
    }
    i,
    span {
      color: #ffffff;
      font-size: 22px;
      line-height: 22px;
    }
  }
  .nav {
    overflow: hidden;
    float: left;
    top: 50%;
    transform: translateY(-50%);
    .nav-text {
      
      margin: {
        left: 15px;
        right: 15px;
      }
      .el-button:hover {
        color: #ffffff;
        border: 3px solid #E6A23C;
      }
      .el-button{
        color: #c1c6c8;
      }
    }
  }
  .avatar {
    //头像
    float: right;
    top: 50%;
    transform: translateY(-50%);
    margin: {
      right: 10px;
    }
  }
  .user {
    float: right;
    top: 50%;
    transform: translateY(-50%);
    margin: {
      right: 20px;
    }
    color: #ffffff;
    font-size: 16px;
    line-height: 16px;
    p {
      display: inline;
      color: #d4e61b;
    }
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #d4e61b;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
.avatar-now{
  .el-image{
    border: 2px solid #036;
  }
}
.avatar-now,
.avatar-change {
  //现在拥有的头像的外div样式和准备更换的头像的外div样式
  display: flex;
  justify-content: center;
}
.avatar-now-btn,
.avatar-change-btn {
  //删除先拥有头像的按钮外层div的样式和准备更换头像的按钮外层div的样式
  height: 178px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.avatar-uploader {
  //上传头像的外框样式
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  //图标样式
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.uploader-avatar {
  //上传图片的样式
  width: 178px;
  height: 178px;
  display: block;
}
.el-badge {
  font-size: 14px;
  margin-left: 4px;
}
</style>
