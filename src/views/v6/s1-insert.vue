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
            <el-form-item v-for="(value, name, index) in label" :key="index" :label="value" :prop="name">
              <el-radio-group v-if="value == '性别'" v-model="data[name]">
                  <el-radio border label='男'>男<i class="el-icon-male"></i></el-radio>
                  <el-radio border label='女'>女<i class="el-icon-female"></i></el-radio>
              </el-radio-group>
              <el-select v-else-if="value == '用户基地身份'" v-model="data[name]" placeholder="请选择" style="width:125px;">
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
          <el-form ref="data" :model="data" label-width="150px" :rules="rules">
            <!-- 用户登录账号和登录密码放在一行 -->
            <el-row>
              <el-col :span="12">
                <el-form-item :label="label.loginId" prop="loginId">
                  <el-input v-model="data['loginId']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="label.password" prop="password">
                  <el-input type="password" v-model="data['password']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 性别和用户基地身份放在一行 -->
            <el-row>
              <el-col :span="12">
                <el-form-item :label="label.sex">
                  <el-radio-group  v-model="data['sex']">
                    <el-radio border label='男'>男<i class="el-icon-male"></i></el-radio>
                    <el-radio border label='女'>女<i class="el-icon-female"></i></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="label.baseIdentity">
                  <el-select v-model="data['baseIdentity']" placeholder="请选择" style="width:150px;">
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
            <!-- 姓名和邮箱放在一行-->
            <el-row>
              <el-col :span="12">
                <el-form-item :label="label.name" prop="name">
                  <el-input v-model="data['name']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="label.email" prop="email">
                  <el-input v-model="data['email']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 手机和电话放在一行 -->
            <el-row>
              <el-col :span="12">
                <el-form-item :label="label.mobile" prop="mobile">
                  <el-input v-model="data['mobile']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="label.phone" prop="phone">
                  <el-input v-model="data['phone']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 基地id和店铺id放在一行 -->
            <el-row>
              <el-col :span="12">
                <el-form-item :label="label.baseId" prop="baseId">
                  <el-input v-model="data['baseId']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="label.merchantId" prop="merchantId">
                  <el-input v-model="data['merchantId']" placeholder="请输入内容"></el-input>
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
const model = require("../../js/v6/s1");
export default {
  data() {
    return {
      data: new model(),
      label: model.labels,
      options:[//商品状态
        {
          value: 1,
          label: '基地管理员'
        }, {
          value: 0,
          label: '基地用户'
        },{
          value: null,
          label: '无基地'
        }
      ],
      rules: {
        //表单验证规则
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: ["blur", "change"]
          }
        ],
        sex: [
          { required: true, message: "请选择性别", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          {
            min: 4,
            max: 8,
            message: "请输入 2 到 8 位的电话号码",
            trigger: ["blur", "change"]
          }
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请输入11位数的手机号码",
            trigger: ["blur", "change"]
          }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        loginId: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          },
          {
            min: 8,
            max: 16,
            message: "长度在 8 到 16 个字符",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 14,
            message: "长度在 6 到 14 个字符",
            trigger: ["blur", "change"]
          },
          // { validator: validatePass, trigger: ["blur", "change"] }
        ]
      }
    };
  },
  methods: {
    add() {
      console.log(this.data)
      model.add(this.data).then(value => {
        //提示用户操作情况
        if (value.data.flag) {
            this.$message({
              type: "success",
              message: value.data.message + " 状态码为：" + value.status,
            });
            this.$router.push("/v6/s1");
          } else {
            this.$message({
              type: "error",
              message: value.data.message + " 状态码为：" + value.status,
            });
          }
      });
    },
    back() {
      this.$router.push("/v6/s1");
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
.form-button{
  display: flex;
  justify-content: flex-end;
}

</style>