let axios = require('axios');
const zp_axios = axios.create({
  baseURL: "http://106.75.154.40:9012/education",
})


module.exports = class {
  static labels = {
    id: "id",
    title: "标题",
    typeId: "分类",
    editor: "作者",
    source: "来源",
    invention: '发明',
    standard: '标准',
    createDate: "创建时间",
    file: "文件",
  };
  constructor(
    id,
    title,
    typeId,
    editor,
    source,
    file,
    createDate,
    invention,
    standard,
  ) {
    this.id = id || "";
    this.title = title || "";
    this.typeId = typeId || "";
    this.editor = editor || "";
    this.source = source || "";
    this.file = file || "";
    this.createDate = createDate || "";
    this.invention = invention || "";
    this.standard = standard || "";
  }

  static getById(id) {
    return new Promise((resolve) => {
      zp_axios.get("/intellectualPropertyRights/" + id).then((res) => {
        resolve([res.data.data]);
      });
    });
  }
  static list(page, size) {
    return new Promise((resolve) => {
      zp_axios.get(`/intellectualPropertyRights/findAll/${page}/${size}`).then((res) => {
        res = res.data.data;
        res.rows.forEach(item => {
          item["createDate"] = this.formatTime(item["createDate"]);
        })
        resolve(res);
      });
    });
  }
  static update(obj, id) {
    obj["createDate"] = new Date();
    return new Promise((resolve) => {
      console.log(obj);
      zp_axios
        .put("/intellectualPropertyRights/update/" + id, obj)
        .then((res) => {
          resolve(res.data.code);
        });
    });
  }
  static add(obj) {
    return new Promise((resolve) => {
      // console.log(obj);
      obj.createDate = new Date();
      zp_axios
        .post("/intellectualPropertyRights/add/", obj)
        .then((res) => {
          // console.log('res: ', res);
          resolve(res.data.code);
        }).catch(e => console.log(e));
    });
  }
  // 
  static deleteDocOrPdf(url) {
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
        .post(`/intellectualPropertyRights/delete/${id}`)
        .then((res) => {
          resolve(res.data.code);
        });
    });
  }
  static count() {
    return new Promise((resolve) => {
      zp_axios
        .get("/intellectualPropertyRights")
        .then((res) => {
          resolve(res.data.data.length);
        });
    });
  }
  // 获取全部类型，包括父类型和子类型
  static getIntellectualPropertyRightsTypes() {
    return new Promise((resolve) => {
      zp_axios
        .post("/intellectualPropertyRightsTypes/1/100")
        .then((res) => {
          resolve(res.data.data.rows);
        });
    });
  }
  // 根据level获取父类型或者子类型
    static getIntellectualPropertyRightsTypesByLevel(level) {
      return new Promise((resolve) => {
        zp_axios
          .post(`/intellectualPropertyRightsTypes/findByLevel/${level}/1/100`)
          .then((res) => {
            resolve(res.data.data.rows);
          });
      });
    }
    // 根据父类型Id获取子类型
      static getIntellectualPropertyRightsTypesByParentId(id) {
        return new Promise((resolve) => {
          zp_axios
            .post(`/intellectualPropertyRightsTypes/findSon/${id}/1/100`)
            .then((res) => {
              resolve(res.data.data.rows);
            });
        });
      }

  static getByKeyWord(value, pn, ps) {
    console.log('value: ', value);
    return new Promise((resolve) => {
      axios.get(`http://106.75.154.40:9010/rights/search/time/${pn}/${ps}?key=${value}`)
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
  //根据知识产权类型获取资讯
  static getIntellectualPropertyRightsByCategoryId(categoryId, pn, ps) {
    return new Promise((resolve) => {
      zp_axios.get('/intellectualPropertyRights/findByType/' + categoryId + '/' + pn + '/' + ps)
        .then((res) => {
          res = res.data.data;
          res.rows.forEach(item => {
            item["createDate"] = this.formatTime(item["createDate"]);

          })
          resolve(res)
        })
    })
  }
  //查找删除记录
  static findDeleteRecord(pn, ps) {
    return new Promise((resolve) => {
      zp_axios.get('/intellectualPropertyRights/findByDelete/' + pn + '/' + ps)
        .then((res) => {
          res = res.data.data;
          res.rows.forEach(item => {
            item["createDate"] = this.formatTime(item["createDate"]);
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