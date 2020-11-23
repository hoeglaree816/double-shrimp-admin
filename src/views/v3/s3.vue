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
              <el-form-item label="分类:">
                <span>{{ props.row.typeId }}</span>
              </el-form-item>
              <el-form-item label="简介:">
                <span>{{ props.row.brief }}</span>
              </el-form-item>
              <el-form-item label="发布者:">
                <span>{{ props.row.createBy }}</span>
              </el-form-item>
              <el-form-item label="发布时间:">
                <span>{{ props.row.createDate}}</span>
              </el-form-item>
              <el-form-item label="更新者:">
                <span>{{ props.row.updateBy }}</span>
              </el-form-item>
              <el-form-item label="更新时间:">
                <span>{{ props.row.updateDate }}</span>
              </el-form-item>
              <el-form-item label="点击量:">
                <span>{{ props.row.clickNum }}</span>
              </el-form-item>
              <el-form-item label="是否推荐:">
                <i v-if="props.row.recommend" class="el-icon-check"></i>
                <i v-else class="el-icon-close"></i>
              </el-form-item>
              <el-form-item label="封面:">
                <img
                  :src="props.row.pic"
                  alt
                  style="
                    border: 2px solid #003366;
                    border-radius: 6px;
                    width: 400px;
                  "
                />
              </el-form-item>
              <el-form-item label="文稿:">
                <div
                  v-if="/(ppt)|(pptx)/.test(props.row.contentUrl)"
                  style="margin-left: 40px; margin-top: -40px"
                >
                  <el-button
                    size="small"
                    type="warning"
                    @click="previewArcticle(props.row.contentUrl)"
                    >全屏预览</el-button
                  >
                </div>
                <iframe
                  v-if="/(ppt)|(pptx)/.test(props.row.contentUrl)"
                  :src="`http://ow365.cn/?i=23209&furl=${props.row.contentUrl}`"
                  style="
                    border: 2px solid #003366;
                    border-radius: 6px;
                    width: 500px;
                    height: 500px;
                  "
                ></iframe>
                <span>{{
                  /(ppt)|(pptx)/.test(props.row.contentUrl)
                    ? ""
                    : "暂无文章或者格式错误"
                }}</span>
              </el-form-item>
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
          width="380"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="createBy"
          label="发布者"
          width="200"
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
        :current-page="recordPn"
        :page-size="recordPs"
        layout="total, prev, pager, next"
        :total="recordTatol"
      >
      </el-pagination>
    </el-dialog>
    <div class="title">
      <h2>演示文稿</h2>
    </div>
    <el-card class="box-card" shadow="always">
      <div class="toolbar">
        <el-col :span="4">
          <el-button
            :disabled="education_course_add"
            type="primary"
            size="medium"
            @click="handleAdd"
            icon="el-icon-plus"
            >添加</el-button
          >
        </el-col>
        <el-col :span="8">
          <el-input
            :disabled="education_course_select"
            placeholder="请输入关键字"
            v-model="input"
            class="input-with-select"
            clearable
            @clear="handleClear"
          >
            <el-button
              :disabled="education_course_select"
              slot="append"
              @click="handleSearch"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="12">
          <div class="deleteRecordBtn">
            <el-button
              class="delRecordBtn"
              type="warning"
              size="medium"
              @click="checkRecord(recordPn, recordPs)"
              >删除记录</el-button
            >
          </div>
        </el-col>
      </div>
      <div class="infoType">
        <span>类型：</span>
        <el-select
          :disabled="selectDisabled"
          style="width: 180px"
          v-model="optionsValue"
          placeholder="请选择类型"
          @change="handleSeletChange"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          style="width: 100%"
          max-height="600"
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
            width="200"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="brief"
            label="简介"
            width="400"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="createBy"
            label="创建者"
            width="200"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="createDate"
            label="创建时间"
            width="200"
            align="center"
          ></el-table-column>
          <el-table-column label="是否推荐" width="120" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.recommend"
                active-color="#13ce66"
                inactive-color="#C0C4CC"
                @change="handleSwitchChange(scope.$index, scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="200"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                :disabled="education_course_update"
                size="mini"
                type="primary"
                @click="handleUpdate(scope.$index, scope.row)"
                >编辑<i class="el-icon-edit"></i
              ></el-button>
              <el-button
                :disabled="education_course_delete"
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
    <div class="bottom">
      <span>@对虾全产业链云平台-管理后台</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
const model = require("../../js/v3/s3");
export default {
  data() {
    return {
      input: "",
      pn: 1,
      ps: 5,
      total: 100,
      tableData: [],
      //需要从后端动态获取
      options: [],
      // 选择的id
      optionsValue: "",
      // 存储删除记录
      gridData: [],
      // 打开对话框的标志
      dialogTableVisible: false,
      // 删除记录的当前页
      recordPn: 1,
      // 删除记录的每页尺寸
      recordPs: 8,
      // 删除记录的总条数
      recordTatol: 0,
      selectDisabled: false,
      //权限控制字段
      education_course_add: false, //课程添加
      education_course_update: false, //课程更新
      education_course_delete: false, //课程删除
      education_course_select: false, //课程查询
    };
  },
  methods: {
    previewArcticle(url) {
      console.log("url: ", url);
      if (/(ppt)|(pptx)/.test(url)) {
        window.open(`http://ow365.cn/?i=23209&furl=${url}`);
        return;
      }
      this.$message.error("暂无文章或者格式错误");
    },
    // 设置为推荐开关变化执行函数
    handleSwitchChange(index, row) {
      //index是行数，row是该行数据
      this.$confirm("是否确定改变此文章推荐设置?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //执行数据库操作
          if (row.recommend) {
            //此时的row.recommend是触发事件之后的，也就是和原先的相反
            model.recommendNewById(row.id).then((res) => {
              console.log(res);
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
              console.log(res);
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
    handleAdd() {
      this.$router.push("/v3/s3-insert");
    },
    handleCurrentChange(pn) {
      this.pn = pn;
      if (this.selectDisabled) {
        model.getByKeyWord(this.input, this.pn, this.ps).then((res) => {
          if (res.rows.length == 0) {
            this.$message({
              type: "warning",
              message: "暂无相关信息",
            });
          }
          this.tableData = res.rows;
          this.total = res.total;
        });
      } else {
        model
          .getManuscriptsByCategoryId(this.optionsValue, this.pn, this.ps)
          .then((res) => {
            this.tableData = res.rows;
            this.total = res.total;
          });
      }
    },
    handleSizeChange(ps) {
      this.ps = ps;
      model
        .getManuscriptsByCategoryId(this.optionsValue, 1, this.ps)
        .then((res) => {
          this.tableData = res.rows;
          this.total = res.total;
        });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该信息，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          model.delete(row.id).then((code) => {
            if (code == 20000) {
              this.$message({
                message: `成功删除ID为${row.id}的信息`,
                type: "success",
              });
              model
                .getManuscriptsByCategoryId(
                  this.optionsValue,
                  this.pn,
                  this.ps
                )
                .then((res) => {
                  this.tableData = res.rows;
                  this.total = res.total;
                });
            } else {
              this.$message({
                message: `删除失败`,
                type: "error",
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
    handleDetail(id) {
      this.$router.push({
        path: "/v3/s3-detail",
        query: {
          id: id,
        },
      });
    },
    handleSearch() {
      if (this.input == "")
        this.$message({
          type: "warning",
          message: "请输入内容查询",
        });
      else {
        this.selectDisabled = true;
        model.getByKeyWord(this.input, 1, this.ps).then((res) => {
          if (res.rows.length == 0) {
            this.$message({
              type: "warning",
              message: "暂无相关信息",
            });
          }
          this.tableData = res.rows;
          this.total = res.total;
        });
      }
    },
    handleUpdate(index, row) {
      this.$router.push({
        path: "/v3/s3-update",
        query: {
          id: row.id,
        },
      });
    },
    handleSeletChange() {
      //选择选择器发生选择值变化执行函数
      // console.log(this.optionsValue)
      model
        .getManuscriptsByCategoryId(this.optionsValue, 1, this.ps)
        .then((res) => {
          this.pn = 1;
          this.tableData = res.rows;
          this.total = res.total;
        });
    },
    handleClear() {
      this.selectDisabled = false;
      model
        .getManuscriptsByCategoryId(this.optionsValue, 1, this.ps)
        .then((res) => {
          this.pn = 1;
          this.tableData = res.rows;
          this.total = res.total;
        });
    },
    // 处理删除记录对话框的换页
    handleCurrentChangeByDelReord(pn) {
      this.recordPn = pn;
      model.findDeleteRecord(pn, this.recordPs).then((res) => {
        this.gridData = res.rows;
        this.recordTatol = res.total;
      });
    },
    // 查询删除记录
    checkRecord(pn, ps) {
      model.findDeleteRecord(pn, ps).then((res) => {
        this.dialogTableVisible = true;
        this.gridData = res.rows;
        this.recordTatol = res.total;
        console.log(res.rows);
      });
    },
  },
  computed: {
    ...mapState(["menulist"]),
  },
  mounted() {
    model
      .getManuscriptsTypes()
      .then((res) => {
        this.options = res;
        // 默认为第一个类型
        this.optionsValue = res[0].id;
        return this.optionsValue;
      })
      .then((typeId) => {
        // 根据类型获取数据
        model
          .getManuscriptsByCategoryId(typeId, 1, this.ps)
          .then((res) => {
            this.tableData = res.rows;
            this.total = res.total;
          });
      });
    // 拿到权限列表循环判断是否有权限，有则将对应权限字段至false
    this.menulist.forEach((item) => {
      if (item.name == "education") {
        if (!item.children.length == 0) {
          for (let i = 0; i < item.children.length; i++) {
            if (item.children[i].name == "education_course") {
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