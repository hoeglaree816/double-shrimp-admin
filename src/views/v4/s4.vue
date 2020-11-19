<template>
  <div class="root">
    <div class="title">
      <h2>收货地址</h2>
    </div>
    <el-card class="box-card"  shadow="always">
      <div class="toolbar">
      <el-col :span="4">
        <el-button :disabled="ecommerce_address_add" type="primary" size="medium" @click="handleAdd" icon="el-icon-plus">添加</el-button>
      </el-col>
      <el-col :span="8">
        <el-input :disabled="ecommerce_address_select" placeholder="请输入用户ID查询收货地址" v-model="input" class="input-with-select" clearable>
          <el-button :disabled="ecommerce_address_select" slot="append" @click="handleSearch" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
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
              <el-form-item label="收货地址id">
                <span>{{ props.row.addressId }}</span>
              </el-form-item>
              <el-form-item label="用户id">
                <span>{{ props.row.userId }}</span>
              </el-form-item>
              <el-form-item label="收货人姓名">
                <span>{{ props.row.receiverName }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.receiverPhone }}</span>
              </el-form-item>
              <el-form-item label="省份">
                <span>{{ props.row.receiverProvince }}</span>
              </el-form-item>
              <el-form-item label="城市">
                <span>{{ props.row.receiverCity }}</span>
              </el-form-item>
              <el-form-item label="县区">
                <span>{{ props.row.receiverTown }}</span>
              </el-form-item>
              <el-form-item label="详细地址">
                <span>{{ props.row.receiverAddress }}</span>
              </el-form-item>
              <el-form-item label="邮政编码">
                <span>{{ props.row.receiverCode }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.receiverCreated }}</span>
              </el-form-item>
              <el-form-item label="更新时间">
                <span>{{ props.row.receiverUpdate }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="收货地址id" width="280" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleDetail(scope.row.addressId)"
            >{{ scope.row.addressId }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="userId" label="用户id" width="280"  align="center"></el-table-column>
        <el-table-column prop="receiverName" label="收货人姓名" width="250" align="center"></el-table-column>
        <el-table-column prop="receiverProvince" label="省份" width="160" align="center"></el-table-column>
        <el-table-column prop="receiverCity" label="城市" width="180" align="center"></el-table-column>
        <!-- <el-table-column prop="receiverTown" label="县区" width="180" align="center"></el-table-column> -->
        <el-table-column label="操作" fixed="right" width="200" align="center">
          <template slot-scope="scope">
            <el-button :disabled="ecommerce_address_update" size="mini" type="primary" @click="handleUpdate(scope.$index, scope.row)">编辑<i class="el-icon-edit"></i></el-button>
            <el-button :disabled="ecommerce_address_delete" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除<i class="el-icon-delete"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="pn"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="ps"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :disabled="true"
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
const model = require("../../js/v4/s4");
export default {
  data() {
    return {
      input: "",
      pn: 1,
      ps: 5,
      total: 0,
      tableData: [],
      //权限控制字段
      ecommerce_address_add:true,//地址添加
      ecommerce_address_update:true,//地址更新
      ecommerce_address_delete:true,//地址删除
      ecommerce_address_select:true,//地址查询
    };
  },
  methods: {
    handleAdd() {
      this.$router.push("/v4/s4-insert");
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          model.delete(row.addressId).then(value => {
            //提示用户操作情况
            if (value.data.flag) {
                this.$message({
                  type: "success",
                  message: `ID为${row.addressId}的信息`+ value.data.message + " 状态码为：" + value.status,
                });
            } else {
                this.$message({
                  type: "error",
                  message: `ID为${row.addressId}的信息`+ value.data.message + " 状态码为：" + value.status,
                });
              }
            this.handleSearch();
          });
          this.handleSearch();
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
        path: "/v4/s4-detail",
        query: {
          id: id
        }
      });
    },
    handleSearch() {
      if(this.input ==""){
        this.$message({
          message: `请输入要查询收货地址的用户id`,
          type: "warning",
        })
      }else{
        model.list(this.input).then((value) => {
          if(value.data.data.length == 0){
            this.$message({
              message: `查询结果为空`,
              type: "warning",
            })
            this.tableData = [];
            this.total =0;
          }else{
            this.tableData = value.data.data;
            this.total =value.data.data.length;
          }
        });
      }
      // model.list(this.input).then(value => {
      //   this.tableData = value.data.data;
      //   this.total =value.data.data.length;
      // });
    },
    handleUpdate(index, row) {
      this.$router.push({
        path: "/v4/s4-update",
        query: {
          id: row.addressId
        }
      });
    },
  },
  computed: {
    ...mapState(["menulist"]),
  },
  mounted() {
    // model.list(this.pn, this.ps).then(value => {
    //   this.tableData = value;
    // });
    // model.count().then(value => {
    //   this.total = value;
    // });
    //拿到权限列表循环判断是否有权限，有则将对应权限字段至false
    this.menulist.forEach((item) => {
      if(item.name =="ecommerce"){
        if(!item.children.length == 0){
          for(let i=0; i<item.children.length;i++){
            if(item.children[i].name =="ecommerce_address"){
              for(let j=0;j<item.children[i].children.length;j++){
                this[item.children[i].children[j].name] =false
              }
            }
          }
        }
      }
    });
    this.foo = this.$notify({
      title: '来自->收货地址<-提示',
      message: '需要输入用户ID才能查询到其对应的收货地址！',
      type: 'warning',
      duration: 5000,
      offset: 80,
      showClose: false
    });
  },
  beforeDestroy(){
    this.foo.close()
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/s.scss";
.demo-table-expand {
  //地址详情展开页
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