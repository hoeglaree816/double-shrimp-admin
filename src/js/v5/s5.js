let axiosInstance = require('axios')
const wzp_axios = axiosInstance.create({
    baseURL: "http://106.75.154.40:9012/info"
})
function formatTime(date) {
    //date是传入的时间
    const d = new Date(date);
    const month =
        d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
    const day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
    const hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
    const min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    const sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
    const times =
        d.getFullYear() +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        min +
        ":" +
        sec;
    return times;
}
module.exports = class {
    static labels = {
        id: 'id',
        title: '标题',
        editor: '作者',
        summary: '概要',
        content: '正文',
        picture: '图片',
        typeId: '文章类型id',
        creationTime: '创建时间',
        state: '审核状态',
        module: '模块',
        clickNum: '点击量',
        recommend: '推荐',
    }
    constructor(id, title, editor, summary, typeId, creationTime, picture, state, content, module, clickNum, recommend) {
        this.id = id || ''
        this.title = title || ''
        this.editor = editor || ''
        this.summary = summary || ''
        this.content = content || ''
        this.picture = picture || ''
        this.typeId = typeId || ''
        this.creationTime = creationTime || ''
        this.state = state || ''
        this.module = module || ''
        this.clickNum = clickNum || ''
        this.recommend = recommend || ''
    }
    // static getByKeyWord(value, pn, ps) {
    //     return new Promise((resolve) => {
    //         wzp_axios.get(`/industry/search/${pn}/${ps}?key=${value}`)
    //             .then((res) => {
    //                 console.log('getByKeyWord res: ', res);

    //                 resolve(res)
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //                 alert("未找到该信息")
    //             })
    //     })
    // }
    static getById(id) {
        return new Promise((resolve) => {
            wzp_axios.get(`/diseaseArticles/${id}`)
                .then((res) => {
                    res = res.data;
                    console.log('getById res: ', res);
                    if (res.code == 20000) {
                        res = res.data;
                        res.creationTime = formatTime(res.creationTime);
                        resolve([res])
                    }
                })
                .catch(err => {
                    alert("未找到该信息")
                })
        })
    }
    static list(pn, ps, state) { //pn=page number，是页码；ps=page size，是每页数量
        let url = "";
        let type = "get";
        switch (parseInt(state)) {
            case 2:
                url = `/diseaseArticles/agreeing/${pn}/${ps}`;
                break;
            case 1:
                url = `/diseaseArticles/${pn}/${ps}`;
                type = 'post';
                break;
            case 3:
                url = `/diseaseArticles/failed/${pn}/${ps}`;
                break;
            case 4:
                url = `/diseaseArticles/findDelete/${pn}/${ps}`;
                break;
        }
        return new Promise((resolve) => {
            wzp_axios({
                    url,
                    method: type
                })
                .then((res) => {
                    res = res.data;
                    // console.log('list res: ', res);
                    if (res.code == 20000) {
                        res = res.data;
                        res.rows.forEach(item => item.creationTime = formatTime(item.creationTime))
                        resolve(res);
                    }
                })
        })
    }
    static verify(id, flag) {
        console.log('flag: ', flag);
        console.log('id: ', id);
        return new Promise((resolve) => {
            let url = "";
            if (flag) url = `/diseaseArticles/agree/${id}`;
            else url = `/diseaseArticles/refuse/${id}`;
            wzp_axios.put(url).then((res) => {
                res = res.data;
                // console.log('verify res: ', res);

                resolve(res);
            });
        });
    }
    static update(obj) {
        return new Promise((resolve) => {
            axiosInstance.put(`http://106.75.154.40:9005/diseaseArticles/update/${obj.id}`, obj)
                .then((res) => {
                    res = res.data;
                    // console.log('update res: ', res);
                    resolve(res.code)
                })
        })



    }
    static add(obj) {
        return new Promise((resolve) => {
            wzp_axios.post(`/diseaseArticles/add`, obj)
                .then((res) => {
                    res = res.data;
                    // console.log('add res: ', res);
                    resolve(res.code)
                })
        })
    }
    static delete(id) {
        return new Promise((resolve) => {
            wzp_axios.delete(`/diseaseArticles/delete/${id}`)
                .then((res) => {
                    res = res.data;
                    // console.log('res: ', res);
                    resolve(res.code)
                })
        })
    }
    static count() {
        return new Promise((resolve) => {
            wzp_axios.post(`/diseaseArticles/1/1`)
                .then((res) => {
                    res = res.data;
                    // console.log('res: ', res);
                    if(res.code == 20000){
                        res = res.data;
                        resolve(res.total);
                    }
                })
        })
    }
    static typeIdList() {
        return new Promise((resolve) => {
            wzp_axios.get(`/diseaseArticlesTypes`)
                .then((res) => {
                    res = res.data;
                    // console.log('res: ', res);
                    if (res.code == 20000) {
                        res = res.data;
                        resolve(res)
                    }
                })
        })
    }
    static modifyRecommend(id, flag) {
        let url = ''
        if (flag) {
            url = `/information/recommend/${id}`
        } else {
            url = `/information/cancelRecommend/${id}`
        }
        return new Promise(resolve => {
            wzp_axios.put(url).then(res => {
                res = res.data;
                resolve(res);
            })
        })
    }


}