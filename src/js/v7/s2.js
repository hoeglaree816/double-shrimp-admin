const axios = require("axios");
axios.header = "Content-Type: application/json";
const Url = "http://120.79.63.74:9013"
module.exports = class {
    // 表单信息
    constructor(
        id,
        prawn,
        price,
        time,
    ) {
        this.id = id || ""
        this.prawn = prawn || "";
        this.price = price || "";
        this.time = time || "";
    }

    // 验证规则
    static rules = {
        prawn: [{ required: true, message: "请输入对虾种类", trigger: "blur" }],
        price: [{ required: true, message: "请输入对虾价格", trigger: "blur" }],
        time: [
            { required: true, message: "请输入时间", trigger: "blur" },
        ],
    }

    // 分页查询
    static list(pn, ps) {
        return new Promise((resolve) => {
            axios.get(`${Url}/price/${pn}/${ps}`, {}).then((res) => {
                console.log(res.data);
                resolve(res.data)
            });
        });
    }

    // 转化为标准时间
    static time(date) {
        var date = new Date(date);
        return `${date.getFullYear()}-${date.getMonth() + 1
            }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }

    // 添加
    static add(form) {
        return new Promise((resolve) => {
            axios.post(`${Url}/price/addprice`, form)
            // axios
            //     (
            //         {
            //             url: `${Url}/price/addprice`,
            //             method: "post",
            //             headers: {
            //                 "Content-Type": "application/json"
            //             },
            //             data: form,
            //         }
            //     )
                .then((res) => {
                    console.log(res.data);
                    resolve(res.data)
                })
        })
    }

    // 获取要修改的信息
    static getInfo(id) {
        return new Promise((resolve) => {
            axios.get(`${Url}/price/${id}`).then((res) => {
                resolve(res.data)
            })
        })
    }

    // 提交修改信息
    static edit(val) {
        console.log(val);
        return new Promise((resolve) => {
            axios.put(`${Url}/price/${val.id}`, val).then((res) => {
                resolve(res.data)
            })
        })
    }

    // 单个删除
    static delete(id) {
        return new Promise((resolve) => {
            axios
                .delete(`${Url}/price/${id}`)
                .then((res) => {
                    resolve(res.data)
                });
        });
        // axios.interceptors.request.eject(myInterceptor);
    }

    // 多个删除
    static deleteAll(val) {
        console.log(val);
        return new Promise((resolve) => {
            axios
                (
                    {
                        url: `${Url}/price/deleteAll`,
                        method: "delete",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: val,
                    }
                )
                .then((res) => {
                    console.log(res.data);
                    resolve(res.data)
                })
        })
    }

    // 上传拦截
    static beforeUpload(file, This) {
        const extension = file.name.split(".")[1] === "xls";
        const extension2 = file.name.split(".")[1] === "xlsx";
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!extension && !extension2) {
            This.$message.warning("上传模板只能是 xls、xlsx格式!");
            return;
        }
        if (!isLt5M) {
            This.$message.warning("上传模板大小不能超过 5MB!");
            return;
        }
    }


}