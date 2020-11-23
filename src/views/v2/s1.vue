<template>
  <div class="root">
    <!-- 删除记录对话框 -->
    <el-dialog title="删除记录" :visible.sync="dialogTableVisible" width="70%" center>
      <el-table :data="gridData" stripe >
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
              <el-form-item label="封面:">
                <el-image
                  style="width: 400px; height: 400px"
                  :src="props.row.picture"
                >
                </el-image>
              </el-form-item>
              <el-form-item label="正文:">
                <span v-html="props.row.content"></span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="id" width="220" align="center"></el-table-column>
        <el-table-column prop="title" label="标题" width="380" align="center"></el-table-column>
        <el-table-column prop="editor" label="作者" width="200" align="center"></el-table-column>
        <el-table-column prop="clickNum" label="点击量" width="120" align="center"></el-table-column>
      </el-table>
      <el-pagination
        style="text-align:center;"
        @current-change="handleCurrentChangeByDelReord"
        :current-page="recordPn"
        :page-size="recordPs"
        layout="total, prev, pager, next"
        :total="recordTatol">
      </el-pagination>
    </el-dialog>
    <div class="title">
      <h2>产业资讯</h2>
    </div>
    <el-card class="box-card"  shadow="always">
      <div class="toolbar">
        <el-col :span="4">
          <el-button :disabled="information_information_add" type="primary" size="medium" @click="handleAdd" icon="el-icon-plus">添加</el-button>
        </el-col>
        <el-col :span="8">
          <el-input
            :disabled="information_information_select"
            placeholder="请输入关键字"
            v-model="input"
            class="input-with-select"
            clearable
            @clear="handleClear"
          >
            <el-button :disabled="information_information_select" slot="append" @click="handleSearch" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="12">
          <div class="deleteRecordBtn">
            <el-button class="delRecordBtn"  type="warning" size="medium"  @click="checkRecord(recordPn,recordPs)">删除记录</el-button>
          </div>
        </el-col>
      </div>
      <div class="infoType">
        <span>类型：</span>
        <el-select :disabled="selectDisabled"  style="width:180px;" v-model="optionsValue" placeholder="请选择类型" @change='handleSeletChange'>
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
        max-height="545"
        stripe
        :border="false"
        :fit="false"
      >
        <el-table-column prop="date" label="id" fixed="left" width="210" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleDetail(scope.row.id,pn,ps,optionsValue)"
            >{{ scope.row.id }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="580" align="center"></el-table-column>
        <el-table-column prop="editor" label="作者" width="280" align="center"></el-table-column>
        <el-table-column prop="clickNum" label="点击量" width="140" align="center"></el-table-column>
        <el-table-column label='是否推荐' width="120" align="center">
          <template slot-scope="scope">
            <el-switch  v-model="scope.row.recommend" active-color="#13ce66"  inactive-color="#C0C4CC" @change="handleSwitchChange(scope.$index, scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作"  width="200" align="center">
          <template slot-scope="scope">
            <el-button :disabled="information_information_update" size="mini" type="primary" @click="handleUpdate(scope.$index, scope.row)">编辑<i class="el-icon-edit"></i></el-button>
            <el-button :disabled="information_information_delete" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除<i class="el-icon-delete"></i></el-button>
          </template>
        </el-table-column >
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
const model = require("../../js/v2/s1");
export default {
  data() {
    return {
      input: "",
      pn: 1,
      ps: 5,
      total: 0,
      tableData: [],
      // select选择器禁用标志
      selectDisabled:false,
      //选择器，存储资讯类型
      options:[//需要从后端动态获取
        
      ],
      //资讯类型的id，配合查询产业资讯 合并版本3-1.6添加
      optionsValue:'',
      // 存储删除记录
      gridData: [],
      // 打开对话框的标志
      dialogTableVisible: false,
      // 删除记录的当前页
      recordPn:1,
      // 删除记录的每页尺寸
      recordPs:8,
      // 删除记录的总条数
      recordTatol:0,
      //权限控制字段
      information_information_add:true,//产业资讯添加
      information_information_update:true,//产业资讯更新
      information_information_delete:true,//产业资讯删除
      information_information_select:true,//产业资讯查询
      
    };
  },
  methods: {
    handleAdd() {
      this.$router.push("/v2/s1-insert");
    },
    handleDetail(id,pn,ps) {
      this.$router.push({
        path: "/v2/s1-detail",
        query: {
          id: id,
          pn: pn,
          ps: ps
        },
      });
    },
    handleSearch() {
      if(this.input==''){
        this.$message({
          type:"warning",
          message:"请输入内容查询"
        })
      }else{
        this.selectDisabled = true;
        model.getByKeyWord(this.input, 1, this.ps).then((value) => {
          console.log('value: ', value);
          this.tableData = value.data.data.rows;
          this.total = value.data.data.total;
        });
      }
      
    },
    handleUpdate(index, row) {
      this.$router.push({
        path: "/v2/s1-update",
        query: {
          id: row.id,
        },
      });
    },
    // 合并版本3-1.6新增/修改
    handleClear(){
      this.selectDisabled = false;
      model.getNewByCategoryId(this.optionsValue,1,this.ps).then((value)=>{
        this.pn =1;
        this.tableData = value.data.data.rows
        this.total = value.data.data.total
      })
    },
    creationTime(value){//时间转换 
      let newValue = null; 
      newValue = value!=null ? value.slice(0,10):''; 
      return newValue
    },
    checkRecord(pn,ps){//查询删除记录
      model.findDeleteRecord(pn,ps).then((value)=>{
        this.dialogTableVisible = true;
        this.gridData = value.data.data.rows;
        this.recordTatol =value.data.data.total;
        console.log(value.data.data.rows)
      })
    },
    handleCurrentChangeByDelReord(pn){//删除记录的当前页
      this.recordPn = pn;
      model.findDeleteRecord(pn,this.recordPs).then((value)=>{
        this.gridData = value.data.data.rows;
        this.recordTatol =value.data.data.total;
      })
    },
    async handleDelete(index, row) {//删除资讯
      await this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then( async() => {
        await model.delete(row.id).then(value => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      // 合并版本3-1.6修改
      await model.getNewByCategoryId(this.optionsValue,this.pn, this.ps).then((value) => {
        this.tableData = value.data.data.rows
        this.total = value.data.data.total
      });
    },
    handleCurrentChange(pn) {//当前页
      this.pn = pn;
      model.getNewByCategoryId(this.optionsValue,this.pn,this.ps).then((value)=>{
        console.log(value)
        this.tableData = value.data.data.rows
        this.total = value.data.data.total
      })
    },
    handleSizeChange(ps) {//每页尺寸
      this.ps = ps;
      model.getNewByCategoryId(this.optionsValue,this.pn,this.ps).then((value)=>{
        this.tableData = value.data.data.rows
        this.total = value.data.data.total
      })
    },
    handleSeletChange(){//选择选择器发生选择值变化执行函数
      // console.log(this.optionsValue)
      model.getNewByCategoryId(this.optionsValue,1,this.ps).then((value)=>{
        this.pn =1;
        this.tableData = value.data.data.rows;
        this.total = value.data.data.total;
      })
    },
    handleSwitchChange(index,row){//设置为推荐开关变化执行函数
    //index是行数，row是该行数据
      this.$confirm('是否确定改变此资讯推荐设置?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //执行数据库操作
          if(row.recommend){//此时的row.recommend是触发事件之后的，也就是和原先的相反
            model.recommendNewById(row.id).then((res)=>{
              console.log(res)
              if(res.data.flag){
                this.$message({
                  type: 'success',
                  message: '设置推荐成功!'
                });
              }else{
                this.$message({
                  type: 'error',
                  message: '设置推荐失败!'
                });
              }
            })
          }else{
            model.cancelRecommendNewById(row.id).then((res)=>{
              console.log(res)
              if(res.data.flag){
                this.$message({
                  type: 'success',
                  message: '取消推荐成功!'
                });
              }else{
                this.$message({
                  type: 'error',
                  message: '取消推荐失败!'
                });
              }
            })
          }
        }).catch(() => {
          //取消操作时，将switch改的值取反。使其和初始值保持一致。
          row.recommend = !row.recommend;
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
    },
    async handleStart(){//初始获取资讯执行函数
      await  model.getCategoryId().then((value)=>{
              this.options = value.data.data;
              this.optionsValue = value.data.data[0].id//拿到类型的第一个，确保打开资讯时候第一个就是对应资讯第一个的讯息
              console.log(this.optionsValue)
            })
      await  model.getNewByCategoryId(this.optionsValue,this.pn,this.ps).then((value)=>{
              console.log(value)
              this.tableData = value.data.data.rows
              this.total = value.data.data.total
            })
    }
  },
  computed: {
    ...mapState(["menulist"]),
  },
  mounted() {
    // model.list(this.pn, this.ps).then((value) => {
    //   this.tableData = value;
    // });
    // model.count().then((value) => {
    //   this.total = value;
    // });
    //拿到权限列表循环判断是否有权限，有则将对应权限字段至false
    this.menulist.forEach((item) => {
      if(item.name =="information"){
        if(!item.children.length == 0){
          for(let i=0; i<item.children.length;i++){
            if(item.children[i].name =="information_information"){
              for(let j=0;j<item.children[i].children.length;j++){
                this[item.children[i].children[j].name] =false
              }
            }
          }
        }
      }
    });
    // 合并版本3-1.6新增
      this.handleStart()//初始化资讯,利用异步，确保先获得类型再根据类型查找
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/s.scss";
.infoType{
  margin-left: 25px;
  font-weight: bold;
  color: #036;
}
.deleteRecordBtn{
  display: flex;
  justify-content: flex-end;

}
.delRecordBtn{
  transition: all .4s;
}
.delRecordBtn:hover{
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
.el-icon-close{
  color:#F56C6C;
  font-size: 23px;
  font-weight: bold;
}
.el-icon-check{
  color:#67C23A;
  font-size: 23px;
  font-weight: bold;
}
</style>