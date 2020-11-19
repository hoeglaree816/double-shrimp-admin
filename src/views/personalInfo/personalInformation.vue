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
        <div class="personalInfo-div">
            <el-card shadow="always" class="first">
              <el-avatar class="avatar" :size="200" :src="imgUrl"></el-avatar>
              <el-divider></el-divider>
              <div>
                <el-row :gutter="5" type="flex" justify="center">
                  <el-col :span="8" style="text-align:right">名称:</el-col>
                  <el-col :span="16"><span>{{personalInfoDataGet['name']}}</span></el-col>
                </el-row>
                <el-row :gutter="5" type="flex" justify="center">
                  <el-col :span="8" style="text-align:right">性别:</el-col>
                  <el-col :span="16">
                    <i v-if="personalInfoDataGet['sex']=='男'" class="el-icon-male" style="color:blue">男</i>
                    <i v-else-if="personalInfoDataGet['sex']=='女'" class="el-icon-female" style="color:red">女</i>
                  </el-col>
                </el-row>
                <el-row :gutter="5" type="flex" justify="center">
                  <el-col :span="8" style="text-align:right">邮箱:</el-col>
                  <el-col :span="16"><span>{{personalInfoDataGet['email']}}</span></el-col>
                </el-row>
              </div>
              
            </el-card>
            <el-card shadow="always" class="second">
              <div>
                <el-row :gutter="5" type="flex" justify="left">
                  <el-col :span="6" style="text-align:right"><span>身份ID</span></el-col>
                  <el-col :span="10">{{personalInfoDataGet['userId']}}</el-col>
                </el-row>
              </div>
              <div>
                <el-row :gutter="5" type="flex" justify="left">
                  <el-col :span="6" style="text-align:right"><span>登录ID</span></el-col>
                  <el-col :span="10">{{personalInfoDataGet['loginId']}}</el-col>
                </el-row>
              </div>
              <div>
                <el-row :gutter="5" type="flex" justify="left">
                  <el-col :span="6" style="text-align:right"><span>手机</span></el-col>
                  <el-col :span="10">{{personalInfoDataGet['mobile']}}</el-col>
                </el-row>
              </div>
              <div>
                <el-row :gutter="5" type="flex" justify="left">
                  <el-col :span="6" style="text-align:right"><span>电话</span></el-col>
                  <el-col :span="10">{{personalInfoDataGet['phone']}}</el-col>
                </el-row>
              </div>
              <div>
                <el-row :gutter="5" type="flex" justify="left">
                  <el-col :span="6" style="text-align:right"><span>店铺ID</span></el-col>
                  <el-col :span="10">{{personalInfoDataGet['merchantId']}}</el-col>
                </el-row>
              </div>
              <div>
                <el-row :gutter="5" type="flex" justify="left">
                  <el-col :span="6" style="text-align:right"><span>基地ID</span></el-col>
                  <el-col :span="10">{{personalInfoDataGet['baseId']}}</el-col>
                </el-row>
              </div>
              <div>
                <el-row :gutter="5" type="flex" justify="left">
                  <el-col :span="6" style="text-align:right"><span>基地身份</span></el-col>
                  <el-col :span="10" v-if="personalInfoDataGet['baseIdentity']==1" style="color:#67C23A">基地管理员</el-col>
                  <el-col :span="10" v-else-if="personalInfoDataGet['baseIdentity']==0" style="color:#E6A23C">基地用户</el-col>
                  <el-col :span="10" v-else style="color:#F56C6C">无基地</el-col>
                </el-row>
              </div>
              <div>
                <el-row :gutter="5" type="flex" justify="left">
                  <el-col :span="6" style="text-align:right"><span>创建时间</span></el-col>
                  <el-col :span="10">{{personalInfoDataGet['creatDate']}}</el-col>
                </el-row>
              </div>
            </el-card>
        </div>
        <el-divider><i class="el-icon-user-solid"></i></el-divider>
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
import { mapState } from "vuex";
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
      imgUrl:"",
    };
  },
  methods: {},
  computed:{
    ...mapState(["photo"]), //和vuex联动
  },
  components: {
    commonHeader: commonHeader,
  },
  mounted() {
    this.imgUrl = this.photo;//拿到头像
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
      // background-image: url("../../assets/login1.jpg");
      // background-size: 100%;;
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

.personalInfo-div{
  height: 560px;
  display: flex;
  justify-content: center;
  .first{
    width: 28%;
    height: 80%;
    margin-right: 10px;
    text-align: center;
    border-radius: 30px;
    background-color: rgba(255,255,255,0.7);
    backdrop-filter:blur(50px);//高斯模糊实现毛玻璃效果
    -webkit-backdrop-filter: blur(50px);
    .avatar{
      border: 4px solid #E6A23C;
    }
    div{
      margin-top: 10px;
      font-size: 18px;
      font-weight: 600;
      span{
        color: #303133;
        
      }
      i{
        // font-size: 18px;
        font-weight: 600;
        color: red;
      }
    }
  }
  .second{
    width: 40%;;
    margin-left: 10px;
    border-radius: 30px;
    background-color: rgba(255,255,255,0.7);
    backdrop-filter:blur(50px);//高斯模糊实现毛玻璃效果
    -webkit-backdrop-filter: blur(50px);
    div{
      margin: 13px;
      span{
        width: 100px;
        color: #606266;
        font-weight: 550;
        text-align: center;
        border-radius: 5px;
        box-shadow: 4px 4px 5px #eb6811;
        &:hover{
          color: #606266;
          border: 5px solid rgba($color: #000000, $alpha: 0.0);
          cursor: pointer;
        }
      }
    }
  }
}
.el-divider{
  //分割线
  background-color: rgba($color: #003366, $alpha: 0.3);
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
