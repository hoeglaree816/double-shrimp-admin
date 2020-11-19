let axiosInstance = require('axios')
const axios =axiosInstance.create({
    baseURL:"http://106.75.154.40:9012/info"
})
// axios.defaults.baseURL = 'http://106.75.154.40:9012/info/';
// axios.defaults.baseURL = 'http://localhost:3000/';
module.exports = class {
    static labels = {
        id: '资讯类型id',
        name: '资讯类型',
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
    static list(pn, ps) {//弃用
        let result = []
        return new Promise((resolve) => {
            axios.post('/marketTypes/'+pn+'/'+ ps)//
            // axios.get('informationTypes') //-
                .then((res) => {
                    console.log(res)
                    let data = res.data.data.rows//+
                    // let data = res.data.data //-
                    // ps=data.length//-
                    for (let i = 0; i < res.data.data.rows.length; i++) {
                        result.push({
                            id: data[i].id,
                            name: data[i].name,
                            parentId: data[i].parentId,
                        })
                    }
                    resolve(result)
                })
        })
    }
    static count() {//弃用
        return new Promise((resolve) => {
            // axios.get('/informationTypes/search/1/1')//+
            axios.post('/marketTypes/1/1') //-
                .then((res) => {
                    let total = res.data.data.total
                    resolve(total)
                })
        })
    }
    // 修改后
    static getAllCategory(pn,ps){//分页获取资讯类型
        return new Promise((resolve) => {
            axios.post('/shrimpIndustryTypes/'+pn+'/'+ps)
                .then((res)=>{
                    resolve(res)
            })
        })
    }
    static add(obj) {//添加资讯类型
        return new Promise((resolve) => {
            axios.post('/shrimpIndustryTypes/add',obj)
            // axios.post('add', obj)
                .then((res) => {
                    resolve(res)
                })
        })
    }
    static delete(id) {//删除资讯类型 ---暂不使用
        return new Promise((resolve) => {
            axios.delete('/informationTypes/delete/'+id)  //+
            // axios.delete('add/' + id)  //-
                .then((res) => {
                    resolve(res.code)
                })
        })
    }
    static update(obj) {//更新修改资讯类型
        return new Promise((resolve) => {
            axios.put('/shrimpIndustryTypes/update/'+obj.id,obj)
            // axios.post('updatePut', obj)
                .then((res) => {
                    resolve(res)
                })
        })
    }
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