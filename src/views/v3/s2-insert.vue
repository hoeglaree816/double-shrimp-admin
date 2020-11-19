<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>添加</h2>
    </div>
    <main>
      <el-row>
        <el-col :span="18">
          <el-row class="txt-row" v-for="(value, name, index) in label" :key="index">
            <el-col style="text-align:center" class="txt-key" :span="2" v-if="name!=='id'">{{ value }}:</el-col>
            <el-col class="txt-value" :span="22" v-if="name!=='id'">
              <el-input v-model="data[name]" placeholder="请输入内容"></el-input>
            </el-col>
          </el-row>
          <div class="form-button">
            <el-button type="success" @click="add">确定添加</el-button>
          </div>
      </el-col>
      </el-row>
    </main>
    <div class="bottom">
      <span>@对虾全产业链云平台-管理后台</span>
    </div>
  </div>
</template>

<script>
const model = require("../../js/v3/s2");
export default {
  data() {
    return {
      data: new model(),
      label: model.labels
    };
  },
  methods: {
    add(){
      model.add(this.data).then((value) => {
        this.$router.push("/v3/s2");
        this.open2();
      })
    },
    back() {
      this.$router.push("/v3/s2");
    },
    open2() {
      this.$message({
        message: "上传成功",
        type: "success"
      });
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import '../../scss/s-insert.scss';
.form-button{
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
</style>