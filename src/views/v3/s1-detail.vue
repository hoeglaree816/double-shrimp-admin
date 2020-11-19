<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>
        课程信息id为：
        <span>{{ id }}</span> 的详细信息
      </h2>
    </div>
    <main>
      <el-row class="txt-row" v-for="(value, name, index) in label" :key="index">
        <el-col class="txt-key" :span="2">{{ value=='视频'? (data[0]['vedio']?'视频教程':'文本教程'):value }}：</el-col>
        <el-col class="txt-value" :span="20" v-html="data[0][name]">
          <!-- {{ data[0][name] }} -->
          <el-button
            v-if="value=='视频' && !data[0]['vedio']"
            type="primary"
            @click="handleTextPreview(data[0]['videoUrl'])"
            target="_blank"
            class="preview"
            style="margin-left:10px;"
          >预览</el-button>
        </el-col>
        <div class="image_preview" v-if="value=='图片'">
          <img :src="data[0][name]" alt style="width:200px;height:200px;margin-left:120px;" />
        </div>
        <div class="video_preview" v-if="value=='视频' && data[0]['vedio']">
          <video
            :src="data[0][name]"
            controls
            name="media"
            style="margin-left:120px;width:300px;height:300px;"
          ></video>
        </div>
      </el-row>
    </main>
    <div class="bottom">
      <span>@对虾全产业链云平台-管理后台</span>
    </div>
  </div>
</template>

<script>
const model = require("../../js/v3/s1");
let zp_axios = require("axios");
export default {
  data() {
    return {
      id: 0,
      data: [new model()],
      label: model.labels,
    };
  },
  methods: {
    back() {
      this.$router.push("/v3/s1");
    },
    handleTextPreview(url) {
      console.log(/(doc)|(ppt)|(pptx)/.test(url));
      if (/(doc)|(ppt)|(pptx)/.test(url))
        window.open(
          `http://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
            url
          )}`
        );
      else window.open(url);
    },
    
  },
  created() {},
  mounted() {
    this.id = this.$route.query.id;
    model.getById(this.id).then((value) => {
      console.log(value);
      zp_axios
        .get(
          `http://106.75.154.40:9012/education/educationTypes/${value[0].typeId}`
        )
        .then((res) => {
          console.log(res.data);
          if (res.status == 200) {
            res = res.data;
            if (res.code == 20000) {
              value[0].typeId = res.data.name;
              this.data = value;
              this.data[0].detail =JSON.parse(JSON.stringify(this.data[0].detail).replace(/(\\n)/gi,'<br>'))//新增
              console.log(this.data, this.label);
            }
          }
        });
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/s-detail.scss";
</style>