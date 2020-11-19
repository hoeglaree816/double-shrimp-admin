<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>商品Id为：<span>{{ id }}</span> 的详细信息</h2>
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
            <el-col v-if="value == '商品状态'" class="txt-value" :span="20">
              <el-tag size="small" type="success" effect="dark" v-if="data[0][name]=='1'"><span>正常</span></el-tag>
              <el-tag size="small" type="warning" effect="dark" v-else-if="data[0][name]=='2'"><span>待审核</span></el-tag>
              <el-tag size="small" type="info" effect="dark" v-else><span>下架</span></el-tag>
            </el-col>
            <el-col v-else class="txt-value" :span="20">{{ data[0][name] }}</el-col>
          </el-row>
        </div>
        <div class="right">
          <el-row>
            <el-col class="txt-key" :span="4">商品图片：</el-col>
            <el-col class="txt-value" :span="20">
              <el-image
                :src="this.data[0].productImages"
              >
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
const model = require("../../js/v4/s1");
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
      this.$router.push("/v4/s1");
    },
  },
  mounted() {
    this.id = this.$route.query.id;
    model.getById(this.id).then((value) => {
      this.data = value;
      // console.log(this.data[0].productImages)
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
