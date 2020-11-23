<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>产业资讯id为：<span>{{ id }}</span> 的详细信息</h2>
    </div>
    <main>
      <div class="content">
        <div class="left">
          <el-row class="txt-row" v-for="(value, name, index) in label" :key="index">
            <el-col class="txt-key" :span="4">{{ value }}：</el-col>
            <el-col v-if="value == '是否推荐'" class="txt-value" :span="20">
              <i v-if="data[0][name] == false" class="el-icon-close"></i>
              <i v-else-if="data[0][name] == true" class="el-icon-check"></i>
              <i v-else class="el-icon-delete"></i>
            </el-col>
            <el-col v-else-if="value == '资讯类型'" class="txt-value" :span="20">{{ dataTypeIdName }}</el-col>
            <el-col v-else class="txt-value" :span="20">{{ data[0][name] }}</el-col>
          </el-row>
          <el-row class="txt-row">
            <el-col class="txt-key" :span="4">封面：</el-col>
            <el-image
            style="border:2px solid #003366;border-radius:6px;width:400px;"
            :src="url">
            </el-image>
          </el-row>
        </div>
        <div class="right">
          <el-row class="txt-row">
              <el-col class="txt-key" :span="2">正文：</el-col>
              <el-col class="txt-value" :span="20" v-html="data[0]['content']"></el-col>
          </el-row>
        </div>
      </div>
    </main>
    <div class="bottom">
      <span>@对虾全产业链云平台-管理后台</span>
    </div>
  </div>
</template>

<script>
const model = require("../../js/v2/s1");
export default {
  data() {
    return {
      id: 0,
      pn:0,
      ps:0,
      optionsValueByBack:'',
      // 以上四项是路由跳转时候带来的参数
      data: [new model()],
      label: model.labelsIII,
      // fileList: [],
      url:"",
      // 存储根据资讯类型id获取到资讯类型名称
      dataTypeIdName:"",
    };
  },
  methods: {
    back() {
      this.$router.push({
        path:"/v2/s1",
        query:{
          pn:this.pn,
          ps:this.ps,
          }
        }
      );
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.pn = this.$route.query.pn;
    this.ps = this.$route.query.ps;
    console.log(this.id,this.pn,this.ps)
    // model.getById(this.id).then(value => {
    //   this.data = value;
    // });
    model.getById(this.id).then(value => {
      this.data = value;
      // this.fileList.push({
      //   url: value[0].picture
      // });
      this.url =value[0].picture;
      model.getCategoryById(value[0].typeId).then(value =>{//拿到资讯类型id对应的值
        this.dataTypeIdName =value.data.data.name;
      })
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/s-detail.scss";
.content{
  width: 100%;
  display: flex;
}
.left{
  width: 50%;
}
.right{
  width: 50%;
}
// 状态的√、×的样式
.el-icon-close{
  color:#F56C6C;
  font-size: 23px;
  font-weight: bold;
}
.el-icon-check{
  color:#67C23A;
  font-size: 23px;
  font-weight: bold;
}
.right .txt-value{
  border:2px solid #003366;border-radius:6px;
}
</style>