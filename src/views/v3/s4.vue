<template>
  <div class="root">
    <div class="title">
      <h2>知识产权</h2>
    </div>
    <el-card class="box-card"  shadow="always">
      <div class="toolbar">
        <el-col :span="4">
          <el-button :disabled="education_courseCategory_add" type="primary" size="medium" @click="handleAdd" icon="el-icon-plus">添加</el-button>
        </el-col>
        <el-col :span="8">
          <el-input :disabled="education_courseCategory_select" placeholder="请输入ID" v-model="input" class="input-with-select" clearable>
            <el-button :disabled="education_courseCategory_select" slot="append" @click="handleSearch" icon="el-icon-search"></el-button>
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
        <el-table-column prop="date" label="id" fixed="left" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleDetail(scope.row.id)"
            >{{ scope.row.id }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="课程名称" width="525" align="center"></el-table-column>
        <el-table-column prop="parentId" label="父级类型" width="525" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" width="200" align="center">
          <template slot-scope="scope">
            <el-button :disabled="education_courseCategory_update" size="mini" type="primary" @click="handleUpdate(scope.$index, scope.row)">编辑<i class="el-icon-edit"></i></el-button>
            <el-button :disabled="education_courseCategory_delete" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除<i class="el-icon-delete"></i></el-button>
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
const model = require("../../js/v3/s4");
export default {
  data() {
    return {
      input: "",
      pn: 1,
      ps: 5,
      total: 100,
      tableData: [],
      //权限控制字段
      education_courseCategory_add:true,//课程类别添加
      education_courseCategory_update:true,//课程类别更新
      education_courseCategory_delete:true,//课程类别删除
      education_courseCategory_select:true,//课程类别查询
    };
  },
  methods: {
    handleAdd() {
      this.$router.push("/v3/s4-insert");
    },
    handleCurrentChange(pn) {
      this.pn = pn;
      model.list(this.pn, this.ps).then(value => {
        this.tableData = value;
      });
    },
    handleSizeChange(ps) {
      this.ps = ps;
      model.list(this.pn, this.ps).then(value => {
        this.tableData = value;
      });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该信息，是否继续？","提示",{
        confirmButtonText:"确定",
        cancelButtonText:"取消",
        type:"warning",
      }).then(()=>{
          model.delete(row.id).then(value => {
          this.$message({
            message: `成功删除ID为${row.id}的信息`,
            type: "success"
          });
          model.list(this.pn, this.ps).then(value => {
            this.tableData = value;
          });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
      
    },
    handleDetail(id) {
      this.$router.push({
        path: "/v3/s4-detail",
        query: {
          id: id
        }
      });
    },
    handleSearch() {
      if(this.input=='')
      this.$message({
        type:"warning",
        message:"请输入id后查询！！！"
      })
      else
      model.getById(this.input).then(value => {
      if(value[0])
        this.tableData = value;
        else
        this.$message({
          type:"warning",
          message:"无该id信息,请确定id是否输入有误！！！"
        })
      });
    },
    handleUpdate(index, row) {
      this.$router.push({
        path: "/v3/s4-update",
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
      this.tableData = value;
    });
    model.count().then(value => {
      this.total = value;
    });
    //拿到权限列表循环判断是否有权限，有则将对应权限字段至false
    this.menulist.forEach((item) => {
      if(item.name =="education"){
        if(!item.children.length == 0){
          for(let i=0; i<item.children.length;i++){
            if(item.children[i].name =="education_courseCategory"){
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