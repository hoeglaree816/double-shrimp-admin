<template>
  <div class="root">
    <el-col :span="24" class="header">
      <common-header></common-header>
    </el-col>
    <el-col :span="24" class="main">
      <el-col :span="4" class="main-el-col">
        <div class="null-div"></div>
      </el-col>
      <el-col :span="16" class="main-mainPart">
        <div class="apply-title">
          <div>
            <p>申请消息</p>
          </div>
        </div>
        <div class="apply-alert">
          <div>
            <el-alert
              title="用户申请创建基地"
              type="warning"
              :closable="false"
              show-icon
              center
            >
            </el-alert>
          </div>
        </div>
        <div class="apply-item">
          <div>
            <span class="spanOne">(申请) 基地 Id</span>
            <span class="spanTwoI">基地名称</span>
            <span class="spanTwoII">申请人 Id</span>
            <span class="spanTwoI">申请人 名称</span>
            <span class="spanThree">操作</span>
          </div>
        </div>
        <div class="apply-items">
          <div
            class="apply-item"
            v-for="(value, name, index) in applyData"
            :key="index">
              <div>
                <span class="spanOne">{{ value.id }}</span>
                <!-- <span class="spanTwoI">{{ value.baseName }}</span> -->
                <el-popover
                  placement="left-start"
                  width="200"
                  :close-delay="10"
                  trigger="hover"
                  offset="50"
                  :content="value.baseName"
                  >
                  <span  slot="reference" class="spanTwoI">{{ value.baseName }}</span>
                </el-popover>
                <span class="spanTwoII">{{ name }}</span>
                <!-- <span class="spanTwo"> {{ value.baseIdentity==1 ?"管理员":"普通用户"}}</span> -->
                <!-- <span class="spanTwoI" v-if="value.baseIdentity==1"> {{"基地管理员"}}</span>
                <span class="spanTwoI" v-else> {{"普通用户"}}</span>
                <span class="spanTwoI spanTwoBI" v-if="value.baseIdentity==0"><i class="el-icon-right"></i>{{"基地管理员"}}</span>
                <span class="spanTwoI spanTwoBII" v-else><i class="el-icon-right"></i>{{"普通用户"}}</span> -->
                <!-- <span class="spanTwoII"> {{ value.baseId}}</span> -->
                <el-popover
                  placement="left-start"
                  width="200"
                  offset="50"
                  trigger="hover"
                  :close-delay="10"
                  :content="value.createBy">
                  <span slot="reference"  class="spanTwoI" v-if="value.createBy === null">无</span>
                  <span slot="reference"  class="spanTwoI" v-else>{{ value.createBy }}</span>
                </el-popover>
                <span class="spanThree">
                  <el-tag
                    effect="dark"
                    type="success"
                    @click="handleApplyAgree(name, value)"
                    >同意申请<i class="el-icon-circle-check"></i></el-tag
                  >&nbsp;
                  <el-tag
                    effect="dark"
                    type="danger"
                    @click="handleApplyReject(name)"
                    >拒绝申请<i class="el-icon-circle-close"></i></el-tag
                  >
                </span>
              </div>
          </div>
        </div> 
        <el-divider>
          <i class="el-icon-user-solid"></i>
        </el-divider>
        <div class="bottom">
          <span>@对虾全产业链云平台-管理后台</span>
        </div>
      </el-col>
      <el-col :span="4">
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
  name: "applyBaseManager",
  data() {
    return {
      applyData: [],
    };
  },
  methods: {
    handleApplyAgree(name, value) {
        console.log("申请撤销基地管理员");
        this.$confirm("同意用户新增基地, 是否继续?", "提示", {
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
            axios
              .post(
                "/admin/addBase/" +
                  name, value
              )
              .then((res) => {
                console.log(res);
                this.$message({
                  type: "success",
                  message: res.data.message,
                });
                const token = res.headers.token; //拿到请求头的token
                window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
                if (res.data.flag) {
                  setTimeout(function() {
                    window.location.reload();
                  }, 800);
                }
              });
            axios.interceptors.request.eject(myInterceptor);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消该操作",
              duration:700
            });
          });
      
    },
    handleApplyReject(name) {
      this.$confirm("拒绝用户申请请求, 是否继续?", "提示", {
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
          axios
            .put("/admin/addBase/reject/" + name)
            .then((res) => {
              console.log(res);
              this.$message({
                type: "success",
                message: res.data.message,
              });
              const token = res.headers.token; //拿到请求头的token
              window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
              if (res.data.flag) {
                setTimeout(function() {
                  window.location.reload();
                }, 800);
              }
            });
          axios.interceptors.request.eject(myInterceptor);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消该操作",
            duration:700
          });
        });
    },
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
            console.log(111)
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
      axios
        .get("/admin/addBase/detail")
        .then((res) => {
          console.log(res)
          this._data.applyData = res.data.data;
          console.log(this._data.applyData)
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
    padding-top: 80px; //设置内边距和上面的高度抵消
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
.apply-title {
  //标题
  margin-top: 10px;
  margin-bottom: 10px;
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
.apply-alert {
  display: flex;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba($color: #003366, $alpha: 0.3);
  div {
    width: 60%;
    display: flex;
    justify-content: center;
  }
}
//申请信息字段
.apply-item {
  display: flex;
  justify-content: center;
  height: 45px;
  margin-bottom: 13px;
  div {
    display: flex;
    justify-content: space-around;
    height: 45px;
    margin-left: 1%;
    line-height: 45px;
    width: 80%;
    background-color: whitesmoke;
    border-radius: 5px;
    box-shadow: 5px 5px 5px rgba($color: #006266, $alpha: 0.5); 
    .spanOne {//id
      font-size: 14px;
      width: 200px;
      text-align: center;
    }
    .spanTwoI {//信息列
      font-size: 14px;
      text-align: center;
      width: 100px;
      color: #003366;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover{
        cursor:pointer
      }
    }
    .spanTwoII {//信息列
      font-size: 14px;
      text-align: center;
      width: 200px;
      color: #003366;
    }
    .spanThree {//操作列
      width: 200px;
      margin-right: 5px;
      text-align: center;
    }
  }
}
//实际加载出来的消息项
.apply-items{
  height: 460px;
  overflow-y: scroll;
  .apply-item{
    margin-left: 18px;
    div:hover{//消息项选中的效果
      background-color: #dadde6;
    }
    .spanTwoBI{//给特定角色添加效果
      color: #036;
      box-shadow: 4px 4px 5px #036;
      border-radius: 10px;
      &:hover{
        border: 2px solid whitesmoke;
        cursor: pointer;
      }
    }
    .spanTwoBII{//给特定角色添加效果
      color: #b67b22;
      box-shadow: 4px 4px 5px #b67b22;
      border-radius: 10px;
      &:hover{
        border: 2px solid whitesmoke;
        cursor: pointer;
      }
    }
  }
}
.apply-items::-webkit-scrollbar{//仅仅对谷歌浏览器生效
  display: none;
}
  //分割线
.el-divider {
  background-color: rgba($color: #003366, $alpha: 0.3);
}
  //标签按钮
.el-tag {
  cursor: pointer;
  &:hover{
    border: 2px solid #003366;
    box-shadow: 4px 4px 5px rgba($color: #006266, $alpha: 0.5);
  }
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
