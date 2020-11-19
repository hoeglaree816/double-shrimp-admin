const axios = require("axios");
axios.header = "Content-Type: application/json";
const Url = "http://120.79.63.74:9013"
module.exports = class {
    // 表单信息
    constructor(
        id,
        outPut,
        area,
        measureOfConsumption,
        sumOfConsumption,
        region,
        time
    ) {
        this.id = id || ""
        this.outPut = outPut || "";
        this.area = area || "";
        this.measureOfConsumption = measureOfConsumption || "";
        this.sumOfConsumption = sumOfConsumption || "";
        this.region = region || "";
        this.time = time || "";
    }

    // 城市名选项
    static city = [
        { value: "上海" },
        { value: "云南" },
        { value: "内蒙古" },
        { value: "北京" },
        { value: "台湾" },
        { value: "吉林" },
        { value: "四川" },
        { value: "天津" },
        { value: "宁夏" },
        { value: "安徽" },
        { value: "山东" },
        { value: "山西" },
        { value: "广东" },
        { value: "广西" },
        { value: "新疆" },
        { value: "江苏" },
        { value: "江西" },
        { value: "河北" },
        { value: "河南" },
        { value: "浙江" },
        { value: "海南" },
        { value: "湖北" },
        { value: "湖南" },
        { value: "澳门" },
        { value: "甘肃" },
        { value: "福建" },
        { value: "西藏" },
        { value: "贵州" },
        { value: "辽宁" },
        { value: "重庆" },
        { value: "陕西" },
        { value: "青海" },
        { value: "香港" },
        { value: "黑龙江" },
    ]

    // 验证规则
    static rules = {
        outPut: [{ required: true, message: "请输入产量", trigger: "blur" }],
        area: [{ required: true, message: "请输入养殖面积", trigger: "blur" }],
        measureOfConsumption: [
            { required: true, message: "请输入消费量", trigger: "blur" },
        ],
        sumOfConsumption: [
            { required: true, message: "请输入消费额", trigger: "blur" },
        ],
        region: [{ required: true, message: "请输入地区", trigger: "blur" }],
        time: [{ required: true, message: "请输入年份", trigger: "blur" }],
    }

    // 分页查询
    static list(pn, ps) {
        return new Promise((resolve) => {
            axios.get(`${Url}/industry/findAll/${pn}/${ps}`, {}).then((res) => {
                resolve(res.data)
            });
        });
    }

    // 添加
    static add(form) {
        return new Promise((resolve) => {
            axios.post(`${Url}/industry/add`, form).then((res) => {
                resolve(res.data)
            })
        })
    }

    // 获取要修改的信息
    static getInfo(id) {
        return new Promise((resolve) => {
            axios.get(`${Url}/industry/find/${id}`).then((res) => {
                resolve(res.data)
            })
        })
    }

    // 提交修改信息
    static edit(val) {
        console.log(val);
        return new Promise((resolve) => {
            axios.put(`${Url}/industry/${val.id}`, val).then((res) => {
                resolve(res.data)
            })
        })
    }

    // 单个删除
    static delete(id) {
        return new Promise((resolve) => {
            axios
                .delete(`${Url}/industry/delete/${id}`)
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
                        url: `${Url}/industry/deleteAll`,
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