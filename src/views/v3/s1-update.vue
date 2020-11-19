<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>修改 {{ id }}</h2>
    </div>
    <main>
      <el-row>
        <el-col :span="18">
          <el-row class="txt-row" v-for="(value, name, index) in label" :key="index">
            <el-col style="text-align:center" class="txt-key" :span="2" v-if="value!=='图片'&& value!=='视频' && value!=='id'&&value!=='创建者'&&value!=='创建时间'&&value!=='更新者'&&value!=='更新时间'">{{ value }}:</el-col>
            <el-col class="txt-value" :span="22" v-if="value!=='图片'&& value!=='视频' && value!=='id'&&value!=='创建者'&&value!=='创建时间'&&value!=='更新者'&&value!=='更新时间'">
              <el-input type="textarea" autosize wrap="hard" v-model="data[0][name]" placeholder="请输入内容" v-if="value!=='分类'"></el-input>
              <el-select v-model="type" placeholder="请选择" v-if="value === '分类' ">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <div style="margin-left:100px">
            <el-upload
              class="upload-demo"
              action="http://106.75.154.40:9005/information/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :file-list="fileList"
              :on-exceed="handleExceed"
              list-type="picture"
              :limit="1"
            >
              <el-button size="small" type="primary">点击更新上传图片</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
            <div id="beauty">
              <input id="upload_file" style="width:200px;height:40px;cursor:pointer;" type="file" @change="v_upload_files" multiple="false" />
              <el-button class="adjust_position" id="beauty_upload" size="small" type="warning">点击更新上传视频/文档</el-button>
              <div style="margin-top:20px" slot="tip" class="el-upload__tip">支持文档格式(pdf,doc,ppt,pptx)</div>
              <div class="video_name" style="margin-top:10px">{{zp_video_name}}</div>
            </div>
          </div>
          <div class="form-button">
            <el-button type="success" @click="update">立即更新</el-button>
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
const model = require("../../js/v3/s1");
import { Loading } from 'element-ui';
export default {
  data() {
    return {
      id: 0,
      data: [new model()],
      label: model.labels,
      fileList: [],
      zp_video_name:'',
      zp_video_url:'',
      options: [],
        type: ''
    };
  },
  methods: {
    update() {
      Array.from(this.options).forEach(item=>{
              if(item.value == this.type){
                this.data[0].typeId=item.value;
                }
            })
      this.data[0].updateBy=this.$store.state.userName || "";
      this.data[0].pic = this.fileList.length?this.fileList[0].url:'';
      this.zp_video_url?this.data[0].videoUrl=this.zp_video_url:'';
      this.data[0].vedio = true;//默认为视频
      if(/(doc)|(ppt)|(pdf)|(pptx)/g.test(this.data[0].videoUrl))this.data[0].vedio=false;
      model.update(this.data, this.id).then(value => {
        this.$router.push("/v3/s1");
        this.open2();
      });
    },
    back() {
      this.$router.push("/v3/s1");
    },
    v_upload_files(e) {
      let files = e.target.files ||"";
      if(files[0].type.startsWith('video') || /(doc)|(ppt)|(pdf)|(pptx)/gi.test(files[0].name)){
        let formData = new FormData();
        formData.append("file", files[0]);
        console.log(files);
        let url = "http://106.75.154.40:9005/information/upload";
        let headers = {
          "Content-Type": "multipart/form-data"
        };
        let loadingInstance1 = Loading.service({body:true,background:"transparent"});
        let time=setTimeout(() => {
              loadingInstance1.close();
              this.open4('上传超时');
          }, 3000);
        zp_axios.post(url, formData, { headers: headers }).then(res => {
            console.log(res);
            res = res.data
          if(res.code==20000){
            if(res.data){
              this.zp_video_name=files[0].name;
              this.zp_video_url=res.data;
            }
            this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
              loadingInstance1.close();
              clearTimeout(time);
              this.open2();
            });
          }else{
            this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
              loadingInstance1.close();
              this.open4(res.message);
            });
          }
        e.target.value=""
        }).catch(err=>{loadingInstance1.close();this.open4(err)});     
      }else{
        this.open4('执行出错');
        e.target.value=""
          return;
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      fileList=[];
        this.fileList = fileList;
    },
    handlePreview(file) {
      console.log(file);
    },
    handleSuccess(response, flie, fileList) {
      this.fileList =[
        {
          url:fileList[0].response.data,
        }
      ];
      this.open2();
    },
    handleExceed(files, fileList) {
      this.open4('只能上传一张图片');
    },
    open2() {
      this.$message({
        message: "上传成功",
        type: "success"
      });
    },
    open4(info) {
      this.$message.error(`${info}`);
    },
    gettype(){
      zp_axios
        .get("http://106.75.154.40:9012/education/educationTypes")
        .then((res) => {
            console.log(res.data.data);
            let types=res.data.data;
            this.options=[];
            types.forEach(item=>this.options.push({value:item.id,label:item.name}))
            Array.from(this.options).forEach(item=>{
              console.log(this.data[0].typeId);
              if(item.value === this.data[0].typeId)this.type=item.label;
            })
        });
    }
  },
  async created() {
    this.id = this.$route.query.id;
    model.getById(this.id).then(value => {
      this.data = value;
      this.zp_video_name=this.data[0].videoUrl; 
      // 不能fileList[0]赋值，只能整个数组赋值
      if(this.data[0].pic){
        this.fileList=[
        {
          url:this.data[0].pic
        }];
      }
      this.gettype();
    });
   
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/s-update.scss";
.form-button{
  display: flex;
  justify-content: flex-end;
}
</style>