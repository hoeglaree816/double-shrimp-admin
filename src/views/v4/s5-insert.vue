<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>添加</h2>
    </div>
    <main>
          <!-- <el-row class="txt-row" v-for="(value, name, index) in label" :key="index">
            <el-col class="txt-key" :span="2">{{ value }}</el-col>
            <el-col class="txt-value" :span="20">
              <el-input v-model="data[name]" placeholder="请输入内容"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2">
              <el-button type="primary" @click="add">确定</el-button>
            </el-col>
          </el-row> -->
      <el-row>
        <el-col :span="16">
          <el-form ref="data" :model="data" label-width="150px" :rules="rules">
            <el-form-item
              v-for="(value, name, index) in label"
              :key="index"
              :label="value"
              :prop="name"
            >
              <el-select v-if="value == '是否为父类'" v-model="data[name]" placeholder="待选" style="width:80px;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select v-else-if="value == '父类id'" v-model="data[name]" placeholder="请选择" style="width:250px;">
                <el-option
                  v-for="item in optionsII"
                  :key="item.categoryId"
                  :label="item.categoryName"
                  :value="item.categoryId"
                ></el-option>
              </el-select>
              <el-select v-else-if="value == '类别等级'" v-model="data[name]" placeholder="待选" style="width:80px;">
                <el-option
                  v-for="item in optionsIII"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
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
        <!-- <el-col :span="2">
          <div class="form-div"></div>
        </el-col> -->
      </el-row>
    </main>
    <div class="bottom">
      <span>@对虾全产业链云平台-管理后台</span>
    </div>
  </div>
</template>

<script>
const model = require("../../js/v4/s5");
export default {
  data() {
    return {
      data: new model(),
      label: model.labelsII,
      options:[//是否为父类
        {
          value: true,
          label: '是'
        }, {
          value: false,
          label: '否'
        }
      ],
      optionsII:[],//可作为父类的商品类别
      optionsIII:[//类别等级
        {
          value: 1,
          label: '1级'
        }, {
          value: 2,
          label: '2级'
        }, {
          value: 3,
          label: '3级'
        }, 
      ],
      rules: {//表单验证规则
        parentId: [
          { required: true, message: "请输入父类id", trigger: "blur" },
        ],
        sortOrder: [
          { required: true, message: "请输入排序编号", trigger: "blur" },
        ],
        categoryName: [
          { required: true, message: "请输入类别名称", trigger: "blur" },
        ],
        level: [
          { required: true, message: "请输入类别等级", trigger: "blur" },
        ],
        isParent: [
          { required: true, message: "是否为父类", trigger: "blur" },
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
            this.$router.push("/v4/s5");
          } else {
            this.$message({
              type: "error",
              message: value.data.message + " 状态码为：" + value.status,
            });
          }
      })
    },
    back() {
      this.$router.push("/v4/s5");
    },
    submitForm(formName) {
      //整个表单验证
      const submit = this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.data)
          //验证成功
          this.add();
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
  },
  mounted() {
    model.getCategoryId().then((value) =>{
      this.optionsII = value.data.data//拿到商品类别列表
      this.optionsII.unshift(//在数组头部添加不作为父类的选项
        {
          categoryId: "0",
          categoryName: '无父类'
        }
      )
    })
  }
};
</script>

<style lang="scss" scoped>
@import '../../scss/s-insert.scss';
.form-button {
  display: flex;
  justify-content: flex-end;
}
</style>