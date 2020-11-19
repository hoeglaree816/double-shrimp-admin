<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>
        审核<span>-</span>技术文章id为：<span>{{ id }}</span> 的详细信息
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
            <el-col
              class="txt-key"
              :span="3"
              v-if="name != 'content' && name != 'picture'"
              >{{ value }}：</el-col
            >
            <el-col
              class="txt-value"
              :span="20"
              v-if="name != 'content' && name != 'picture'"
              >{{ data[name] }}</el-col
            >
          </el-row>
          <el-row class="txt-row">
            <el-col class="txt-key" :span="3">封面：</el-col>
            <el-image style="border: 1px solid #003366;width:200px;height:200px" :src="url"> </el-image>
            <el-row class="txt-row">
              <el-col class="txt-key" :span="3">正文：</el-col>
              <el-col
                class="txt-value"
                :span="20"
                v-html="data['content']"
              ></el-col>
            </el-row>
          </el-row>
          <div class="form-button">
            <el-row>
              <el-radio v-model="radio" label="1">审核通过</el-radio>
              <el-radio v-model="radio" label="0">审核不通过</el-radio>
            </el-row>
          </div>
          <div class="form-button">
            <el-button type="success" @click="submitVerify">确定提交</el-button>
          </div>
        </el-col>
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
      radio: "1",
      url: "",
    };
  },
  methods: {
    submitVerify() {
      let flag;
      console.log(this.radio);
      switch (parseInt(this.radio)) {
        case 1:
          flag = true;
          break;
        case 0:
          flag = false;
          break;
      }
      model.verify(this.id, flag).then((res) => {
        if (res.flag)
          this.$message({
            type: "success",
            message: res.message,
          });
        else
          this.$message({
            type: "error",
            message: "出现错误",
          });
        this.back();
      });
    },
    back() {
      this.$router.push(`/v5/s5?state=0`);
    },
  },
  mounted() {
    this.id = this.$route.query.id;
    model.getById(this.id).then((res) => {
      res = res[0];
      this.url = res.picture;
      if (res) {
        switch (res.state) {
          case 0:
            res.state = "未审核";
            break;
          case 1:
            res.state = "审核成功";
            break;
          case 2:
            res.state = "审核失败";
            break;
        }
        this.data = res;
      }
    });
    console.log(this.id);
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/s-update.scss";
.btnTop {
  margin-top: 30px;
}
.form-button {
  margin-top: 12px;
  display: flex;
  justify-content: center;
}
</style>