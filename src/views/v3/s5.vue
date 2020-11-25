<template>
  <div class="root">
    <div class="title">
      <h2>类型管理</h2>
    </div>
    <div class="toolbar">
      <!-- 添加区域 -->
      <el-col :span="4">
        <el-button
          :disabled="type_add"
          type="primary"
          size="medium"
          @click="handleAdd"
          icon="el-icon-plus"
          >添加</el-button
        >
      </el-col>

      <!-- 选择区域 -->
      <el-col :span="8">
        <el-select
          placeholder="请选择类型"
          v-model="input"
          class="input-with-select"
          @change="handleTypeChange"
        >
          <el-option
            v-for="item in options"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
    </div>

    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="350"
        stripe
        :border="false"
        :fit="false"
      >
        <el-table-column
          prop="id"
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
          prop="name"
          label="专家分类"
          width="680"
          align="center"
        ></el-table-column>
        <el-table-column prop="parentId" label="父级类型" width="525">
          <template slot-scope="scope">
            {{ scope.row.parentId }}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              :disabled="type_update"
              size="mini"
              type="primary"
              @click="handleUpdate(scope.$index, scope.row)"
              >编辑<i class="el-icon-edit"></i
            ></el-button>
            <!-- <el-button :disabled="education_courseCategory_delete" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除<i class="el-icon-delete"></i></el-button> -->
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
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
  </div>
</template>

<script>
import { mapState } from "vuex";
const model = require("../../js/v3/s5");
export default {
  data() {
    return {
      input: 0,
      pn: 1,
      ps: 5,
      total: 100,
      tableData: [],

      /* 选择 */
      options: [
        {
          label: "远程教育",
          value: 0,
        },
        {
          label: "渔技文章",
          value: 1,
        },
        {
          label: "演示文稿",
          value: 2,
        },
        {
          label: "知识产权",
          value: 3,
        },
      ],
      // 选择知识产权的时候要用的数据
      allTypes: [],
      //权限控制字段
      education_courseCategory_add: true, //远程教育类别添加
      education_courseCategory_update: true, //远程教育类别更新
      education_courseCategory_select: true, //远程教育类别查询
      fishingTechnologySchool_fishingTechnologyArticleCategory_add: true, //渔技文章类别添加
      fishingTechnologySchool_fishingTechnologyArticleCategory_update: true, //渔技文章类别更新
      fishingTechnologySchool_fishingTechnologyArticleCategory_select: true, //渔技文章类别查询
      fishingTechnologySchool_demonstrationDraftCategory_add: true, //演示文稿类别添加
      fishingTechnologySchool_demonstrationDraftCategory_update: true, //演示文稿类别更新
      fishingTechnologySchool_demonstrationDraftCategory_select: true, //演示文稿类别查询
      fishingTechnologySchool_intellectualPropertyCategory_add: true, //知识产权类别添加
      fishingTechnologySchool_intellectualPropertyCategory_update: true, //知识产权类别更新
      fishingTechnologySchool_intellectualPropertyCategory_select: true, //知识产权类别查询
      type_update: true,
      type_add: true,
      type_select: true,
    };
  },
  methods: {
    // 重新将所有按钮设为true
    initAllButton() {
      this.education_courseCategory_add = true;
      this.education_courseCategory_update = true;
      this.education_courseCategory_select = true;
      this.fishingTechnologySchool_fishingTechnologyArticleCategory_add = true;
      this.fishingTechnologySchool_fishingTechnologyArticleCategory_update = true;
      this.fishingTechnologySchool_fishingTechnologyArticleCategory_select = true;
      this.fishingTechnologySchool_demonstrationDraftCategory_add = true;
      this.fishingTechnologySchool_demonstrationDraftCategory_update = true;
      this.fishingTechnologySchool_demonstrationDraftCategory_select = true;
      this.fishingTechnologySchool_intellectualPropertyCategory_add = true;
      this.fishingTechnologySchool_intellectualPropertyCategory_update = true;
      this.fishingTechnologySchool_intellectualPropertyCategory_select = true;
    },
    // 更新type权限控制
    changeTypeAuthority() {
      if (this.input == 0) {
        this.type_add = this.education_courseCategory_add;
        this.type_select = this.education_courseCategory_update;
        this.type_update = this.education_courseCategory_select;
      } else if(this.input == 1){
        this.type_add = this.fishingTechnologySchool_fishingTechnologyArticleCategory_add;
        this.type_select = this.fishingTechnologySchool_fishingTechnologyArticleCategory_update;
        this.type_update = this.fishingTechnologySchool_fishingTechnologyArticleCategory_select;
      }else if(this.input == 2){
        this.type_add = this.fishingTechnologySchool_demonstrationDraftCategory_add;
        this.type_select = this.fishingTechnologySchool_demonstrationDraftCategory_update;
        this.type_update = this.fishingTechnologySchool_demonstrationDraftCategory_select;
      }else if(this.input == 3){
        this.type_add = this.fishingTechnologySchool_intellectualPropertyCategory_add;
        this.type_select = this.fishingTechnologySchool_intellectualPropertyCategory_update;
        this.type_update = this.fishingTechnologySchool_intellectualPropertyCategory_select;
      }
    },
    /* 监听页面数据 */
    handleCurrentChange(pn) {
      this.pn = pn;
      this.getInfo();
    },
    handleSizeChange(ps) {
      this.ps = ps;
      this.pn = 1;
      this.getInfo();
    },
    // 当选择框改变时
    handleTypeChange() {
      this.pn = 1;
      this.initAllButton();
      if(this.input == 0){
        this.authorityManagement("education_courseCategory");
      }else if(this.input == 1){
        this.authorityManagement("fishingTechnologySchool_fishingTechnologyArticleCategory");
      }else if(this.input == 2){
        this.authorityManagement("fishingTechnologySchool_demonstrationDraftCategory");
      }
      else if(this.input == 3){
        this.authorityManagement("fishingTechnologySchool_intellectualPropertyCategory");
      }
      this.changeTypeAuthority();
      this.getInfo();
    },
    /* 获取表单数据 */
    getInfo() {
      model.list(this.pn, this.ps, this.input).then((value) => {
        console.log(value.data.data.rows);
        if (this.input == "3") {
          console.log('this.tableData: ', this.tableData);
          this.tableData = this.allTypes.slice(
            (this.pn - 1) * this.ps,
            this.pn * this.ps
          );
          this.total = this.allTypes.length;
        } else {
          this.tableData = value.data.data.rows;
          this.total = value.data.data.total;
        }
      });
    },

    /* 添加 */
    handleAdd() {
      this.$router.push({
        path: "/v3/s5-insert",
        query: {
          type: this.input,
        },
      });
    },

    /* 查看详情 */
    handleDetail(id) {
      this.$router.push({
        path: "/v3/s5-detail",
        query: {
          id: id,
          type: this.input,
        },
      });
    },

    /* 修改 */
    handleUpdate(index, row) {
      this.$router.push({
        path: "/v3/s5-update",
        query: {
          id: row.id,
          type: this.input,
        },
      });
    },

    /* 权限控制 */
    authorityManagement(SonName) {
      //拿到权限列表循环判断是否有权限，有则将对应权限字段至false
      this.menulist.forEach((item) => {
        if (item.name == "fishingTechnologySchool") {
          if (!item.children.length == 0) {
            for (let i = 0; i < item.children.length; i++) {
              if (item.children[i].name == SonName) {
                for (let j = 0; j < item.children[i].children.length; j++) {
                  this[item.children[i].children[j].name] = false;
                }
              }
            }
          }
        }
      });
    },
    // 处理子类型对应父类型
    handleAllType() {
      model
        .getIntellectualPropertyRightsTypesByLevel(1)
        .then((parents) => {
          return parents;
        })
        .then((parents) => {
          parents.forEach((item, index) => {
            console.log("item: ", item);
            model
              .getIntellectualPropertyRightsTypesByParentId(item.id)
              .then((res) => {
                console.log("res: ", res);
                res.forEach((child) => {
                  this.allTypes.push({
                    id: child.id,
                    name: child.name,
                    parentId: item.name,
                  });
                });
              });
          });
        });
    },
  },
  computed: {
    ...mapState(["menulist"]),
  },
  mounted() {
    this.getInfo();
    this.authorityManagement("education_courseCategory");
    this.handleAllType();
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/s.scss";
</style>