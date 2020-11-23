let axiosInstance = require('axios')
const axios =axiosInstance.create({
    baseURL:"http://106.75.154.40:9012/info"
})
module.exports = class {
    static labels = {
        id: 'id',
        title: '标题',
        editor: '作者',
        summary: '概要',
        typeId: '资讯类型',
        creationTime: '创建时间',
        picture: '图片',
        content: '正文',
        clickNum:'点击量',
        recommend:'是否推荐',
        state:'状态',
        module:'模块',
    }
    static labelsII = {
        id: 'id',
        title: '标题',
        editor: '作者',
        summary: '概要',
        typeId: '资讯类型',
        creationTime: '创建时间',
        // picture: '图片',
        // content: '正文',
        clickNum:'点击量',
        recommend:'是否推荐',
        state:'状态',
        module:'模块',
    }
    static labelsIII = {
        id: 'id',
        title: '标题',
        editor: '作者',
        summary: '概要',
        typeId: '资讯类型',
        creationTime: '创建时间',
        // picture: '图片',
        // content: '正文',
        clickNum:'点击量',
        recommend:'是否推荐',
        // state:'状态',
        // module:'模块',
    }
    constructor(id, title, editor, summary, typeId, creationTime, content, picture,clickNum,recommend,state,module) {
        this.id = id || ''
        this.title = title || ''
        this.editor = editor || ''
        this.summary = summary || ''
        this.typeId = typeId || ''
        this.creationTime = creationTime || ''
        this.content = content || ''
        this.picture = picture || ''
        this.clickNum = clickNum || ''
        this.recommend = recommend || ''
        this.state = state || ''
        this.module = module || ''
    }
    static getByKeyWord(value, pn, ps) {
        return new Promise((resolve) => {
            axios.get(`http://120.78.14.141:9007/industry/search/${pn}/${ps}?key=${value}`)
                .then((res) => {
                    console.log('res: ', res);
                    resolve(res)
                })
                .catch(err => {
                    console.log(err)
                    alert("未找到该信息")
                })
        })
    }
    static list(pn, ps) { //pn=page number，是页码；ps=page size，是每页数量
        let result = []
        return new Promise((resolve) => {
            axios.post('/information/' + pn + '/' + ps)
                // axios.get('information')  //-
                .then((res) => {
                    let data = res.data.data.rows
                    for (let i = 0; i < res.data.data.rows.length; i++) {
                        result.push({
                            id: data[i].id,
                            title: data[i].title,
                            editor: data[i].editor,
                            summary: data[i].summary,
                            content: data[i].content,
                            picture: data[i].picture,
                            typeId: data[i].typeId,
                            creationTime: data[i].creationTime != null ? data[i].creationTime.slice(0, 10) : ''
                        })
                    }
                    resolve(result)
                })
        })
    }
    static update(obj) {//弃用
        return new Promise((resolve) => {
            axios.put('/information/update/' + obj.id, obj)
                // axios.post('updatePut', obj)
                .then((res) => {
                    resolve(res.code)
                })
        })
    }
    static count() {//弃用
        return new Promise((resolve) => {
            axios.post('/information/1/1') //+
                // axios.get('information') //-
                .then((res) => {
                    let total = res.data.data.total
                    resolve(total)
                })
        })
    }
    static typeIdList() {//弃用
        return new Promise((resolve) => {
            axios.get('/informationTypes') //
                .then((res) => {
                    let result = res.data.data
                    resolve(result)
                })
        })
    }
    static getImageUrL(content) {
        let arrUrl = []
        let reg = /(jpg|png|jpeg|gif)/gi
        let arr = content.split('<img src="')
        arr = arr.map((item) => {
            return item.split('">');
        });
        arr.forEach((e) => {
            e.forEach((item) => {
            if (reg.test(item)) {
                arrUrl.push(item)
            }
            });
        });
        arrUrl = new Set(arrUrl)
        arrUrl = [...arrUrl]
        return arrUrl
    }
    static deleteImageByUrl(url){
        let formData = new FormData();
        formData.append("delUrl", url);
        return new Promise((resolve) => {
            axios.post('http://106.75.154.40:9005/information/deleteImg',formData)
                .then((res) => {
                    // alert('ok')
                    resolve()
                })
                .catch(err => {
                    alert("未找到该信息")
                })
        })
    }
    // 以下方法为合并版本3-1.6 新增/修改
    static getCategoryId(){//获取资讯类型（id）
        return new Promise((resolve) => {
            axios.get('/shrimpIndustryTypes')
                .then((res) => {
                    resolve(res)
                })
        })
    }
    static getCategoryById(id){//通过id获取资讯类型信息
        return new Promise((resolve) => {
            axios.get('/informationTypes/'+id)
                .then((res) => {
                    resolve(res)
                })
        })
    }
    static getNewByCategoryId(categoryId,pn,ps){//根据资讯类型获取资讯
        return new Promise((resolve) => {
            axios.post('/shrimpIndustry/search/searchByTypeId/'+categoryId+'/'+pn+'/'+ps)
                .then((res) => {
                    resolve(res)
                })
        })
    }
    static putNewById(obj){//通过资讯id修改资讯详情
        return new Promise((resolve)=>{
            // 这里使用了绕过网关的接口
            axios.put('http://106.75.154.40:9005/shrimpIndustry/update/'+obj.id,obj)
                .then((res)=>{
                    resolve(res)
                    
                })
        })
    }
    static recommendNewById(newId){//管理员设置资讯为推荐
        return new Promise((resolve)=>{
            axios.put('http://106.75.154.40:9012/info/information/recommend/'+newId)
                .then((res)=>{
                    resolve(res)
                })
        })
    }
    static cancelRecommendNewById(newId){//管理员取消推荐资讯
        return new Promise((resolve)=>{
            axios.put('http://106.75.154.40:9012/info/information/cancelRecommend/'+newId)
                .then((res)=>{
                    resolve(res)
                })
        })
    }
    static add(obj) {//添加资讯
        return new Promise((resolve) => {
            axios.post('/shrimpIndustry/add', obj)
                .then((res) => {
                    resolve(res)
                })
        })
    }
    static getById(id) {//根据资讯id查询（获取）文章
        return new Promise((resolve) => {
            axios.get('/information/' + id)
                .then((res) => {
                    let data = res.data.data
                    let result = {
                        id: data.id,//id
                        title: data.title,//标题
                        editor: data.editor,//作者
                        summary: data.summary,//概要
                        typeId: data.typeId,//资讯类型
                        content: data.content,//正文
                        picture: data.picture,//图片
                        clickNum: data.clickNum,//点击量
                        recommend:data.recommend,//是否推荐
                        state: data.state,//状态
                        module: data.module,//模块
                        creationTime: data.creationTime != null ? data.creationTime.slice(0, 10) : '',
                    }
                    // resolve(result)
                    resolve([result])
                })
                .catch(err => {
                    alert("未找到该信息")
                })
        })
    }
    static delete(id) {//删除资讯
        // 这里需要使用绕过网关的接口
        return new Promise((resolve) => {
            axios.delete('http://106.75.154.40:9005/information/delete/' + id) //+
                // axios.delete('add/' + id)  //-
                .then((res) => {
                    resolve(res.code)
                })
        })
    }
    static findDeleteRecord(pn,ps){//查找删除记录
        return new Promise((resolve) => {
            axios.post('/shrimpIndustry/findDelete/'+ pn+'/'+ ps) 
                .then((res) => {
                    resolve(res)
                })
        })
    }
}