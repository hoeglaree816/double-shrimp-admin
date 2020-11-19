<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>添加</h2>
    </div>
    <main>
      <el-row>
        <el-col :span="18">
          <el-row class="txt-row" v-for="(value, name, index) in label" :key="index">
            <el-col style="text-align:center" class="txt-key" :span="2" v-if="value!=='图片' && value!=='视频' && value!=='id'&&value!=='创建者'&&value!=='创建时间'&&value!=='更新者'&&value!=='更新时间'">{{ value }}:</el-col>
            <el-col class="txt-value" :span="22" v-if="value!=='图片'&& value!=='视频' && value!=='id'&&value!=='创建者'&&value!=='创建时间'&&value!=='更新者'&&value!=='更新时间'">
              <el-input type="textarea" wrap="hard" autosize v-model="data[name]" placeholder="请输入内容" v-if="value!=='分类'"></el-input>
              <el-select v-model="type" placeholder="请选择" v-if="value === '分类' " @change="handletype">
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
              <el-button size="small" type="primary">上传视频封面</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
            <!-- <el-button style="display:none;" :plain="true" @click="open2">成功</el-button> -->
            <!-- <el-button style="display:none;" :plain="true" @click="open4">错误</el-button> -->
            <div id="beauty">
              <input id="upload_file" type="file" @change="v_upload_files" multiple="false"  accept="video/*,.pdf,.ppt,.pptx,application/vnd.ms-powerpoint,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"/>
              <el-button class="adjust_position" id="beauty_upload" size="small" type="warning">上传视频/文档</el-button>
              <div style="margin-top:20px" slot="tip" class="el-upload__tip">支持文档格式(pdf,doc,ppt,pptx)</div>
              <div class="video_name" style="margin-top:10px;">{{zp_video_name}}</div>
            </div>
          </div>
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
import { Loading } from 'element-ui';
export default {
  data() {
    return {
      data: new model(),
      label: model.labels,
      fileList: [],
      zp_video_name:'',
      zp_video_url:'',
      options: [],
        type: ''
    };
  },
  methods: {
    add() {
      this.data.createBy=this.$store.state.userName;
      this.data.pic=this.fileList.length?this.fileList[0].url:'';
      this.data.videoUrl=this.zp_video_url?this.zp_video_url:'';
      this.data.vedio = true;//默认为视频
      if(/(doc)|(ppt)|(pdf)|(pptx)/g.test(this.data.videoUrl))this.data.vedio=false;
      model.add(this.data).then(value => {
        this.$router.push("/v3/s1");
        this.open2();
      });
    },
    back() {
      this.$router.push("/v3/s1");
    },
    v_upload_files(e) {
      let files = e.target.files;
      if(files[0].type.startsWith('video') || /(doc)|(ppt)|(pdf)|(pptx)/gi.test(files[0].name)){
          let formData = new FormData();
          // formData重复的往一个值添加数据并不会被覆盖掉，可以全部接收到，可以通过formData.getAll('files')来查看所有插入的数据
          formData.append("file", files[0]);
          console.log(formData);
          // 将本地视频传给后台处理
          let url = "http://106.75.154.40:9005/information/upload";
          let headers;
          let configs = {
              headers : {
              "Content-Type": "multipart/form-data"
            }
          }
          let loadingInstance1 = Loading.service({body:true,background:"transparent"});
          let time=setTimeout(() => {
              loadingInstance1.close();
              this.open4('上传超时');
          }, 3000);
          myzp_axios.post(url,formData, configs).then(res => {
            console.log(res)
            if(res.status==200){
              res = res.data;
              if(res.code == 20000){
                if(res.data){
                  this.zp_video_url=res.data;
                  this.zp_video_name=files[0].name;
                }
                loadingInstance1.close();
                clearTimeout(time);
                this.open2();
              }else{
                loadingInstance1.close();
                this.open4(res.message);
              }
            }
            e.target.value=""
          }).catch(err=>{this.open4(err)});
        }
        else{
          e.target.value=""
          this.open4('执行出错');
          return;
        }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
        fileList=[]
        this.fileList = fileList;
    },
    handlePreview(file) {
    },
    handleSuccess(response, flie, fileList) {
      this.fileList = [
        {
          url:fileList[0].response.data,
        }
      ];
      console.log(response);
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
    handletype(typeId){
      this.data.typeId=typeId;
    },
    gettype(){
      zp_axios
        .get("http://106.75.154.40:9012/education/educationTypes")
        .then((res) => {
            let types=res.data.data;
            this.options=[];
            types.forEach(item=>this.options.push({value:item.id,label:item.name}))
        });
    }
  },
  mounted() {
    this.gettype();
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/s-insert.scss";
.form-button{
  display: flex;
  justify-content: flex-end;
}
</style>