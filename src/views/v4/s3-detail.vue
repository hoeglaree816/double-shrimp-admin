<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>订单id为：<span>{{ id }}</span> 的详细信息</h2>
    </div>
    <main>
      <el-row
        class="txt-row"
        v-for="(value, name, index) in label"
        :key="index"
      >
        <el-col class="txt-key" :span="2">{{ value }}：</el-col>
        <el-col v-if="value == '交易状态'" class="txt-value" :span="20">
          <el-tag  size="small" type="warning" effect="dark" v-if="data[0][name]==1"><span>未付款</span></el-tag>
          <el-tag  size="small" type="success" effect="dark" v-else-if="data[0][name]==2"><span>已付款</span></el-tag>
          <el-tag  size="small" type="warning" effect="dark" v-else-if="data[0][name]==3"><span>未发货</span></el-tag>
          <el-tag  size="small" type="success" effect="dark" v-else><span>已发货</span></el-tag>
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
const model = require("../../js/v4/s3");
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
      this.$router.push("/v4/s3");
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
