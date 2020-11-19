<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
      <h2>修改<span>-</span>订单Id为：<span>{{ id }}</span> 的详细信息</h2>
    </div>
    <main>
      <!-- <el-row class="txt-row" v-for="(value, name, index) in label" :key="index">
        <el-col class="txt-key" :span="2">{{ value }}</el-col>
        <el-col class="txt-value" :span="20">
          <el-input v-model="data[0][name]" placeholder="请输入内容"></el-input>
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
            <!-- 用户id和商品id -->
            <el-row>
              <el-col :span="12">
                <el-form-item :label="label.userId" prop="userId">
                  <el-input type="textarea" autosize v-model="data['userId']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="label.productId" prop="productId">
                  <el-input type="textarea" autosize v-model="data['productId']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 实付金额和邮费 -->
            <el-row>
              <el-col :span="12">
                <el-form-item :label="label.orderPayment" prop="orderPayment">
                  <el-input v-model="data['orderPayment']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="label.postage" prop="postage">
                  <el-input v-model="data['postage']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 购买数量和教育状态 -->
            <el-row>
              <el-col :span="12">
                <el-form-item :label="label.num" prop="num">
                  <el-input v-model="data['num']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="label.orderPaymentType" prop="orderPaymentType">
                  <el-input v-model="data['orderPaymentType']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 收货地址id和交易状态 -->
            <el-row>
              <el-col :span="12">
                <el-form-item :label="label.addressId" prop="addressId">
                  <el-input type="textarea" autosize v-model="data['addressId']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="label.orderStatus" prop="orderStatus">
                  <el-select v-model="data['orderStatus']" placeholder="请选择" style="width:100px;">
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
                <el-form-item :label="label.orderDeliveryTime" prop="orderDeliveryTime">
                  <el-input v-model="data['orderDeliveryTime']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="label.orderLogisticsName" prop="orderLogisticsName">
                  <el-input type="textarea" autosize v-model="data['orderLogisticsName']" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item :label="label.orderLogisticsNumber" prop="orderLogisticsNumber">
              <el-input v-model="data['orderLogisticsNumber']" placeholder="请输入内容"></el-input>
            </el-form-item>
            <!-- <el-form-item
              v-for="(value, name, index) in label"
              :key="index"
              :label="value"
              :prop="name"
            >
              <el-select v-if="value == '交易状态'" v-model="data[name]" placeholder="请选择" style="width:100px;">
                <el-option
                  v-for="item in options"
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
            </el-form-item> -->
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
const model = require("../../js/v4/s3");
 //有一个警告,把data：[new model]去掉后就没了
export default {
  data() {
    return {
      id: 0,
      data: new model(),
      label: model.labelsIII,
      options:[//交易状态
        {
          value: 1,
          label: '未付款'
        }, {
          value: 2,
          label: '已付款'
        }, {
          value: 3,
          label: '未发货'
        }, {
          value: 4,
          label: '已发货'
        },
      ],
      rules: {//表单验证规则
        userId: [
          { required: true, message: "请输入用户Id", trigger: "blur" },
        ],
        productId: [
          { required: true, message: "请输入商品Id", trigger: "blur" },
        ],
        num: [
          { required: true, message: "请输入购买数量", trigger: "blur" },
        ],
        addressId: [
          { required: true, message: "请输入地址id", trigger: "blur" },
        ],
        postage: [
          { required: true, message: "请输入邮费", trigger: "blur" },
        ],
        orderPayment: [
          { required: true, message: "请输入实付金额", trigger: "blur" },
        ],
        orderPaymentType: [
          { required: true, message: "请输入支付类型", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    add() {
      model.update(this.data).then((value) => {
        //提示用户操作情况
        if (value.data.flag) {
            this.$message({
              type: "success",
              message: value.data.message + " 状态码为：" + value.status,
            });
            this.$router.push("/v4/s3");
          } else {
            this.$message({
              type: "error",
              message: value.data.message + " 状态码为：" + value.status,
            });
          }
      });
    },
    back() {
      this.$router.push("/v4/s3");
    },
    submitForm(formName) {
      //整个表单验证
      const submit = this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证成功
          this.add();
        } else {
          //提示表单验证失败
          this.$message({
            showClose: true,
            message: "表单信息有错，请检查拼写/字数限制！",
            type: "error",
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
  created() {
    this.id = this.$route.query.id;
    model.getById(this.id).then((value) => {
      this.data = value[0];
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/s-update.scss";
.form-button {
  display: flex;
  justify-content: flex-end;
}
</style>
