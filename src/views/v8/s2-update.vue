<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>修改<span>-</span>资讯类型id为：<span>{{ id }}</span> 的详细信息</h2>
    </div>
    <!-- <main>
      <el-row class="txt-row" v-for="(value, name, index) in label" :key="index">
        <el-col class="txt-key" :span="2">{{ value }}</el-col>
        <el-col class="txt-value" :span="20">
          <el-input v-model="data[0][name]" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <el-button type="primary" @click="update">确定</el-button>
        </el-col>
      </el-row>
    </main>-->
    <main>
      <el-row>
        <el-col :span="16">
          <el-form :model="data" :rules="rules" ref="data" label-width="100px" class="demo-ruleForm">
            <el-form-item :label="label.id" prop="id">
              <el-input v-model.number="data.id" placeholder="请输入内容" disabled></el-input>
            </el-form-item>
            <el-form-item :label="label.name" prop="name">
              <el-input v-model="data.name" placeholder="请输入内容"></el-input>
            </el-form-item>
            <!-- <el-form-item :label="label.parentId" prop="parentId">
              <el-input v-model="data.parentId" placeholder="请输入内容"></el-input>
            </el-form-item> -->
          </el-form>
          <div class="form-button">
              <el-button type="success" @click="update('data')">确定修改</el-button>
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
const model = require("../../js/v8/s2");
export default {
  data() {
    return {
      id: 0,
      data: new model(),
      label: model.labels,
      rules: {
        name: [{ required: true, message: "请输入资讯类型", trigger: "blur" }]
      }
    };
  },
  methods: {
    update(data) {
      this.$refs[data].validate(vaild => {
        if (vaild) {
          model.update(this.data).then(value => {
            // this.$router.push("/v2/s2");
            if(value.data.flag){
              this.$message({
                type:"success",
                message:"添加成功"
              })
              this.$router.push("/v8/s2");
            }else{
              this.$message({
                type:"error",
                message:"添加失败"
              })
            }
          });
        }
      });
    },
    back() {
      this.$router.push("/v8/s2");
    }
  },
  created() {
    this.id = this.$route.query.id;
    model.getById(this.id).then(value => {
      this.data = value[0];
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/s-update.scss";
.form-button{
  display: flex;
  justify-content: flex-end;
}
</style>