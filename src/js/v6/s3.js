const axiosInstance = require("axios").default;
const axios = axiosInstance.create({
  baseURL: 'http://106.75.154.40:9012/authority'
});
module.exports = class {
  static labels = {
    // id: "权限id",
    name: "权限名字",
    remarks: "权限解释",
  };
  constructor(id, name, remarks) {
    // this.id = id || "";
    this.name = name || "";
    this.remarks = remarks || "";
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
      axios.get("/function/" + id).then((res) => {
        const token = res.headers.token; //拿到请求头的token
        window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
        // resolve([res.data.data]); //规定要用数组
        resolve(res)
      });
      axios.interceptors.request.eject(myInterceptor);
    });
    return new Promise((resolve) => {
      resolve([
        {
          id: id,
          roleType: "undef",
          useable: "undef",
          remarks: "undef",
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
      axios.post("/function/search/" + pn+"/" + ps,{
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
        id: new Date().getTime() + i,
        roleType: "undef",
        useable: "undef",
        remarks: "undef",
        createBy: "undef",
        createDate: "undef",
        updateBy: "undef",
        updateDate: "undef",
      });
    }
    return new Promise((resolve) => {
      resolve(result);
    });
  }
  static update(obj) {
    console.log(obj);
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
        .put("/function/" + obj.id, obj)
        .then((res) => {
          resolve();
          const token = res.headers.token; //拿到请求头的token
          window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
          //提示用户修改情况
          alert(res.data.message + " 状态码为：" + res.status);
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
      axios.post("/function", obj).then((res) => {
        resolve();
        const token = res.headers.token; //拿到请求头的token
        window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
        //提示用户添加情况
        alert(res.data.message + " 状态码为：" + res.status);
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
      axios.delete("/function/" + id).then((res) => {
        resolve();
        const token = res.headers.token; //拿到请求头的token
        window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
        console.log(res);
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
      axios.get("/function").then((res) => {
        // console.log(res.data.data[3].createDate);
        // const time = res.data.data[3].createDate;
        // const d = new Date(time);
        // // const times =datetime.getFullYear()+'-'+(datetime.getMonth()+1)+'-'+datetime.getDate()+'-'+datetime.getHours();
        // const times =
        //   d.getFullYear() +
        //   "年" +
        //   (d.getMonth() + 1 < 10
        //     ? "0" + (d.getMonth() + 1)
        //     : d.getMonth() + 1) +
        //   "月" +
        //   (d.getDate() < 10 ? "0" + d.getDate() : d.getDate()) +
        //   " " +
        //   (d.getHours() < 10 ? "0" + d.getDate() : d.getDate()) +
        //   ":" +
        //   (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()) +
        //   ":" +
        //   (d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds());
        // res.data.data[3].createDate = times;
        const token = res.headers.token; //拿到请求头的token
        window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
        resolve(res.data.data);
        console.log(res.data.data)
      });
      axios.interceptors.request.eject(myInterceptor);
    });
    return new Promise((resolve) => {
      resolve(100);
    });
  }
};
