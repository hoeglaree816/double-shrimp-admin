<template>
  <div class="root">
    <div class="title">
      <h2>商品</h2>
    </div>
    <el-card class="box-card"  shadow="always">
    <div class="toolbar">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button
            type="primary"
            size="medium"
            @click="handleAdd"
            :disabled="ecommerce_commodity_add"
            icon="el-icon-plus"
            >添加</el-button
          >
        </el-col>
        <el-col :span="8">
          <el-input
            placeholder="请输入ID"
            v-model="input"
            class="input-with-select"
            clearable
            :disabled="ecommerce_commodity_select"
          >
            <el-button
              slot="append"
              @click="handleSearch"
              icon="el-icon-search"
              :disabled="ecommerce_commodity_select"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button
            type="danger"
            plain
            size="medium"
            @click="backlist"
            v-show="disabled"
            icon="el-icon-s-fold"
            >返回列表</el-button
          >
        </el-col>
      </el-row>
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
              <el-form-item label="商品id：">
                <span>{{ props.row.productId }}</span>
              </el-form-item>
              <el-form-item label="商品名称：">
                <span>{{ props.row.productName }}</span>
              </el-form-item>
              <el-form-item label="商品标题：">
                <span>{{ props.row.productTitle }}</span>
              </el-form-item>
              <el-form-item label="商品单价：">
                <span>{{ props.row.productPrice }}</span>
              </el-form-item>
              <el-form-item label="单位：">
                <span>{{ props.row.productUnit }}</span>
              </el-form-item>
              <el-form-item label="商品库存：">
                <span>{{ props.row.productNum }}</span>
              </el-form-item>
              <el-form-item label="商品条形码：">
                <span>{{ props.row.productBarcode }}</span>
              </el-form-item>
              <el-form-item label="商品图片：">
                <el-image
                  style="width: 500px; height: 500px"
                  :src="props.row.productImages"
                >
                </el-image>
              </el-form-item>
              <el-form-item label="商品类别id：">
                <span>{{ props.row.categoryId }}</span>
              </el-form-item>
              <el-form-item label="商品点赞数：">
                <span>{{ props.row.productStars }}</span>
              </el-form-item>
              <el-form-item label="商品产地：">
                <span>{{ props.row.productArea }}</span>
              </el-form-item>
              <el-form-item label="商品状态：">
                <el-tag type="success" effect="dark" v-if="props.row.productStatus=='1'"><span>正常</span></el-tag>
                <el-tag type="warning" effect="dark" v-else-if="props.row.productStatus=='2'"><span>待审核</span></el-tag>
                <el-tag type="info" effect="dark" v-else><span>下架</span></el-tag>
              </el-form-item>
              <el-form-item label="商铺id：">
                <span>{{ props.row.merchantId }}</span>
              </el-form-item>
              <el-form-item label="商品创建时间：">
                <span>{{ props.row.productCreated }}</span>
              </el-form-item>
              <el-form-item label="商品更新时间：">
                <span>{{ props.row.productUpdated }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="productId" label="商品id" width="280" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleDetail(scope.row.productId)"
              >{{ scope.row.productId }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="productName"
          label="商品名称"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="productTitle"
          label="商品标题"
          width="500"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="productNum"
          label="商品库存"
          width="120"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" fixed="right" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              :disabled="ecommerce_commodity_update"
              @click="handleUpdate(scope.$index, scope.row)"
              >编辑<i class="el-icon-edit"></i></el-button
            >
            <el-button
              size="mini"
              type="danger"
              :disabled="ecommerce_commodity_delete"
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
const model = require("../../js/v4/s1");
export default {
  data() {
    return {
      input: "",
      pn: 1,
      ps: 5,
      total: 100,
      tableData: [],
      disabled:false,//是否禁用分页
      //权限控制字段
      ecommerce_commodity_add:true,//商品添加
      ecommerce_commodity_update:true,//商品更新
      ecommerce_commodity_delete:true,//商品删除
      ecommerce_commodity_select:true,//商品查询
    };
  },
  methods: {
    handleAdd() {
      this.$router.push("/v4/s1-insert");
    },
    //返回列表
    backlist() {
      this.input="";
      this.pn =1;
      model.list(this.pn, this.ps).then((value) => {
        this.total = value.data.data.totalElements;
        this.tableData = value.data.data.content;
      });
      this.disabled =false;
    },
    handleCurrentChange(pn) {
      this.pn = pn;
      model.list(this.pn, this.ps).then((value) => {
        this.total = value.data.data.totalElements;
        this.tableData = value.data.data.content;
      });
    },
    handleSizeChange(ps) {
      this.ps = ps;
      model.list(this.pn, this.ps).then((value) => {
        this.total = value.data.data.totalElements;
        this.tableData = value.data.data.content;
      });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          model.delete(row.productId).then((value) => {
            //提示用户操作情况
            if (value.data.flag) {
                this.$message({
                  type: "success",
                  message: `ID为${row.productId}的信息`+ value.data.message + " 状态码为：" + value.status,
                });
                //刷新表单
                model.list(this.pn, this.ps).then((value) => {
                  if (!value.data.data.content.length == 0) {
                    //判断删除之后该页是否为空，若为空，则执行else查询上一页内容
                    this.tableData = value.data.data.content;
                    this.total = value.data.data.totalElements;
                  } else {
                    model.list(this.pn - 1, this.ps).then((value) => {
                      this.tableData = value.data.data.content;
                      this.total = value.data.data.totalElements;
                    });
                  }
                });
            } else {
                this.$message({
                  type: "error",
                  message: `ID为${row.productId}的信息`+ value.data.message + " 状态码为：" + value.status,
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
        path: "/v4/s1-detail",
        query: {
          id: id,
        },
      });
    },
    handleSearch() {
      if(this.input ==""){
        this.$message({
          message: `请输入要查询的商品id`,
          type: "warning",
        })
      }else{
        model.getById(this.input).then((value) => {
          if(value[0] == null){
            this.$message({
              message: `查询结果为空`,
              type: "warning",
            })
            this.tableData = [];
            this.total =0;
            this.disabled =true;
          }else{
            console.log(value)
            this.tableData = value;
            this.total =1;
            this.disabled =true;
          }
        });
      }
    },
    handleUpdate(index, row) {
      this.$router.push({
        path: "/v4/s1-update",
        query: {
          id: row.productId,
        },
      });
    },
  },
  computed: {
    ...mapState(["menulist"]),
  },
  mounted() {
    model.list(this.pn, this.ps).then((value) => {
      this.total = value.data.data.totalElements;
      this.tableData = value.data.data.content;
    });
    //拿到权限列表循环判断是否有权限，有则将对应权限字段至false
    this.menulist.forEach((item) => {
      if(item.name =="ecommerce"){
        if(!item.children.length == 0){
          for(let i=0; i<item.children.length;i++){
            if(item.children[i].name =="ecommerce_commodity"){
              for(let j=0;j<item.children[i].children.length;j++){
                this[item.children[i].children[j].name] =false
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
.demo-table-expand {
  //商品详情展开页
  font-size: 0;
  .el-form-item {
    margin-left: 10%;
    margin-right: 0;
    margin-bottom: 0;
    width: 60%;
    color: #0978c2;
  }
}

</style>
<style lang="scss">
  .el-tooltip__popper {//设置打开内容过多开启tooltip展示的样式
    max-width: 500px;
    // background-color: #fff;
  }
</style>
