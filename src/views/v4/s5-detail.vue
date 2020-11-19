<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>商品类别id为：<span>{{ id }}</span> 的详细信息</h2>
    </div>
    <main>
      <el-row
        class="txt-row"
        v-for="(value, name, index) in label"
        :key="index"
      >
        <el-col class="txt-key" :span="2">{{ value }}：</el-col>
        <el-col v-if="value =='是否为父类'&&data[0][name]==false" class="txt-value" :span="20">否</el-col>
        <el-col v-else-if="value =='是否为父类'&&data[0][name]==true" class="txt-value" :span="20">是</el-col>
        <el-col v-else class="txt-value" :span="20">{{ data[0][name] }}</el-col>
      </el-row>
    </main>
    <div class="bottom">
      <span>@对虾全产业链云平台-管理后台</span>
    </div>
  </div>
</template>

<script>
const model = require("../../js/v4/s5");
export default {
  data() {
    return {
      id: 0,
      data: [new model()],
      label: model.labels,
    };
  },
  methods: {
    back() {
      this.$router.push("/v4/s5");
    },
  },
  mounted() {
    this.id = this.$route.query.id;
    model.getById(this.id).then((value) => {
      this.data = value;
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/s-detail.scss";
</style>
