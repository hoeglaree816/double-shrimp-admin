<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>
        修改<span>-</span>{{typeName}}id为：<span
          >{{ id }}</span
        >
        的详细信息
      </h2>
    </div>
    <main>
      <el-row>
        <el-col :span="16">
          <el-row
            class="txt-row"
            v-for="(value, name, index) in label"
            :key="index"
          >
            <el-col class="txt-key" :span="2" v-if="value !== '类型id'&&name!=='typeName'">{{
              value
            }}</el-col>
            <el-col class="txt-value" :span="22" v-if="value !== '类型id'&&name!=='typeName'">
              <el-input
                v-model="data[0].name"
                placeholder="请输入内容"
              ></el-input>
            </el-col>
          </el-row>
          <div v class="form-button">
            <el-button type="success" @click="update">确定修改</el-button>
          </div>
        </el-col>
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
    update() {
      model.update(this.data, this.id, this.type).then((value) => {
        this.$router.push("/v3/s5");
        this.open2();
      });
    },
    back() {
      this.$router.push("/v3/s5");
    },
    open2() {
      this.$message({
        message: "上传成功",
        type: "success",
      });
    },
  },
  created() {
    model.getType(this.type);
    model.getById(this.id, this.type).then((value) => {
      this.data = value;
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/s-update.scss";
.form-button {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
</style>