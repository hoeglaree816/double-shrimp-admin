<template>
  <div class="root">
    <div class="title">
      <el-button icon="el-icon-back" circle @click="backList"></el-button>
      <h2>添加</h2>
    </div>
    <main>
      <!-- 表单 -->
      <el-form
        :hide-required-asterisk="true"
        :model="baseInfoForm"
        :rules="rules"
        ref="baseInfoForm"
        label-width="70px"
        label-position="left"
      >
        <!-- 第一行信息 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="基地名称" label-width="120px" prop="baseName">
              <el-input placeholder="请输入基地名称" v-model="baseInfoForm.baseName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="创建者" label-width="120px" prop="createBy">
              <el-input
                placeholder="请输入创建者名称"
                style="width:100%"
                v-model="baseInfoForm.createBy"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第二行信息 -->
        <!-- 第三行信息 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="基地地址" label-width="120px" prop="baseAddr">
              <el-input
                placeholder="请输入基地地址"
                v-model="baseInfoForm.baseAddr"
                @blur="onKeyDown"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-button type="info" icon="el-icon-location" @click="openMap">定位</el-button>
        </el-row>
        <!-- 第四行信息 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="营业执照注册号" label-width="120px" prop="registNumber">
              <el-input placeholder="请输入营业执照注册号" v-model="baseInfoForm.registNumber" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="注册资金(万元)" label-width="120px" prop="funds">
              <el-input placeholder="请输入注册资金(万元)" v-model="baseInfoForm.funds" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第五行信息 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="营业范围" label-width="120px" prop="scope">
              <el-input placeholder="请输入营业范围" v-model="baseInfoForm.scope" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第六行信息 -->
        <el-row class="baseUpLoad">
          <el-col :span="2" class="imgSets">基地图片</el-col>
          <el-col :span="20" class="imgFrame">
            <div v-for="(url, index) in picSets" :key="index" class="test">
              <div class="mask">
                <i class="el-icon-delete" @click="deleteClick(url)"></i>
              </div>
              <img :src="url" />
            </div>
            <el-upload
              action="http://106.75.154.40:9005/information/upload"
              list-type="picture-card"
              :on-success="onSuccess"
              :auto-upload="true"
              ref="upload"
              class="addBox"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-col>
        </el-row>
        <!-- 第七行信息 -->
        <el-row :gutter="20">
          <el-col>
            <el-form-item label="基地简介" label-width="120px" prop="baseIntroduction">
              <el-input
                placeholder="请输入基地简介"
                type="textarea"
                :rows="7"
                v-model="baseInfoForm.baseIntroduction"
                maxlength="500"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="form-button">
        <el-button type="success" @click="addBaseInfo">确定</el-button>
        <el-button type="info" plain @click="resetForm">重置</el-button>
      </div>
    </main>
    <div class="bottom">
      <span>@对虾全产业链云平台-管理后台</span>
    </div>
    <el-dialog
      :visible.sync="isShowMap"
      width="45%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <div id="container"></div>
      <el-button class="locate" type="info" @click="comfirmLocate">确定</el-button>
    </el-dialog>
    <div id="map"></div>
  </div>
</template>
<script>
import axios from "axios";
import $ from "jquery";
import { labels } from "../../js/v1/s1";
const model = require("../../js/v1/s1");
export default {
  data() {
    return {
      baseId: "1248910886228332544",
      // 基地信息
      baseInfoForm: {
        baseName: "",
        baseIntroduction: "",
        baseAddr: "",
        basePositionLongitude: "",
        basePositionLatitude: "",
        createBy: "",
        createDate: "",
        registNumber: "",
        funds: 0,
        scope: "",
        basePic: "",
      },
      picSets: [],
      // 验证规则
      rules: {
        baseName: [
          { required: true, message: "请输入基地名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        createBy: [
          { required: true, message: "请输入创建者名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        baseAddr: [
          { required: true, message: "请输入基地地址", trigger: "blur" },
        ],
        registNumber: [
          { required: true, message: "请输入营业执照注册号", trigger: "blur" },
        ],
        funds: [{ required: true, message: "请输入注册资金", trigger: "blur" }],
        scope: [{ required: true, message: "请输入营业范围", trigger: "blur" }],
        baseIntroduction: [
          { required: true, message: "请输入基地简介", trigger: "blur" },
        ],
      },
      address: "中国广东省广州市海珠区仲恺路",
      map: undefined,
      // 标记
      mark: undefined,
      // 维度
      lat: 23,
      // 经度
      lng: 113,
      debounceLocationToAddr: undefined,
      // 经纬度转地址的转换器
      geocoderLocationToAddr: undefined,
      debounceAddrToLocation: undefined,
      geocoderAddrToLocation: undefined,
      isShowMap: false,
    };
  },
  methods: {
    // 返回列表
    backList() {
      this.$router.push("/v1/s1");
    },
    // 重置表单
    resetForm() {
      this.$refs.baseInfoForm.resetFields();
    },
    // 添加基地信息
    addBaseInfo() {
      var date = new Date();
      this.baseInfoForm.createDate = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      console.log(this.baseInfoForm);
      this.$refs.baseInfoForm.validate(async (valid) => {
        // 表单自身方法： validate: 进行表单与预校验，放回校验结果，用valid接收
        if (!valid) return false;
        // 成功后，可以发起修改基地信息的网络请求
        // 调用修改基地信息的接口
        const { data: res } = await axios.post(
          "http://106.75.154.40:9012/traceability/base",
          this.baseInfoForm
        );
        if (res.code !== 20000) {
          return this.$message.error("提交信息失败！！");
        }
        this.$message.success("提交信息成功！！");
        this.$router.push("/v1/s1");
      });
    },
    // 图片添加成功
    onSuccess(response, file, fileList) {
      this.$refs.upload.clearFiles();
      // 发送到服务器成功，返回url
      // 将url赛进picSets里，即刻渲染
      // console.log(response, file, fileList)
      if (response.data !== "" && response.data !== null) {
        this.picSets.push(response.data);
        this.baseInfoForm.basePic = this.picSets.join(";");
      }
      // console.log(this.baseInfoForm.basePic)
    },
    // 删除图片
    deleteClick(url) {
      $.ajax({
        url: "http://106.75.154.40:9012/traceability/base/delPic",
        type: "POST",
        data: {
          _method: "DELETE",
          delUrl: url,
        },
        success: function (data) {
          console.log(data);
        },
      });
      // 删除照片 再次调用修改信息函数来刷新信息
      for (var i = 0; i < this.picSets.length; i++) {
        if (this.picSets[i] === url) {
          this.picSets.splice(i, 1);
        }
      }
      this.baseInfoForm.basePic = this.picSets.join(";");
    },
    // 输入地址时触发事件
    onKeyDown() {
      // 防抖
      this.address = this.baseInfoForm.baseAddr;
      console.log(this.address);
      this.init("map");
      this.debounceAddrToLocation = 0;
      setTimeout(() => {
        this.baseInfoForm.basePositionLatitude = this.lat;
        this.baseInfoForm.basePositionLongitude = this.lng;
        console.log(this.lat, this.lng);
      }, 1500);
    },
    // 显示地图
    init(name) {
      var This = this;
      // 获取地图显示容器
      This.map = new qq.maps.Map(document.getElementById(name), {
        // 地图的中心地理坐标。
        center: new qq.maps.LatLng(this.lat, this.lng),
        // 地图缩放等级
        zoom: 14,
      });
      console.log(This.map);
      // 添加中心标记
      This.mark = new qq.maps.Marker({
        // map方法=>getCenter()：返回地图当前中心点地理坐标。
        position: This.map.getCenter(),
        map: This.map,
      });
      // 经纬度转地址的防抖
      This.debounceLocationToAddr = 999;
      This.geocoderLocationToAddr = new qq.maps.Geocoder(); // 地址和经纬度的转换器
      setInterval(() => {
        // setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。
        This.debounceLocationToAddr += 1;
        if (This.debounceLocationToAddr === 2) {
          // (Geocoder)getAddress：根据指定的坐标进行解析。
          This.geocoderLocationToAddr.getAddress(This.map.getCenter());
          // (Geocoder)setComplete：设置检索成功后的回调函数
          This.geocoderLocationToAddr.setComplete(function (result) {
            console.log(result);
            This.address = result.detail.address;
          });
          // (Geocoder)setError: 设置检索失败后的回调函数。
          This.geocoderLocationToAddr.setError(function () {
            console.log("解析不了呀");
          });
        }
      }, 500);
      // 地图中心改变时触发事件，保证标记处于视野中心
      qq.maps.event.addListener(This.map, "center_changed", function () {
        This.mark.setPosition(This.map.getCenter());
        This.lat = This.map.getCenter().lat;
        This.lng = This.map.getCenter().lng;
        // 防抖
        This.debounceLocationToAddr = 0;
      });
      // 地址转经纬度的防抖
      This.debounceAddrToLocation = 999;
      This.geocoderAddrToLocation = new qq.maps.Geocoder(); // 地址和经纬度的转换器
      setInterval(() => {
        This.debounceAddrToLocation += 1;
        if (This.debounceAddrToLocation === 2) {
          This.geocoderAddrToLocation.getLocation(This.address);
          This.geocoderAddrToLocation.setComplete(function (result) {
            // setCenter:设置地图中心点坐标。
            This.map.setCenter(result.detail.location);
            // setPosition:设置标注位置。
            This.mark.setPosition(result.detail.location);
            This.lat = result.detail.location.lat;
            This.lng = result.detail.location.lng;
          });
          This.geocoderAddrToLocation.setError(function () {
            console.log("解析不了呀");
          });
        }
      }, 500);
    },
    // 控制地图的开关
    openMap() {
      this.isShowMap = true;
      setTimeout(() => {
        this.init("container");
      }, 1);
    },
    // 提交地图信息
    comfirmLocate() {
      this.isShowMap = false;
      this.baseInfoForm.baseAddr = this.address;
      this.baseInfoForm.basePositionLongitude = this.lng;
      this.baseInfoForm.basePositionLatitude = this.lat;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/s-insert.scss";
.el-row {
  margin-bottom: 0;
}
.baseUpLoad {
  margin-bottom: 10px;
}
.imgSets {
  margin-right: 17px;
  color: #606266;
  font-size: 14px;
}
.imgFrame {
  display: flex;
  flex-wrap: wrap;
  width: 1115px;
  min-height: 200px;
  margin-bottom: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
.imgFrame .test {
  position: relative;
  width: 150px;
  height: 150px;
  border: 1px solid rgb(184, 181, 181);
  border-radius: 4px;
  padding: 5px;
  margin: 10px 10px;
}
.imgFrame .test:hover .mask {
  display: block;
}
.imgFrame .test .mask {
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  width: 100%;
  height: 100%;
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  text-align: center;
  line-height: 160px;
}
.test img {
  width: 100%;
  height: 100%;
}
.test .mask i {
  cursor: pointer;
  color: rgb(206, 205, 205);
  font-size: 30px;
}
.addBox {
  margin: 17.5px 10px 10px;
}
.pullRight {
  margin-left: 1158px;
  width: 80px;
}
#container {
  width: 99%;
  height: 500px;
  border-radius: 6px;
  margin: 0 auto;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.6);
}
.locate {
  margin: 20px 0 0 571px;
}
.form-button {
  display: flex;
  justify-content: flex-end;
}
</style>
