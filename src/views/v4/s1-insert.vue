<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>添加</h2>
    </div>
    <main>
      <!-- <el-row>
        <el-col :span="16">
          <el-form ref="data" :model="data" :rules="rules" label-width="150px" >
            <el-form-item v-for="(value, name, index) in label" :key="index" :label="value" :prop="name">
              <el-select v-if="value == '商品状态'" v-model="data[name]" placeholder="请选择" style="width:100px;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select v-else-if="value == '商品类别'" v-model="data[name]" placeholder="请选择">
                <el-option
                  v-for="item in optionsII"
                  :key="item.categoryId"
                  :label="item.categoryName"
                  :value="item.categoryId"
                ></el-option>
              </el-select>
              <el-input v-else-if="value == '商品标题'||value == '商品名称'||value == '商品产地'" type="textarea" autosize v-model="data[name]" placeholder="请输入内容..."></el-input>
              <el-input v-else v-model="data[name]" placeholder="请输入内容..."></el-input>
            </el-form-item>
            <el-form-item label="商品图片">
              <el-upload
                class="upload-demo"
                action="http://106.75.154.40:9012/info/information/upload"
                :on-preview="handlePreview"
                :on-success="handleAvatarSuccess"
                :on-error="handleAvatarError"
                :on-remove="handleRemove"
                :file-list="fileList"
                accept="image/jpeg, image/jpg, image/png"
                list-type="picture">
                <el-button size="small" type="warning"  v-if="!fileList[0]">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload> 
            </el-form-item>
          </el-form>
          <div class="form-button">
            <el-button type="success" @click="submitForm('data')">确定</el-button>
          <el-button type="info" plain @click="resetForm('data')">重置</el-button>
          </div>
        </el-col>
      </el-row> -->
      <el-row>
        <el-col :span="16">
          <el-form ref="data" :model="data" label-width="150px" :rules="rules">
            <!-- 商品名称和商品产地放在一行 -->
            <el-row>
              <el-col :span="12">
                <el-form-item :label="label.productName" prop="productName">
                  <el-input type="textarea" autosize v-model="data['productName']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="label.productArea" prop="productArea">
                  <el-input type="textarea" autosize v-model="data['productArea']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item :label="label.productTitle" prop="productTitle">
              <el-input type="textarea" autosize v-model="data['productTitle']" placeholder="请输入内容"></el-input>
            </el-form-item>
            <!-- 价格、单位、库存放在一行显示 -->
            <el-row>
              <el-col :span="8">
                <el-form-item :label="label.productPrice" prop="productPrice">
                  <el-input v-model="data['productPrice']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="label.productUnit" prop="productUnit">
                  <el-input v-model="data['productUnit']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="label.productNum" prop="productNum">
                  <el-input v-model="data['productNum']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item :label="label.productBarcode" prop="productBarcode">
              <el-input v-model="data['productBarcode']" placeholder="请输入内容"></el-input>
            </el-form-item>
            <!-- 商品类别、商品库存、商铺id放在一行 -->
            <el-row>
              <el-col :span="8">
                <el-form-item :label="label.categoryId" prop="categoryId">
                  <el-select  v-model="data['categoryId']" placeholder="请选择">
                    <el-option
                      v-for="item in optionsII"
                      :key="item.categoryId"
                      :label="item.categoryName"
                      :value="item.categoryId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="label.productStatus" prop="productStatus">
                  <el-select v-model="data['productStatus']" placeholder="请选择" style="width:100px;">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="label.merchantId" prop="merchantId">
                  <el-input v-model="data['merchantId']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item :label="label.productImages">
                  <!-- <el-input v-model="data['productImages']" placeholder="请输入内容"></el-input> -->
                  <!-- <el-image
                    style="width: 500px; height: 500px"
                    :src="data['productImages']"
                    >
                  </el-image> -->
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
import { labels } from '../../js/v4/s1';
const model = require("../../js/v4/s1");
export default {
  data() {
    return {
      data: new model(),
      label: model.labelsII,
      imageUrl: "", //要上传的图片的地址
      fileList:[],
      rules: {//验证规则
        productName: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        productTitle: [{ required: true, message: "请输入商品标题", trigger: "blur" }],
        productPrice: [{ required: true, message: "请输入商品单价", trigger: "blur" }],
        productUnit: [{ required: true, message: "请输入单位", trigger: "blur" }],
        productNum: [{ required: true, message: "请输入商品库存", trigger: "blur" }],
        categoryId: [{ required: true, message: "请输入商品类别", trigger: "blur" }],
        productArea: [{ required: true, message: "请输入商品产地", trigger: "blur" }],
      },
      options:[//商品状态
        {
          value: 1,
          label: '正常'
        }, {
          value: 2,
          label: '待审核'
        }, {
          value: 3,
          label: '下架'
        }
      ],
      optionsII:[],//商品类别
    };
  },
  methods: {
    handlePreview(file) {
      console.log(file);
    },
    handleAvatarSuccess(response, file, fileList) {
      if (response.flag) {
        //最后一个地址替换成新生成的
        this.fileList = [
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
    add(){
      model.add(this.data).then((value) => {
        //提示用户操作情况
        if (value.data.flag) {
            this.$message({
              type: "success",
              message: value.data.message + " 状态码为：" + value.status,
            });
            this.$router.push("/v4/s1");
          } else {
            this.$message({
              type: "error",
              message: value.data.message + " 状态码为：" + value.status,
            });
          }
      })
    },
    back() {
      this.$router.push("/v4/s1");
    },
    submitForm(formName) {
      // 整个表单验证
      const submit = this.$refs[formName].validate(valid => {
        if (valid) {
          this.data.productImages =this.fileList[0] ? this.fileList[0].url :""
          if(!this.fileList[0]){
             //提示表单验证失败
              this.$message({
                showClose: true,
                message: "请上传商品图片！",
                type: "error"
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
    }
  },
  mounted() {
    model.getCategoryId().then((value) =>{
      this.optionsII = value.data.data//拿到商品类别列表
      console.log(this.optionsII)
    })
  }
};
</script>

<style lang="scss" scoped>
@import '../../scss/s-insert.scss';
.form-button{
  display: flex;
  justify-content: flex-end;
}
</style>