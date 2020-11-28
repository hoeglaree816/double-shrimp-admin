<template>
  <div class="root">
    <div class="title">
      <h2>技术文章</h2>
    </div>
    <el-card class="box-card" shadow="always">
      <div class="toolbar">
        <el-col :span="6">
          <template>
            <el-select
              v-model="value"
              filterable
              placeholder="按审核状态搜索"
              @change="handleSelectSearch"
              :disabled="expertConsultation_technologyArticle_select"
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
            :disabled="expertConsultation_technologyArticle_select"
            placeholder="按ID搜索"
            v-model="input"
            class="input-with-select"
            clearable
            
          >
            <el-button
              :disabled="expertConsultation_technologyArticle_select"
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
            prop="title"
            label="标题"
            width="500"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="editor"
            label="作者"
            width="180"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="creationTime"
            label="创建时间"
            width="290"
            align="center"
          ></el-table-column>
          <el-table-column label="推荐" width="150" align="center">
            <template slot-scope="scope">
              <el-switch
                :disabled="value != 1"
                v-model="scope.row.recommend"
                @change="handleRecommendChange(scope.row.id, scope.row.recommend)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="200" align="center">
            <template slot-scope="scope">
              <el-button
                :disabled="expertConsultation_technologyArticle_update"
                v-if="value == 0"
                size="mini"
                type="primary"
                @click="handleUpdate(scope.$index, scope.row)"
                >审核<i class="el-icon-edit"></i
              ></el-button>
              <el-button
                :disabled="expertConsultation_technologyArticle_delete"
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
const model = require("../../js/v5/s5");
export default {
  data() {
    return {
      input: "",
      pn: 1,
      ps: 5,
      total: 100,
      tableData: [],
      options: [
        {
          value: "1",
          label: "审核通过的技术文章",
        },
        {
          value: "2",
          label: "未审核的技术文章",
        },
        {
          value: "3",
          label: "审核失败的技术文章",
        },
        {
          value: "4",
          label: "已删除的技术文章",
        },
      ],
      value: "2",
      //权限控制字段
      expertConsultation_technologyArticle_add: true, //技术文章添加
      expertConsultation_technologyArticle_update: true, //技术文章更新
      expertConsultation_technologyArticle_delete:true,//技术文章删除
      expertConsultation_technologyArticle_select: true, //技术文章查询
    };
  },
  methods: {
    handleRecommendChange(id, recommend) {
      // console.log('recommend: ', recommend);
      // console.log('id: ', id);
      this.changeRecommend(id, recommend);
    },
    changeRecommend(id, flag) {
      model.modifyRecommend(id, flag).then((res) => {
        if (res.code == 20000) {
          this.$message({
            type: "info",
            message: res.message,
          });
        } else {
          this.$message({
            type: "info",
            message: "修改失败",
          });
        }
      });
    },
    handleCurrentChange(pn) {
      this.pn = pn;
      model.list(this.pn, this.ps, this.value).then((res) => {
        this.total = res.total;
        this.tableData = res.rows;
      });
    },
    handleSizeChange(ps) {
      this.ps = ps;
      model.list(this.pn, this.ps, this.value).then((res) => {
        this.total = res.total;
        this.tableData = res.rows;
      });
    },
    async handleDelete(index, row) {
      if (this.value == 4) {
        this.$message({
          message: "该帖子已删除，不可重复删除",
        });
        return;
      }
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

      await model.list(this.pn, this.ps, this.value).then((res) => {
        this.total = res.total;
        this.tableData = res.rows;
      });
    },
    handleDetail(id) {
      this.$router.push({
        path: "/v5/s5-detail",
        query: {
          id: id,
        },
      });
    },
    handleUpdate(index, row) {
      this.$router.push({
        path: "/v5/s5-update",
        query: {
          id: row.id,
        },
      });
    },
    handleSelectSearch(state) {
      this.value = state;
      model.list(this.pn, this.ps, this.value).then((res) => {
        this.total = res.total;
        this.tableData = res.rows;
      });
    },
    handleSearch() {
      model.getById(this.input).then((res) => {
        if (res) this.tableData = res;
        else
          this.$message({
            type: "info",
            message: "无该id信息",
          });
      });
    },
  },
  computed: {
    ...mapState(["menulist"]),
  },
  mounted() {
    if (this.$route.query.state){
      this.value = this.$route.query.state;

    } 
    if(this.value == 0){
      this.value = "4";
    }
    model.list(this.pn, this.ps, this.value).then((res) => {
      this.total = res.total;
      this.tableData = res.rows;
    });
    //拿到权限列表循环判断是否有权限，有则将对应权限字段至false
    this.menulist.forEach((item) => {
      if (item.name == "expertConsultation") {
        if (!item.children.length == 0) {
          for (let i = 0; i < item.children.length; i++) {
            if (item.children[i].name == "expertConsultation_technologyArticle") {
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