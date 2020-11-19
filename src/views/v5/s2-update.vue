<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>审核<span>-</span>专家id为：<span>{{ id }}</span> 的详细信息</h2>
    </div>
    <main>
      <el-row>
        <el-col :span="16">
          <el-row class="txt-row" v-for="(value, name, index) in label" :key="index">
            <el-col style="text-align:right" class="txt-key" :span="3">{{ value }}：</el-col>
            <el-col class="txt-value"  :span="21" v-if="name != 'picture'">{{ data[name] }}</el-col>
            <div class="image_preview" v-if="name == 'picture'">
                <img :src="data['picture']" alt="" style="width:100px;height:100px;">
            </div>
          </el-row>
          <div class="form-button">
              <el-row>
              <el-radio v-model="radio" label="1">审核通过</el-radio>
              <el-radio v-model="radio" label="0">审核不通过</el-radio>
            </el-row>
            </div>
            <div class="form-button">
                <el-button type="success" @click="submitVerify">确定提交</el-button>
            </div>
        </el-col>
      </el-row>
    </main>
  </div>
</template>

<script>
const model = require("../../js/v5/s2");
export default {
  data() {
    return {
      id: 0,
      data: [new model()],
      label: model.labels,
      radio: '1'
    };
  },
  methods: {
    submitVerify(){
      let flag;
      console.log(this.radio);
      switch(parseInt(this.radio)){
        case 1 :flag=true;break;
        case 0 :flag=false;break;
      }
      model.verify(this.id,flag).then(res=>{
        console.log(res.data);
        res=res.data;
        if(res.flag)
        this.$message({
          type:"success",
          message:res.message,
        })
        else 
          this.$message({
            type:"error",
            message:'出现错误',
          })
        this.back();
      })
    },
    back() {
      this.$router.push(`/v5/s2?state=0`);
    },
  },
  mounted() {
    this.id = this.$route.query.id;
    model.getById(this.id).then(res => {
      res=res.data;
      if(res){
        switch(res.state){
          case 0:res.state='未审核';break;
          case 1:res.state='审核成功';break;
          case 2:res.state='审核失败';break;
        }
        this.data = res;
      }
      console.log(this.data);
    });
    console.log(this.id);
  }
};
</script>

<style lang="scss" scoped>
@import '../../scss/s-update.scss';
.form-button{
  margin-top: 12px;
  display: flex;
  justify-content: center;
}
</style>