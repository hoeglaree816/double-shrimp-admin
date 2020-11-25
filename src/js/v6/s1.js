const axios = require("axios").default;
const axiosInstance = axios.create({
  // baseURL: 'http://106.75.154.40:9012/authority'
  baseURL: 'http://106.75.154.40:9003'
});
module.exports = class {
  //用户信息
  static labels = {
    loginId: "用户登录账号",
    password: "用户登录密码",
    // isAdmin: "是否管理员",
    name: "姓名",
    sex: "性别",
    email: "邮箱",
    mobile: "手机",
    phone: "电话",
    baseId: "基地Id",
    baseIdentity: "用户基地身份",
    merchantId: "店铺Id",
  };
  static labelsII = {
    loginId: "用户登录账号",
    name: "姓名",
    sex: "性别",
    email: "邮箱",
    mobile: "手机",
    phone: "电话",
    baseId: "基地Id",
    baseIdentity: "用户基地身份",
    merchantId: "店铺Id",
  };
  constructor(
    loginId,
    password,
    // isAdmin,
    name,
    sex,
    email,
    mobile,
    phone,
    baseId,
    baseIdentity,
    merchantId
  ) {
    // this.isAdmin = isAdmin || "";
    this.loginId = loginId || "";
    this.password = password || "";
    this.name = name || "";
    this.sex = sex || "";
    this.email = email || "";
    this.mobile = mobile || "";
    this.phone = phone || "";
    this.baseId = baseId || "";
    this.baseIdentity = baseIdentity || "";
    this.merchantId = merchantId || "";
  }
  static getById(id) {
    //查询
    return new Promise((resolve) => {
      const myInterceptor = axiosInstance.interceptors.request.use(
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
      axiosInstance.get("/user/" + id).then((res) => {
        // resolve([res.data.data]); //规定要用数组
        resolve(res)
        const token = res.headers.token; //拿到请求头的token
        window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
      });
      axiosInstance.interceptors.request.eject(myInterceptor);
    });
    return new Promise((resolve) => {
      resolve([
        {
          id: id,
          isAdmin: "undef",
          loginId: "undef",
          password: "undef",
          name: "undef",
          email: "undef",
          phone: "undef",
          mobile: "undef",
          sex: "undef",
          groupId: "undef",
          createBy: "undef",
          createDate: "undef",
          updateBy: "undef",
          updateDate: "undef",
        },
      ]);
    });
  }
  static list(pn, ps) {
    //分页
    return new Promise((resolve) => {
      const myInterceptor = axiosInstance.interceptors.request.use(
        //放token
        (config) => {
          const token = window.sessionStorage.getItem("token");
          if (token) {
            config.headers.authorization = "Bearer " + token; //将token放入请求头
            // console.log(token);
          } else {
            console.log("token不存在");
          }
          return config; //拦截返回，才能执行下面请求
        },
        (error) => {
          console.log(error);
        }
      );
      axiosInstance.post("/user/search/" + pn+"/" + ps,{
        data:{}
      }).then((res) => {
        console.log(res)
        resolve(res);
        const token = res.headers.token; //拿到请求头的token
        window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
      });
      axiosInstance.interceptors.request.eject(myInterceptor);
    });

    let result = [];
    for (let i = 0; i < ps; i++) {
      result.push({
        userId: "1",
        loginId: "1",
        password: "2",
        // isAdmin,
        name: "3",
        sex: "4",
        email: "",
        mobile: "",
        phone: "",
        baseId: "",
        bsseIdentity: "",
        merchantId: "",
      });
    }
    return new Promise((resolve) => {
      resolve(result);
    });
  }
  static update(obj) {
    //修改
    return new Promise((resolve) => {
      const myInterceptor = axiosInstance.interceptors.request.use(
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
      axiosInstance
        .put("/user/admin/" + obj.userId, obj)
        .then((res) => {
          resolve(res);
          const token = res.headers.token; //拿到请求头的token
          window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
        });
      axiosInstance.interceptors.request.eject(myInterceptor); //注销axios拦截器
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
      const myInterceptor = axiosInstance.interceptors.request.use(
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
      axiosInstance.post("/user", obj).then((res) => {
        resolve(res);
        const token = res.headers.token; //拿到请求头的token
        window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
      });
      axiosInstance.interceptors.request.eject(myInterceptor);
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
      const myInterceptor = axiosInstance.interceptors.request.use(
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
      axiosInstance.delete("/user/" + id).then((res) => {
        resolve(res);
        const token = res.headers.token; //拿到请求头的token
        window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
      });
      axiosInstance.interceptors.request.eject(myInterceptor);
    });
    return new Promise((resolve) => {
      resolve({
        code: 0,
      });
    });
  }
  static count(pn,ps) {
    //列表
    return new Promise((resolve) => {
      const myInterceptor = axiosInstance.interceptors.request.use(
        (config) => {
          const token = window.sessionStorage.getItem("token");
          if (token) {
            config.headers.authorization = "Bearer " + token;
          } else {
            console.log("token不存在");
          }
          return config; //；拦截返回，才能执行下面请求
        },
        (error) => {
          console.log(error);
        }
      );
      axiosInstance.get("/user").then((res) => {
        console.log(res.data.data);
        const token = res.headers.token; //拿到请求头的token
        window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
        resolve(res.data.data);
      });
      axiosInstance.interceptors.request.eject(myInterceptor);
    });
    return new Promise((resolve) => {
      resolve(16);
    });
  }
};
