<template>
  <div class="root">
    <div class="title">
      <h2>资讯类型</h2>
    </div>
    <el-card class="box-card"  shadow="always">
      <div class="toolbar">
        <el-col :span="4">
          <el-button :disabled="information_informationCategory_add" type="primary" size="medium" @click="handleAdd" icon="el-icon-plus">添加</el-button>
        </el-col>
        <!-- <el-col :span="8">
          <el-input placeholder="请输入ID" v-model="input" class="input-with-select" clearable @clear="handleClear">
            <el-button slot="append" @click="handleSearch" icon="el-icon-search"></el-button>
          </el-input>
        </el-col> -->
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          style="width: 100%"
          max-height="350"
          stripe
          :border="false"
          :fit="false"
        >
          <el-table-column prop="date" label="id" fixed="left" width="400" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleDetail(scope.row.id)"
              >{{ scope.row.id }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="资讯类型" width="900" align="center"></el-table-column>
          <el-table-column label="操作" fixed="right" width="150" align="center">
            <template slot-scope="scope">
              <el-button :disabled="information_informationCategory_update" size="mini" type="primary" @click="handleUpdate(scope.$index, scope.row)">编辑<i class="el-icon-edit"></i></el-button>
              <!-- <el-button :disabled="information_informationCategory_delete" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除<i class="el-icon-delete"></i></el-button> -->
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
const model = require("../../js/v2/s2");
export default {
  data() {
    return {
      input: "",
      pn: 1,
      ps: 5,
      total: 100,
      tableData: [],
      //权限控制字段
      information_informationCategory_add:true,//资讯类别添加
      information_informationCategory_update:true,//资讯类别更新
      information_informationCategory_delete:true,//资讯类别删除
      information_informationCategory_select:true,//资讯类别查询
    };
  },
  methods: {
    handleAdd() {
      this.$router.push("/v2/s2-insert");
    },
    handleCurrentChange(pn) {
      this.pn = pn;
      model.getAllCategory(this.pn, this.ps).then((value) => {
        this.tableData = value.data.data.rows;
        this.total = value.data.data.total;
      });
    },
    handleSizeChange(ps) {
      this.ps = ps;
      model.getAllCategory(this.pn, this.ps).then((value) => {
        this.tableData = value.data.data.rows;
        this.total = value.data.data.total;
      });
    },
    async handleDelete(index, row) {
      await this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await model.delete(row.id).then((value) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });

      await model.list(this.pn, this.ps).then((value) => {
        this.tableData = value;
      });
    },
    handleDetail(id) {
      this.$router.push({
        path: "/v2/s2-detail",
        query: {
          id: id,
        },
      });
    },
    handleSearch() {
      model.getById(this.input).then((value) => {
        this.tableData = value;
      });
    },
    handleUpdate(index, row) {
      this.$router.push({
        path: "/v2/s2-update",
        query: {
          id: row.id,
        },
      });
    },
    handleClear() {
      model.list(this.pn, this.ps).then((value) => {
        this.tableData = value;
      });
    },
  },
  computed: {
    ...mapState(["menulist"]),
  },
  mounted() {
    // model.list(this.pn, this.ps).then((value) => {
    //   this.tableData = value;
    // });
    // model.count().then((value) => {
    //   this.total = value;
    // });
    model.getAllCategory(this.pn,this.ps).then(value=>{
      this.tableData = value.data.data.rows;
      this.total = value.data.data.total;
    })
    //拿到权限列表循环判断是否有权限，有则将对应权限字段至false
    this.menulist.forEach((item) => {
      if(item.name =="information"){
        if(!item.children.length == 0){
          for(let i=0; i<item.children.length;i++){
            if(item.children[i].name =="information_informationCategory"){
              for(let j=0;j<item.children[i].children.length;j++){
                console.log(item.children[i].children[j].name)
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
</style>