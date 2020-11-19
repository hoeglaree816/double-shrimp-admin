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
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="产量/kg" label-width="80px" prop="outPut">
              <el-input-number
                v-model="infoForm.outPut"
                controls-position="right"
                :min="1"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="养殖面积/m^2" label-width="120px" prop="area">
              <el-input-number
                v-model="infoForm.area"
                controls-position="right"
                :min="1"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
              label="消费量/元"
              label-width="80px"
              prop="measureOfConsumption"
            >
              <el-input-number
                v-model="infoForm.measureOfConsumption"
                controls-position="right"
                :min="1"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item
              label="消费额/元"
              label-width="120px"
              prop="sumOfConsumption"
            >
              <el-input-number
                v-model="infoForm.sumOfConsumption"
                controls-position="right"
                :min="1"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="地区" label-width="80px" prop="region">
              <el-select v-model="infoForm.region" placeholder="请选择">
                <el-option
                  v-for="item in city"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="年份/年" label-width="120px" prop="time">
              <el-input-number
                v-model="infoForm.time"
                controls-position="right"
                :min="2000"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="form-button">
        <el-button type="success" @click="editInfo">确定</el-button>
        <!-- <el-button type="info" plain @click="resetForm">重置</el-button> -->
      </div>
    </main>
    <div class="bottom">
      <span>@对虾全产业链云平台-管理后台</span>
    </div>
  </div>
</template>
<script>
import axios from "axios";
const model = require("../../js/v7/s1");
export default {
  data() {
    return {
      // 基地信息
      infoForm: new model(),

      // id
      id: "",

      // 验证规则
      rules: model.rules,

      // 城市
      city: model.city,
    };
  },

  mounted() {
    this.id = this.$route.query.id;
    this.getInfo();
  },

  methods: {
    // 返回列表
    backList() {
      this.$router.push("/v7/s1");
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
        model.edit(info).then((res) => {
          if (res.code == 20000) {
            this.$message.success("修改信息成功！！");
            this.$router.push("/v7/s1");
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
