const axios = require("axios");
axios.header = "Content-Type: application/json";
module.exports = class {
    static list(id) {
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
        return new Promise((resolve) => {
            axios.get("http://106.75.154.40:9012/authority/admin/user/" + id).then((res) => {
                resolve(res.data)
            });
        });
    }
    static delete(id) {
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
        return new Promise((resolve) => {
            axios
                .delete('http://106.75.154.40:9012/authority/admin/removeBase/' + id)
                .then((res) => {
                    resolve(res.data)
                });
        });
        axios.interceptors.request.eject(myInterceptor);

    }

}