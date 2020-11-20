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
      <el-row
        class="txt-row"
        v-for="(value, name, index) in label"
        :key="index"
      >
        <el-col class="txt-key" :span="2">{{ value }}：</el-col>
        <el-col
          class="txt-value"
          :span="20"
          v-if="name != 'contentUrl' && name != 'pic'"
          key="noShowVedioAndPic"
        >
          {{ newData[0][name] }}
        </el-col>
        <div class="image_preview" v-if="name == 'pic'">
          <img
            :src="newData[0][name]"
            alt
            style="width: 200px; height: 200px; "
          />
        </div>
        <div class="video_preview" v-if="name == 'contentUrl'">
          <video
            :src="newData[0][name]"
            controls
            name="media"
            style="
              
              margin-top: -35px;
              width: 300px;
              height: 300px;
            "
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
  computed: {
    newData(){
      for(let key in this.data[0]){
        if(key == 'createDate' || key == 'updateDate'){
          this.data[0][key] = model.formatTime( this.data[0][key]);
        }
      }
      return this.data
    }
  },
  methods: {
    back() {
      this.$router.push("/v3/s1");
    },
    
    // handleTextPreview(url) {
    //   console.log(/(doc)|(ppt)|(pptx)/.test(url));
    //   if (/(doc)|(ppt)|(pptx)/.test(url))
    //     window.open(
    //       `http://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
    //         url
    //       )}`
    //     );
    //   else window.open(url);
    // },
  },
  created() {
    // console.log('this.$route.query: ', this.$route.query);
    this.id = this.$route.query.id;
  },
  mounted() {
    model
      .getEduTypes()
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
          this.data = value;
        });
      });
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/s-detail.scss";
</style>