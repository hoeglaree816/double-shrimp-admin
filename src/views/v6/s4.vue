<template>
  <div class="root">
    <!-- 角色详情对话框 -->
    <el-dialog
      title="拥有角色"
      :visible.sync="dialogVisible"
      width="34%"
      :before-close="handleClose"
      center
    >
      <p class="dialog-p">
        管理员id：<span>{{ managerId }}</span>
      </p>
      <p class="dialog-p">
        管理员名称：<span>{{ managerName }}</span>
      </p>
      <el-divider content-position="center">拥有角色列表</el-divider>
      <el-row v-if="fun.length>=1">
        <el-col class="fun-col" :span="8" v-for="item in fun" :key="item.id">
          <el-tag  effect="plain" type="warning" >{{item.name}}</el-tag>
        </el-col>
      </el-row>
      <el-row v-else>
        <el-col class="fun-col" :span="24">
          <el-tag  effect="plain" type="danger" >空</el-tag>
        </el-col>
      </el-row>
      <el-divider content-position="center">
        <i class="el-icon-check"></i>
      </el-divider>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="dialogVisible = false">
          确 定
        </el-button>
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色抽屉-->
    <el-drawer
      title="给下列角色分配权限"
      ref="drawerMethods"
      :visible.sync="drawer"
      :with-header="false"
      :before-close="handleCloseDrawer"
    >
      <div class="drawer-titlediv">
        <p class="drawer-title">分配角色</p>
      </div>
      <div>
        <p class="drawer-p">
          管理员id：<span>{{ managerId }}</span>
        </p>
        <p class="drawer-p">
          管理员名称：<span>{{ managerName }}</span>
        </p>
      </div>
      <el-divider content-position="center">角色列表</el-divider>
      <div style="text-align:center;height:350px">
        <el-select v-model="checkList" :disabled="selectDisabled"  multiple placeholder="请选择" style="width:320px">
          <el-option
            v-for="item in allMenulist"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button style="margin-left:10px" v-show="btnShowSuccess" type="success" size="mini"  circle><i class="el-icon-check"></i></el-button>
        <el-button v-show="btnShow" type="warning" size="mini" :loading="loading" circle></el-button>
        <el-button v-show="btnShowError" type="danger" size="mini"  circle><i class="el-icon-close"></i></el-button>
        <span style="margin-left:10px" v-show="btnShowSuccess"> 已完成</span>
        <span style="margin-left:10px" v-show="btnShow"> 等待中</span>
        <span style="margin-left:10px" v-show="btnShowError"> 出错了</span>
      </div>
      <el-divider content-position="center"><i class="el-icon-check"></i></el-divider>
      <div class="drawer-btn">
        <el-button :disabled="selectDisabled" size="small" type="primary" @click="handleRolePost()">确定</el-button>
        <el-button size="small" type="danger" plain @click="handleCloseDrawerByBtn()">关闭</el-button>
      </div>
    </el-drawer>
    <div class="title">
      <h2>管理员管理</h2>
    </div>
    <el-card class="box-card"  shadow="always">
      <div class="toolbar">
      <el-row :gutter="20">
        <el-col :span="2">
          <el-button
            type="primary"
            size="medium"
            :disabled="authority_admin_add"
            @click="handleAdd"
            icon="el-icon-plus"
            >添加</el-button
          >
        </el-col>
        <el-col :span="6">
          <el-input
            :disabled="authority_admin_select"
            placeholder="请输入对应选择栏的信息"
            v-model="inputA"
            class="input-with-select"
            clearable
          >
            <el-select
              v-model="selectA"
              slot="prepend"
              placeholder="请选择!"
              style="width:144px"
            >
              <el-option label="登陆id" value="loginId"></el-option>
              <el-option label="用户名称" value="name"></el-option>
              <el-option label="性别" value="sex"></el-option>
            </el-select>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input
            :disabled="authority_admin_select"
            placeholder="请输入对应选择栏的信息"
            v-model="inputB"
            class="input-with-select"
            clearable
          >
            <el-select
              v-model="selectB"
              slot="prepend"
              placeholder="请选择!"
              style="width:144px"
            >
              <el-option label="基地id" value="baseId"></el-option>
              <el-option label="用户基地身份" value="baseIdentity"></el-option>
              <el-option label="店铺id" value="merchantId"></el-option>
            </el-select>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input
            :disabled="authority_admin_select"
            placeholder="请输入对应选择栏的信息"
            v-model="inputC"
            class="input-with-select"
            clearable
          >
            <el-select
              v-model="selectC"
              slot="prepend"
              placeholder="请选择!"
              style="width:144px"
            >
              <el-option label="电话号码" value="phone"></el-option>
              <el-option label="手机号" value="mobile"></el-option>
              <el-option label="邮箱" value="email"></el-option>
            </el-select>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button :disabled="authority_admin_select" size="medium" @click="handleSearch" icon="el-icon-search"
            >查询</el-button
          >
        </el-col>
        <el-col :span="2">
          <el-button
            v-show="isShow"
            type="danger"
            plain
            size="medium"
            @click="backlist"
            icon="el-icon-tickets"
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
              <el-form-item label="用户Id：">
                <span>{{ props.row.userId }}</span>
              </el-form-item>
              <el-form-item label="登陆Id：">
                <span>{{ props.row.loginId }}</span>
              </el-form-item>
              <el-form-item label="是否管理员：">
                <span>{{ props.row.isAdmin==2?"超级管理员":"是" }}</span>
              </el-form-item>
              <el-form-item label="用户名：">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="性别：">
                <span>{{ props.row.sex }}</span>
              </el-form-item>
              <el-form-item label="基地身份：">
                <el-tag type="warning" effect="dark" v-if="props.row.baseIdentity==1"><span>基地管理员</span></el-tag>
                <el-tag type="success" effect="dark" v-else-if="props.row.baseIdentity==0"><span>基地用户</span></el-tag>
                <el-tag type="info" effect="dark" v-else><span>无基地</span></el-tag>
              </el-form-item>
              <el-form-item label="基地Id：">
                <span>{{ props.row.baseId }}</span>
              </el-form-item>
              <el-form-item label="店铺Id：">
                <span>{{ props.row.merchantId }}</span>
              </el-form-item>
              <el-form-item label="电话号码：">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="邮箱：">
                <span>{{ props.row.email }}</span>
              </el-form-item>
              <el-form-item label="手机号：">
                <span>{{ props.row.mobile }}</span>
              </el-form-item>
              <el-form-item label="创建时间：">
                <span>{{ props.row.createDate }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="拥有角色" align="center" width="100">
          <template slot-scope="scope">
            <el-tag
              class="elTag"
              effect="plain"
              @click="handleRoleDetail(scope.$index, scope.row)"
              >查看</el-tag
            >
            <!-- <el-button
              size="mini"
              type="text"
              @click="hand(scope.$index, scope.row)"
              >查看
            </el-button> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="userId"
          label="用户id"
          width="280"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleDetail(scope.row.userId)"
              >{{ scope.row.userId }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="loginId"
          label="登录id(账号)"
          width="220"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="用户名"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="baseId"
          label="基地Id"
          width="220"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="merchantId"
          label="店铺id"
          width="220"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" fixed="right" width="230" align="center">
          <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                circle
                :disabled="authority_admin_update"
                @click="handleUpdate(scope.$index, scope.row)"
                ></el-button
              >
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                circle
                :disabled="authority_admin_delete"
                @click="handleDelete(scope.$index, scope.row)"
                ></el-button
              >
            <el-button
              type="warning"
              size="mini"
              :disabled="authority_admin_updateRole"
              @click="handleRole(scope.$index, scope.row)"
              icon="el-icon-user"
              >分配角色</el-button
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
const model = require("../../js/v6/s4");
import axiosInstance from "axios";
const axios = axiosInstance.create({
  baseURL:"http://106.75.154.40:9012/authority"
})
import { mapState } from "vuex";
export default {
  data() {
    return {
      pn: 1,
      ps: 5,
      total: 0,
      tableData: [],
      isShow: false,
      selectA: "",
      inputA: "",
      selectB: "",
      inputB: "",
      selectC: "",
      inputC: "", //ABC指的是三个查询输入框
      dialogVisible: false, //elementui打开对话框字段
      managerId: "",
      managerName: "",
      fun: "", //获得拥有的角色列表-dialog
      drawer: false, //elementui打开抽屉字段
      allMenulist: "", //所有的角色
      checkList: [], //分配的角色集合数组
      flag: true, //标识是否显示的是查询内容还是全部分页的内容
      selectDisabled:true,//下拉选择框禁用-及确定按钮禁用标志
      loading:true,//抽屉加载中按钮标志
      btnShow:true,//抽屉加载中按钮是否显示
      btnShowSuccess:false,//提示权限加载成功
      btnShowError:false,//提示权限加载失败
      //权限控制字段
      authority_admin_add:true,//管理员添加
      authority_admin_update:true,//管理员更新
      authority_admin_delete:true,//管理员删除
      authority_admin_updateRole:true,//给管理员分配角色
      authority_admin_select:true,//管理员查询
    };
  },
  methods: {
    //关闭角色详情对话框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //关闭分配角色抽屉
    handleCloseDrawer(done) {
      this.$confirm("确认关闭？如完成更新权限操作后，请确定关闭")
        .then((_) => {
          done();
          this.checkList = [];//清空选择到的角色id数组
          this.loading = true;
          this.btnShow = true;
          this.btnShowSuccess = false;
          this.btnShowError = false;//恢复按钮样式和效果
          this.selectDisabled =true;
        })
        .catch((_) => {});
    },
    //添加
    handleAdd() {
      this.$router.push("/v6/s4-insert");
    },
    //返回列表
    backlist() {
      this._data.selectA = "";
      this._data.selectB = "";
      this._data.selectC = "";
      this._data.inputA = "";
      this._data.inputB = "";
      this._data.inputc = ""; //重置查询选项和内容
      this._data.pn = 1;
      this._data.ps = 5; //重置
      this._data.flag = true; //将分页置于列表分页
      this._data.isShow = false;
      model.list(this.pn, this.ps).then((value) => {
        this.total = value.data.data.total; //总条数
        this.tableData = value.data.data.rows; //表单数据
      });
    },
    //当前页
    handleCurrentChange(pn) {
      if (this._data.flag) {
        this.pn = pn;
        model.list(this.pn, this.ps).then((value) => {
          this.total = value.data.data.total; //总条数
          this.tableData = value.data.data.rows; //表单数据
        });
      } else {
        let tempA = this._data.selectA;
        let tempB = this._data.selectB;
        let tempC = this._data.selectC;
        if (
          this._data.inputA == "" &&
          this._data.inputB == "" &&
          this._data.inputC == "" &&
          tempA == "" &&
          tempB == "" &&
          tempC == ""
        ) {
          this.$message({
            message: "请选择查询选项并且输入相应内容查询!",
            type: "warning",
            showClose: true,
          });
        } else if (tempA == "" && tempB == "" && tempC == "") {
          this.$message({
            message: "请选择查询选项!",
            type: "warning",
            showClose: true,
          });
        } else if (
          this._data.inputA == "" &&
          this._data.inputB == "" &&
          this._data.inputC == ""
        ) {
          this.$message({
            message: "请输入相应内容查询!",
            type: "warning",
            showClose: true,
          });
        } else if (tempA !== "" && this._data.inputA == "") {
          this.$message({
            message: "请输入相应内容查询!",
            type: "warning",
            showClose: true,
          });
        } else if (tempB !== "" && this._data.inputB == "") {
          this.$message({
            message: "请输入相应内容查询!",
            type: "warning",
            showClose: true,
          });
        } else if (tempC !== "" && this._data.inputC == "") {
          this.$message({
            message: "请输入相应内容查询!",
            type: "warning",
            showClose: true,
          });
        } else if (tempA == "" && this._data.inputA !== "") {
          this.$message({
            message: "请选择查询选项!",
            type: "warning",
            showClose: true,
          });
        } else if (tempB == "" && this._data.inputB !== "") {
          this.$message({
            message: "请选择查询选项!",
            type: "warning",
            showClose: true,
          });
        } else if (tempC == "" && this._data.inputC !== "") {
          this.$message({
            message: "请选择查询选项!",
            type: "warning",
            showClose: true,
          });
        } else {
          this.pn = pn;
          this._data.isShow = true;
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
          axios({
            method: "post",
            url:
              "/admin/search/" +
              this.pn +
              "/" +
              this.ps,
            data: {
              [tempA]: this._data.inputA, //此时应该用[]号将其包裹，并且外部定义的时候不能人为拼接引号
              [tempB]: this._data.inputB,
              [tempC]: this._data.inputC,
            },
          }).then((res) => {
            // this._data.tableData = res.data.data;
            // this.total = res.data.data.length; //总条数
            this._data.tableData = res.data.data.rows;
            this.total = res.data.data.total; //总条数
            if (res.data.data.length == 0) {
              //结果提示
              this.$message({
                message: "查询不到相关结果",
                type: "warning",
              });
            } else {
              this.$message({
                message: res.data.message,
                type: "success",
              });
            }
            console.log(res);
            const token = res.headers.token; //拿到请求头的token
            window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
            // alert(res.data.message + " 状态码为：" + res.status);
          });
          axios.interceptors.request.eject(myInterceptor);
        }
      }
    },
    //每页条数
    handleSizeChange(ps) {
      // this.ps = ps;
      // model.list(this.pn, this.ps).then((value) => {
      //   this.total = value.data.data.total; //总条数
      //   this.tableData = value.data.data.rows; //表单数据
      // });
      if (this._data.flag) {
        this.ps = ps;
        model.list(this.pn, this.ps).then((value) => {
          this.total = value.data.data.total; //总条数
          this.tableData = value.data.data.rows; //表单数据
        });
      } else {
        let tempA = this._data.selectA;
        let tempB = this._data.selectB;
        let tempC = this._data.selectC;
        if (
          this._data.inputA == "" &&
          this._data.inputB == "" &&
          this._data.inputC == "" &&
          tempA == "" &&
          tempB == "" &&
          tempC == ""
        ) {
          this.$message({
            message: "请选择查询选项并且输入相应内容查询!",
            type: "warning",
            showClose: true,
          });
        } else if (tempA == "" && tempB == "" && tempC == "") {
          this.$message({
            message: "请选择查询选项!",
            type: "warning",
            showClose: true,
          });
        } else if (
          this._data.inputA == "" &&
          this._data.inputB == "" &&
          this._data.inputC == ""
        ) {
          this.$message({
            message: "请输入相应内容查询!",
            type: "warning",
            showClose: true,
          });
        } else if (tempA !== "" && this._data.inputA == "") {
          this.$message({
            message: "请输入相应内容查询!",
            type: "warning",
            showClose: true,
          });
        } else if (tempB !== "" && this._data.inputB == "") {
          this.$message({
            message: "请输入相应内容查询!",
            type: "warning",
            showClose: true,
          });
        } else if (tempC !== "" && this._data.inputC == "") {
          this.$message({
            message: "请输入相应内容查询!",
            type: "warning",
            showClose: true,
          });
        } else if (tempA == "" && this._data.inputA !== "") {
          this.$message({
            message: "请选择查询选项!",
            type: "warning",
            showClose: true,
          });
        } else if (tempB == "" && this._data.inputB !== "") {
          this.$message({
            message: "请选择查询选项!",
            type: "warning",
            showClose: true,
          });
        } else if (tempC == "" && this._data.inputC !== "") {
          this.$message({
            message: "请选择查询选项!",
            type: "warning",
            showClose: true,
          });
        } else {
          this.ps = ps;
          this._data.isShow = true;
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
          axios({
            method: "post",
            url:
              "/admin/search/" +
              this.pn +
              "/" +
              this.ps,
            data: {
              [tempA]: this._data.inputA, //此时应该用[]号将其包裹，并且外部定义的时候不能人为拼接引号
              [tempB]: this._data.inputB,
              [tempC]: this._data.inputC,
            },
          }).then((res) => {
            // this._data.tableData = res.data.data;
            // this.total = res.data.data.length; //总条数
            this._data.tableData = res.data.data.rows;
            this.total = res.data.data.total; //总条数
            if (res.data.data.length == 0) {
              //结果提示
              this.$message({
                message: "查询不到相关结果",
                type: "warning",
              });
            } else {
              this.$message({
                message: res.data.message,
                type: "success",
              });
            }
            console.log(res);
            const token = res.headers.token; //拿到请求头的token
            window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
            // alert(res.data.message + " 状态码为：" + res.status);
          });
          axios.interceptors.request.eject(myInterceptor);
        }
      }
    },
    //查看角色详情(打开dialog)
    handleRoleDetail(index, row) {
      // this._data.dialogVisible = true;
      this._data.managerId = row.userId;
      this._data.managerName = row.name;
      //查询管理员所拥有的角色
      model.findRoles(row.userId).then((res) =>{
        this.fun = res.data.data;
        this._data.dialogVisible = true;
      })
    },
    //分配角色(打开drawer)
    async handleRole(index, row) {//异步处理使得下拉选择框正常工作
      this._data.drawer = true;
      this._data.managerId = row.userId; //拿到角色id
      this._data.managerName = row.name; //拿到角色名称
      //查询所有角色
      await model.findAllRole().then((res) =>{
        this.allMenulist = res.data.data;
        if (!res.data.flag) {
          this._data.loading = false;
          this._data.btnShow = false;//关闭加载中效果和按钮
          this._data.btnShowError =true;
          //结果提示
          this.$message({
            message: value.data.message,
            type: "warning",
            duration: 1500,
          });
        }
      })
      //查询管理员所拥有的角色
      await model.findRoles(row.userId).then((res) =>{
        if (!res.data.flag) {
          this._data.loading = false;
          this._data.btnShow = false;//关闭加载中效果和按钮
          this._data.btnShowError =true;
          //结果提示
          this.$message({
            message: value.data.message,
            type: "warning",
            duration: 1500,
          });
        }else{
          this._data.loading = false;
          this._data.btnShow = false;//关闭加载中效果和按钮
          this._data.btnShowSuccess = true;
          this._data.selectDisabled = false;
          res.data.data.forEach((item)=>{
            this.checkList.push(item.id)
          })
        }
      })
    },
    //提交分配的角色
    handleRolePost() {
      const loading = this.$loading({//设置加载中效果-服务方式
          lock: true,
          text: '分配角色中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.4)'
      });
      model.updateRoles(this._data.managerId, this._data.checkList).then((value) => {
        loading.close();//关闭加载中效果
        console.log(value)
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
          model.delete(row.userId).then((value) => {
            //提示用户操作情况
            if (value.data.flag) {
                this.$message({
                  type: "success",
                  message: `ID为${row.userId}的信息`+ value.data.message + " 状态码为：" + value.status,
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
                  message: `ID为${row.userId}的信息`+ value.data.message + " 状态码为：" + value.status,
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
        path: "/v6/s4-detail",
        query: {
          id: id,
        },
      });
    },
    //查询
    handleSearch() {
      this._data.pn = 1; //强制查询出的第一页开始展示
      let tempA = this._data.selectA;
      let tempB = this._data.selectB;
      let tempC = this._data.selectC;
      if (
        this._data.inputA == "" &&
        this._data.inputB == "" &&
        this._data.inputC == "" &&
        tempA == "" &&
        tempB == "" &&
        tempC == ""
      ) {
        this.$message({
          message: "请选择查询选项并且输入相应内容查询!",
          type: "warning",
          showClose: true,
        });
      } else if (tempA == "" && tempB == "" && tempC == "") {
        this.$message({
          message: "请选择查询选项!",
          type: "warning",
          showClose: true,
        });
      } else if (
        this._data.inputA == "" &&
        this._data.inputB == "" &&
        this._data.inputC == ""
      ) {
        this.$message({
          message: "请输入相应内容查询!",
          type: "warning",
          showClose: true,
        });
      } else if (tempA !== "" && this._data.inputA == "") {
        this.$message({
          message: "请输入相应内容查询!",
          type: "warning",
          showClose: true,
        });
      } else if (tempB !== "" && this._data.inputB == "") {
        this.$message({
          message: "请输入相应内容查询!",
          type: "warning",
          showClose: true,
        });
      } else if (tempC !== "" && this._data.inputC == "") {
        this.$message({
          message: "请输入相应内容查询!",
          type: "warning",
          showClose: true,
        });
      } else if (tempA == "" && this._data.inputA !== "") {
        this.$message({
          message: "请选择查询选项!",
          type: "warning",
          showClose: true,
        });
      } else if (tempB == "" && this._data.inputB !== "") {
        this.$message({
          message: "请选择查询选项!",
          type: "warning",
          showClose: true,
        });
      } else if (tempC == "" && this._data.inputC !== "") {
        this.$message({
          message: "请选择查询选项!",
          type: "warning",
          showClose: true,
        });
      } else {
        this._data.flag = false; //将分页置于查询分页
        this._data.isShow = true;
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
        axios({
          method: "post",
          url:
            "/admin/search/" +
            this._data.pn +
            "/" +
            this._data.ps,
          data: {
            [tempA]: this._data.inputA, //此时应该用[]号将其包裹，并且外部定义的时候不能人为拼接引号
            [tempB]: this._data.inputB,
            [tempC]: this._data.inputC,
          },
        }).then((res) => {
          // this._data.tableData = res.data.data;
          this._data.tableData = res.data.data.rows;
          this.total = res.data.data.total; //总条数
          if (res.data.data.length == 0) {
            //结果提示
            this.$message({
              message: "查询不到相关结果",
              type: "warning",
            });
          } else {
            this.$message({
              message: res.data.message,
              type: "success",
            });
          }
          console.log(res);
          const token = res.headers.token; //拿到请求头的token
          window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
        });
        axios.interceptors.request.eject(myInterceptor);
      }
    },
    //编辑更新
    handleUpdate(index, row) {
      //编辑更新
      this.$router.push({
        path: "/v6/s4-update",
        query: {
          id: row.userId,
        },
      });
    },
  },
  computed: {
    ...mapState(["menulist"]),
    menu:function(){//将权限和控制映射起来
      return {
        authority_admin_add:this.authority_admin_add,
        authority_admin_update:this.authority_admin_update,
        authority_admin_delete:this.authority_admin_delete,
        authority_admin_updateRole:this.authority_admin_updateRole,
      }
    }
  },
  //vue生命周期函数
  mounted() {
    model.list(this.pn, this.ps).then((value) => {
      console.log(value);
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
            if(item.children[i].name =="authority_admin"){
              for(let j=0;j<item.children[i].children.length;j++){
                console.log(item.children[i].children[j].name)
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
  //角色列表
  margin-bottom: 10px;
  p {
    height: 5px;
  }
}
.demo-table-expand {
  //用户详情展开页
  font-size: 0;
  .el-form-item {
    margin-left: 15%;
    margin-right: 0;
    margin-bottom: 0;
    width: 25%;
    color: #0978c2;
  }
}
.fun-col {
  display: flex;
  justify-content: center;
  // text-align: center;
  .el-tag{
    margin-left: 5px;
    margin-top: 5px;
    &:hover{
      color: whitesmoke;
      background-color: #0978c2;
      cursor: pointer;
    }
  }
}
.elTag:hover {
  //表格-角色标签鼠标悬浮
  cursor: pointer;
  background-color: #0978c2;
  color: whitesmoke;
}
.dialog-p,.drawer-p{
  //对话框-p和抽屉-p
  margin-left: 10px;
  height: 24px;
  span {
    color: #409eff;
  }
}
.drawer-titlediv {
  //抽屉标题的外层div
  height: 80px;
  .drawer-title {
    //抽屉的标题
    height: 60%;
    font-size: 24px;
    color: #e6a23c;
    text-align: center;
    line-height: 48px; //竖直居中
    margin-top: 10px;
  }
}
.drawer-btn {
  //抽屉按钮
  display: flex;
  justify-content: center;
}
</style>
