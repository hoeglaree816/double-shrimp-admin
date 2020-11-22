let axiosInstance = require('axios')
const axios = axiosInstance.create({
    // 默认没绕过网关的路径
    baseURL: "http://106.75.154.40:9012/info"
})

// 绕过网关的路径
const Url = "http://106.75.154.40:9005"

// 关键字搜索
const keyUrl = 'http://106.75.154.40:9010'

module.exports = class {

    /* 用于添加区域表单的label */
    static labels = {
        id: 'id',
        title: '标题',
        editor: '作者',
        summary: '概要',
        typeId: '类型',
        creationTime: '创建时间',
        picture: '图片',
        content: '正文',
        clickNum: '点击量',
        recommend: '是否推荐',
        state: '状态',
        module: '模块',
    }

    /* 用于修改区域的label */
    static labelsII = {
        id: 'id',
        title: '标题',
        editor: '作者',
        summary: '概要',
        typeId: '资讯类型',
        creationTime: '创建时间',
        // picture: '图片',
        // content: '正文',
        clickNum: '点击量',
        recommend: '是否推荐',
        state: '状态',
        module: '模块',
    }

    /* 用于详情区域的label */
    static labelsIII = {
        id: 'id',
        title: '标题',
        editor: '作者',
        summary: '概要',
        typeId: '资讯类型',
        creationTime: '创建时间',
        clickNum: '点击量',
        recommend: '是否推荐',
    }

    /* 获取关键字搜索信息 */
    static getByKeyWord(value, pn, ps, module) {
        return new Promise((resolve) => {
            axios.get(`${keyUrl}/industry/search/time/${pn}/${ps}/${module}?key=${value}`)
                .then((res) => {
                    resolve(res)
                })
        })
    }

    // static list(pn, ps) { //pn=page number，是页码；ps=page size，是每页数量
    //     let result = []
    //     return new Promise((resolve) => {
    //         axios.post('/information/' + pn + '/' + ps)
    //             // axios.get('information')  //-
    //             .then((res) => {
    //                 let data = res.data.data.rows
    //                 for (let i = 0; i < res.data.data.rows.length; i++) {
    //                     result.push({
    //                         id: data[i].id,
    //                         title: data[i].title,
    //                         editor: data[i].editor,
    //                         summary: data[i].summary,
    //                         content: data[i].content,
    //                         picture: data[i].picture,
    //                         typeId: data[i].typeId,
    //                         creationTime: data[i].creationTime != null ? data[i].creationTime.slice(0, 10) : ''
    //                     })
    //                 }
    //                 resolve(result)
    //             })
    //     })
    // }

    /* 修改 */
    static putNewById(obj) {//通过资讯id修改资讯详情
        return new Promise((resolve) => {
            // 这里使用了绕过网关的接口
            axios.put(`${Url}/policies/update/` + obj.id, obj)
                .then((res) => {
                    resolve(res)
                })
        })
    }

    /* 根据id获取政策信息 */
    static getById(id) {
        return new Promise((resolve) => {
            axios.get('/information/' + id)
                .then((res) => {
                    let data = res.data.data
                    let result = {
                        id: data.id,//id
                        title: data.title,//标题
                        editor: data.editor,//作者
                        summary: data.summary,//概要
                        typeId: data.typeId,//类型
                        content: data.content,//正文
                        picture: data.picture,//图片
                        clickNum: data.clickNum,//点击量
                        recommend: data.recommend,//是否推荐
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

    /* 添加 */
    static add(obj) {//添加资讯
        return new Promise((resolve) => {
            axios.post('/policies/add', obj)
                .then((res) => {
                    resolve(res)
                })
        })
    }


    /* 图片 */
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

    static deleteImageByUrl(url) {
        let formData = new FormData();
        formData.append("delUrl", url);
        return new Promise((resolve) => {
            axios.post(`${Url}/information/deleteImg`, formData)
                .then((res) => {
                    // alert('ok')
                    resolve()
                })
                .catch(err => {
                    alert("未找到该信息")
                })
        })
    }

    // 根据类型选择获取数据
    static getInfoByTypeId(typeId, pn, ps) {
        return new Promise((resolve) => {
            axios.post(`/policies/search/searchByTypeId/${typeId}/${pn}/${ps}`)
                .then((res) => {
                    resolve(res)
                })
        })
    }

    // 获取政策类型
    static getPoliciesTypes() {
        return new Promise((resolve) => {
            axios.get('/policiesTypes').then((res) => {
                resolve(res)
            })
        })
    }

    // 删除政策法规
    static delete(id) {
        // 这里需要使用绕过网关的接口
        return new Promise((resolve) => {
            axios.delete('/information/delete/' + id)
                .then((res) => {
                    console.log(res);
                    resolve(res.code)
                })
        })
    }

    // 设置推荐
    static recommendNewById(newId) {
        console.log(newId);
        return new Promise((resolve) => {
            axios.put('/information/recommend/' + newId)
                .then((res) => {
                    resolve(res)
                })
        })
    }

    // 取消推荐
    static cancelRecommendNewById(newId) {
        console.log(newId);
        return new Promise((resolve) => {
            axios.put('/information/cancelRecommend/' + newId)
                .then((res) => {
                    resolve(res)
                })
        })
    }

    //查找删除记录
    static findDeleteRecord(pn, ps) {
        return new Promise((resolve) => {
            axios.post(`/policies/findDelete/${pn}/${ps}`)
                .then((res) => {
                    resolve(res)
                })
        })
    }

}