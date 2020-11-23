<template>
  <div class="root">
    <div class="title">
      <h2>类型管理</h2>
    </div>
    <div class="toolbar">
      <!-- 添加区域 -->
      <el-col :span="4">
        <el-button
          :disabled="expertConsultation_type_add"
          type="primary"
          size="medium"
          @click="handleAdd"
          icon="el-icon-plus"
          >添加</el-button
        >
      </el-col>

      <!-- 选择区域 -->
      <el-col :span="8">
        <el-select
          :disabled="expertConsultation_type_select"
          placeholder="请选择类型"
          v-model="input"
          class="input-with-select"
          @change="getInfo"
        >
          <el-option
            v-for="item in options"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
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
          prop="id"
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
          label="专家分类"
          width="680"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="parentId"
          label="父级类型"
          width="525"
        ></el-table-column>
        <el-table-column label="操作" fixed="right" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              :disabled="expertConsultation_type_update"
              size="mini"
              type="primary"
              @click="handleUpdate(scope.$index, scope.row)"
              >编辑<i class="el-icon-edit"></i
            ></el-button>
            <!-- <el-button :disabled="expertConsultation_type_delete" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除<i class="el-icon-delete"></i></el-button> -->
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
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
const model = require("../../js/v5/s4");
export default {
  data() {
    return {
      input: 0,
      pn: 1,
      ps: 5,
      total: 100,
      tableData: [],

      /* 选择 */
      options: [
        {
          label: "专家类型",
          value: 0,
        },
        {
          label: "文章类型",
          value: 1,
        },
      ],
      //权限控制字段（暂时为false）
      expertConsultation_type_add: false, //类别添加
      expertConsultation_type_update: false, //类别更新
      expertConsultation_type_delete: false, //类别删除
      expertConsultation_type_select: false, //类别查询
    };
  },
  methods: {
    /* 监听页面数据 */
    handleCurrentChange(pn) {
      this.pn = pn;
      this.getInfo();
    },
    handleSizeChange(ps) {
      this.ps = ps;
      this.pn = 1;
      this.getInfo();
    },

    /* 获取表单数据 */
    getInfo() {
      model.list(this.pn, this.ps, this.input).then((value) => {
        this.tableData = value.data.data.rows;
        this.total = value.data.data.total;
      });
    },

    /* 添加 */
    handleAdd() {
      this.$router.push({
        path: "/v5/s4-insert",
        query: {
          type: this.input,
        },
      });
    },

    /* 查看详情 */
    handleDetail(id) {
      this.$router.push({
        path: "/v5/s4-detail",
        query: {
          id: id,
          type: this.input,
        },
      });
    },

    /* 修改 */
    handleUpdate(index, row) {
      this.$router.push({
        path: "/v5/s4-update",
        query: {
          id: row.id,
          type: this.input,
        },
      });
    },

    /* 权限控制 */
    authorityManagement() {
      //拿到权限列表循环判断是否有权限，有则将对应权限字段至false
      this.menulist.forEach((item) => {
        if (item.name == "expertConsultation") {
          if (!item.children.length == 0) {
            for (let i = 0; i < item.children.length; i++) {
              if (item.children[i].name == "expertConsultation_type") {
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
    this.getInfo();
    this.authorityManagement();
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/s.scss";
</style>