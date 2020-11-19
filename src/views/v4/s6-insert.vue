<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>添加</h2>
    </div>
    <main>
      <!-- <el-row class="txt-row" v-for="(value, name, index) in label" :key="index">
        <el-col class="txt-key" :span="2">{{ value }}</el-col>
        <el-col class="txt-value" :span="20">
          <el-input v-model="data[name]" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <el-button type="primary" @click="add">确定</el-button>
        </el-col>
      </el-row> -->
      <el-row>
        <el-col :span="16">
          <el-form ref="data" :model="data" label-width="150px">
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
            <el-form-item label="商品图片">
              <el-upload
                class="upload-demo"
                action="http://134.175.208.235:9015/fastdfs/uploadFile"
                :on-success="handleAvatarSuccess"
                :on-error="handleAvatarError"
                accept="image/jpeg, image/jpg, image/png"
                list-type="picture"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过500kb
                </div>
              </el-upload>
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
const model = require("../../js/v4/s6");
export default {
  data() {
    return {
      data: new model(),
      label: model.labelsII,
    };
  },
  methods: {
    // handleAvatarSuccess(response, file, fileList) {
    //   this.imageUrl = URL.createObjectURL(file.raw);
    //   // console.log(response)
    //   console.log(file);
    //   // console.log(fileList)
    //   console.log(this.imageUrl);
    // },
    // handleAvatarError(err, file, fileList) {
    //   console.log(err);
    // },
    // add() {
    //   model.add(this.data).then((value) => {
    //     this.$router.push("/v4/s6");
    //   });
    // },
    // back() {
    //   this.$router.push("/v4/s6");
    // },
    // submitForm(formName) {
    //   console.log(this.fileList);
    //   //整个表单验证
    //   // const submit = this.$refs[formName].validate(valid => {
    //   //   if (valid) {
    //   //     //验证成功
    //   //     this.add();
    //   //   } else {
    //   //     //提示表单验证失败
    //   //     this.$message({
    //   //       showClose: true,
    //   //       message: "表单信息有错，请检查拼写/字数限制！",
    //   //       type: "error"
    //   //     });
    //   //     return false;
    //   //   }
    //   // });
    // },
    // resetForm(formName) {
    //   //重置表单
    //   // this.$refs[formName].resetFields();
    // },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "../../scss/s-insert.scss";
.form-button{
  display: flex;
  justify-content: flex-end;
}
</style>
