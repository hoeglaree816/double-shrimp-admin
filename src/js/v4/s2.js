const axiosInstance = require("axios").default;
const axios = axiosInstance.create({
  baseURL:"http://134.175.208.235:9002"
})
module.exports = class {
  static labels = {
    merchantId: "商铺id",
    merchantName: "商铺名称",
    merchantPhone: "联系电话",
    merchantLogo: "商铺logo",
    merchantQrcode: "商铺二维码",
    merchantProvince: "省份",
    merchantCity: "市",
    merchantTown: "区/县",
    merchantAddress: "详细地址",
    merchantDesc: "商家介绍",
    merchantRemarks: "商家备注",
    createBy: "创建者",
    created: "创建时间",
    updated: "更新时间",
  };
  static labelsII = {
    // merchantId: "商铺id",
    merchantName: "商铺名称",
    merchantPhone: "联系电话",
    // merchantLogo: "商铺logo",
    // merchantQrcode: "商铺二维码",
    merchantProvince: "省份",
    merchantCity: "市",
    merchantTown: "区/县",
    merchantAddress: "详细地址",
    merchantDesc: "商家介绍",
    merchantRemarks: "商家备注",
    // createBy: "创建者",
    // created: "创建时间",
    // updated: "更新时间",
  };
  static labelsIII = {
    merchantId: "商铺id",
    merchantName: "商铺名称",
    merchantPhone: "联系电话",
    // merchantLogo: "商铺logo",
    // merchantQrcode: "商铺二维码",
    merchantProvince: "省份",
    merchantCity: "市",
    merchantTown: "区/县",
    merchantAddress: "详细地址",
    merchantDesc: "商家介绍",
    merchantRemarks: "商家备注",
    createBy: "创建者",
    created: "创建时间",
    updated: "更新时间",
  };
  constructor(
    merchantId,
    merchantName,
    merchantPhone,
    merchantLogo,
    merchantQrcode,
    merchantProvince,
    merchantCity,
    merchantTown,
    merchantAddress,
    merchantDesc,
    merchantRemarks,
    createBy,
    created,
    updated
  ) {
    this.merchantId = merchantId || "";
    this.merchantName = merchantName || "";
    this.merchantPhone = merchantPhone || "";
    this.merchantLogo = merchantLogo || "";
    this.merchantQrcode = merchantQrcode || "";
    this.merchantProvince = merchantProvince || "";
    this.merchantCity = merchantCity || "";
    this.merchantTown = merchantTown || "";
    this.merchantAddress = merchantAddress || "";
    this.merchantDesc = merchantDesc || "";
    this.merchantRemarks = merchantRemarks || "";
    this.createBy = createBy || "";
    this.created = created || "";
    this.updated = updated || "";
  }
  static getById(id) {
    //查询
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
      axios.get("/merchant/" + id).then((res) => {
        console.log(res);
        resolve([res.data.data]); //规定要用数组
        // alert(res.data.message + " 状态码为：" + res.status);
      });
      axios.interceptors.request.eject(myInterceptor);
    });
    return new Promise((resolve) => {
      resolve([
        {
          id: id,
          merchantName: "undef",
          merchantPhone: "undef",
          merchantLogo: "undef",
          merchantQrcode: "undef",
          merchantProvince: "undef",
          merchantCity: "undef",
          merchantTown: "undef",
          merchantAddress: "undef",
          merchantDesc: "undef",
          merchantRemarks: "undef",
          createBy: "undef",
          created: "undef",
          updated: "undef",
        },
      ]);
    });
  }
  static list(pn, ps) {
    //分页
    return new Promise((resolve) => {
      const myInterceptor = axios.interceptors.request.use(
        //放token
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
        .get(
          "/merchant/" + pn + "/" + ps,
          {
            // data: {},
            // headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          resolve(res);
          console.log(res.data);
        });
      axios.interceptors.request.eject(myInterceptor);
    });
    let result = [];
    for (let i = 0; i < ps; i++) {
      result.push({
        id: new Date().getTime() + i,
        merchantName: "undef",
        merchantPhone: "undef",
        merchantLogo: "undef",
        merchantQrcode: "undef",
        merchantProvince: "undef",
        merchantCity: "undef",
        merchantTown: "undef",
        merchantAddress: "undef",
        merchantDesc: "undef",
        merchantRemarks: "undef",
        createBy: "undef",
        created: "undef",
        updated: "undef",
      });
    }
    return new Promise((resolve) => {
      resolve(result);
    });
  }
  static update(obj) {
      //修改
    return new Promise((resolve) => {
        const myInterceptor = axios.interceptors.request.use(
          //放token
          (config) => {
            const token = window.sessionStorage.getItem("token");
            if (token) {
              config.headers.authorization = "Bearer " + token; //将token放入请求头
              // console.log(token);
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
          .put("/merchant/" + obj.merchantId, obj)
          .then((res) => {
            resolve(res);
          });
        axios.interceptors.request.eject(myInterceptor); //注销axios拦截器
      });
    return new Promise((resolve) => {
      resolve({
        code: 0,
      });
    });
  }
  static add(obj) {
      //添加
    return new Promise((resolve) => {
      const myInterceptor = axios.interceptors.request.use(
        //放token
        (config) => {
          const token = window.sessionStorage.getItem("token");
          if (token) {
            config.headers.authorization = "Bearer " + token; //将token放入请求头
            // console.log(token);
          } else {
            console.log("token不存在");
          }
          return config; //；拦截返回，才能执行下面请求
        },
        (error) => {
          console.log(error);
        }
      );
      axios.post("/merchant/", obj).then((res) => {
        resolve(res);
      });
      axios.interceptors.request.eject(myInterceptor);
    });
    return new Promise((resolve) => {
      resolve({
        code: 0,
      });
    });
  }
  static delete(id) {
    //删除
    return new Promise((resolve) => {
        const myInterceptor = axios.interceptors.request.use(
          //放token
          (config) => {
            const token = window.sessionStorage.getItem("token");
            if (token) {
              config.headers.authorization = "Bearer " + token; //将token放入请求头
              // console.log(token);
            } else {
              console.log("token不存在");
            }
            return config; //；拦截返回，才能执行下面请求
          },
          (error) => {
            console.log(error);
          }
        );
        axios.delete("/merchant/" + id).then((res) => {
          resolve(res);
        });
        axios.interceptors.request.eject(myInterceptor);
      });
    return new Promise((resolve) => {
      resolve({
        code: 0,
      });
    });
  }
  static count() {
    return new Promise((resolve) => {
      resolve(100);
    });
  }
};
