<template>
  <div class="root">
    <div class="title">
      <h2>权限管理</h2>
    </div>
    <el-card class="box-card"  shadow="always">
      <div class="toolbar">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button disabled type="primary" size="medium" @click="handleAdd" icon="el-icon-plus">添加</el-button>
        </el-col>
        <el-col :span="8">
          <el-input :disabled="authority_function_select" placeholder="请输入ID" v-model="input" class="input-with-select" clearable>
            <el-button :disabled="authority_function_select" slot="append" @click="handleSearch" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button v-show="isShow" :class="backlist" type="danger" size="small" @click="backlist" icon="el-icon-s-fold">返回列表</el-button>
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
        <el-table-column prop="id" label="权限id" fixed="left" width="250" align=center>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleDetail(scope.row.id)"
            >{{ scope.row.id }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="功能名称 " width="400" align=center></el-table-column>
        <el-table-column prop="remarks" label="权限解释 " width="400" align=center></el-table-column>
        <el-table-column prop="createDate" label="创建时间 " width="220" align=center></el-table-column>
        <el-table-column label="操作" fixed="right" width="200" align=center>
          <template slot-scope="scope">
            <el-button disabled size="mini" type="primary" @click="handleUpdate(scope.$index, scope.row)">编辑<i class="el-icon-edit"></i></el-button>
            <el-button disabled size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除<i class="el-icon-delete"></i></el-button>
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
        hide-on-single-page
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
const model = require("../../js/v6/s3");
export default {
  data() {
    return {
      input: "",
      pn: 1,
      ps: 5,
      total: 0,
      tableData: [],
      isShow:false,
      //权限控制字段
      authority_function_select:true,//角色查询
    };
  },
  methods: {
    //增加-暂时弃用
    handleAdd() {
      this.$router.push("/v6/s3-insert");
    },
    //返回列表
    backlist(){
      this._data.input = "";
      this.pn = 1;
      this._data.isShow=false;
      model.list(this.pn, this.ps).then(value => {
        this.total = value.data.data.total;//总条数
        this.tableData=value.data.data.rows//表单数据
      });
    },
    //当前页
    handleCurrentChange(pn) {
      this.pn = pn;
      model.list(this.pn, this.ps).then(value => {
        this.total = value.data.data.total;//总条数
        this.tableData=value.data.data.rows//表单数据
      });
    },
    //每页条数
    handleSizeChange(ps) {
      this.ps = ps;
      model.list(this.pn, this.ps).then(value => {
        this.total = value.data.data.total;//总条数
        this.tableData=value.data.data.rows//表单数据
      });
    },
    //删除-暂时弃用
    handleDelete(index, row) {
      //暂时弃用，请勿删除！！！！！！！！！！！！！！！！
      // model.delete(row.id).then(value => {
      //   this.$message({
      //     message: `成功删除ID为${row.id}的信息`,
      //     type: "success"
      //   });
      //   //刷新表单
      //   //下面两个方法配合才能实现刷新表单
      //   model.list(this.pn, this.ps).then(value => {
      //     if(!value.data.data.rows.length==0){//判断删除之后该页是否为空，若为空，则执行else查询上一页内容
      //       this.total = value.data.data.total;//总条数
      //       this.tableData=value.data.data.rows//表单数据
      //     }else{
      //       model.list(this.pn-1, this.ps).then(value => {
      //       this.total = value.data.data.total;//总条数
      //       this.tableData=value.data.data.rows//表单数据
      //       });
      //     }
      //   console.log(this.tableData)
      //   });
      //   this.backlist();
      // });
    },
    //详情
    handleDetail(id) {
      this.$router.push({
        path: "/v6/s3-detail",
        query: {
          id: id
        }
      });
    },
    //查询
    handleSearch() {
      if (this._data.input == "") {
        this.$message({
          type: "warning",
          message: "请输入搜索内容!",
          duration:1200
        });
      } else {
        this._data.isShow = true; //判断是否显示返回列表按钮
        model.getById(this.input).then((value) => {
          if (value.data.data == null) {
            this.tableData = [];
            this.total = 0;
            this.$message({
              type: "error",
              message: "该用户不存在!",
            });
          } else {
            this.tableData = [value.data.data];
            this.total = 1;
            this.$message({
              type: "success",
              message: "查询成功!",
            });
          }
        });
      }
    },
    //编辑更新-暂时弃用
    handleUpdate(index, row) {
      this.$router.push({
        path: "/v6/s3-update",
        query: {
          id: row.id
        }
      });
    }
  },
  computed: {
    ...mapState(["menulist"]),
  },
  mounted() {
    model.list(this.pn, this.ps).then(value => {
      this.total = value.data.data.total;//总条数
      this.tableData=value.data.data.rows//表单数据
    });
    //拿到权限列表循环判断是否有权限，有则将对应权限字段至false
    this.menulist.forEach((item) => {
      if(item.name =="authority"){
        if(!item.children.length == 0){
          for(let i=0; i<item.children.length;i++){
            if(item.children[i].name =="authority_function"){
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
</style>