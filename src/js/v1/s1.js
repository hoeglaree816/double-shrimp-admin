const axios = require("axios");
// const axios = require("axios").default;
axios.header = "Content-Type: application/json";
module.exports = class {
    static labels = {
        id: "基地编号",
        baseName: "基地名称",
        baseIntroduction: "基地简介",
        baseAddr: "基地地址",
        basePositionLongitude: "基地地址经度",
        basePositionLatitude: "基地地址纬度",
        createBy: "创建者",
        createDate: "创建时间",
        registNumber: "营业执照注册号",
        funds: "注册资金(万元)",
        scope: "营业范围",
        basePic: "基地图片"
    };
    constructor(
        id,
        baseName,
        baseIntroduction,
        baseAddr,
        basePositionLongitude,
        basePositionLatitude,
        createBy,
        createDate,
        registNumber,
        funds,
        scope,
        basePic
    ) {
        this.id = id || "";
        this.baseName = baseName || "";
        this.baseIntroduction = baseIntroduction || "";
        this.baseAddr = baseAddr || "";
        this.basePositionLongitude = basePositionLongitude || "";
        this.basePositionLatitude = basePositionLatitude || "";
        this.createBy = createBy || "";
        this.createDate = createDate || "";
        this.registNumber = registNumber || "";
        this.funds = funds || "";
        this.scope = scope || "";
        this.basePic = basePic || "";
    }
    static list(pn, ps) {
        return new Promise((resolve) => {
            axios.post("http://106.75.154.40:9012/traceability/base/search/" + pn + "/" + ps, {}).then((res) => {
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
                .delete('http://106.75.154.40:9012/authority/admin/base/' + id)
                .then((res) => {
                    resolve(res.data)
                });
        });
        axios.interceptors.request.eject(myInterceptor);

    }

}