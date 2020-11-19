<template>
  <div class="root">
    <div class="title">
        <el-button icon="el-icon-back" circle @click="back"></el-button>
        <h2>角色id为：<span>{{ id }}</span> 的详细信息</h2>
    </div>
    <main>
      <el-row class="txt-row" v-for="(value, name, index) in label" :key="index"  :gutter="10">
        <el-col class="txt-key" :span="3">{{ value }}：</el-col>
        <el-col v-if="value =='是否可用'&&data[0][name]==1" class="txt-value" :span="20">
          <el-tag type="success" effect="dark" size="small"><span>可用</span></el-tag>
        </el-col>
        <el-col v-else-if="value =='是否可用'&&data[0][name]!=1" class="txt-value" :span="20">
          <el-tag type="warning" effect="dark" size="small"><span>不可用</span></el-tag>
        </el-col>
        <el-col v-else class="txt-value" :span="20">{{ data[0][name] }}</el-col>
      </el-row>
    </main>
    <div class="bottom">
      <span>@对虾全产业链云平台-管理后台</span>
    </div>
  </div>
</template>

<script>
const model = require("../../js/v6/s2");
export default {
  data() {
    return {
      id: 0,
      data: [new model()],
      label: model.labels
    };
  },
  methods: {
    back(){
      this.$router.push('/v6/s2')
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    model.getById(this.id).then(value => {
      if(value.data.flag)
      this.data = [value.data.data];//规定使用数组
      else
      this.$message({
        type:'error',
        message:'获取详细信息失败！！！'
      })
    });
  }
};
</script>

<style lang="scss" scoped>
@import '../../scss/s-detail.scss';
.col-div{
  height: 10px;
}
</style>