<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>
        文稿信息id为：
        <span>{{ id }}</span> 的详细信息
      </h2>
    </div>
    <main>
      <el-row
        class="txt-row"
        v-for="(value, name, index) in label"
        :key="index"
      >
        <el-col class="txt-key" :span="2">{{ value }}：</el-col>
        <el-col
          class="txt-value"
          :span="20"
          v-if="name != 'contentUrl' && name != 'pic' && name != 'recommend'"
          key="noShowVedioAndPic"
        >
          {{ newData[0][name] }}
        </el-col>
        <el-col v-if="name == 'recommend'" class="txt-value" :span="20">
          <i v-if="newData[0][name] == false" class="el-icon-close"></i>
          <i v-else-if="newData[0][name] == true" class="el-icon-check"></i>
          <i v-else class="el-icon-delete"></i>
        </el-col>
        <div class="image_preview" v-if="name == 'pic'">
          <img
            :src="newData[0][name]"
            alt
            style="border: 2px solid #003366; border-radius: 6px; width: 400px"
          />
        </div>
        <div class="text_preview" v-if="name == 'contentUrl'">
          <el-row>
            <el-button
              size="small"
              type="warning"
              @click="previewManuscripts(newData[0][name])"
              >全屏预览</el-button
            >
          </el-row>
          <el-row style="margin-left: 100px; margin-top: 10px" v-if="showIframe">
            <iframe :src="url" style="border: 2px solid #003366;
                      border-radius: 6px;
                      width: 700px;
                      height:500px;" frameborder="0"></iframe>
          </el-row>
          <el-row style="margin-left: 100px; margin-top: 10px" v-else>暂无文章或者格式错误</el-row>
        </div>
      </el-row>
    </main>
    <div class="bottom">
      <span>@对虾全产业链云平台-管理后台</span>
    </div>
  </div>
</template>

<script>
const model = require("../../js/v3/s3");
export default {
  data() {
    return {
      id: 0,
      data: [new model()],
      label: model.labels,
      url: "",
      showIframe:false
    };
  },
  computed: {
    newData() {
      for (let key in this.data[0]) {
        if (key == "createDate" || key == "updateDate") {
          this.data[0][key] = model.formatTime(this.data[0][key]);
        }
      }
      return this.data;
    },
  },
  methods: {
    previewManuscripts(url) {
      console.log("url: ", url);
      if (/(ppt)|(pptx)/.test(url)) {
        window.open(`http://ow365.cn/?i=23209&furl=${url}`);
        return;
      }
      this.$message.error('暂无文章或者格式错误')
      
    },
    back() {
      this.$router.push("/v3/s3");
    },
  },
  created() {
    // console.log('this.$route.query: ', this.$route.query);
    this.id = this.$route.query.id;
  },
  mounted() {
    model
      .getManuscriptsTypes()
      .then((res) => {
        // console.log('res: ', res);
        return res;
      })
      .then((types) => {
        // console.log('types: ', types);
        model.getById(this.id).then((value) => {
          console.log("value: ", value);
          types.some((type) => {
            if (type.id == value[0].typeId) {
              value[0].typeId = type.name;
              return true;
            } else {
              return false;
            }
          });
          this.url = `http://ow365.cn/?i=23209&furl=${value[0].contentUrl}`;
          if(/(ppt)|(pptx)/.test(this.url)){
            this.showIframe = true;
          }
          this.data = value;
        });
      });
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/s-detail.scss";
// 状态的√、×的样式
.el-icon-close{
  color:#F56C6C;
  font-size: 23px;
  font-weight: bold;
}
.el-icon-check{
  color:#67C23A;
  font-size: 23px;
  font-weight: bold;
}
.right .txt-value{
  border:2px solid #003366;border-radius:6px;
}
</style>