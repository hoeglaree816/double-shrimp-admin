const axiosInstance = require("axios").default;
const axios = axiosInstance.create({
  baseURL:"http://134.175.208.235:9002"
})
module.exports = class {
  static labels = {
    addressId: "收货地址id",
    userId: "用户id",
    receiverName: "收货人姓名",
    receiverPhone: "联系电话",
    receiverProvince: "省份",
    receiverCity: "城市",
    receiverTown: "县区",
    receiverAddress: "详细地址",
    receiverCode: "邮政编码",
    receiverCreated: "创建时间",
    receiverUpdate: "更新时间",
  };
  static labelsII = {
    // addressId: "收货地址id",
    userId: "用户id",
    receiverName: "收货人姓名",
    receiverPhone: "联系电话",
    receiverProvince: "省份",
    receiverCity: "城市",
    receiverTown: "县区",
    receiverAddress: "详细地址",
    receiverCode: "邮政编码",
    // receiverCreated: "创建时间",
    // receiverUpdate: "更新时间",
  };
  constructor(
    addressId,
    userId,
    receiverName,
    receiverPhone,
    receiverProvince,
    receiverCity,
    receiverTown,
    receiverAddress,
    receiverCode,
    receiverCreated,
    receiverUpdate
  ) {
    this.addressId = addressId || "";
    this.userId = userId || "";
    this.receiverName = receiverName || "";
    this.receiverPhone = receiverPhone || "";
    this.receiverProvince = receiverProvince || "";
    this.receiverCity = receiverCity || "";
    this.receiverTown = receiverTown || "";
    this.receiverAddress = receiverAddress || "";
    this.receiverCode = receiverCode || "";
    this.receiverCreated = receiverCreated || "";
    this.receiverUpdate = receiverUpdate || "";
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
      axios.get("/address/queryById/" + id).then((res) => {
        resolve([res.data.data]); //规定要用数组
        // alert(res.data.message + " 状态码为：" + res.status);
      });
      axios.interceptors.request.eject(myInterceptor);
    });
    return new Promise((resolve) => {
      resolve([
        {
          id: id,
          userId: "undef",
          receiverName: "undef",
          receiverPhone: "undef",
          receiverProvince: "undef",
          receiverCity: "undef",
          receiverTown: "undef",
          receiverAddress: "undef",
          receiverCode: "undef",
          receiverCreated: "undef",
          receiverUpdate: "undef",
        },
      ]);
    });
  }
  static list(id) {
    //根据id查询其拥有的所有地址
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
        .get(
          "/address/" + id,
        )
        .then((res) => {
          resolve(res);
        });
      axios.interceptors.request.eject(myInterceptor);
    });
    let result = [];
    for (let i = 0; i < ps; i++) {
      result.push({
        id: new Date().getTime() + i,
        userId: "undef",
        receiverName: "undef",
        receiverPhone: "undef",
        receiverProvince: "undef",
        receiverCity: "undef",
        receiverTown: "undef",
        receiverAddress: "undef",
        receiverCode: "undef",
        receiverCreated: "undef",
        receiverUpdate: "undef",
      });
    }
    return new Promise((resolve) => {
      resolve(result);
    });
  }
  static update(obj) {
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
      axios.put("/address/" + obj.addressId,obj).then((res) => {
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
  static add(obj) {
    //增加
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
        .post(
          "/address/",obj
        )
        .then((res) => {
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
      axios.delete("/address/" + id).then((res) => {
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
