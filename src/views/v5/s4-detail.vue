<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>
        {{ typeInfo == 0 ? "专家类型" : "文章类型" }}id为：<span>{{ id }}</span>
        的详细信息
      </h2>
    </div>
    <main>
      <el-row
        class="txt-row"
        v-for="(value, name, index) in label"
        :key="index"
      >
        <el-col class="txt-key" :span="2">{{ value }}：</el-col>
        <el-col class="txt-value" :span="20">{{ data[0][name] }}</el-col>
      </el-row>
    </main>
  </div>
</template>

<script>
const model = require("../../js/v5/s4");
export default {
  data() {
    return {
      id: 0,
      data: [new model()],
      label: model.labels,
      type: 0,
    };
  },
  methods: {
    back() {
      this.$router.push("/v5/s4");
    },
  },
  mounted() {
    this.id = this.$route.query.id;
    this.type = this.$route.query.type;
    model.getById(this.id, this.type).then((value) => {
      console.log(value);
      this.data = value;
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/s-detail.scss";
</style>