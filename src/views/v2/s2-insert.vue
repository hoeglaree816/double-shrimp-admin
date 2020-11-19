<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>添加</h2>
    </div>
    <main>
      <el-row>
        <el-col :span="15">
        <el-form :model="data" :rules="rules" ref="data" label-width="100px" class="demo-ruleForm">
          <!-- <el-form-item :label="label.id" prop="id">
            <el-input v-model.number="data.id" placeholder="请输入内容"></el-input>
          </el-form-item> -->
          <el-form-item :label="label.name" prop="name">
            <el-input v-model="data.name" placeholder="请输入内容"></el-input>
          </el-form-item>
          <!-- <el-form-item :label="label.parentId" prop="parentId">
            <el-input v-model="data.parentId" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item :label="label.state" prop="parentId">
            <el-input v-model="data.state" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item :label="label.module" prop="parentId">
            <el-input v-model="data.module" placeholder="请输入内容"></el-input>
            <div>
              <el-radio-group v-model="data.module">
                  <el-radio :label='0' border>备选项0</el-radio>
                  <el-radio :label='1' border>备选项1</el-radio>
              </el-radio-group>
            </div>
          </el-form-item> -->
        </el-form>
        <div class="form-button">
              <el-button type="success" @click="add('data')">确定添加</el-button>
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
const model = require("../../js/v2/s2");
export default {
  data() {
    return {
      data: new model(),
      label: model.labels,
      rules: {
        name: [{ required: true, message: "请输入资讯类型", trigger: "blur" }]
      }
    };
  },
  methods: {
    add(data) {
      this.$refs[data].validate(valid => {
        if (valid) {
          model.add(this.data).then(value => {
            if(value.data.flag){
              this.$message({
                type:"success",
                message:"修改成功"
              })
              this.$router.push("/v2/s2");
            }else{
              this.$message({
                type:"error",
                message:"修改失败"
              })
            }
            
          });
        }
      });
    },
    back() {
      this.$router.push("/v2/s2");
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../../scss/s-insert.scss";
.form-button{
  display: flex;
  justify-content: center;
}
</style>