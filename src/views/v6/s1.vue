<template>
  <div class="root">
    <div class="title">
      <h2>用户管理</h2>
    </div>
    <el-card class="box-card"  shadow="always">
      <div class="toolbar">
      <el-row :gutter="20">
        <el-col :span="2">
          <el-button
            type="primary"
            size="medium"
            @click="handleAdd"
            icon="el-icon-plus"
            :disabled="authority_user_add"
            >添加</el-button
          >
        </el-col>
        <el-col :span="6">
          <el-input
            :disabled="authority_user_select"
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
            :disabled="authority_user_select"
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
            :disabled="authority_user_select"
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
          <el-button :disabled="authority_user_select" size="medium" @click="handleSearch" icon="el-icon-search"
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
                <span>{{ props.row.isAdmin==1?"是":"否" }}</span>
              </el-form-item>
              <el-form-item label="用户名：">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="性别：">
                <span>{{ props.row.sex }}</span>
              </el-form-item>
              <el-form-item label="用户基地身份：">
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
          width="210"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="baseId"
          label="基地Id"
          width="220"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="用户邮箱"
          width="260"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" fixed="right" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              :disabled="authority_user_update"
              @click="handleUpdate(scope.$index, scope.row)"
              >编辑<i class="el-icon-edit"></i></el-button
            >
            <el-button
              size="mini"
              type="danger"
              :disabled="authority_user_delete"
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
const model = require("../../js/v6/s1");
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
      flag: true, //标识是否显示的是查询内容还是全部分页的内容
      //权限控制字段
      authority_user_add:true,//用户添加
      authority_user_update:true,//用户更新
      authority_user_delete:true,//用户删除
      authority_user_select:true,//用户查询
    };
  },
  methods: {
    //添加
    handleAdd() {
      this.$router.push("/v6/s1-insert");
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
              "/user/search/" +
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
              "/user/search/" +
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
        path: "/v6/s1-detail",
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
            "/user/search/" +
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
        });
        axios.interceptors.request.eject(myInterceptor);
      }
    },
    //编辑更新
    handleUpdate(index, row) {
      this.$router.push({
        path: "/v6/s1-update",
        query: {
          id: row.userId,
        },
      });
    },
  },
  computed: {
    ...mapState(["menulist"]),
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
    //     console.log(item.name+"=="+this[item.name])
    //   }
    // });
    //拿到权限列表循环判断是否有权限，有则将对应权限字段至false
    console.log(this.menulist);
    this.menulist.forEach((item) => {
      if(item.name =="authority"){
        if(!item.children.length == 0){
          for(let i=0; i<item.children.length;i++){
            if(item.children[i].name =="authority_user"){
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

.demo-table-expand {
  //用户详情展开页
  font-size: 0;
  .el-form-item {
    margin-left: 5%;
    margin-right: 0;
    margin-bottom: 0;
    width: 28.33%;
    color: #0978c2;
  }
}
</style>
