<template>
  <div class="root">
    <!-- 权限详情对话框 -->
    <el-dialog
      title="权限详情"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
      center
    >
      <p class="dialog-p">
        角色id：
        <span>{{ roleId }}</span>
        角色名称：
        <span>{{ roleName }}</span>
      </p>
      <el-divider content-position="center">拥有权限列表</el-divider>
      <div v-if="fun.length>=1">
        <el-row :class="['rowbottom',i1 == 0 ? 'rowtop' : '']" v-for=" (item , i1) in fun" :key="item.id" class="fun-row">
        <!-- 渲染一级权限 -->
        <el-col :span="4" style="text-align:center;">
          <el-tag class="elTag" size="medium">{{item.remarks}}</el-tag>
          <i class="el-icon-caret-right"></i>
        </el-col>
        <!-- 渲染二级和三级权限 -->
        <el-col :span="20">
          <el-row :class="[i2 == 0 ? '' : 'rowtop']" v-for=" (item2,i2) in item.children" :key="item2.id" class="fun-row">
            <!-- 渲染二级权限 -->
            <el-col :span="5" style="text-align:center;">
              <el-tag class="elTag" size="medium" type="success">{{item2.remarks}}</el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col>
            <!-- 渲染三级权限 -->
            <el-col :span="19">
              <el-tag  size="medium" class="lastTag elTag" type="warning" v-for=" item3 in item2.children" :key="item3.id">{{item3.remarks}}</el-tag>
            </el-col>
          </el-row>
        </el-col>
        </el-row>
      </div>
      <div v-else>
        <el-row >
          <el-col class="fun-col" :span="24">
            <el-tag  effect="plain" type="danger" >空</el-tag>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="dialogVisible = false">确定</el-button>
        <el-button size="small" @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <!-- 分配权限抽屉-->
    <el-drawer
      ref="drawerMethods"
      :visible.sync="drawer"
      :with-header="false"
      :before-close="handleCloseDrawer"
    >
      <div class="drawer-titlediv">
        <p>分配权限</p>
      </div>
      <div>
        <p class="drawer-p">
          角色id：
          <span>{{ roleId }}</span>
        </p>
        <p class="drawer-p">
          角色名：
          <span>{{ roleName }}</span>
        </p>
      </div>
      <el-divider content-position="center">权限列表<i v-show="loading" class="el-icon-loading"></i></el-divider>
      <!-- 树形控件 -->
      <div style="height:600px;overflow: auto;">
          <el-tree ref="treeRef" show-checkbox :data="allMenulist" node-key="id" :default-checked-keys="funs" :props="defaultProps"  default-expand-all></el-tree>
      </div>
      <el-divider content-position="center">
        <i v-show="loading" class="el-icon-loading"></i>
        <i v-show="!loading" class="el-icon-check"></i>
      </el-divider>
      <div class="drawer-btn">
        <el-button :disabled="loading" size="small" type="primary" @click="handleFunctionPost()">确定</el-button>
        <el-button size="small" type="danger" plain @click="handleCloseDrawerByBtn()">关闭</el-button>
      </div>
    </el-drawer>
    <div class="title">
      <h2>角色管理</h2>
    </div>
    <el-card class="box-card"  shadow="always">
      <div class="toolbar">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button class="btn-plus" type="primary" :disabled="authority_role_add" size="medium" @click="handleAdd" icon="el-icon-plus">添加</el-button>
        </el-col>
        <el-col :span="8">
          <el-input :disabled="authority_role_select" placeholder="请输入ID" v-model="input" class="input-with-select" clearable>
            <el-button :disabled="authority_role_select" slot="append" @click="handleSearch" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <div v-show="!isShow" style="height:10px;"></div>
          <el-button
            v-show="isShow"
            :class="backlist"
            type="danger"
            plain
            size="medium"
            @click="backlist"
            icon="el-icon-tickets"
          >返回列表</el-button>
        </el-col>
        <el-col :span="8">
          <div class="importExcelBtn">
            <download-excel
                class = "export-excel-wrapper"
                :data = "tableData"
                :fields = "json_fields"
                name = "角色列表.xls">
                <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
                <!-- <el-button circle type="primary">E</el-button> -->
                <el-button class="ExcelBtn" type="success"><i class="el-icon-document"></i>导出Excel表格</el-button>
            </download-excel>
          </div>
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
              <el-form-item label="角色Id：">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="角色名：">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="是否可用：">
                <!-- <span>{{ props.row.useable==1 ?"是":"否" }}</span> -->
                <el-tag type="success" effect="dark" v-if="props.row.useable==1"><span>可用</span></el-tag>
                <el-tag type="warning" effect="dark" v-else-if="props.row.useable==0"><span>不可用</span></el-tag>
              </el-form-item>
              <el-form-item label="创建时间：">
                <span>{{ props.row.createDate }}</span>
              </el-form-item>
              <el-form-item label="备注信息：">
                <span>{{ props.row.remarks }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="拥有权限" align="center" width="100">
          <template slot-scope="scope">
            <el-tag
              class="elTag"
              effect="plain"
              @click="handleFunctionDetail(scope.$index, scope.row)"
            >查看</el-tag>
            <!-- <el-button
              size="mini"
              type="text"
              @click="hand(scope.$index, scope.row)"
              >查看
            </el-button>-->
          </template>
        </el-table-column>
        <el-table-column prop="id" label="角色id" width="250" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleDetail(scope.row.id)"
            >{{ scope.row.id }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="角色名" width="250" align="center"></el-table-column>
        <!-- <el-table-column prop="useable" label="是否可用 " width="100" align="center"></el-table-column> -->
        <el-table-column prop="remarks" label="备注信息 " width="600" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" width="230" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              circle
              :disabled="authority_role_update"
              @click="handleUpdate(scope.$index, scope.row)"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              :disabled="authority_role_delete"
              @click="handleDelete(scope.$index, scope.row)"
            ></el-button>
            <el-button
              type="warning"
              size="mini"
              :disabled="authority_role_updateRoleFunction"
              @click="handleFunction(scope.$index, scope.row)"
              icon="el-icon-setting"
            >分配权限</el-button>
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
import axiosInstance from "axios";
const axios = axiosInstance.create({
  // baseURL:"http://106.75.154.40:9012/authority"
  baseURL:"http://106.75.154.40:9003"
})
import { mapState } from "vuex";
const model = require("../../js/v6/s2");
export default {
  data() {
    return {
      input: "",
      pn: 1,
      ps: 5,
      total: 0,
      tableData: [],
      isShow: false,
      fun: "", //获得拥有的权限列表-树形
      funs:  [], //只有权限id的已拥有权限列表-扁平化
      dialogVisible: false, //elementui打开对话框字段
      drawer: false, //elementui打开抽屉字段
      roleId: "",//角色id
      roleName: "",//角色名称
      allMenulist: [], //所有权限
      defaultProps: {
        children: 'children',
        label: 'remarks'
      },
      fullscreenLoading: false,//加载中标志字段
      loading:true,//权限列表的加载中标志
      //权限控制字段
      authority_role_add:true,//角色添加
      authority_role_update:true,//角色更新
      authority_role_delete:true,//角色删除
      authority_role_updateRoleFunction:true,//给角色分配权限
      authority_role_select:true,//角色查询
      //导出excel的列名和对应的key
      json_fields: {
        "角色ID": "id",    
        "角色名字": "name",
        "是否可用": "useable", 
        "备注信息": "remarks", 
      },
    };
  },
  methods: {
    //关闭权限详情对话框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //关闭分配权限抽屉
    handleCloseDrawer(done) {
      this.$confirm("确认关闭？如完成更新权限操作后，请确定关闭")
        .then((_) => {
          done();
          this.funs =[];//请清空只有权限id的权已拥有限列表-扁平化
          this.loading =true;//恢复初始状态
        })
        .catch((_) => {});
    },
    handleAdd() {
      this.$router.push("/v6/s2-insert");
    },
    //返回列表
    backlist() {
      this._data.input = "";
      this._data.isShow = false;
      model.list(this.pn, this.ps).then((value) => {
        this.total = value.data.data.total; //总条数
        this.tableData = value.data.data.rows; //表单数据
      });
    },
    //当前页
    handleCurrentChange(pn) {
      this.pn = pn;
      model.list(this.pn, this.ps).then((value) => {
        this.total = value.data.data.total; //总条数
        this.tableData = value.data.data.rows; //表单数据
      });
    },
    //每页条数
    handleSizeChange(ps) {
      this.ps = ps;
      model.list(this.pn, this.ps).then((value) => {
        this.total = value.data.data.total; //总条数
        this.tableData = value.data.data.rows; //表单数据
      });
    },
    //查看权限详情(打开dialog)
    handleFunctionDetail(index, row) {
      this._data.roleId = row.id;
      this._data.roleName = row.name;
      //查询角色所拥有的权限
      return new Promise((resolve) => {
        const myInterceptor = axios.interceptors.request.use(
          (config) => {
            const token = window.sessionStorage.getItem("token");
            if (token) {
              config.headers.authorization = "Bearer " + token; //将token放入请求头
            } else {
              console.log("token不存在");
            }
            return config; //；拦截返回，才能执行下面请求
          },
          (error) => {
            console.log(error);
          }
        );
        axios
          .get("/function/findFunction/" + row.id)
          .then((res) => {
            this.fun = res.data.data;
            this._data.dialogVisible = true;
            if (!res.data.flag) {
            //结果提示
              this.$message({
                message: res.data.message,
                type: "warning",
                duration: 3000,
              });
            } else {
              this.$message({
                message:'获取权限列表成功',
                type: "success",
                duration: 3000,
              });
            }
            const token = res.headers.token; //拿到请求头的token
            window.localStorage.setItem("token", token); //把token存放在localStorage里面
          });
        axios.interceptors.request.eject(myInterceptor);
      });
    },
    //分配权限(打开drawer)
    async handleFunction(index, row) {
      this._data.drawer = true;//打开drawer
      this._data.roleId = row.id; //拿到角色id
      this._data.roleName = row.name; //拿到角色名称
      ///查询所有权限
      await model.findAllFunction().then((value) => {
        console.log(value)
        this.allMenulist = value.data.data
        if (!value.data.flag) {
          //结果提示
          this.$message({
            message: value.data.message,
            type: "warning",
            duration: 1500,
          });
        }
      });
      //查询已拥有-只查三级权限
      await model.findFunctions(row.id).then((value) => {
        console.log(value)
        this.funs = value
        this.loading =false
      })
    },
    //提交分配的权限
    handleFunctionPost() {
      const loading = this.$loading({//设置加载中效果-服务方式
          lock: true,
          text: '分配权限中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.4)'
      });
      const keys = [...this.$refs.treeRef.getCheckedKeys(),...this.$refs.treeRef.getHalfCheckedKeys()] ;//拿到需要更新的权限id数组
      model.updateFunctions(this._data.roleId, keys).then((value) => {
        console.log(value)
        loading.close();//关闭加载中效果
        if (!value.data.flag) {
          //结果提示
          this.$message({
            message: value.data.message,
            type: "warning",
            duration: 1500,
          });
        } else {
          this.$message({
            message: value.data.message,
            type: "success",
            duration: 5000,
            showClose: true,
          });
          this.$refs.drawerMethods.closeDrawer();//调用关闭drawer方法
        }
      });
    },
    //点击关闭按钮关闭分配权限抽屉
    handleCloseDrawerByBtn() {
      this.$refs.drawerMethods.closeDrawer();
    },
    //删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          model.delete(row.id).then((value) => {
            //提示用户操作情况
            if (value.data.flag) {
                this.$message({
                  type: "success",
                  message: `ID为${row.id}的信息`+ value.data.message + " 状态码为：" + value.status,
                });
                //刷新表单
                model.list(this.pn, this.ps).then((value) => {
                  if (!value.data.data.rows.length == 0) {
                    //判断删除之后该页是否为空，若为空，则执行else查询上一页内容
                    this.total = value.data.data.total; //总条数
                    this.tableData = value.data.data.rows; //表单数据
                  } else {
                    model.list(this.pn - 1, this.ps).then((value) => {
                      this.total = value.data.data.total; //总条数
                      this.tableData = value.data.data.rows; //表单数据
                    });
                  }
                });
            } else {
                this.$message({
                  type: "error",
                  message: `ID为${row.id}的信息`+ value.data.message + " 状态码为：" + value.status,
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
    //详情
    handleDetail(id) {
      this.$router.push({
        path: "/v6/s2-detail",
        query: {
          id: id,
        },
      });
    },
    //查询
    handleSearch() {
      if (this._data.input == "") {
        this.$message({
          type: "warning",
          message: "请输入搜索内容!",
          duration:1200
        });
      } else {
        this._data.isShow = true; //判断是否显示返回列表按钮
        model.getById(this.input).then((value) => {
          if (value.data.data == null) {
            this.tableData = [];
            this.total = 0;
            this.$message({
              type: "error",
              message: "该用户不存在!",
            });
          } else {
            this.tableData = [value.data.data];//要使用数组
            this.total = 1;
            this.$message({
              type: "success",
              message: "查询成功!",
            });
          }
        });
      }
    },
    //编辑更新
    handleUpdate(index, row) {
      this.$router.push({
        path: "/v6/s2-update",
        query: {
          id: row.id,
        },
      });
    },
  },
  computed: {
    ...mapState(["menulist"]),
  },
  mounted() {
    model.list(this.pn, this.ps).then((value) => {
      this.total = value.data.data.total; //总条数
      this.tableData = value.data.data.rows; //表单数据
    });
    //拿到权限列表循环判断是否有权限，有则将对应权限字段至true
    // this.menulist.forEach((item) => {
    //   const temp = this.menu[item.name];
    //   if(typeof(temp)=="undefined"){
    //     // console.log(temp)
    //   }else{
    //     this[item.name]=false
    //   }
    // });
    //拿到权限列表循环判断是否有权限，有则将对应权限字段至false
    this.menulist.forEach((item) => {
      if(item.name =="authority"){
        if(!item.children.length == 0){
          for(let i=0; i<item.children.length;i++){
            if(item.children[i].name =="authority_role"){
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

.fun-row {
  //权限列表
  padding: 5px;
  display: flex;
  align-items: center;
}
.rowtop{
  //权限上边线
  border-top: 1px solid #a6f0e8;
}
.rowbottom{
  //权限下边线
  border-bottom: 1px solid #a6f0e8;
}
.lastTag{
  //三级权限
  margin-left: 10px;
}
.demo-table-expand {
  //用户详情展开页
  font-size: 0;
  .el-form-item {
    margin-left: 11.5%;
    margin-right: 0;
    margin-bottom: 0;
    width: 90%;
    color: #0978c2;
  }
}
.fun-col {
  text-align: center;
}
.elTag:hover {
  //表格-权限标签鼠标悬浮
  cursor: pointer;
  background-color: #0978c2;
  color: whitesmoke;
}
.dialog-p {
  //对话框-p
  text-align: center;
  span {
    color: #409eff;
  }
}
.drawer-p {
  //抽屉-p
  margin-left: 5px;
  margin-top: 5px;
  span {
    color: #409eff;
  }
}
.drawer-btn {
  //抽屉drawer按钮
  display: flex;
  justify-content: center;
}
.drawer-titlediv{
  text-align: center;
  p{
    font-size: 24px;
    color: #e6a23c;
  }
}
//导出excel按钮
.importExcelBtn{
  display: flex;
  justify-content: flex-end;
  .ExcelBtn{
    width: 70px;
    overflow: hidden;
    margin-right: 60px;
    transition: all .4s;
  }
  .ExcelBtn:hover{
    // border-radius: 0%;
    width: 150px;
    
  }
}
// 添加鼠标经过添加按钮时候，按钮变大效果
.btn-plus{
  transition: all .2s;
}
.btn-plus:hover{
  transform: scale(1.1);
}
</style>
