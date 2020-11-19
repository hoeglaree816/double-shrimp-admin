<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>修改<span>-</span>商品评论Id为：<span>{{ id }}</span> 的详细信息</h2>
    </div>
    <main>
      <!-- <el-row class="txt-row" v-for="(value, name, index) in label" :key="index">
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
          <el-form ref="data" :model="data" label-width="150px" :rules="rules">
            <el-form-item
              v-for="(value, name, index) in label"
              :key="index"
              :label="value"
              :prop="name"
            >
              <el-select v-if="value == '评论状态'" v-model="data[name]" placeholder="请选择" style="width:125px;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-input
                v-else
                v-model="data[name]"
                placeholder="请输入内容..."
              ></el-input>
            </el-form-item>
            <el-form-item label="商品图片">
            <el-upload
                class="upload-demo"
                action="http://123.56.161.2:9005/information/upload"
                :on-success="handleAvatarSuccess"
                :on-error="handleAvatarError"
                :on-remove="handleRemove"
                :file-list="fileList"
                accept="image/jpeg, image/jpg, image/png"
                list-type="picture">
                <el-button size="small" type="primary" v-if="!fileList[0]">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
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
      id: 0,
      data: new model(),
      label: model.labelsII,
      fileList: [],
      options:[//评论状态
        {
          value: "1",
          label: '待审核'
        }, {
          value: "2",
          label: '已审核可见'
        }, {
          value: "3",
          label: '不可查看'
        }
      ],
      rules: {//表单验证规则
        userId: [
          { required: true, message: "请输入用户id", trigger: "blur" },
        ],
        productId: [
          { required: true, message: "请输入商品id", trigger: "blur" },
        ],
        commentContent: [
          { required: true, message: "请输入评论内容", trigger: "blur" },
        ],
        commentStatus: [
          { required: true, message: "请注明评论状态", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    add(){
      model.update(this.data).then((value) => {
        //提示用户操作情况
        if (value.data.flag) {
            this.$message({
              type: "success",
              message: value.data.message + " 状态码为：" + value.status,
            });
            this.$router.push("/v4/s6");
          } else {
            this.$message({
              type: "error",
              message: value.data.message + " 状态码为：" + value.status,
            });
          }
      })
    },
    back() {
      this.$router.push("/v4/s6");
    },
    handleAvatarSuccess(response, file, fileList) {
      if (response.flag) {
        //最后一个地址替换成新生成的
        this.fileList = [
          {
            url: fileList[0].response.data
          }
        ];
      }
    },
    handleAvatarError(err, file, fileList){
      console.log(err)
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    submitForm(formName) {
      //整个表单验证
      const submit = this.$refs[formName].validate((valid) => {
        if (valid) {
          this.data.commentPic =this.fileList[0] ? this.fileList[0].url :""
          if(!this.fileList[0]){
             //提示表单验证失败
              this.$message({
                showClose: true,
                message: "请上传商品图片！",
                type: "error"
              });
          }else{
             //验证成功
              this.add();
          }
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
    this.id = this.$route.query.id
    model.getById(this.id).then(value => {
      this.data = value[0];
      this.fileList.push({
        url: value[0].commentPic
      });
    });
  }
};
</script>

<style lang="scss" scoped>
@import '../../scss/s-update.scss';
.form-button {
  display: flex;
  justify-content: flex-end;
}
</style>