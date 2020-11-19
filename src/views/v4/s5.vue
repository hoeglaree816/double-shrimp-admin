<template>
  <div class="root">
    <div class="title">
      <h2>商品类别</h2>
    </div>
    <el-card class="box-card"  shadow="always">
    <div class="toolbar">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button :disabled="ecommerce_commodityType_add" type="primary" size="medium" @click="handleAdd" icon="el-icon-plus">添加</el-button>
        </el-col>
        <el-col :span="8">
          <el-input :disabled="ecommerce_commodityType_select" placeholder="请输入ID" v-model="input" class="input-with-select" clearable>
            <el-button :disabled="ecommerce_commodityType_select" slot="append" @click="handleSearch" icon="el-icon-search"></el-button>
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
        <el-table-column type="expand" fixed="left" label="详情信息" width="85" align="center">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="类别id：">
                <span>{{ props.row.categoryId }}</span>
              </el-form-item>
              <el-form-item label="父类id：">
                <span>{{ props.row.parentId }}</span>
              </el-form-item>
              <el-form-item label="排序编号：">
                <span>{{ props.row.sortOrder }}</span>
              </el-form-item>
              <el-form-item label="类别名称：">
                <span>{{ props.row.categoryName }}</span>
              </el-form-item>
              <el-form-item label="类别等级：">
                <span>{{ props.row.level }}</span>
              </el-form-item>
              <el-form-item label="是否为父类：">
                <span>{{ props.row.isParent ==true?"是":"否" }}</span>
              </el-form-item>
              <el-form-item label="创建时间：">
                <span>{{ props.row.created }}</span>
              </el-form-item>
              <el-form-item label="更新时间：">
                <span>{{ props.row.updated }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="商品类别id" width="280" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleDetail(scope.row.categoryId)"
            >{{ scope.row.categoryId }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="categoryName" label="类别名称" width="270" align="center"></el-table-column>
        <el-table-column prop="parentId" label="父类Id" width="280" align="center"></el-table-column>
        <el-table-column prop="sortOrder" label="排序编号" width="100" align="center"></el-table-column>
        <el-table-column prop="level" label="类别等级" width="100" align="center"></el-table-column>
        <el-table-column prop="updated" label="更新时间" width="220" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" width="200" align="center">
          <template slot-scope="scope">
            <el-button :disabled="ecommerce_commodityType_update" size="mini" type="primary" @click="handleUpdate(scope.$index, scope.row)">编辑<i class="el-icon-edit"></i></el-button>
            <el-button :disabled="ecommerce_commodityType_delete" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除<i class="el-icon-delete"></i></el-button>
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
const model = require("../../js/v4/s5");
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
      ecommerce_commodityType_add:true,//类别添加
      ecommerce_commodityType_update:true,//类别更新
      ecommerce_commodityType_delete:true,//类别删除
      ecommerce_commodityType_select:true,//类别查询
    };
  },
  methods: {
    handleAdd() {
      this.$router.push("/v4/s5-insert");
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
      model.list(this.pn, this.ps).then(value => {
        this.tableData = value.data.data.content;
        this.total = value.data.data.totalElements;
      });
    },
    handleSizeChange(ps) {
      this.ps = ps;
      model.list(this.pn, this.ps).then(value => {
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
          model.delete(row.categoryId).then(value => {
            //提示用户操作情况
            if (value.data.flag) {
                this.$message({
                  type: "success",
                  message: `ID为${row.categoryId}的信息`+ value.data.message + " 状态码为：" + value.status,
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
                  message: `ID为${row.categoryId}的信息`+ value.data.message + " 状态码为：" + value.status,
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
        path: "/v4/s5-detail",
        query: {
          id: id
        }
      });
    },
    handleSearch() {
      if(this.input ==""){
        this.$message({
          message: `请输入要查询的商品类别id`,
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
    },
    handleUpdate(index, row) {
      this.$router.push({
        path: "/v4/s5-update",
        query: {
          id: row.categoryId
        }
      });
    }
  },
  computed: {
    ...mapState(["menulist"]),
  },
  mounted() {
    model.list(this.pn, this.ps).then(value => {
      this.tableData = value.data.data.content;
      this.total = value.data.data.totalElements;
    });
    //拿到权限列表循环判断是否有权限，有则将对应权限字段至false
    this.menulist.forEach((item) => {
      if(item.name =="ecommerce"){
        if(!item.children.length == 0){
          for(let i=0; i<item.children.length;i++){
            if(item.children[i].name =="ecommerce_commodityType"){
              for(let j=0;j<item.children[i].children.length;j++){
                this[item.children[i].children[j].name] =false
              }
            }
          }
        }
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/s.scss";
.demo-table-expand {
  //类别详情展开页
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