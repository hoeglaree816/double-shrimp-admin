<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>修改 {{ id }}</h2>
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
              <div class="block" v-if="name === 'typeId'">
                <el-cascader
                  v-model="type"
                  :options="options"
                  :props="{ label: 'name', value: 'id', children: 'children' }"
                  @change="handleType"
                >
                </el-cascader>
              </div>
            </el-col>
            <div v-if="name == 'file'" key="showIntellectualPropertyRights">
              <el-upload
                class="upload-demo"
                action="http://106.75.154.40:9005/information/upload"
                :on-remove="handleIntellectualPropertyRightsRemove"
                :on-exceed="handleIntellectualPropertyRightsExceed"
                :on-success="handleIntellectualPropertyRightsSuccess"
                accept="application/msword,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                :limit="1"
                :file-list="IntellectualPropertyRights"
              >
                <el-button size="small" type="warning">上传文件</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传一个文件(支持word,pdf格式)
                </div>
              </el-upload>
              <el-button
                style="margin-left: 75px"
                size="small"
                type="warning"
                @click="previewIntellectualPropertyRights"
                >预览文件</el-button
              >
            </div>
          </el-row>
          <div class="form-button">
            <el-button type="success" @click="update">确定修改</el-button>
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
      id: 0,
      data: new model(),
      picture: [],
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
    previewIntellectualPropertyRights() {
      const url = this.IntellectualPropertyRights[0]?.url;
      console.log("url: ", url);
      if (/(doc)|(docx)|(pdf)/.test(url)) {
        window.open(`http://ow365.cn/?i=23209&furl=${url}`);
        return;
      }
      this.errorTip("请上传文件后预览");
    },
    update() {
      if (this.IntellectualPropertyRights.length != 0) {
        this.data.file = this.IntellectualPropertyRights[0].url;
      } else {
        this.errorTip("请上传文件");
        return;
      }
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

      // console.log('this.data: ', this.data);
      model.update(this.data, this.data.id).then((code) => {
        if (code == 20000) {
          this.$router.push("/v3/s4");
          this.successTip("更新成功");
        } else {
          this.errorTip("更新失败");
        }
      });
    },
    back() {
      this.$router.push("/v3/s4");
    },
    handlePicRemove(file) {
      console.log(file);
      model.deleteDocOrPdf(file.url).then((code) => {
        if (code == 20000) {
          this.successTip("删除成功");
        } else {
          this.errorTip("删除失败");
        }
      });
      this.picture = [];
    },
    handlePicSuccess(response, file, fileList) {
      // console.log("file: ", file);
      this.picture = [
        {
          url: fileList[0].response.data,
          name: file.name,
        },
      ];
      // console.log(response);
      this.successTip("上传成功");
    },
    handlePicExceed(files, fileList) {
      this.errorTip("只能上传一张图片");
    },
    handleIntellectualPropertyRightsRemove(file) {
      console.log(file);
      model.deleteDocOrPdf(file.url).then((code) => {
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
      this.data.typeId = typeId[1];
    },
  },
  created() {
    this.id = this.$route.query.id;
    // 处理级联选择框
    model
      .getIntellectualPropertyRightsTypesByLevel(1)
      .then((res) => {
        this.options = res;
        return this.options;
      })
      .then((options) => {
        options.forEach((item, index) => {
          model
            .getIntellectualPropertyRightsTypesByParentId(item.id)
            .then((res) => {
              this.$set(this.options[index], "children", res);
            });
        });
      })
      // 初始化选择框和文件
      .then((types) => {
        // console.log('types: ', types);
        model.getById(this.id).then((value) => {
          console.log("value: ", value[0]);
          this.type = value[0].typeId;
          this.IntellectualPropertyRights = [
            {
              url: value[0].file,
              name: value[0].title,
            },
          ];
          this.data = value[0];
        });
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
.el-upload__tip {
  margin-left: 80px;
}
</style>