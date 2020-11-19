<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>修改<span>-</span>文章类型id为：<span>{{ id }}</span> 的详细信息</h2>
    </div>
    <main>
      <el-row>
        <el-col :span="16">
          <el-row class="txt-row" v-for="(value, name, index) in label" :key="index">
            <el-col class="txt-key" :span="2" v-if="value!=='类型id'">{{ value }}</el-col>
            <el-col class="txt-value" :span="22" v-if="value!=='类型id'">
              <el-input v-model="data[0].name" placeholder="请输入内容"></el-input>
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
const model = require("../../js/v5/s6");
export default {
  data() {
    return {
      id: 0,
      data: [new model()],
      label: model.labels
    };
  },
  methods: {
    update(){
      model.update(this.data,this.id).then((value) => {
        this.$router.push("/v5/s6");
        this.open2();
      })
    },
    back() {
      this.$router.push("/v5/s6");
    },
    open2() {
      this.$message({
        message: "上传成功",
        type: "success"
      });
    }
  },
  created() {
    this.id = this.$route.query.id
    model.getById(this.id).then(value => {
      this.data = value;
      console.log(value);
    });
  }
};
</script>

<style lang="scss" scoped>
@import '../../scss/s-update.scss';
.form-button{
 margin-top: 15px;
 display: flex;
 justify-content: center;
}
</style>