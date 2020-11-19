<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>
        技术文章id为：<span>{{ id }}</span> 的详细信息
      </h2>
    </div>
    <main>
      <el-row
        class="txt-row"
        v-for="(value, name, index) in label"
        :key="index"
      >
        <el-col
          class="txt-key"
          :span="3"
          v-if="name != 'content' && name != 'picture' && name != 'recommend' && name !='state'  && name !='module'"
          >{{ value }}：</el-col
        >
        <el-col
          class="txt-value"
          :span="20"
          v-if="name != 'content' && name != 'picture' && name != 'recommend' && name !='state' && name !='module'"
          >{{ data[0][name] }}</el-col
        >
      </el-row>

      <el-row class="txt-row">
        <el-col class="txt-key" :span="3">封面：</el-col>
        <el-image
          style="border: 1px solid #003366; width: 200px; height: 200px"
          :src="url"
        >
        </el-image>
        <el-row class="txt-row">
          <el-col class="txt-key" :span="3">正文：</el-col>
          <el-col
            class="txt-value"
            :span="20"
            v-html="data[0]['content']"
          ></el-col>
        </el-row>
      </el-row>
    </main>
  </div>
</template>

<script>
const model = require("../../js/v5/s5");
export default {
  data() {
    return {
      id: 0,
      data: [new model()],
      label: model.labels,
      // fileList: [],
      url: "",
      state: "",
    };
  },
  methods: {
    back() {
      this.$router.push(`/v5/s5?state=${this.state}`);
    },
  },
  mounted() {
    this.id = this.$route.query.id;
    // model.getById(this.id).then(value => {
    //   this.data = value;
    // });
    model.getById(this.id).then((value) => {
      this.data = value;
      console.log("value: ", value);
      // this.fileList.push({
      //   url: value[0].picture
      // });
      this.state = value[0].state;

      this.url =
        value[0].picture ||
        "http://134.175.208.235/group1/M00/00/0A/rBAAD18j6-CAXJntAAAhCkDNkuo847.jpg";
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/s-detail.scss";
</style>