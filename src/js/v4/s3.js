const axiosInstance = require("axios").default;
const axios = axiosInstance.create({
  baseURL:"http://134.175.208.235:9002"
})
module.exports = class {
  static labels = {
    orderId: "订单id",
    userId: "用户id",
    productId: "商品id",
    num: "购买数量",
    addressId: "收货地址id",
    postage: "邮费",
    orderPayment: "实付金额",
    orderPaymentType: "支付类型",
    orderStatus: "交易状态",
    orderCreated: "订单创建时间",
    orderUpdated: "订单更新时间",
    orderPaymentTime: "付款时间",
    orderDeliveryTime: "发货时间",
    orderLogisticsName: "物流名称",
    orderLogisticsNumber: "物流单号",
  };
  static labelsII = {
    userId: "用户id",
    productId: "商品id",
    num: "购买数量",
    addressId: "收货地址id",
    postage: "邮费",
    orderPayment: "实付金额",
    orderPaymentType: "支付类型",
    orderStatus: "交易状态",
    orderPaymentTime: "付款时间",
    orderDeliveryTime: "发货时间",
    orderLogisticsName: "物流名称",
    orderLogisticsNumber: "物流单号",
  };
  static labelsIII = {
    userId: "用户id",
    productId: "商品id",
    num: "购买数量",
    addressId: "收货地址id",
    postage: "邮费",
    orderPayment: "实付金额",
    orderPaymentType: "支付类型",
    orderStatus: "交易状态",
    orderDeliveryTime: "发货时间",
    orderLogisticsName: "物流名称",
    orderLogisticsNumber: "物流单号",
  };
  constructor(
    orderId,
    userId,
    productId,
    num,
    addressId,
    postage,
    orderPayment,
    orderPaymentType,
    orderStatus,
    orderCreated,
    orderUpdated,
    orderPaymentTime,
    orderDeliveryTime,
    orderLogisticsName,
    orderLogisticsNumber
  ) {
    this.orderId = orderId || "";
    this.userId = userId || "";
    this.productId = productId || "";
    this.num = num || "";
    this.addressId = addressId || "";
    this.postage = postage || "";
    this.orderPayment = orderPayment || "";
    this.orderPaymentType = orderPaymentType || "";
    this.orderStatus = orderStatus || "";
    this.orderCreated = orderCreated || "";
    this.orderUpdated = orderUpdated || "";
    this.orderPaymentTime = orderPaymentTime || "";
    this.orderDeliveryTime = orderDeliveryTime || "";
    this.orderLogisticsName = orderLogisticsName || "";
    this.orderLogisticsNumber = orderLogisticsNumber || "";
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
      axios.get("/order/" + id).then((res) => {
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
          userId: "undef",
          productId: "undef",
          num: "undef",
          addressId: "undef",
          postage: "undef",
          orderPayment: "undef",
          orderPaymentType: "undef",
          orderStatus: "undef",
          orderCreated: "undef",
          orderUpdated: "undef",
          orderPaymentTime: "undef",
          orderDeliveryTime: "undef",
          orderLogisticsName: "undef",
          orderLogisticsNumber: "undef",
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
        .get("/order/query/" + pn + "/" + ps,)
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
        userId: "undef",
        productId: "undef",
        num: "undef",
        addressId: "undef",
        postage: "undef",
        orderPayment: "undef",
        orderPaymentType: "undef",
        orderStatus: "undef",
        orderCreated: "undef",
        orderUpdated: "undef",
        orderPaymentTime: "undef",
        orderDeliveryTime: "undef",
        orderLogisticsName: "undef",
        orderLogisticsNumber: "undef",
      });
    }
    return new Promise((resolve) => {
      resolve(result);
    });
  }
  static update(obj) {
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
        .put("/order/" + obj.orderId, obj)
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
  static add(obj) {
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
      axios.post("/order/", obj).then((res) => {
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
      axios.delete("/order/" + id).then((res) => {
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
