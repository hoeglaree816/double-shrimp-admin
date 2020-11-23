<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>
        {{ typeName }}id为：<span>{{ id }}</span>
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
const model = require("../../js/v3/s5");
export default {
  data() {
    return {
      id: this.$route.query.id,
      data: [new model()],
      label: model.labels,
      type: this.$route.query.type,
      typeName: model.typeName,
    };
  },
  methods: {
    back() {
      this.$router.push("/v3/s5");
    },
  },
  created() {
    model.getType(this.type);
    this.typeName = model.typeName;
    model.getById(this.id, this.type).then((value) => {
      this.data = value;
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/s-detail.scss";
</style>