<template>
  <div class="root">
    <div class="title">
        <el-button icon="el-icon-back" circle @click="back"></el-button>
        <h2>审核帖子id为：<span>{{ id }}</span> 的详细信息</h2>
    </div>
    <main>
      <el-row class="txt-row" v-for="(value, name, index) in label" :key="index">
        <el-col class="txt-key" :span="2">{{ value }}：</el-col>
        <el-col class="txt-value"  :span="20" v-if="name != 'images'">{{ data[name] }}</el-col>
        <div class="image_preview" v-if="name == 'images'" style="display:flex;flex-wrap:wrap;">
          <div v-for="(value,index) in data['images']" :key="index" style="margin-left:10px;width:210px;">
            <img :src="value" alt="" style="width:200px;height:200px;">
          </div>
        </div>
        
      </el-row>
    </main>
  </div>
</template>

<script>
const model = require("../../js/v5/s1");
let zp_axios = require("axios");
export default {
  data() {
    return {
      id: 0,
      data: [new model()],
      label: model.labels,
      state:''
    };
  },
  methods: {
    back(){
      this.$router.push(`/v5/s1?state=${this.state}`);
    },
    
  },
  mounted() {
    this.id = this.$route.query.id;
    model.getById(this.id).then(res => {
      res=res.data;
      if(res){
        this.state=res.state;
        if(res.images)//2020.7.31新加
        res.images=res.images.split(',');
        switch(res.state){
          case 0:res.state='未审核';break;
          case 1:res.state='审核成功';break;
          case 2:res.state='审核失败';break;
        }
        this.data = res;
        console.log(this.data);
      }
    });
  },
}
</script>

<style lang="scss" scoped>
@import '../../scss/s-detail.scss';
</style>