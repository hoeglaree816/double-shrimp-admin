const axiosInstance = require("axios").default;
const axios = axiosInstance.create({
  baseURL:"http://134.175.208.235:9002"
})
module.exports = class {
  static labels = {
    productId: "商品id",
    productName: "商品名称",
    productTitle: "商品标题",
    productPrice: "商品单价",
    productUnit: "单位",
    productNum: "商品库存",
    productBarcode: "商品条形码",
    productImages: "商品图片",
    categoryId: "商品类别",
    productStars: "商品点赞数",
    productArea: "商品产地",
    productStatus: "商品状态",
    merchantId: "商铺id",
    productCreated: "商品创建时间",
    productUpdated: "商品更新时间",
  };
  static labelsII = {
    productName: "商品名称",
    productTitle: "商品标题",
    productPrice: "商品单价",
    productUnit: "单位",
    productNum: "商品库存",
    productBarcode: "商品条形码",
    productImages: "商品图片",
    categoryId: "商品类别",
    productArea: "商品产地",
    productStatus: "商品状态",
    merchantId: "商铺id",
  };
  static labelsIII = {
    productId: "商品id",
    productName: "商品名称",
    productTitle: "商品标题",
    productPrice: "商品单价",
    productUnit: "单位",
    productNum: "商品库存",
    productBarcode: "商品条形码",
    // productImages: "商品图片",
    categoryId: "商品类别id",
    productStars: "商品点赞数",
    productArea: "商品产地",
    productStatus: "商品状态",
    merchantId: "商铺id",
    productCreated: "商品创建时间",
    productUpdated: "商品更新时间",
  };
  constructor(
    productId,
    productName,
    productTitle,
    productPrice,
    productUnit,
    productNum,
    productBarcode,
    productImages,
    categoryId,
    productStars,
    productArea,
    productStatus,
    merchantId,
    productCreated,
    productUpdated
  ) {
    this.productId = productId || "";
    this.productName = productName || "";
    this.productTitle = productTitle || "";
    this.productPrice = productPrice || "";
    this.productUnit = productUnit || "";
    this.productNum = productNum || "";
    this.productBarcode = productBarcode || "";
    this.productImages = productImages || "";
    this.categoryId = categoryId || "";
    this.productStars = productStars || "";
    this.productArea = productArea || "";
    this.productStatus = productStatus || "";
    this.merchantId = merchantId || "";
    this.productCreated = productCreated || "";
    this.productUpdated = productUpdated || "";
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
      axios.get("/product/" + id).then((res) => {
        resolve([res.data.data]); //规定要用数组
        // alert(res.data.message + " 状态码为：" + res.status);
      });
      axios.interceptors.request.eject(myInterceptor);
    });
    return new Promise((resolve) => {
      resolve([
        {
          id: id,
          productName: "undef",
          productTitle: "undef",
          productPrice: "undef",
          productUnit: "undef",
          productNum: "undef",
          productBarcode: "undef",
          productImages: "undef",
          categoryId: "undef",
          productStars: "undef",
          productArea: "undef",
          productStatus: "undef",
          merchantId: "undef",
          productCreated: "undef",
          productUpdated: "undef",
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
        .get(
          "/product/commonSort/" + pn + "/" + ps,
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
        productName: "undef",
        productTitle: "undef",
        productPrice: "undef",
        productUnit: "undef",
        productNum: "undef",
        productBarcode: "undef",
        productImages: "undef",
        categoryId: "undef",
        productStars: "undef",
        productArea: "undef",
        productStatus: "undef",
        merchantId: "undef",
        productCreated: "undef",
        productUpdated: "undef",
      });
    }
    return new Promise((resolve) => {
      resolve(result);
    });
  }
  static update(obj) {
    //更新
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
      axios.put("/product/"+obj.productId,obj).then((res) => {
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
    //添加
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
      axios.post("/product/",obj).then((res) => {
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
      axios.delete("/product/" + id).then((res) => {
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
  static getCategoryId(){
    //拿到商品类别
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
      axios.get("/category/").then((res) => {
        resolve(res);
      });
      axios.interceptors.request.eject(myInterceptor);
    });
  }
};
