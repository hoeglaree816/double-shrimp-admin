<template>
  <div class="root">
    <!-- 删除记录对话框 -->
    <el-dialog
      title="删除记录"
      :visible.sync="dialogTableVisible"
      width="70%"
      center
    >
      <el-table :data="gridData" stripe>
        <el-table-column type="expand" fixed="left" label="详情" width="70">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="id：">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="标题:">
                <span>{{ props.row.title }}</span>
              </el-form-item>
              <el-form-item label="作者:">
                <span>{{ props.row.editor }}</span>
              </el-form-item>
              <el-form-item label="概要:">
                <span>{{ props.row.summary }}</span>
              </el-form-item>
              <el-form-item label="资讯类型:">
                <span>{{ props.row.typeId }}</span>
              </el-form-item>
              <el-form-item label="创建时间:">
                <span>{{ creationTime(props.row.creationTime) }}</span>
              </el-form-item>
              <el-form-item label="点击量:">
                <span>{{ props.row.clickNum }}</span>
              </el-form-item>
              <el-form-item label="是否推荐:">
                <i v-if="props.row.recommend" class="el-icon-check"></i>
                <i v-else class="el-icon-close"></i>
              </el-form-item>
              <el-form-item label="图片:">
                <el-image
                  style="width: 400px; height: 400px"
                  :src="props.row.picture"
                >
                </el-image>
              </el-form-item>
              <!-- <el-form-item label="正文:">
                <span v-html="props.row.content"></span>
              </el-form-item> -->
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          label="id"
          width="220"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="580"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="editor"
          label="作者"
          width="250"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="clickNum"
          label="点击量"
          width="120"
          align="center"
        ></el-table-column>
      </el-table>
      <el-pagination
        style="text-align: center"
        @current-change="handleCurrentChangeByDelReord"
        :current-page="reordPn"
        :page-size="reordPs"
        layout="total, prev, pager, next"
        :total="reordTatol"
      >
      </el-pagination>
    </el-dialog>
    <div class="title">
      <h2>政策法规信息管理</h2>
    </div>
    <el-card class="box-card" shadow="always">
      <div class="toolbar">
        <!-- 添加区域 -->
        <el-col :span="4">
          <el-button
            :disabled="information_Policies_add"
            type="primary"
            size="medium"
            @click="handleAdd"
            icon="el-icon-plus"
            >添加</el-button
          >
        </el-col>

        <!-- 关键字搜索 -->
        <el-col :span="8">
          <el-input
            placeholder="请输入关键字"
            :disabled="information_Policies_select"
            v-model="input"
            class="input-with-select"
            clearable
            @clear="handleClear"
          >
            <el-button
              :disabled="information_Policies_select"
              slot="append"
              @click="handleSearch"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>

        <!-- 查看删除历史区域 -->
        <el-col :span="12">
          <div class="deleteRecordBtn">
            <el-button
              class="delRecordBtn"
              type="warning"
              size="medium"
              @click="checkReord(reordPn, reordPs)"
              >删除记录</el-button
            >
          </div>
        </el-col>
      </div>
      <div class="infoType" v-if="isInput">
        <span>类型：</span>
        <el-select
          style="width: 180px"
          v-model="optionsTypeValue"
          placeholder="请选择类型"
          @change="handleSeletChangeType"
        >
          <el-option
            v-for="item in typesById"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>

      <!-- 表格区域 -->
      <div class="table">
        <el-table
          :data="tableData"
          style="width: 100%"
          max-height="545"
          stripe
          :border="false"
          :fit="false"
        >
          <!-- 详情页面 -->
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
                @click="handleDetail(scope.row.id, pn, ps, optionsTypeValue)"
                >{{ scope.row.id }}</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            width="580"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="editor"
            label="作者"
            width="280"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="clickNum"
            label="点击量"
            width="140"
            align="center"
          ></el-table-column>
          <el-table-column label="是否推荐" width="120" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.recommend"
                active-color="#13ce66"
                inactive-color="#C0C4CC"
                @change="handleSwitchChange(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="200"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleUpdate(scope.$index, scope.row)"
                :disabled="information_Policies_update"
                >编辑<i class="el-icon-edit"></i
              ></el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.id)"
                :disabled="information_Policies_delete"
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
const model = require("../../js/v8/s1");
export default {
  data() {
    return {
      pn: 1,
      ps: 5,
      total: 0,

      /* 关键字： 用于搜索 */
      input: "",

      /* 列表数据 */
      tableData: [],

      /* 数据类型选择 */
      optionsTypeValue: "",

      // 存储删除记录
      gridData: [],

      // 打开对话框的标志
      dialogTableVisible: false,

      // 删除记录的当前页
      reordPn: 1,

      // 删除记录的每页尺寸
      reordPs: 8,

      // 删除记录的总条数
      reordTatol: 0,

      // 政策分类的数据
      typesById: [],

      // 控制类型选择的显示与隐藏
      isInput: true,

      /* 权限管理字段（暂时置为false） */
      information_Policies_add: false, //添加
      information_Policies_update: false, //更新
      information_Policies_delete: false, //删除
      information_Policies_select: false, //查询
    };
  },
  methods: {
    /* 搜索为空时，重新获取数据 */
    handleClear() {
      this.pn = 1;
      this.ps = 5;
      this.handleSeletChangeType();
      this.isInput = true;
    },

    /* 关键字搜索 */
    handleSearch() {
      if (this.input === "") {
        this.$message({
          type: "warning",
          message: "请输入内容查询",
        });
      } else {
        this.isInput = false;
        this.getInfoByKey();
      }
    },

    /* 获取关键字数据 */
    getInfoByKey() {
      model.getByKeyWord(this.input, this.pn, this.ps, 2).then((value) => {
        this.tableData = value.data.data.rows;
        this.total = value.data.data.total;
      });
    },

    /* 添加 */
    handleAdd() {
      this.$router.push("/v8/s1-insert");
    },

    /* 修改 */
    handleUpdate(index, row) {
      this.$router.push({
        path: "/v8/s1-update",
        query: {
          id: row.id,
        },
      });
    },

    /* 详情 */
    handleDetail(id, pn, ps) {
      this.$router.push({
        path: "/v8/s1-detail",
        query: {
          id: id,
          pn: pn,
          ps: ps,
        },
      });
    },

    /* 查询删除记录 */
    checkReord(pn, ps) {
      model.findDeleteRecord(pn, ps).then((value) => {
        this.dialogTableVisible = true;
        this.gridData = value.data.data.rows;
        this.reordTatol = value.data.data.total;
      });
    },

    //展示删除记录的当前页
    handleCurrentChangeByDelReord(pn) {
      this.reordPn = pn;
      model.findDeleteRecord(pn, this.reordPs).then((value) => {
        this.gridData = value.data.data.rows;
        this.reordTatol = value.data.data.total;
      });
    },

    /* 时间转化 */
    creationTime(value) {
      //时间转换
      let newValue = null;
      newValue = value != null ? value.slice(0, 10) : "";
      return newValue;
    },

    /* 设置为推荐开关变化执行函数 */
    handleSwitchChange(row) {
      console.log(row);
      this.$confirm("是否确定改变此信息推荐设置?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (row.recommend) {
            model.recommendNewById(row.id).then((res) => {
              console.log(res.data);
              if (res.data.flag) {
                this.$message({
                  type: "success",
                  message: "设置推荐成功!",
                });
              } else {
                this.$message({
                  type: "error",
                  message: "设置推荐失败!",
                });
              }
            });
          } else {
            model.cancelRecommendNewById(row.id).then((res) => {
              console.log(res.data);
              if (res.data.flag) {
                this.$message({
                  type: "success",
                  message: "取消推荐成功!",
                });
              } else {
                this.$message({
                  type: "error",
                  message: "取消推荐失败!",
                });
              }
            });
          }
        })
        .catch(() => {
          //取消操作时，将switch改的值取反。使其和初始值保持一致。
          row.recommend = !row.recommend;
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },

    /* 获取当前页数据 */
    handleCurrentChange(pn) {
      this.pn = pn;
      if (this.input === "") {
        this.handleSeletChangeType();
      } else {
        this.getInfoByKey();
      }
    },

    /* 获取每页的尺寸 */
    handleSizeChange(ps) {
      this.ps = ps;
      this.pn = 1;
      if (this.input === "") {
        this.handleSeletChangeType();
      } else {
        this.getInfoByKey();
      }
    },

    /* 选择政策类型进行渲染数据 */
    handleSeletChangeType() {
      model
        .getInfoByTypeId(this.optionsTypeValue, this.pn, this.ps)
        .then((value) => {
          this.tableData = value.data.data.rows;
          this.total = value.data.data.total;
        });
    },

    /* 删除操作 */
    async handleDelete(id) {
      await this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await model.delete(id).then((value) => {
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

      /* 维护数据 */
      this.handleSeletChangeType();
    },

    /* 权限管理 */
    authority() {
      //拿到权限列表循环判断是否有权限，有则将对应权限字段至false
      this.menulist.forEach((item) => {
        if (item.name == "information") {
          if (!item.children.length == 0) {
            for (let i = 0; i < item.children.length; i++) {
              if (item.children[i].name === "information_Policies") {
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
    this.authority();
    /* 获取政策类型 */
    model
      .getPoliciesTypes()
      .then((res) => {
        // 获取后填充数据
        this.typesById = res.data.data;
        this.optionsTypeValue = this.typesById[0].id;
      })
      .then(() => {
        // 初始化数据
        this.handleSeletChangeType();
      });
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/s.scss";
.infoType {
  margin-left: 25px;
  font-weight: bold;
  color: #036;
}
.deleteRecordBtn {
  display: flex;
  justify-content: flex-end;
}
.delRecordBtn {
  transition: all 0.4s;
}
.delRecordBtn:hover {
  transform: scale(1.1);
}
// 删除记录表格展开行样式
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
// 状态√、×的样式
.el-icon-close {
  color: #f56c6c;
  font-size: 23px;
  font-weight: bold;
}
.el-icon-check {
  color: #67c23a;
  font-size: 23px;
  font-weight: bold;
}
</style>