<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>修改 {{ id }}</h2>
    </div>
    <main>
      <!-- <el-row
        class="txt-row"
        v-for="(value, name, index) in label"
        :key="index"
      >
        <el-col class="txt-key" :span="2">{{ value }}</el-col>
        <el-col class="txt-value" :span="20">
          <el-input v-model="data[0][name]" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <el-button type="primary" @click="add">确定</el-button>
        </el-col>
      </el-row> -->
      <el-row>
        <el-col :span="16">
          <el-form ref="data" :model="data" label-width="200px" :rules="rules">
            <el-form-item
              v-for="(value, name, index) in label"
              :key="index"
              :label="value"
              :prop="name"
            >
              <el-input
                v-model="data[name]"
                placeholder="请输入内容..."
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="form-button">
            <el-button type="success" @click="submitForm('data')"
              >确定</el-button
            >
            <el-button type="info" plain @click="resetForm('data')"
              >重置</el-button
            >
          </div>
        </el-col>
        <!-- <el-col :span="2">
          <div class="form-div"></div>
        </el-col> -->
      </el-row>
    </main>
    <div class="bottom">
      <span>@对虾全产业链云平台-管理后台</span>
    </div>
  </div>
</template>

<script>
const model = require("../../js/v6/s3");
export default {
  data() {
    return {
      id: 0,
      data: new model(),
      label: model.labels,
      rules: {
        //表单验证规则
        name: [
          { required: true, message: "请输入权限名称", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "请输入2到15个字符长度的名称",
            trigger: ["blur", "change"],
          },
        ],
        remarks: [
          { required: true, message: "请输入权限解释", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "请输入 1 到 50 个字符的权限解释",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
    add() {
      model.update(this.data).then((value) => {
        this.$router.push("/v6/s3");
      });
    },
    back() {
      this.$router.push("/v6/s3");
    },
    submitForm(formName) {
      //整个表单验证
      const submit = this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证成功
          this.add();
        } else {
          //提示表单验证失败
          this.$message({
            showClose: true,
            message: "表单信息有错，请检查拼写/字数限制！",
            type: "error",
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      //重置表单
      this.$refs[formName].resetFields();
    },
  },
  created() {
    this.id = this.$route.query.id;
    model.getById(this.id).then((value) => {
      if(value.data.flag)
      this.data = value.data.data;
      else
      this.$message({
        type:'error',
        message:'获取详细信息失败！！！'
      })
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/s-update.scss";
.form-button {
  display: flex;
  justify-content: flex-end;
}

</style>
