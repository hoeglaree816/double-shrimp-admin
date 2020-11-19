<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="backList"></el-button>
      <h2>基地用户管理</h2>
    </div>
    <!-- 基地列表区域 -->
    <el-card>
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="550"
        stripe
        :border="false"
        :fit="false"
      >
        <el-table-column prop="name" label="用户名称" width="210" align="center"></el-table-column>
        <el-table-column prop="sex" label="性别" align="center"></el-table-column>
        <el-table-column prop="baseIdentity" label="身份" width="160" align="center">
          <template slot-scope="props">
            <span>{{ props.row.baseIdentity=="1"?"基地管理员":"普通人员" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="220" align="center"></el-table-column>
        <el-table-column prop="moblie" label="手机" width="220" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="220" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" width="300" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
              解绑基地
              <i class="el-icon-delete"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pn"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="ps"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :disabled="disabled"
      ></el-pagination>-->
    </el-card>
    <div class="bottom">
      <span>@对虾全产业链云平台-管理后台</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
const model = require("../../js/v1/s2");

export default {
  data() {
    return {
      baseId: "",
      // input: "",
      // pn: 1,
      // ps: 5,
      // total: 100,
      tableData: [],
    };
  },
  methods: {
    // 返回列表
    backList() {
      this.$router.push("/v1/s1");
    },
    // 解绑基地
    handleDelete(index, row) {
      console.log(row);
      this.$confirm("此操作将永久解除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          model.delete(row.userId).then((value) => {
            //提示用户操作情况
            if (value.flag) {
              this.$message({
                type: "success",
                message:
                  `ID为${row.userId}的信息` +
                  value.message +
                  " 状态码为：" +
                  value.code,
              });
              //刷新表单
              model.list(this.baseId).then((value) => {
                console.log(value.data);
                this.tableData = value.data;
              });
            } else {
              this.$message({
                type: "error",
                message:
                  `ID为${row.userId}的信息` +
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
  },
  computed: {
    ...mapState(["menulist"]),
  },
  mounted() {
    this.baseId = this.$route.query.id;
    model.list(this.baseId).then((value) => {
      console.log(value.data);
      this.tableData = value.data;
    });
  },
};
</script>
<style lang="scss" scoped>
.root {
  width: 100%;
  height: 100%;
  min-height: 100%;
  background-color: #DCDFE6;//合并1.5版本新增
  .title {
    background-color: #fff;
    width: 100%;
    height: 50px;

    padding: {
      top: 80px; //内容top50px-->80px
    }

    button {
      float: left;
      top: 50%;
      left: 2%;
      transform: translateY(-50%);
    }

    h2 {
      float: left;
      width: 50%;
      top: 50%;
      left: 5%;
      transform: translateY(-50%);
      span {
        color: #e47220;
      }
    }
  }
}
.el-card {
  /* 设置卡片区域的阴影 */
  margin: 1%;
  border-radius: 15px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
}
//合并版本1.5增加
.bottom{
    span{
        font-size: x-small;
        font-weight: bold;
    }
    text-align: center;
}
</style>


