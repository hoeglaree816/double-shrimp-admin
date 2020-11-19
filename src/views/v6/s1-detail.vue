<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>用户id为：<span>{{ id }}</span> 的详细信息</h2>
    </div>
    <main>
      <el-row class="txt-row txt-rowI" v-for="(value, name) in imgUrl" :key="name">
        <el-col class="txt-key" :span="3">用户头像：</el-col>
        <el-col class="pic" :span="15">
          <el-image
            style="width: 128px; height: 128px"
            :src="value"
            fit="contain"
          ></el-image>
          <el-button type="danger" icon="el-icon-delete" circle @click="handleDleteAvatar"></el-button>
          <div>
            <el-alert
              title="若用户头像违反相关规定，可注销该用户头像！"
              type="warning"
              show-icon
              :closable="false">
            </el-alert>
          </div>
        </el-col>
      </el-row>
      <el-row
        class="txt-row"
        v-for="(value, name, index) in label"
        :key="index"
      >
        <el-col class="txt-key" :span="3">{{ value }}：</el-col>
        <el-col v-if="value == '用户基地身份'" class="txt-value" :span="15">
          <el-tag size="small" type="warning" effect="dark" v-if="data[0][name]==1"><span>基地管理员</span></el-tag>
          <el-tag size="small" type="success" effect="dark" v-else-if="data[0][name]==0"><span>基地用户</span></el-tag>
          <el-tag size="small" type="info" effect="dark" v-else><span>无基地</span></el-tag>
        </el-col>
        <el-col v-else class="txt-value" :span="15">{{ data[0][name] }}</el-col>
      </el-row>
    </main>
    <div class="bottom">
      <span>@对虾全产业链云平台-管理后台</span>
    </div>
  </div>
</template>

<script>
const model = require("../../js/v6/s1");
import axiosInstance from "axios";
const axios =axiosInstance.create({
  baseURL:"http://106.75.154.40:9012/authority"
})
export default {
  data() {
    return {
      id: 0,
      data: [new model()],
      label: model.labelsII,
      imgUrl: "", //要更换的头像地址
    };
  },
  methods: {
    back() {
      this.$router.push("/v6/s1");
    },
    //删除现有头像
    handleDleteAvatar() {
      this.$confirm("删除该用户头像, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
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
            url: "/admin/deletePhoto/" + this.id,
          })
            .then((res) => {
              console.log(res.data);
              if (res.data.flag) {
                this.$message({
                  message: res.data.message,
                  type: "success",
                  duration: 1200,
                });
                setTimeout(function() {
                  window.location.reload();
                }, 500);
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消该操作",
            duration: 700,
          });
        });
    },
  },
  mounted() {
    this.id = this.$route.query.id;
    axios({
      method: "post",
      url: "/user/getPhotoByIds?userIds=" + this.id,
    })
      .then((res) => {
        this._data.imgUrl = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
    model.getById(this.id).then((value) => {
      if(value.data.flag)
      this.data = [value.data.data];//规定要用数组
      else
      this.$message({
        type:'error',
        message:'获取详细信息失败！！！'
      })
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/s-detail.scss";
.txt-rowI{
  display:flex;
  align-items: center;
}
.col-div {
  height: 10px;
}
.pic {
  display: flex;
  align-items: center;
  .el-button,div{
    margin-left: 15px;
  }
  
}
</style>
