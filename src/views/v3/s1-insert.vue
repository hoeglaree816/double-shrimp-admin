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
              v-if="name !== 'contentUrl' && name !== 'pic'"
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
              <el-select
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
              </el-select>
            </el-col>
            <div v-if="name == 'pic'" key="showPic">
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
            </div>
            <div v-if="name == 'contentUrl'" key="showVideo">
              <el-upload
                class="upload-demo"
                action="http://106.75.154.40:9005/information/upload"
                :on-remove="handleVideoRemove"
                :on-exceed="handleVideoExceed"
                :on-success="handleVideoSuccess"
                accept="video/*"
                :limit="1"
                :file-list="video"
              >
                <el-button size="small" type="warning">上传视频</el-button>
                <div slot="tip" class="el-upload__tip">只能上传一个视频</div>
              </el-upload>
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
let zp_axios = require("axios");
let myzp_axios = zp_axios.create();
const model = require("../../js/v3/s1");
import { Loading } from "element-ui";
export default {
  data() {
    return {
      data: new model(),
      picture: [],
      video: [],
      options: [],
      type: "",
    };
  },
  computed: {
    newLabel() {
      return {
        title: "标题",
        typeId: "分类",
        brief: "简介",
        pic: "封面",
        contentUrl: "视频",
      };
    },
  },
  methods: {
    add() {
      this.data.createBy = this.$store.state.userName;
      this.data.updateBy = this.$store.state.userName;
      if (
        this.data.title == "" ||
        this.data.typeId == "" ||
        this.data.brief == ""
      ) {
        this.errorTip("请填写全部信息");
        return;
      }
      if (this.picture.length != 0) {
        this.data.pic = this.picture[0].url;
      } else {
        this.errorTip("请上传封面");
        return;
      }
      if (this.video.length != 0) {
        this.data.contentUrl = this.video[0].url;
      } else {
        this.errorTip("请上传视频");
        return;
      }
      model.add(this.data).then((code) => {
        if (code == 20000) {
          this.$router.push("/v3/s1");
          this.successTip("添加成功");
        } else {
          this.errorTip("添加失败");
        }
      });
    },
    back() {
      this.$router.push("/v3/s1");
    },
    handlePicRemove(file, fileList) {
      console.log(file, fileList);
      model.deletePicOrVideo(file.response.data).then((code) => {
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
    handleVideoRemove(file, fileList) {
      console.log(file, fileList);
      model.deletePicOrVideo(file.response.data).then((code) => {
        if (code == 20000) {
          this.successTip("删除成功");
        } else {
          this.errorTip("删除失败");
        }
      });
      this.video = [];
    },
    handleVideoSuccess(response, file, fileList) {
      console.log('response: ', response);
      this.video = [
        {
          url: fileList[0].response.data,
          name: file.name,
        },
      ];
      this.successTip("上传成功");
    },
    handleVideoExceed(files, fileList) {
      this.errorTip("只能上传一个视频");
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
    model.getEduTypes().then((res) => {
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