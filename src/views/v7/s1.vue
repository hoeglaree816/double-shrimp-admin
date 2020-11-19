<template>
  <div class="root">
    <div class="title">
      <h2>基地管理</h2>
    </div>
    <el-card class="box-card" shadow="always">
      <!-- 添加区域 -->
      <div class="toolbar">
        <el-row :gutter="30">
          <el-col :span="2" :offset="17">
            <el-button
              type="primary"
              size="mini"
              @click="handleAdd"
              icon="el-icon-plus"
              >添加信息</el-button
            >
          </el-col>
          <el-col :span="2">
            <el-button
              type="success"
              size="mini"
              @click="dialogVisible = true"
              icon="el-icon-upload2"
              >上传文件</el-button
            >
          </el-col>

          <el-col :span="2">
            <el-button
              type="danger"
              size="mini"
              @click="deleteAll"
              icon="el-icon-delete-solid"
              >多项删除</el-button
            >
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
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50"> </el-table-column>
          <el-table-column prop="id" label="地区id" width="280" align="center">
          </el-table-column>
          <el-table-column
            prop="region"
            label="地区"
            width="150"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="outPut"
            label="产量"
            width="100"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="area"
            label="养殖面积"
            width="150"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="measureOfConsumption"
            label="消费量"
            width="150"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="sumOfConsumption"
            label="消费额"
            width="150"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="time"
            label="年份"
            width="150"
            align="center"
          ></el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="300"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleUpdate(scope.$index, scope.row.id)"
              >
                编辑
                <i class="el-icon-edit"></i>
              </el-button>
              <el-button
                size="mini"
                type="danger"
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

      <el-dialog title="上传产业信息" :visible.sync="dialogVisible" width="30%">
        <el-upload
          style="text-align: center"
          drag
          action="http://120.79.63.74:9013/industry/upload"
          multiple
          :before-upload="beforeUpload"
          :show-file-list="false"
          :on-success="onSuccess"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传excel文件，且不超过5MB
          </div>
        </el-upload>
        <span slot="footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </el-card>

    <!-- 底部注释 -->
    <div class="bottom">
      <span>@对虾全产业链云平台-管理后台</span>
    </div>
  </div>
</template>

<script>
const model = require("../../js/v7/s1");
export default {
  data() {
    return {
      input: "",
      pn: 1,
      ps: 5,
      total: 100,
      tableData: [],
      disabled: false, //是否禁用分页
      deleteAllInfo: [],

      // 控制上传窗口的显示与隐藏
      dialogVisible: false,

      // 保存文件
      files: null,

      // 文件名
      fileName: "",

      // 请求头
      headers: {
        "Content-Type": "multipart/form-data",
      },
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

    // 选择多个
    handleSelectionChange(val) {
      this.deleteAllInfo = val;
    },

    // 多项删除
    deleteAll() {
      this.$confirm("此操作将永久删除所选信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let val = this.deleteAllInfo;
          model.deleteAll(val).then((value) => {
            //提示用户操作情况
            if (value.flag) {
              this.$message({
                type: "success",
                message: "删除成功",
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
                message: "删除失败！！",
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
      this.$router.push("/v7/s1-insert");
    },

    // 修改
    handleUpdate(index, id) {
      this.$router.push({
        path: "/v7/s1-update",
        query: {
          id: id,
        },
      });
    },

    // 上传拦截
    beforeUpload(file) {
      var This = this
      this.files = file;
      model.beforeUpload(file, This)
    },

    // 上传返回值
    onSuccess(file) {
      console.log(file);
      let res = file;
      if (res.code !== 20000) {
        this.$message.error("上传失败！！");
      } else {
        this.$message.success("上传成功！！");
      }
    },
  },
  mounted() {
    model.list(this.pn, this.ps).then((value) => {
      this.total = value.data.total;
      this.tableData = value.data.rows;
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/s.scss";
</style>
