<template>
  <div class="root">
    <div class="title">
      <h2>文章类型</h2>
    </div>
    <div class="toolbar">
      <el-col :span="4">
        <el-button :disabled="expertConsultation_type_add" type="primary" size="medium" @click="handleAdd" icon="el-icon-plus">添加</el-button>
      </el-col>
      <el-col :span="8">
        <el-input :disabled="expertConsultation_type_select" placeholder="请输入ID" v-model="input" class="input-with-select" clearable>
          <el-button :disabled="expertConsultation_type_select" slot="append" @click="handleSearch" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
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
        <el-table-column prop="id" label="id" fixed="left" width="210" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleDetail(scope.row.id)"
            >{{ scope.row.id }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="文章分类" width="680" align="center"></el-table-column>
        <el-table-column prop="parentId" label="父级类型" width="325"></el-table-column>
        <el-table-column label="操作" fixed="right" width="200" align="center">
          <template slot-scope="scope">
            <el-button :disabled="expertConsultation_type_update" size="mini" type="primary" @click="handleUpdate(scope.$index, scope.row)">编辑<i class="el-icon-edit"></i></el-button>
            <!-- <el-button :disabled="expertConsultation_type_delete" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除<i class="el-icon-delete"></i></el-button> -->
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
  </div>
</template>

<script>
import { mapState } from "vuex";
const model = require("../../js/v5/s6");
export default {
  data() {
    return {
      input: "",
      pn: 1,
      ps: 5,
      total: 100,
      tableData: [],
      //权限控制字段
      expertConsultation_type_add:true,//文章类别添加
      expertConsultation_type_update:true,//文章类别更新
      expertConsultation_type_delete:true,//文章类别删除
      expertConsultation_type_select:true,//文章类别查询
    };
  },
  methods: {
    handleAdd() {
      this.$router.push("/v5/s6-insert");
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
    handleDetail(id) {
      console.log(id);
      this.$router.push({
        path: "/v5/s6-detail",
        query: {
          id: id
        }
      });
    },
    handleSearch() {
      model.getById(this.input).then(value => {
        if(value[0])
          this.tableData = value
        else
        this.$message({
          type: 'info',
          message: '无该id信息'
        })
      });
    },
    handleUpdate(index, row) {
      this.$router.push({
        path: "/v5/s6-update",
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
      console.log(value);
      this.tableData = value;
      console.log(this.tableData)
    });
    model.count().then(value => {
      console.log(value);
      this.total = value;
    });
    //拿到权限列表循环判断是否有权限，有则将对应权限字段至false
    this.menulist.forEach((item) => {
      if(item.name =="expertConsultation"){
        if(!item.children.length == 0){
          for(let i=0; i<item.children.length;i++){
            if(item.children[i].name =="expertConsultation_type"){
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