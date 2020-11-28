<template>
  <div class="root">
    <div class="title">
      <h2>审核专家</h2>
    </div>
    <el-card class="box-card" shadow="always">
    <div class="toolbar">
      <!-- <el-col :span="4">
        <el-button type="primary" size="medium" @click="handleAdd" icon="el-icon-plus">添加</el-button>
      </el-col> -->
      <el-col :span="6">
        <template>
          <el-select
            v-model="value"
            filterable
            placeholder="按审核状态搜索"
            @change="handleSelectSearch"
            :disabled="isSearching"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-col>
      <el-col :span="8">
        <el-input
          :disabled="expertConsultation_expert_select"
          placeholder="按关键字搜索"
          v-model="input"
          class="input-with-select"
          clearable
          @clear="handleClear"
        >
          <el-button
            :disabled="expertConsultation_expert_select"
            slot="append"
            @click="handleSearch"
            icon="el-icon-search"
          ></el-button>
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
        <el-table-column
          prop="date"
          label="id"
          fixed="left"
          width="210"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleDetail(scope.row.id)"
              >{{ scope.row.id }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="onlineTime"
          label="在线时间"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="250"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="goodAt"
          label="擅长"
          width="250"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="introduction"
          label="简介"
          width="300"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" fixed="right" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              :disabled="expertConsultation_expert_update"
              v-if="value == 0"
              size="mini"
              type="primary"
              @click="handleVerify(scope.$index, scope.row)"
              >审核<i class="el-icon-edit"></i
            ></el-button>
            <el-button
              :disabled="expertConsultation_expert_delete"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除<i class="el-icon-delete"></i
            ></el-button>
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
  </div>
</template>

<script>
import { mapState } from "vuex";
const model = require("../../js/v5/s2");
export default {
  data() {
    return {
      input: "",
      pn: 1,
      ps: 5,
      total: 100,
      tableData: [],
      isSearching:false,
      options: [
        {
          value: "0",
          label: "未审核的专家",
        },
        {
          value: "1",
          label: "审核通过的专家",
        },
        {
          value: "2",
          label: "审核失败的专家",
        },
        {
          value: "3",
          label: "已删除的专家",
        },
      ],
      value: "0",
      //权限控制字段
      expertConsultation_expert_update: true, //审核专家
      expertConsultation_expert_delete: true, //删除专家
      expertConsultation_expert_select: true, //查询专家
    };
  },
  methods: {
    handleCurrentChange(pn) {
      this.pn = pn;
      if(this.isSearching){
        model.getByKeyWord(this.input,this.pn,this.ps).then((res) => {
        if (res) {
          this.tableData = res.rows;
          this.total = res.total;
        }
        else{
          this.$message({
            type: "info",
            message: "暂无搜索结果",
          });
        }
      });
      }else{
        model.list(this.pn, this.ps, this.value).then((res) => {
          this.total = res.data.total;
          this.tableData = res.data.rows;
        });
      }
    },
    handleSizeChange(ps) {
      this.ps = ps;
      if(this.isSearching){
        model.getByKeyWord(this.input,this.pn,this.ps).then((res) => {
        if (res) {
          this.tableData = res.rows;
          this.total = res.total;
        }
        else{
          this.$message({
            type: "info",
            message: "暂无搜索结果",
          });
        }
      });
      }else{
        model.list(this.pn, this.ps, this.value).then((res) => {
          this.total = res.data.total;
          this.tableData = res.data.rows;
        });
      }
    },
    handleDelete(index, row) {
      if (this.value == 3) {
        this.$message({
          message: "该帖子已删除，不可重复删除",
        });
        return;
      }
      this.$confirm("此操作将永久删除该信息，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          model.delete(row.id).then((value) => {
            this.$message({
              message: `成功删除ID为${row.id}的信息`,
              type: "success",
            });
            model.list(this.pn, this.ps, this.value).then((res) => {
              console.log(res.data.rows);
              this.tableData = res.data.rows;
            });
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
        path: "/v5/s2-detail",
        query: {
          id: id,
        },
      });
    },
    handleSearch() {
      this.isSearching = true;
      model.getByKeyWord(this.input,1,this.ps).then((res) => {
        if (res){
          this.tableData = res.rows;
          this.total = res.total;
        } 
        else{
          this.$message({
            type: "info",
            message: "暂无搜索结果",
          });
        }
      });
    },
    handleClear() {
      this.isSearching = false;
      model.list(1, this.ps, 0).then((res) => {
          this.total = res.data.total;
          this.tableData = res.data.rows;
        });
    },
    handleVerify(index, row) {
      this.$router.push({
        path: "/v5/s2-update",
        query: {
          id: row.id,
        },
      });
    },
    handleSelectSearch(state) {
      this.value = state;
      model.list(this.pn, this.ps, this.value).then((res) => {
        this.total = res.data.total;
        this.tableData = res.data.rows;
      });
    },
  },
  computed: {
    ...mapState(["menulist"]),
  },
  mounted() {
    // console.log(this.$route.query);
    if (this.$route.query.state) this.value = this.$route.query.state;
    model.list(this.pn, this.ps, this.value).then((res) => {
      console.log(res.data.rows);
      this.total = res.data.total;
      this.tableData = res.data.rows;
    });
    //拿到权限列表循环判断是否有权限，有则将对应权限字段至false
    this.menulist.forEach((item) => {
      if (item.name == "expertConsultation") {
        if (!item.children.length == 0) {
          for (let i = 0; i < item.children.length; i++) {
            if (item.children[i].name == "expertConsultation_expert") {
              for (let j = 0; j < item.children[i].children.length; j++) {
                this[item.children[i].children[j].name] = false;
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