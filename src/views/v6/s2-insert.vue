<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>添加</h2>
    </div>
    <main>
      <!-- <el-row>
        <el-col :span="16">
          <el-form ref="data" :model="data" label-width="200px" :rules="rules">
            <el-form-item
              v-for="(value, name, index) in label"
              :key="index"
              :label="value"
              :prop="name"
            > 
              <el-select v-if="value == '是否可用'" v-model="data[name]" placeholder="请选择" style="width:100px;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-input v-else v-model="data[name]" placeholder="请输入内容..."></el-input>
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
          <el-form ref="data" :model="data" label-width="200px" :rules="rules">
            <!-- <el-form-item
              v-for="(value, name, index) in label"
              :key="index"
              :label="value"
              :prop="name"
            >
            <el-select v-if="value == '是否可用'" v-model="data[name]" placeholder="请选择" style="width:100px;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-input v-else v-model="data[name]" placeholder="请输入内容..."></el-input>
            </el-form-item> -->
            <!-- 用户登录账号和姓名放在一行 -->
            <el-row>
              <el-col :span="12">
                <el-form-item :label="label.name" prop="name">
                  <el-input v-model="data['name']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="label.useable" prop="useable">
                  <el-select v-model="data['useable']" placeholder="请选择" style="width:100px;">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="label.remarks" prop="remarks">
                  <el-input type="textarea" autosize v-model="data['remarks']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
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
      </el-row>
    </main>
    <div class="bottom">
      <span>@对虾全产业链云平台-管理后台</span>
    </div>
  </div>
</template>

<script>
const model = require("../../js/v6/s2");
export default {
  data() {
    return {
      data: new model(),
      label: model.labels,
      options:[//是否可用
        {
          value: 1,
          label: '可用'
        }, {
          value: 0,
          label: '不可用'
        }
      ],
      rules: {
        //表单验证规则
        name: [
          { required: true, message: "请输入角色", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: ["blur", "change"]
          }
        ],
        useable: [
          { required: true, message: "请选择是否可用", trigger: "blur" },
        ],
        remarks: [
          { required: true, message: "请输入你的备注", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "请输入 1 到 100 位之间的备注信息",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    add() {
      model.add(this.data).then(value => {
        //提示用户操作情况
        if (value.data.flag) {
            this.$message({
              type: "success",
              message: value.data.message + " 状态码为：" + value.status,
            });
            this.$router.push("/v6/s2");
          } else {
            this.$message({
              type: "error",
              message: value.data.message + " 状态码为：" + value.status,
            });
          }
      });
    },
    back() {
      this.$router.push("/v6/s2");
    },
    submitForm(formName) {
      //整个表单验证
      const submit = this.$refs[formName].validate(valid => {
        if (valid) {
          //验证成功
          console.log(this.data)
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
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../../scss/s-insert.scss";
.form-button {
  display: flex;
  justify-content: flex-end;
}

</style>