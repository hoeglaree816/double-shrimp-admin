<template>
  <div class="root">
    <div class="title">
      <h2>类型管理</h2>
    </div>
    <div class="toolbar">
      <!-- 添加区域 -->
      <el-col :span="4">
        <el-button
          :disabled="type_add"
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
              :disabled="type_update"
              size="mini"
              type="primary"
              @click="handleUpdate(scope.$index, scope.row)"
              >编辑<i class="el-icon-edit"></i
            ></el-button>
            <!-- <el-button :disabled="type_delete" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除<i class="el-icon-delete"></i></el-button> -->
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
      //权限控制字段
      expertConsultation_type_add: true, //专家类别添加
      expertConsultation_type_update: true, //专家类别更新
      expertConsultation_type_select: true, //专家类别查询
      expertConsultation_articleType_add: true, //文章类别添加
      expertConsultation_articleType_update: true, //文章类别更新
      expertConsultation_articleType_select: true, //文章类别查询
      type_update: true,
      type_add: true,
      type_select: true,
    };
  },
  methods: {
    // 更新type权限控制
    changeTypeAuthority() {
      if (this.input == 0) {
        this.type_add = this.expertConsultation_type_add;
        this.type_select = this.expertConsultation_type_select;
        this.type_update = this.expertConsultation_type_update;
      } else {
        this.type_add = this.expertConsultation_articleType_add;
        this.type_select = this.expertConsultation_articleType_select;
        this.type_update = this.expertConsultation_articleType_update;
      }
    },
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
    // 重新将所有按钮设为true
    initAllButton(){
      this.expertConsultation_type_add = true;
      this.expertConsultation_type_select = true;
      this.expertConsultation_type_update = true;
      this.expertConsultation_articleType_add = true;
      this.expertConsultation_articleType_select = true;
      this.expertConsultation_articleType_update = true;
    },
    /* 获取表单数据 */
    getInfo() {
      this.initAllButton();
      if (this.input == 0) {
        this.authorityManagement("expertConsultation_type");
      } else {
        this.authorityManagement("expertConsultation_articleType");
      }
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
    authorityManagement(SonName) {
      //拿到权限列表循环判断是否有权限，有则将对应权限字段至false
      this.menulist.forEach((item) => {
        if (item.name == "expertConsultation") {
          if (!item.children.length == 0) {
            for (let i = 0; i < item.children.length; i++) {
              if (item.children[i].name == SonName) {
                for (let j = 0; j < item.children[i].children.length; j++) {
                  if (item.children[i].children[j].name) {
                    this[item.children[i].children[j].name] = false;
                  }
                }
              }
            }
          }
        }
      });
      // 更新统一后的type,由该type来控制最终的权限
      this.changeTypeAuthority();
    },
  },
  computed: {
    ...mapState(["menulist"]),
  },
  mounted() {
    this.getInfo();
    this.authorityManagement("expertConsultation_type");
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/s.scss";
</style>