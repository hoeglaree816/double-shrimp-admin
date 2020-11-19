<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>
        商品Id为：<span>{{ id }}</span> 的详细信息
      </h2>
    </div>
    <main>
      <div class="content">
        <div class="left">
          <el-row
            class="txt-row"
            v-for="(value, name, index) in label"
            :key="index"
          >
            <el-col class="txt-key" :span="4">{{ value }}：</el-col>
            <el-col class="txt-value" :span="20">{{ data[0][name] }}</el-col>
          </el-row>
        </div>
        <div class="right">
          <el-row>
            <el-col class="txt-key" :span="4">商铺二维码：</el-col>
            <el-col
              class="txt-value"
              :span="20"
            >
              <el-image :src="data[0]['merchantQrcode']">
              </el-image>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="txt-key" :span="4">商铺logo：</el-col>
            <el-col
              class="txt-value"
              :span="20"
            >
              <el-image :src="data[0]['merchantLogo']">
              </el-image>
            </el-col>
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
const model = require("../../js/v4/s2");
export default {
  data() {
    return {
      id: 0,
      data: [new model()],
      label: model.labelsIII,
    };
  },
  methods: {
    back() {
      this.$router.push("/v4/s2");
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
</style>
