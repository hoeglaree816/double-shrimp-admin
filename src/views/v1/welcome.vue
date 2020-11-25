<template>
<!-- 权限提示页面 -->
  <div id="welcome">
    <el-row>
      <el-col :span="5">
        <div class="row-null"></div>
      </el-col>
      <el-col :span="14" class="form-col">
        <div class="row-null"></div>
        <el-card class="box-card" shadow="hover" body-style="border-top:1px solid #003366;">
          <div slot="header">
            <span>情况说明:</span>
          </div>
          <div class="box-card-divII">
            <p>欢迎进入 <span>基地管理</span> 模块，您拥有下面展示的权限！！！</p>
          </div>
          <el-divider content-position="center">拥有权限列表</el-divider>
          <el-row class="box-card-row">
            <el-col :span="5" style="text-align:center;">
              <el-tag>{{functionList.remarks}}</el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col>
            <el-col :span="19">
              <el-row class="box-card-rowII" v-for="(item,i1) in functionList.children" :key="i1">
                <el-col :span="5" style="text-align:center;"><el-tag type="success">{{item.remarks}}</el-tag><i class="el-icon-caret-right"></i></el-col>
                <el-col :span="19"> <el-tag type="warning" class="box-card-IIItag" v-for="(item2,i2) in item.children" :key="i2">{{item2.remarks}}</el-tag></el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-divider content-position="center">
            <i class="el-icon-check"></i>
          </el-divider>
        </el-card>
      </el-col>
      <el-col :span="5">
        <div class="row-null"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "welcome",
  data() {
    return {
      functionList:"",
    };
  },
  mounted(){
    new Promise((resolve) => {
      const loading = this.$loading({//设置加载中效果-服务方式
          lock: true,
          text: '获取权限中...',
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
        method: "get",
        url: "http://106.75.154.40:9003/admin/authority/" + 'enterprise',
        // url: "http://106.75.154.40:9012/authority/admin/authority/" + 'enterprise',
      }).then((res) => {
        resolve(res)
        loading.close();//关闭加载中效果
        const token = res.headers.token; //拿到请求头的token
        window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
      });
      axios.interceptors.request.eject(myInterceptor);
    }).then((res)=>{
      if(res.data.flag){
        this.functionList =res.data.data[0]
      }else{
        this.$message({
          type:'error',
          message:res.data.message,
          duration:3500
        })
      }
    })
  }
};
</script>
<style lang="scss" scoped>
#welcome {
  //主体
  background-image: url("../../assets/login1.jpg");
  background-size: 100% 100%;
  height: 100%;
}
.row-null {
  //左右留白
  height: 80px;
  width: 100%;
}
.box-card {//卡片
  width: 100%;
  margin-top: 80px;
  background-color: #F7FBFA;
  span{
    text-align: center;
  }
}
.box-card-divII{//卡片提示内容
  height: 60px;
  width:100%;
  text-align: center;
  line-height: 60px;
  p{
    font-size: 24px;
    span{
      font-size: 24px;
      color: #e7910f;
    }
  }
}
.box-card-row{
  display: flex;
  align-items: center;
}
.box-card-rowII{
  margin-bottom: 5px;;
}
.box-card-IIItag{
  margin-left: 8px;
}
</style>
