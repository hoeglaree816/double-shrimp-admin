<template>
  <div class="root">
    <div class="title">
      <h2>商品评论</h2>
    </div>
    <el-card class="box-card"  shadow="always">
    <div class="toolbar">
      <el-col :span="4">
        <div style="height:10px"></div>
        <!-- <el-button
          type="primary"
          size="medium"
          @click="handleAdd"
          icon="el-icon-plus"
          >添加</el-button
        > -->
      </el-col>
      <el-col :span="8">
        <el-input
          placeholder="请输入商品ID查询商品评论"
          v-model="input"
          :disabled="ecommerce_comment_select"
          class="input-with-select"
          clearable
        >
          <el-button
          :disabled="ecommerce_comment_select"
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
        max-height="620"
        stripe
        :border="false"
        :fit="false"
      >
        <el-table-column type="expand" fixed="left" label="详情信息" width="85">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="评论id：">
                <span>{{ props.row.commentId }}</span>
              </el-form-item>
              <el-form-item label="用户id：">
                <span>{{ props.row.userId }}</span>
              </el-form-item>
              <el-form-item label="商品id：">
                <span>{{ props.row.productId }}</span>
              </el-form-item>
              <el-form-item label="评论内容：">
                <span>{{ props.row.commentContent }}</span>
              </el-form-item>
              <el-form-item label="评论状态：">
                <span>
                  <el-tag size="medium" v-if="props.row.commentStatus == 1" type="warning">待审核</el-tag>
                  <el-tag size="medium" v-else-if="props.row.commentStatus == 2" type="success">已审核可见</el-tag>
                  <el-tag size="medium" v-else type="danger">不可查看</el-tag>
                </span>
              </el-form-item>
              <el-form-item label="评论时间：">
                <span>{{ props.row.commentTime }}</span>
              </el-form-item>
              <el-form-item label="评论图片：">
                <el-image
                  style="width: 500px; height: 500px"
                  :src="props.row.commentPic"
                >
                </el-image>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="商品评论id"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleDetail(scope.row.commentId)"
              >{{ scope.row.commentId }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="userId"
          label="用户id"
          width="220"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="productId"
          label="商品id"
          width="220"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="commentContent"
          label="评论内容"
          width="620"
          align="center"
        ></el-table-column>
        <!-- <el-table-column
          prop="commentTime"
          label="评论时间"
          width="110"
          align="center"
        ></el-table-column> -->
        <el-table-column label="操作" fixed="right" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              :disabled="ecommerce_comment_update"
              @click="handleUpdate(scope.$index, scope.row)"
              >审核<i class="el-icon-edit"></i></el-button
            >
            <el-button
              size="mini"
              type="danger"
              :disabled="ecommerce_comment_delete"
              @click="handleDelete(scope.$index, scope.row)"
              >删除<i class="el-icon-delete"></i></el-button
            >
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
const model = require("../../js/v4/s6");
export default {
  data() {
    return {
      input: "",
      pn: 1,
      ps: 5,
      total: 0,
      tableData: [],
      disabled:true,//是否禁用分页
      //权限控制字段
      ecommerce_comment_delete:true,//评论删除
      ecommerce_comment_select:true,//评论查询
      ecommerce_comment_update:true,//评论审核
    };
  },
  methods: {
    // handleAdd() {
    //   this.$router.push("/v4/s6-insert");
    // },
    handleCurrentChange(pn) {
      this.pn = pn;
      if(this.input ==""){
        this.$message({
          message: `请输入要查询地址的用户id`,
          type: "warning",
        })
      }else{
        model.list(this.pn, this.ps, this.input).then((value) => {
          this.tableData = value.data.data.content;
          this.total = value.data.data.totalElements;
        });
      }
    },
    handleSizeChange(ps) {
      this.ps = ps;
      if(this.input ==""){
        this.$message({
          message: `请输入要查询地址的用户id`,
          type: "warning",
        })
      }else{
        model.list(this.pn, this.ps, this.input).then((value) => {
          this.tableData = value.data.data.content;
          this.total = value.data.data.totalElements;
        });
      }
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          model.delete(row.commentId).then((value) => {
            //提示用户操作情况
            if (value.data.flag) {
                this.$message({
                  type: "success",
                  message: `ID为${row.commentId}的信息`+ value.data.message + " 状态码为：" + value.status,
                });
                //刷新表单
                model.list(this.pn, this.ps, this.input).then((value) => {
                  if (!value.data.data.content.length == 0) {
                    //判断删除之后该页是否为空，若为空，则执行else查询上一页内容
                    this.tableData = value.data.data.content;
                    this.total = value.data.data.totalElements;
                  } else {
                    model.list(this.pn - 1, this.ps, this.input).then((value) => {
                      this.tableData = value.data.data.content;
                      this.total = value.data.data.totalElements;
                    });
                  }
                });
            } else {
                this.$message({
                  type: "error",
                  message: `ID为${row.commentId}的信息`+ value.data.message + " 状态码为：" + value.status,
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
        path: "/v4/s6-detail",
        query: {
          id: id,
        },
      });
    },
    handleSearch() {
      this.pn =1;
      if(this.input ==""){
        this.$message({
          message: `请输入要查询评论的商品id`,
          type: "warning",
        })
      }else{
        model.list(this.pn, this.ps, this.input).then((value) => {
          if(value.data.data.content.length == 0){
            this.$message({
              message: `查询结果为空`,
              type: "warning",
            })
            this.tableData = [];
            this.total =0;
            this.disabled =true;
          }else{
            this.tableData = value.data.data.content;
            this.total = value.data.data.totalElements;
            this.disabled =false;
          }
        });
      }
    },
    handleUpdate(index, row) {
      this.$router.push({
        path: "/v4/s6-update",
        query: {
          id: row.commentId,
        },
      });
    },
  },
  computed: {
    ...mapState(["menulist"]),
  },
  mounted() {
    // model.list(this.pn, this.ps,this.input).then(value => {
    //   this.tableData = value.data.content;
    // });
    // model.count().then(value => {
    //   this.total = value;
    // });
    //拿到权限列表循环判断是否有权限，有则将对应权限字段至false
    this.menulist.forEach((item) => {
      if(item.name =="ecommerce"){
        if(!item.children.length == 0){
          for(let i=0; i<item.children.length;i++){
            if(item.children[i].name =="ecommerce_comment"){
              for(let j=0;j<item.children[i].children.length;j++){
                this[item.children[i].children[j].name] =false
              }
            }
          }
        }
      }
    });
    this.foo = this.$notify({//获取到this.$notify的实例给this，方便在beforeDestroy中调用
      title: '来自->商品评论<-提示',
      message: '需要输入商品ID才能查询到其对应的商品评论！',
      type: 'warning',
      duration: 5000,
      offset: 80,
      showClose: false
    });
  },
  beforeDestroy(){
    this.foo.close()
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/s.scss";
.demo-table-expand {
  //评论详情展开页
  font-size: 0;
  .el-form-item {
    margin-left: 10%;
    margin-right: 0;
    margin-bottom: 0;
    width: 40%;
    color: #0978c2;
  }
}
</style>
