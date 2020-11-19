<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>修改<span>-</span>商铺Id为：<span>{{ id }}</span> 的详细信息</h2>
    </div>
    <main>
      <el-row>
        <el-col :span="16">
          <el-form ref="data" :model="data" label-width="150px" :rules="rules">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="label.merchantName" prop="merchantName">
                  <el-input type="textarea" autosize v-model="data['merchantName']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="label.merchantPhone" prop="merchantPhone">
                  <el-input type="textarea" autosize v-model="data['merchantPhone']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 地区 -->
            <el-row>
              <el-col :span="14">
                <el-form-item label="地区">
                  <v-distpicker @province="provinceChange" :province="data['merchantProvince']" @city="cityChange" :city="data['merchantCity']" @area="areaChange" :area="data['merchantTown']"></v-distpicker>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                  <el-breadcrumb class="regionBreadcrumb" separator="/">
                    <el-breadcrumb-item>{{data['merchantProvince']}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{data['merchantCity']}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{data['merchantTown']}}</el-breadcrumb-item>
                  </el-breadcrumb>
              </el-col>
            </el-row>
            <el-form-item :label="label.merchantAddress" prop="merchantAddress">
              <el-input v-model="data['merchantAddress']" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="label.merchantDesc" prop="merchantDesc">
                  <el-input v-model="data['merchantDesc']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="label.merchantRemarks" prop="merchantRemarks">
                  <el-input type="textarea" autosize v-model="data['merchantRemarks']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 两个图像合在一行 -->
            <el-row>
              <el-col :span="15">
                <el-form-item :label="label.merchantLogo">
                  <el-upload
                    class="upload-demo"
                    action="http://106.75.154.40:9005/information/upload"
                    :on-preview="handlePreview"
                    :on-success="handleAvatarSuccess"
                    :on-error="handleAvatarError"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    accept="image/jpeg, image/jpg, image/png"
                    list-type="picture">
                    <el-button size="small" type="warning" v-if="!fileList[0]">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload> 
                </el-form-item>
              </el-col>
              <el-col :span="15">
                <el-form-item :label="label.merchantQrcode">
                  <el-upload
                    class="upload-demo"
                    action="http://106.75.154.40:9005/information/upload"
                    :on-preview="handlePreview"
                    :on-success="handleAvatarSuccessII"
                    :on-error="handleAvatarError"
                    :on-remove="handleRemoveII"
                    :file-list="fileListII"
                    accept="image/jpeg, image/jpg, image/png"
                    list-type="picture">
                    <el-button size="small" type="primary"  v-if="!fileListII[0]">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload> 
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="form-button">
            <el-button type="success" @click="submitForm('data')">确定</el-button>
            <el-button type="info" plain @click="resetForm('data')">重置</el-button>
          </div>
        </el-col>
        <!-- <el-col :span="2">
          <div class="form-div"></div>
        </el-col>-->
      </el-row>
    </main>
    <div class="bottom">
      <span>@对虾全产业链云平台-管理后台</span>
    </div>
  </div>
</template>

<script>
const model = require("../../js/v4/s2");
export default {
   //有一个警告,把data：[new model]去掉后就没了
  data() {
    return {
      id: 0,
      data: new model(),
      label: model.labels,
      fileList:[],//商铺logo
      fileListII:[],//商铺二维码
      rules: {//验证规则
        merchantName: [{ required: true, message: "请输入商铺名称", trigger: "blur" }],
        merchantPhone: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
        merchantAddress: [{ required: true, message: "请输入详细地址", trigger: "blur" }],
        merchantDesc: [
          { required: true, message: "请输入商家介绍", trigger: "blur" },{
            min: 10,
            max: 200,
            message: "请输入 10 到 200 位的商家介绍",
            trigger: ["blur", "change"]
          }],
      },
    };
  },
  methods: {
    handlePreview(file) {
      console.log(file);
    },
    handleAvatarSuccess(response, file, fileList) {
      console.log(response)
      console.log(fileList[0].response.data)
      if (response.flag) {
        //最后一个地址替换成新生成的
        this.fileList = [
          {
            url: fileList[0].response.data
          }
        ];
      }
    },
    handleAvatarSuccessII(response, file, fileList) {
      console.log(response)
      console.log(fileList[0].response.data)
      if (response.flag) {
        //最后一个地址替换成新生成的
        this.fileListII = [
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
    handleRemoveII(file, fileList) {
      this.fileListII = fileList;
    },
    add(){
      model.update(this.data).then((value) => {
        //提示用户操作情况
        if (value.data.flag) {
            this.$message({
              type: "success",
              message: value.data.message + " 状态码为：" + value.status,
            });
            this.$router.push("/v4/s2");
          } else {
            this.$message({
              type: "error",
              message: value.data.message + " 状态码为：" + value.status,
            });
          }
      })
    },
    back() {
      this.$router.push("/v4/s2");
    },
    submitForm(formName) {
      // 整个表单验证
      const submit = this.$refs[formName].validate(valid => {
        if (valid) {
          this.data.merchantLogo =this.fileList[0] ? this.fileList[0].url :"";
          this.data.merchantQrcode =this.fileListII[0] ? this.fileListII[0].url :"";
          console.log(this.data)
          if(!this.fileList[0]||!this.fileListII[0]){
             //提示表单验证失败
              this.$message({
                showClose: true,
                message: "请上传商铺logo及商铺二维码！",
                type: "warning"
              });
          }else if(this.data['merchantProvince'] == '省'||this.data['merchantCity'] == '市'||this.data['merchantTown'] == '区'){
              //提示表单验证失败-选择地区问题
              this.$message({
                showClose: true,
                message: "请选择完整的地区",
                type: "warning"
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
              type: "error"
            });
            return false;
          }
      });
    },
    resetForm(formName) {
      //重置表单
      this.$refs[formName].resetFields();
    },
    // 1.8后加
    // v-distpicker事件
    provinceChange(data){//省改变
      this.data['merchantProvince'] = data.value
    },
    cityChange(data){//市改变
      this.data['merchantCity'] = data.value
    },
    areaChange(data){//区、县改变
      this.data['merchantTown'] = data.value
    }
  },
  created() {
    this.id = this.$route.query.id
    model.getById(this.id).then(value => {
      this.data = value[0];//应该是value[0],才能拿到数据
      console.log(this.data)
      this.fileList.push({
        url: value[0].merchantLogo
      });
      this.fileListII.push({
        url: value[0].merchantQrcode
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
.regionBreadcrumb{
  height: 41px;
  line-height: 41px;
  // background-color: red;
}
</style>