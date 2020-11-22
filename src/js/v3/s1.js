let axios = require('axios');
const zp_axios = axios.create({
  baseURL: "http://106.75.154.40:9012/education",
})


module.exports = class {
  static labels = {
    id: "id",
    title: "标题",
    typeId: "分类",
    brief: "简介",
    pic: "封面",
    contentUrl: "视频",
    createBy: "创建者",
    createDate: "创建时间",
    updateBy: "更新者",
    updateDate: "更新时间",
    clickNum: '点击量',
    recommend: '推荐',
  };
  constructor(
    id,
    title,
    typeId,
    brief,
    pic,
    contentUrl,
    createBy,
    createDate,
    updateBy,
    updateDate,
    clickNum,
    recommend
  ) {
    this.id = id || "";
    this.title = title || "";
    this.typeId = typeId || "";
    this.brief = brief || "";
    this.pic = pic || "";
    this.contentUrl = contentUrl || "";
    this.createBy = createBy || "";
    this.createDate = createDate || "";
    this.updateBy = updateBy || "";
    this.updateDate = updateDate || "";
    this.clickNum = clickNum || "";
    this.recommend = recommend || "";
  }

  static getById(id) {
    return new Promise((resolve) => {
      zp_axios.get("/file/" + id).then((res) => {
        resolve([res.data.data]);
      });
    });
  }
  static list(page, size) {
    return new Promise((resolve) => {
      zp_axios.get(`/education/findAll/${page}/${size}`).then((res) => {
        res = res.data.data;
        res.rows.forEach(item => {
          item["createDate"] = this.formatTime(item["createDate"]);
        })
        resolve(res);
      });
    });
  }
  static update(obj, id) {
    return new Promise((resolve) => {
      obj.updateDate = new Date();
      console.log(obj);
      zp_axios
        .put("/education/update/" + id, obj)
        .then((res) => {
          resolve(res.data.code);
        });
    });
  }
  static add(obj) {
    return new Promise((resolve) => {
      // console.log(obj);
      obj.createDate = new Date();
      obj.updateDate = new Date();
      zp_axios
        .post("/education/add/", obj)
        .then((res) => {
          // console.log('res: ', res);
          resolve(res.data.code);
        }).catch(e => console.log(e));
    });
  }
  static deletePicOrVideo(url) {
    return new Promise((resolve) => {
      axios
        .delete(`http://106.75.154.40:9005/information/delPic?delUrl=${url}`)
        .then((res) => {
          resolve(res.data.code);
        });
    });
  }
  static delete(id) {
    return new Promise((resolve) => {
      zp_axios
        .post(`/file/delete/${id}`)
        .then((res) => {
          resolve(res.data.code);
        });
    });
  }
  static count() {
    return new Promise((resolve) => {
      zp_axios
        .get("/education")
        .then((res) => {
          resolve(res.data.data.length);
        });
    });
  }
  static getEduTypes() {
    return new Promise((resolve) => {
      zp_axios
        .get("/educationTypes")
        .then((res) => {
          resolve(res.data.data);
        });
    });
  }
  static recommendNewById(newId) { //管理员设置资讯为推荐
    return new Promise((resolve) => {
      zp_axios.put('/file/recommend/' + newId)
        .then((res) => {
          resolve(res)
        })
    })
  }
  static cancelRecommendNewById(newId) { //管理员取消推荐资讯
    return new Promise((resolve) => {
      zp_axios.put('/file/cancelRecommend/' + newId)
        .then((res) => {
          resolve(res)
        })
    })
  }
  static getByKeyWord(value, pn, ps) {
    console.log('value: ', value);
    return new Promise((resolve) => {
      axios.get(`http://106.75.154.40:9010/education/search/time/${pn}/${ps}/1?key=${value}`)
        .then((res) => {
          res = res.data.data;
          res.rows.forEach(item => {
            item["createDate"] = this.formatTime(item["createDate"]);
          })
          resolve(res)
        })
        .catch(err => {
          console.log(err)
          // this.$message.error("未找到该信息")
        })
    })
  }
  static getEduByCategoryId(categoryId, pn, ps) { //根据教育类型获取资讯
    return new Promise((resolve) => {
      zp_axios.get('/education/search/searchByTypeId/' + categoryId + '/' + pn + '/' + ps)
        .then((res) => {
          res = res.data.data;
          res.rows.forEach(item => {
            item["createDate"] = this.formatTime(item["createDate"]);
          })
          resolve(res)
        })
    })
  }
  static findDeleteRecord(pn, ps) { //查找删除记录
    return new Promise((resolve) => {
      zp_axios.get('/education/findByDelete/' + pn + '/' + ps)
        .then((res) => {
          res = res.data.data;
          res.rows.forEach(item => {
            item["createDate"] = this.formatTime(item["createDate"]);
            item["updateDate"] = this.formatTime(item["updateDate"]);
          })
          resolve(res)
        })
    })
  }
  static formatTime(date) {
    if (!date) return "";
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
    // console.log("times: ", times);

    return times;
  }
};