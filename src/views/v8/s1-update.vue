<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>
        修改
        <span>-</span>id为： <span>{{ id }}</span> 的详细信息
      </h2>
    </div>
    <main>
      <el-row>
        <el-col :span="24">
          <div class="form">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="90px"
              class="demo-ruleForm"
            >
              <div class="left">
                <el-form-item :label="label.content" prop="content">
                  <mq-editor
                    v-model="ruleForm.content"
                    upload-url="http://106.75.154.40:9005/information/upload"
                    fileName="file"
                    @input="editorinput"
                  />
                </el-form-item>
              </div>
              <div class="right">
                <!-- 将id和资讯类型放在同一行，节省空间 -->
                <el-row>
                  <el-col :span="13">
                    <el-form-item :label="label.id" prop="id">
                      <el-input
                        v-model.number="ruleForm.id"
                        placeholder="请输入内容"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item :label="label.typeId" prop="typeId">
                      <el-select v-model="ruleForm.typeId" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item :label="label.title" prop="title">
                  <el-input
                    type="textarea"
                    autosize
                    v-model="ruleForm.title"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
                <el-form-item :label="label.editor" prop="editor">
                  <el-input
                    type="textarea"
                    autosize
                    v-model="ruleForm.editor"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
                <el-form-item :label="label.summary" prop="summary">
                  <el-input
                    type="textarea"
                    autosize
                    v-model="ruleForm.summary"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  :label="label.creationTime"
                  prop="creationTime"
                  style="display: none"
                >
                  <el-input
                    v-model="ruleForm.creationTime"
                    placeholder="请输入内容"
                  ></el-input>
                  <!-- <el-date-picker v-model="ruleForm.creationTime" type="date" placeholder="选择日期"></el-date-picker> -->
                </el-form-item>
                <el-form-item label="封面">
                  <el-upload
                    :span="2"
                    class="upload-demo"
                    action="http://106.75.154.40:9005/information/upload"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="handleSuccess"
                    :file-list="fileList"
                    list-type="picture"
                  >
                    <el-button
                      size="small"
                      type="warning"
                      v-if="!fileList[0]"
                      class="btnTop"
                      >点击上传封面</el-button
                    >
                    <div slot="tip" class="el-upload__tip">
                      只能上传jpg/png文件，且不超过500kb
                    </div>
                  </el-upload>
                </el-form-item>
                <div class="form-button">
                  <!-- <el-form-item> -->
                  <el-button type="success" @click="submitForm('ruleForm')"
                    >确定更新</el-button
                  >
                  <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
                  <!-- </el-form-item> -->
                </div>
              </div>
            </el-form>
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
const model = require("../../js/v8/s1");
import mqEditor from "../../components/mq-editor";
export default {
  data() {
    return {
      label: model.labels,
      fileList: [],
      options: [],
      // 第一次获取原始图片数组
      first: false,
      // 原始图片数组
      originalImageList: [],
      // 即将更新的图片数组
      newImageList: [],
      content: "",
      ruleForm: {
        ...new model(),
        context: "",
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        editor: [{ required: true, message: "请输入作者", trigger: "blur" }],
        typeId: [
          {
            required: true,
            message: "请选择类型",
            trigger: "change",
          },
        ],
        content: [{ required: true, message: "请输入正文", trigger: "change" }],
      },
    };
  },
  methods: {
    editorinput(content, originalPicList) {
      this.originalImageList = [...this.originalImageList, ...originalPicList];
      this.content = content;
      if (this.first) return;
      this.first = true;
      this.originalImageList = model.getImageUrL(content);
    },
    submitForm(formName) {
      if (!this.fileList[0]) {
        // alert("请添加封面图片");
        this.$message({
          type: "warning",
          message: "请添加封面图片!",
        });
        return;
      }
      this.ruleForm.picture = this.fileList[0].url;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 处理删除的图片
          this.newImageList = model.getImageUrL(this.content);
          this.originalImageList = new Set(this.originalImageList);
          this.originalImageList = [...this.originalImageList];
          if (
            this.newImageList.sort().toString() !==
            this.originalImageList.sort().toString()
          ) {
            this.originalImageList.map((oItem) => {
              let flag = this.newImageList.every(
                (newItem) => oItem !== newItem
              );
              if (flag) {
                console.log(oItem);
                model.deleteImageByUrl(oItem);
              }
            });
          }
          console.log(this.ruleForm);
          // 合并版本3-1.6修改
          model.putNewById(this.ruleForm).then((value) => {
            if (value.data.flag) {
              this.$router.push("/v8/s1");
              this.$message({
                type: "success",
                message: "更新成功！",
              });
            } else {
              this.$message({
                type: "error",
                message: "更新失败！",
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    handlePreview(file) {
      console.log(file);
    },
    handleSuccess(response, file, fileList) {
      if (response.flag) {
        //最后一个地址替换成新生成的
        this.fileList = [
          {
            url: fileList[0].response.data,
          },
        ];
      }
    },
    // update() {
    //   this.data.picture
    //     ? (this.data.picture = this.fileList[0].url ? this.fileList[0].url : "")
    //     : "";
    //   model.update(this.data).then(value => {
    //     this.$router.push("/v2");
    //   });
    // },
    back() {
      this.$router.push("/v8/s1");
    },
  },
  created() {
    this.id = this.$route.query.id; //获得路径的id
    // 获取数据
    model.getById(this.id).then((value) => {
      console.log(value);
      this.ruleForm = value[0];
      this.fileList.push({
        url: value[0].picture,
      });
    });
    // 合并版本3-1.6新增
    model.getPoliciesTypes().then((value) => {
      this.options = value.data.data;
    });
    // model.typeIdList().then((value) => {
    //   this.options = value;
    // });
  },
  components: {
    mqEditor,
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/s-update.scss";
.btnTop {
  margin-top: 30px;
}
.demo-ruleForm {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.left {
  width: 60%;
}
.right {
  width: 40%;
  padding: 12px 15px;
}
.form-button {
  display: flex;
  justify-content: center;
  .el-button {
    margin-left: 90px; //对消form-labal的宽度，使其视觉居中
  }
}
</style>