const axiosInstance = require("axios").default;
const axios = axiosInstance.create({
  // baseURL: 'http://106.75.154.40:9012/authority'
  baseURL: 'http://106.75.154.40:9003'
});
module.exports = class {
  //用户信息
  static labels = {
    loginId: "管理员登录账号",
    password: "管理员登录密码",
    name: "姓名",
    sex: "性别",
    email: "邮箱",
    mobile: "手机",
    phone: "电话",
    baseId: "基地Id",
    baseIdentity: "基地身份",
    merchantId: "店铺Id",
  };
  static labelsII = {
    loginId: "管理员登录账号",
    name: "姓名",
    sex: "性别",
    email: "邮箱",
    mobile: "手机",
    phone: "电话",
    baseId: "基地Id",
    baseIdentity: "基地身份",
    merchantId: "店铺Id",
  };
  static labelsIII = {
    loginId: "管理员登录账号",
    // password: "管理员登录密码",
    name: "姓名",
    sex: "性别",
    email: "邮箱",
    mobile: "手机",
    phone: "电话",
    baseId: "基地Id",
    baseIdentity: "基地身份",
    merchantId: "店铺Id",
  };
  constructor(
    loginId,
    // password,
    isAdmin,
    name,
    sex,
    email,
    mobile,
    phone,
    baseId,
    baseIdentity,
    merchantId
  ) {
    this.isAdmin = isAdmin || "";
    this.loginId = loginId || "";
    // this.password = password || "";
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
      axios.get("/admin/" + id).then((res) => {
        // resolve([res.data.data]); //规定要用数组
        resolve(res)
        const token = res.headers.token; //拿到请求头的token
        window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
        // alert(res.data.message + " 状态码为：" + res.status);
      });
      axios.interceptors.request.eject(myInterceptor);
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
      axios.post("/admin/search/" + pn+"/" + ps,{
        data:{}
      }).then((res) => {
        resolve(res);
        const token = res.headers.token; //拿到请求头的token
        window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
      });
      axios.interceptors.request.eject(myInterceptor);
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
        .put("/admin/admin/" + obj.userId, obj)
        .then((res) => {
          resolve(res);
          const token = res.headers.token; //拿到请求头的token
          window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
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
      axios.post("/admin", obj).then((res) => {
        resolve(res);
        const token = res.headers.token; //拿到请求头的token
        window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
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
      axios.delete("/admin/" + id).then((res) => {
        resolve(res);
        const token = res.headers.token; //拿到请求头的token
        window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
      });
      axios.interceptors.request.eject(myInterceptor);
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
      const myInterceptor = axios.interceptors.request.use(
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
      axios.get("/admin/admin").then((res) => {
        console.log(res.data.data);
        const token = res.headers.token; //拿到请求头的token
        window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
        resolve(res.data.data);
      });
      axios.interceptors.request.eject(myInterceptor);
    });
    return new Promise((resolve) => {
      resolve(16);
    });
  }
  static findRoles(id) {
    //查询已拥有角色
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
        .get("/admin/role/" + id)
        .then((res) => {
          resolve(res)
          const token = res.headers.token; //拿到请求头的token
          window.localStorage.setItem("token", token); //把token存放在localStorage里面
          // resolve([res.data.data]); //规定要用数组
        });
      axios.interceptors.request.eject(myInterceptor);
    });
  }
  static findAllRole() {
    //查询所有角色
    return new Promise((resolve) => {
      const myInterceptors = axios.interceptors.request.use(
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
        method: "get",
        url: "/role",
      }).then((res) => {
        resolve(res)
        const token = res.headers.token; //拿到请求头的token
        window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
      });
      axios.interceptors.request.eject(myInterceptors);
    });
  }
  static updateRoles(id,checkList) {
    //更新管理员角色
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
      axios({
        method: "post",
        url: "/admin/" + id,
        data: {
          roleIdList: checkList,
        },
      }).then((res) => {
        resolve(res)
        const token = res.headers.token; //拿到请求头的token
        window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
      });
      axios.interceptors.request.eject(myInterceptor);
    });
  }
};
