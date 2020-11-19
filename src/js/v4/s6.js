const axiosInstance = require("axios").default;
const axios = axiosInstance.create({
  baseURL:"http://134.175.208.235:9002"
})
module.exports = class {
  static labels = {
    commentId: "评论id",
    userId: "用户id",
    productId: "商品id",
    commentContent: "评论内容",
    commentPic: "图片",
    commentStatus: "评论状态",
    commentTime: "评论时间",
  };
  static labelsII = {
    // commentId: "评论id",
    userId: "用户id",
    productId: "商品id",
    commentContent: "评论内容",
    // commentPic: "图片",
    commentStatus: "评论状态",
    // commentTime: "评论时间",
  };
  constructor(
    id,
    userId,
    productId,
    commentContent,
    commentPic,
    commentStatus,
    commentTime
  ) {
    this.id = id || "";
    this.userId = userId || "";
    this.productId = productId || "";
    this.commentContent = commentContent || "";
    this.commentPic = commentPic || "";
    this.commentStatus = commentStatus || "";
    this.commentTime = commentTime || "";
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
      axios.get("/comment/" + id).then((res) => {
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
          commentContent: "undef",
          commentPic: "undef",
          commentStatus: "undef",
          commentTime: "undef",
        },
      ]);
    });
  }
  static list(pn, ps, id) {
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
        .get("/comment/" + id + "/" + pn + "/" + ps)
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
        productId: "undef",
        commentContent: "undef",
        commentPic: "undef",
        commentStatus: "undef",
        commentTime: "undef",
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
      axios.put("/comment/"+obj.commentId,obj).then((res) => {
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
    //后台不能增加评论
    // return new Promise((resolve) => {
    //   const myInterceptor = axios.interceptors.request.use(
    //     (config) => {
    //       const token = window.sessionStorage.getItem("token");
    //       if (token) {
    //         config.headers.authorization = "Bearer " + token; //将token放入请求头
    //       } else {
    //         console.log("token不存在");
    //       }
    //       return config; //；拦截返回，才能执行下面请求
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
    //   axios.post("http://134.175.208.235:9002/comment/",obj).then((res) => {
    //     console.log(res);
    //     resolve([res.data.data]); //规定要用数组
    //     // alert(res.data.message + " 状态码为：" + res.status);
    //   });
    //   axios.interceptors.request.eject(myInterceptor);
    // });
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
      axios.delete("/comment/"+id).then((res) => {
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
