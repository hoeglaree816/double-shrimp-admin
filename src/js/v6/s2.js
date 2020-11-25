const axios = require("axios").default;
const axiosInstance = axios.create({
  // baseURL: 'http://106.75.154.40:9012/authority'
  baseURL: 'http://106.75.154.40:9003'
});
module.exports = class {
  static labels = {
    // id: "id",
    name: "角色名称",
    useable: "是否可用",
    remarks: "备注信息",
    // createDate: "创建时间",
    // createBy: "创建者",
    // updateBy: "更新者",
    // updateDate: "更新时间",
  };
  constructor(
    // id,
    name,
    useable,
    remarks,
    // createDate,
    // createBy,
    // updateBy,
    // updateDate
  ) {
    // this.id = id || "";
    this.name = name || "";
    this.useable = useable || "";
    this.remarks = remarks || "";
    // this.createDate = createDate || "";
    // this.createBy = createBy || "";
    // this.updateBy = updateBy || "";
    // this.updateDate = updateDate || "";
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
      axiosInstance.get("/role/" + id).then((res) => {
        console.log(res)
        const token = res.headers.token; //拿到请求头的token
        window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
        // resolve([res.data.data]); //规定要用数组
        resolve(res)
      });
      axiosInstance.interceptors.request.eject(myInterceptor);
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
      axiosInstance.post("/role/search/" + pn+"/" + ps,{
        data:{}
      }).then((res) => {
        resolve(res);
        const token = res.headers.token; //拿到请求头的token
        window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
      });
      axiosInstance.interceptors.request.eject(myInterceptor);
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
    console.log(obj)
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
        .put("/role/" + obj.id, obj)
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
      axiosInstance.post("/role", obj).then((res) => {
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
      axiosInstance.delete("/role/" + id).then((res) => {
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
  static count() {
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
      axiosInstance.get("/role").then((res) => {
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
      });
      axiosInstance.interceptors.request.eject(myInterceptor);
    });
    return new Promise((resolve) => {
      resolve(100);
    });
  }
  static findAllFunction() {
    //查询所有权限
    return new Promise((resolve) => {
      const myInterceptors = axiosInstance.interceptors.request.use(
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
      axiosInstance({
        method: "get",
        url: "/function",
      }).then((res) => {
        resolve(res)
        const token = res.headers.token; //拿到请求头的token
        window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
        // alert(res.data.message + " 状态码为：" + res.status);
      })
      axiosInstance.interceptors.request.eject(myInterceptors);
    });
  }
  static findFunctions(id) {
    //查询已拥有-只查三级权限
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
      axiosInstance
        .get("/function/findFunction/" + id)
        .then((res) => {
          //将res.data.data里面的全部权限id集合到functions数组中
            let functions =[];
            res.data.data.forEach((item)=>{
              // functions.push(item.id)//拿到一级权限的id
              if(!item.children.length == 0){
                for(let i =0; i<item.children.length;i++){
                  // functions.push(item.children[i].id)//拿到二级权限的id
                  if(!item.children[i].children.length == 0){
                    for(let j=0; j<item.children[i].children.length;j++){
                      functions.push(item.children[i].children[j].id)//拿到三级权限的id
                    }
                  }
                }
              }
            })
          resolve(functions)
          const token = res.headers.token; //拿到请求头的token
          window.localStorage.setItem("token", token); //把token存放在localStorage里面
          // resolve([res.data.data]); //规定要用数组
        });
        axiosInstance.interceptors.request.eject(myInterceptor);
    });

  }
  static updateFunctions(id,checkList) {
    //更新角色权限
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
        axiosInstance({
          method: "post",
          url: "/function/" + id,
          data: {
            functionIdList: checkList,
          },
        }).then((res) => {
          console.log(res)
          resolve(res)
          const token = res.headers.token; //拿到请求头的token
          window.sessionStorage.setItem("token", token); //把token存放在localStorage里面
        });
        axiosInstance.interceptors.request.eject(myInterceptor);
    });
  }
};
