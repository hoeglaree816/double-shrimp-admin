<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>添加</h2>
    </div>
    <main>
      <!-- <el-row>
        <el-col :span="16">
          <el-form ref="data" :model="data" label-width="150px" :rules="rules">
            <el-form-item
              v-for="(value, name, index) in label"
              :key="index"
              :label="value"
              :prop="name"
            >
              <el-input
                v-if="value == '详细地址'"
                type="textarea" autosize
                v-model="data[name]"
                placeholder="请输入内容..."
              ></el-input>
              <el-input
                v-else
                v-model="data[name]"
                placeholder="请输入内容..."
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="form-button">
            <el-button type="success" @click="submitForm('data')"
              >确定</el-button
            >
            <el-button type="info" plain @click="resetForm('data')"
              >重置</el-button
            >
          </div>
        </el-col>
      </el-row> -->
      <el-row>
        <el-col :span="16">
          <el-form ref="data" :model="data" label-width="150px" :rules="rules">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="label.userId" prop="userId">
                  <el-input type="textarea" autosize v-model="data['userId']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="label.receiverName" prop="receiverName">
                  <el-input type="textarea" autosize v-model="data['receiverName']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 地区 -->
            <el-row>
              <el-col :span="14">
                <el-form-item label="地区">
                  <v-distpicker @province="provinceChange" :province="data['receiverProvince']" @city="cityChange" :city="data['receiverCity']" @area="areaChange" :area="data['receiverTown']"></v-distpicker>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                  <el-breadcrumb class="regionBreadcrumb" separator="/">
                    <el-breadcrumb-item>{{data['receiverProvince']}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{data['receiverCity']}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{data['receiverTown']}}</el-breadcrumb-item>
                  </el-breadcrumb>
              </el-col>
            </el-row>
            <el-form-item :label="label.receiverAddress" prop="receiverAddress">
              <el-input type="textarea" autosize v-model="data['receiverAddress']" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="label.receiverPhone" prop="receiverPhone">
                  <el-input v-model="data['receiverPhone']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="label.receiverCode" prop="receiverCode">
                  <el-input v-model="data['receiverCode']" placeholder="请输入内容"></el-input>
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
const model = require("../../js/v4/s4");
export default {
  data() {
    return {
      data: new model(),
      label: model.labelsII,
      rules: {//表单验证规则
        userId: [
          { required: true, message: "请输入用户Id", trigger: "blur" },
        ],
        receiverName: [
          { required: true, message: "请输入收货人姓名", trigger: "blur" },
        ],
        receiverPhone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
        ],
        receiverProvince: [
          { required: true, message: "请输入省份", trigger: "blur" },
        ],
        receiverCity: [
          { required: true, message: "请输入城市", trigger: "blur" },
        ],
        receiverTown: [
          { required: true, message: "请输入县区", trigger: "blur" },
        ],
        receiverAddress: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    add(){
      model.add(this.data).then((value) => {
        //提示用户操作情况
        if (value.data.flag) {
            this.$message({
              type: "success",
              message: value.data.message + " 状态码为：" + value.status,
            });
            this.$router.push("/v4/s4");
          } else {
            this.$message({
              type: "error",
              message: value.data.message + " 状态码为：" + value.status,
            });
          }
      })
    },
    back() {
      this.$router.push("/v4/s4");
    },
    submitForm(formName) {
      //整个表单验证
      const submit = this.$refs[formName].validate(valid => {
        if (valid) {
          if(!this.data['receiverProvince']||!this.data['receiverCity']||!this.data['receiverTown']){
              //提示表单验证失败-选择地区问题
              this.$message({
                showClose: true,
                message: "请选择完整的地区",
                type: "warning"
              });
          }else if(this.data['receiverProvince'] == '省'||this.data['receiverCity'] == '市'||this.data['receiverTown'] == '区'){
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
          // //验证成功
          // this.add();
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
      this.data['receiverProvince'] = data.value
    },
    cityChange(data){//市改变
      this.data['receiverCity'] = data.value
    },
    areaChange(data){//区、县改变
      this.data['receiverTown'] = data.value
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import '../../scss/s-insert.scss';
.form-button {
  display: flex;
  justify-content: flex-end;
}
</style>