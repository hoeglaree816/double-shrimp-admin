<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>添加</h2>
    </div>
    <main>
      <el-row>
        <el-col :span="18">
          <el-row
            class="txt-row"
            v-for="(value, name, index) in newLabel"
            :key="index"
          >
            <el-col style="text-align: center" class="txt-key" :span="2"
              >{{ value }}:</el-col
            >
            <el-col
              class="txt-value"
              :span="22"
              v-if="name !== 'file'"
              key="noshow"
            >
              <el-input
                type="textarea"
                wrap="hard"
                autosize
                v-model="data[name]"
                placeholder="请输入内容"
                v-if="name !== 'typeId'"
              ></el-input>
              <!-- <el-select
                v-model="type"
                placeholder="请选择"
                v-if="name === 'typeId'"
                @change="handleType"
              >
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select> -->
              <div class="block" v-if="name === 'typeId'">
                <el-cascader
                  v-model="type"
                  :options="options"
                  :props="{label:'name',value:'id'}"
                  @change="handleType"
                >
                </el-cascader>
              </div>
            </el-col>
            <!-- <div v-if="name == 'pic'" key="showPic">
              <el-upload
                class="upload-demo"
                action="http://106.75.154.40:9005/information/upload"
                :on-remove="handlePicRemove"
                :on-success="handlePicSuccess"
                :file-list="picture"
                :on-exceed="handlePicExceed"
                list-type="picture"
                accept="image/*"
                :limit="1"
              >
                <el-button size="small" type="warning">上传封面</el-button>
                <div slot="tip" class="el-upload__tip">只能上传一张图片</div>
              </el-upload>
            </div> -->
            <div v-if="name == 'file'" key="showIntellectualPropertyRights">
              <el-upload
                class="upload-demo"
                action="http://106.75.154.40:9005/information/upload"
                :on-remove="handleIntellectualPropertyRightsRemove"
                :on-exceed="handleIntellectualPropertyRightsExceed"
                :on-success="handleIntellectualPropertyRightsSuccess"
                accept="application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                :limit="1"
                :file-list="IntellectualPropertyRights"
              >
                <el-button size="small" type="warning">上传文件</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传一个文件(PPT格式)
                </div>
              </el-upload>
              <el-button
                style="margin-left: 78px"
                size="small"
                type="warning"
                @click="previewArcticle"
                >预览文件</el-button
              >
            </div>
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
const model = require("../../js/v3/s4");
import { Loading } from "element-ui";
export default {
  data() {
    return {
      data: new model(),
      // picture: [],
      IntellectualPropertyRights: [],
      options: [],
      type: "",
    };
  },
  computed: {
    newLabel() {
      return {
        title: "标题",
        typeId: "分类",
        editor: "作者",
        source: "来源",
        invention: "发明",
        standard: "标准",
        file: "文件",
      };
    },
  },
  methods: {
    previewArcticle() {
      const url = this.IntellectualPropertyRights[0]?.url;
      console.log("url: ", url);
      if (/(ppt)|(pptx)/.test(url)) {
        window.open(`http://ow365.cn/?i=23209&furl=${url}`);
        return;
      }
      this.errorTip("请上传文件后预览");
    },
    add() {
      if (
        this.data.title == "" ||
        this.data.typeId == "" ||
        this.data.editor == "" ||
        this.data.source == "" ||
        this.data.invention == "" ||
        this.data.standard == ""
      ) {
        this.errorTip("请填写全部信息");
        return;
      }
      // if (this.picture.length != 0) {
      //   this.data.pic = this.picture[0].url;
      // } else {
      //   this.errorTip("请上传封面");
      //   return;
      // }
      if (this.IntellectualPropertyRights.length != 0) {
        this.data.file = this.IntellectualPropertyRights[0].url;
      } else {
        this.errorTip("请上传文件");
        return;
      }

      // console.log(this.data);
      model.add(this.data).then((code) => {
        if (code == 20000) {
          this.$router.push("/v3/s4");
          this.successTip("添加成功");
        } else {
          this.errorTip("添加失败");
        }
      });
    },
    back() {
      this.$router.push("/v3/s4");
    },
    // handlePicRemove(file, fileList) {
    //   console.log(file, fileList);
    //   model.deletePicOrPPT(file.response.data).then((code) => {
    //     if (code == 20000) {
    //       this.successTip("删除成功");
    //     } else {
    //       this.errorTip("删除失败");
    //     }
    //   });
    //   this.picture = [];
    // },
    // handlePicSuccess(response, file, fileList) {
    //   // console.log("file: ", file);
    //   this.picture = [
    //     {
    //       url: fileList[0].response.data,
    //       name: file.name,
    //     },
    //   ];
    //   // console.log(response);
    //   this.successTip("上传成功");
    // },
    // handlePicExceed(files, fileList) {
    //   this.errorTip("只能上传一张图片");
    // },
    handleIntellectualPropertyRightsRemove(file, fileList) {
      console.log(file, fileList);
      model.deletePicOrPPT(file.response.data).then((code) => {
        if (code == 20000) {
          this.successTip("删除成功");
        } else {
          this.errorTip("删除失败");
        }
      });
      this.IntellectualPropertyRights = [];
    },
    handleIntellectualPropertyRightsSuccess(response, file, fileList) {
      // console.log("file: ", file);
      this.IntellectualPropertyRights = [
        {
          url: fileList[0].response.data,
          name: file.name,
        },
      ];
      // console.log(response);
      this.successTip("上传成功");
    },
    handleIntellectualPropertyRightsExceed(files, fileList) {
      this.errorTip("只能上传一个文件");
    },
    successTip(message) {
      this.$message({
        message,
        type: "success",
      });
    },
    errorTip(info) {
      this.$message.error(`${info}`);
    },
    handleType(typeId) {
      this.data.typeId = typeId;
    },
  },

  mounted() {
    model.getIntellectualPropertyRightsTypesByLevel().then((res) => {
      this.options = res;
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/s-insert.scss";
.root {
  .form-button {
    display: flex;
    justify-content: flex-end;
  }
  .el-upload__tip {
    margin-left: 80px;
  }
}
</style>