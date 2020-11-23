let axiosInstance = require('axios')
const axios =axiosInstance.create({
    baseURL:"http://106.75.154.40:9012/info"
})
module.exports = class {
    static labels = {
        id: '类型id',
        name: '类型',
        parentId: '父级分类',
        state:'状态',
        module:'模块'
    }
    constructor(id, name, parentId,state,module) {
        this.id = id || ''
        this.name = name || ''
        this.parentId = parentId || ''
        this.state = state || ''
        this.module = module || ''
    }

    /* 查询 */
    static getAllCategory(pn,ps){
        return new Promise((resolve) => {
            axios.post('/policiesTypes/'+pn+'/'+ps)
                .then((res)=>{
                    console.log(res);
                    resolve(res)
            })
        })
    }

    /* 添加 */
    static add(obj) {
        return new Promise((resolve) => {
            axios.post('/policiesTypes/add',obj)
                .then((res) => {
                    resolve(res)
                })
        })
    }

    /* 修改 */
    static update(obj) {
        return new Promise((resolve) => {
            axios.put('/policiesTypes/update/'+obj.id,obj)
                .then((res) => {
                    resolve(res)
                })
        })
    }

    /* 根据id查询数据 */
    static getById(id) {//根据资讯类型id查询资讯类型的信息
        return new Promise((resolve) => {
            axios.get('/informationTypes/'+id)  //+
            // axios.get('add/' + id)
                .then((res) => {
                    let data = res.data.data  //+
                    // let data = res.data //-
                    let result = {
                        id: data.id,
                        name: data.name,
                        parentId: data.parentId,
                        state: data.state,
                        module: data.module
                    }
                    // resolve(result)
                    resolve([result])
                }).catch(err=>{
                    alert("未找到该信息")
                })
        })
    }
}