<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="backList"></el-button>
      <h2>修改</h2>
    </div>
    <main>
      <!-- 表单 -->
      <el-form
        :hide-required-asterisk="true"
        :model="infoForm"
        :rules="rules"
        ref="infoFormRef"
        label-width="70px"
        label-position="left"
      >
        <el-row :gutter="30">
          <el-col :span="7">
            <el-form-item label="对虾种类" label-width="80px" prop="prawn">
              <el-input
                v-model="infoForm.prawn"
                placeholder="请输入虾苗种类"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="对虾价格/元" label-width="120px" prop="price">
              <el-input-number
                v-model="infoForm.price"
                controls-position="right"
                :min="1"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="时间" label-width="50px" prop="time">
              <el-date-picker
                v-model="infoForm.time"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="form-button">
        <el-button type="success" @click="editInfo">确定</el-button>
      </div>
    </main>
    <div class="bottom">
      <span>@对虾全产业链云平台-管理后台</span>
    </div>
  </div>
</template>
<script>
import axios from "axios";
const model = require("../../js/v7/s2");
export default {
  data() {
    return {
      // 表格信息
      infoForm: new model(),

      // id
      id: "",

      // 验证规则
      rules: model.rules,
    };
  },

  mounted() {
    this.id = this.$route.query.id;
    this.getInfo();
  },

  methods: {
    // 返回列表
    backList() {
      this.$router.push("/v7/s2");
    },

    // 获取要修改的信息
    getInfo() {
      let id = this.id;
      model.getInfo(id).then((res) => {
        if (res.code == 20000) {
          this.infoForm = res.data;
          this.$message.success("获取该信息成功！！");
        } else {
          this.$message.error("获取该信息失败！！");
        }
      });
    },

    // 修改信息
    editInfo() {
      this.$refs.infoFormRef.validate(async (valid) => {
        if (!valid) return false;
        let info = this.infoForm;
        info.time = model.time(info.time)
        model.edit(info).then((res) => {
          if (res.code == 20000) {
            this.$message.success("修改信息成功！！");
            this.$router.push("/v7/s2");
          } else {
            this.$message.error("修改信息失败！！");
          }
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/s-insert.scss";
.el-row {
  margin-bottom: 0;
}
</style>
