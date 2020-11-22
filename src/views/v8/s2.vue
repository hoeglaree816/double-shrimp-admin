<template>
  <div class="root">
    <div class="title">
      <h2>政策法规类型管理</h2>
    </div>
    <el-card class="box-card" shadow="always">
      <div class="toolbar">
        <el-col :span="4">
          <el-button
            :disabled="information_PoliciesType_add"
            type="primary"
            size="medium"
            @click="handleAdd"
            icon="el-icon-plus"
            >添加</el-button
          >
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
            width="400"
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
            label="资讯类型"
            width="900"
            align="center"
          ></el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="150"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                :disabled="information_PoliciesType_update"
                size="mini"
                type="primary"
                @click="handleUpdate(scope.$index, scope.row)"
                >编辑<i class="el-icon-edit"></i
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
    <div class="bottom">
      <span>@对虾全产业链云平台-管理后台</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
const model = require("../../js/v8/s2");
export default {
  data() {
    return {
      input: "",
      pn: 1,
      ps: 5,
      total: 100,
      tableData: [],
      //权限控制字段 （暂时置为false）
      information_PoliciesType_add: false, //类别添加
      information_PoliciesType_update: false, //类别更新
      information_PoliciesType_delete: false, //类别删除
      information_PoliciesType_select: false, //类别查询
    };
  },
  methods: {
    /* 进入添加页面 */
    handleAdd() {
      this.$router.push("/v8/s2-insert");
    },

    /* 根据页面数据 */
    getTypeInfo() {
      model.getAllCategory(this.pn, this.ps).then((value) => {
        this.tableData = value.data.data.rows;
        this.total = value.data.data.total;
      });
    },

    /* 获取当前页数据 */
    handleCurrentChange(pn) {
      this.pn = pn;
      this.getTypeInfo();
    },

    /* 获取改变数目后的当前页数据 */
    handleSizeChange(ps) {
      this.ps = ps;
      this.pn = 1;
      this.getTypeInfo();
    },

    /* 进入详情页 */
    handleDetail(id) {
      this.$router.push({
        path: "/v8/s2-detail",
        query: {
          id: id,
        },
      });
    },

    /* 进入修改页面 */
    handleUpdate(index, row) {
      this.$router.push({
        path: "/v8/s2-update",
        query: {
          id: row.id,
        },
      });
    },

    /* 权限管理 */
    authority() {
      //拿到权限列表循环判断是否有权限，有则将对应权限字段至false
      this.menulist.forEach((item) => {
        if (item.name == "information") {
          if (!item.children.length == 0) {
            for (let i = 0; i < item.children.length; i++) {
              if (item.children[i].name === "information_PoliciesType") {
                for (let j = 0; j < item.children[i].children.length; j++) {
                  this[item.children[i].children[j].name] = false;
                }
              }
            }
          }
        }
      });
    },
  },
  computed: {
    ...mapState(["menulist"]),
  },
  mounted() {
    this.getTypeInfo();
    this.authority();
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/s.scss";
</style>