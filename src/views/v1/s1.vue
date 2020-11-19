<template>
  <div class="root">
    <div class="title">
      <h2>基地管理</h2>
    </div>
    <el-card class="box-card"  shadow="always">
      <!-- 添加区域 -->
      <div class="toolbar">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-button
              type="primary"
              size="medium"
              @click="handleAdd"
              :disabled="enterprise_enterprise_add"
              icon="el-icon-plus"
            >添加</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 基地列表区域 -->
      <div class="table">
        <el-table
          :data="tableData"
          style="width: 100%"
          max-height="620"
          stripe
          :border="false"
          :fit="false"
        >
          <!-- <el-table-column type="expand" fixed="left" label="详情信息" width="85">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="基地编号：">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="基地名称：">
                  <span>{{ props.row.baseName }}</span>
                </el-form-item>
                <el-form-item label="基地简介：">
                  <span>{{ props.row.baseIntroduction }}</span>
                </el-form-item>
                <el-form-item label="基地地址：">
                  <span>{{ props.row.baseAddr }}</span>
                </el-form-item>
                <el-form-item label="创建者：">
                  <span>{{ props.row.createBy }}</span>
                </el-form-item>
                <el-form-item label="创建时间：">
                  <span>{{ props.row.createDate }}</span>
                </el-form-item>
                <el-form-item label="营业执照注册号：">
                  <span>{{ props.row.registNumber }}</span>
                </el-form-item>
                <el-form-item label="注册资金(万元)：">
                  <span>{{ props.row.funds }}</span>
                </el-form-item>
                <el-form-item label="营业范围：">
                  <span>{{ props.row.scope }}</span>
                </el-form-item>
                <el-form-item label="基地图片：">
                  <span v-for="item in props.row.basePicres" :key="item.id">
                    <el-image :src="item"></el-image>
                  </span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>-->
          <el-table-column prop="id" label="基地id" width="280" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleDetail(scope.row.id)"
              >{{ scope.row.id }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="baseName" label="基地名称" width="200" align="center"></el-table-column>
          <el-table-column prop="baseAddr" label="基地地址" width="300" align="center"></el-table-column>
          <el-table-column prop="createBy" label="创建者" width="150" align="center"></el-table-column>
          <el-table-column label="操作" fixed="right" width="300" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                :disabled="enterprise_enterprise_update"
                @click="handleUpdate(scope.$index, scope.row.id)"
              >
                编辑
                <i class="el-icon-edit"></i>
              </el-button>
              <el-button
                size="mini"
                type="warning"
                :disabled="enterprise_enterprise_user"
                @click="handlePerson(scope.$index, scope.row.id)"
              >
                用户
                <i class="el-icon-user"></i>
              </el-button>
              <el-button
                size="mini"
                type="danger"
                :disabled="enterprise_enterprise_delete"
                @click="handleDelete(scope.$index, scope.row)"
              >
                删除
                <i class="el-icon-delete"></i>
              </el-button>
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
const model = require("../../js/v1/s1");
export default {
  data() {
    return {
      input: "",
      pn: 1,
      ps: 5,
      total: 100,
      tableData: [],
      disabled: false, //是否禁用分页
       //权限控制字段
      enterprise_enterprise_user:true,//基地用户管理
      enterprise_enterprise_add:true,//基地添加
      enterprise_enterprise_delete:true,//基地删除
      enterprise_enterprise_update:true,//基地更新
    };
  },
  methods: {
    // 分页
    handleCurrentChange(pn) {
      this.pn = pn;
      model.list(this.pn, this.ps).then((value) => {
        this.total = value.data.total;
        this.tableData = value.data.rows;
      });
    },
    handleSizeChange(ps) {
      this.ps = ps;
      model.list(this.pn, this.ps).then((value) => {
        this.total = value.data.total;
        this.tableData = value.data.rows;
      });
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          model.delete(row.id).then((value) => {
            //提示用户操作情况
            if (value.flag) {
              this.$message({
                type: "success",
                message:
                  `ID为${row.id}的信息` +
                  value.message +
                  " 状态码为：" +
                  value.code,
              });
              //刷新表单
              model.list(this.pn, this.ps).then((value) => {
                if (!value.data.rows.length == 0) {
                  //判断删除之后该页是否为空，若为空，则执行else查询上一页内容
                  this.total = value.data.total;
                  this.tableData = value.data.rows;
                } else {
                  model.list(this.pn - 1, this.ps).then((value) => {
                    this.total = value.data.total;
                    this.tableData = value.data.rows;
                  });
                }
              });
            } else {
              this.$message({
                type: "error",
                message:
                  `ID为${row.id}的信息` +
                  value.message +
                  " 状态码为：" +
                  value.code,
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
    // 添加
    handleAdd() {
      this.$router.push("/v1/s1-insert");
    },
    // 详情
    handleDetail(id) {
      this.$router.push({
        path: "/v1/s1-detail",
        query: {
          id: id,
        },
      });
    },
    // 查看该基地的用户情况
    handlePerson(index, id) {
      this.$router.push({
        path: "/v1/s2",
        query: {
          id: id,
        },
      });
    },
    // 修改
    handleUpdate(index, id) {
      console.log(id);
      this.$router.push({
        path: "/v1/s1-update",
        query: {
          id: id,
        },
      });
    },
  },
  computed: {
    ...mapState(["menulist"]),
  },
  mounted() {
    model.list(this.pn, this.ps).then((value) => {
      console.log(value);
      this.total = value.data.total;
      this.tableData = value.data.rows;
    });
    //拿到权限列表循环判断是否有权限，有则将对应权限字段至false
    this.menulist.forEach((item) => {
      if(item.name =="enterprise"){
        if(!item.children.length == 0){
          for(let i=0; i<item.children.length;i++){
            if(item.children[i].name =="enterprise_enterprise"){
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
</style>
