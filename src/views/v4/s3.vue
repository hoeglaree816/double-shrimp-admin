<template>
  <div class="root">
    <div class="title">
      <h2>订单</h2>
    </div>
    <el-card class="box-card"  shadow="always">
      <div class="toolbar">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button
            type="primary"
            size="medium"
            @click="handleAdd"
            :disabled="ecommerce_order_add"
            icon="el-icon-plus"
            >添加</el-button
          >
        </el-col>
        <el-col :span="8">
          <el-input
          :disabled="ecommerce_order_select"
            placeholder="请输入ID"
            v-model="input"
            class="input-with-select"
            clearable
          >
            <el-button
            :disabled="ecommerce_order_select"
              slot="append"
              @click="handleSearch"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button
            type="danger"
            plain
            size="medium"
            @click="backlist"
            v-show="disabled"
            icon="el-icon-s-fold"
            >返回列表</el-button
          >
        </el-col>
      </el-row>
      </div>
      <div class="table">
        <el-table
        :data="tableData"
        style="width: 100%"
        max-height="620"
        stripe
        :border="false"
        :fit="false"
      >
        <el-table-column type="expand" fixed="left" label="详情信息" width="85">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="订单id：">
                <span>{{ props.row.orderId }}</span>
              </el-form-item>
              <el-form-item label="用户id：">
                <span>{{ props.row.userId }}</span>
              </el-form-item>
              <el-form-item label="商品Id：">
                <span>{{ props.row.productId }}</span>
              </el-form-item>
              <el-form-item label="购买数量：">
                <span>{{ props.row.num }}</span>
              </el-form-item>
              <el-form-item label="收货地址id：">
                <span>{{ props.row.addressId }}</span>
              </el-form-item>
              <el-form-item label="邮费：">
                <span>{{ props.row.postage }}</span>
              </el-form-item>
              <el-form-item label="实付金额：">
                <span>{{ props.row.orderPayment }}</span>
              </el-form-item>
              <el-form-item label="支付类型：">
                <span>{{ props.row.orderPaymentType }}</span>
              </el-form-item>
              <el-form-item label="交易状态：">
                <el-tag type="warning" effect="dark" v-if="props.row.orderStatus==1"><span>未付款</span></el-tag>
                <el-tag type="success" effect="dark" v-else-if="props.row.orderStatus==2"><span>已付款</span></el-tag>
                <el-tag type="warning" effect="dark" v-else-if="props.row.orderStatus==3"><span>未发货</span></el-tag>
                <el-tag type="success" effect="dark" v-else><span>已发货</span></el-tag>
              </el-form-item>
              <el-form-item label="订单创建时间：">
                <span>{{ props.row.orderCreated }}</span>
              </el-form-item>
              <el-form-item label="订单更新时间：">
                <span>{{ props.row.orderUpdated }}</span>
              </el-form-item>
              <el-form-item label="付款时间：">
                <span>{{ props.row.orderPaymentTime }}</span>
              </el-form-item>
              <el-form-item label="发货时间：">
                <span>{{ props.row.orderDeliveryTime }}</span>
              </el-form-item>
              <el-form-item label="物流名称：">
                <span>{{ props.row.orderLogisticsName }}</span>
              </el-form-item>
              <el-form-item label="物流单号：">
                <span>{{ props.row.orderLogisticsNumber }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="订单Id" width="280" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleDetail(scope.row.orderId)"
              >{{ scope.row.orderId }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="userId"
          label="用户id"
          width="280"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="productId"
          label="商品id"
          width="280"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="num"
          label="购买数量"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="postage"
          label="邮费"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="orderPayment"
          label="实付金额"
          width="150"
          align="center"
        ></el-table-column>
        <!-- <el-table-column
          prop="orderPaymentType"
          label="支付类型"
          width="150"
          align="center"
        ></el-table-column> -->
        <el-table-column label="操作" fixed="right" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              :disabled="ecommerce_order_update"
              @click="handleUpdate(scope.$index, scope.row)"
              >编辑<i class="el-icon-edit"></i></el-button
            >
            <el-button
              size="mini"
              type="danger"
              :disabled="ecommerce_order_delete"
              @click="handleDelete(scope.$index, scope.row)"
              >删除<i class="el-icon-delete"></i></el-button
            >
          </template>
        </el-table-column>
        </el-table>
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pn"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="ps"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :disabled="disabled"
        ></el-pagination>
      </div>
    </el-card>
    <div class="bottom">
      <span>@对虾全产业链云平台-管理后台</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
const model = require("../../js/v4/s3");
export default {
  data() {
    return {
      input: "",
      pn: 1,
      ps: 5,
      total: 100,
      tableData: [],
      disabled:false,//是否禁用分页
      //权限控制字段
      ecommerce_order_add:true,//订单添加
      ecommerce_order_update:true,//订单更新
      ecommerce_order_delete:true,//订单删除
      ecommerce_order_select:true,//订单查询
    };
  },
  methods: {
    handleAdd() {
      this.$router.push("/v4/s3-insert");
    },
    //返回列表
    backlist() {
      this.input="";
      this.pn =1;
      model.list(this.pn, this.ps).then((value) => {
        this.total = value.data.data.totalElements;
        this.tableData = value.data.data.content;
      });
      this.disabled =false;
    },
    handleCurrentChange(pn) {
      this.pn = pn;
      model.list(this.pn, this.ps).then((value) => {
        this.tableData = value.data.data.content;
        this.total = value.data.data.totalElements;
      });
    },
    handleSizeChange(ps) {
      this.ps = ps;
      model.list(this.pn, this.ps).then((value) => {
        this.tableData = value.data.data.content;
        this.total = value.data.data.totalElements;
      });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          model.delete(row.orderId).then((value) => {
             //提示用户操作情况
            if (value.data.flag) {
                this.$message({
                  type: "success",
                  message: `ID为${row.orderId}的信息`+ value.data.message + " 状态码为：" + value.status,
                });
                //刷新表单
                model.list(this.pn, this.ps).then((value) => {
                  if (!value.data.data.content.length == 0) {
                    //判断删除之后该页是否为空，若为空，则执行else查询上一页内容
                    this.tableData = value.data.data.content;
                    this.total = value.data.data.totalElements;
                  } else {
                    model.list(this.pn - 1, this.ps).then((value) => {
                      this.tableData = value.data.data.content;
                      this.total = value.data.data.totalElements;
                    });
                  }
                });
            } else {
                this.$message({
                  type: "error",
                  message: `ID为${row.orderId}的信息`+ value.data.message + " 状态码为：" + value.status,
                });
              }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleDetail(id) {
      this.$router.push({
        path: "/v4/s3-detail",
        query: {
          id: id,
        },
      });
    },
    handleSearch() {
      if(this.input ==""){
        this.$message({
          message: `请输入要查询的订单id`,
          type: "warning",
        })
      }else{
        model.getById(this.input).then((value) => {
          if(value[0] == null){
            this.$message({
              message: `查询结果为空`,
              type: "warning",
            })
            this.tableData = [];
            this.total =0;
            this.disabled =true;
          }else{
            console.log(value)
            this.tableData = value;
            this.total =1;
            this.disabled =true;
          }
        });
      }
      // model.getById(this.input).then((value) => {
      //   this.tableData = value;
      //   this.total = value.data.data.totalElements;
      // });
    },
    handleUpdate(index, row) {
      this.$router.push({
        path: "/v4/s3-update",
        query: {
          id: row.orderId,
        },
      });
    },
  },
  computed: {
    ...mapState(["menulist"]),
  },
  mounted() {
    model.list(this.pn, this.ps).then((value) => {
      this.tableData = value.data.data.content;
      this.total = value.data.data.totalElements;
    });
    //拿到权限列表循环判断是否有权限，有则将对应权限字段至false
    this.menulist.forEach((item) => {
      if(item.name =="ecommerce"){
        if(!item.children.length == 0){
          for(let i=0; i<item.children.length;i++){
            if(item.children[i].name =="ecommerce_order"){
              for(let j=0;j<item.children[i].children.length;j++){
                this[item.children[i].children[j].name] =false
              }
            }
          }
        }
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/s.scss";
.demo-table-expand {
  //订单详情展开页
  font-size: 0;
  .el-form-item {
    margin-left: 10%;
    margin-right: 0;
    margin-bottom: 0;
    width: 40%;
    color: #0978c2;
  }
}
</style>
