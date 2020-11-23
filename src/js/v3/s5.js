let axios = require('axios');
const axios_ = axios.create({
  baseURL: "http://106.75.154.40:9012/education",
  headers: { 'Content-Type': 'application/json' }
})
module.exports = class {
  static labels = {
    id: "类型id",
    name: "分类",
    parentId: "父级分类",
    typeName: '',
  };

  static typeInfo = ['manuscriptsTypes', 'technicalArticlesTypes', 'educationTypes', 'intellectualPropertyRightsTypes']

  constructor(id, name) {
    this.id = id || "";
    this.name = name || "";
    // this.parentId = parentId || "";
  }

  /* 根据id查数据 */
  static getById(id, type) {
    return new Promise((resolve) => {
      axios_
        .get(`/fileTypes/` + id)
        .then((res) => {
          resolve([res.data.data]);
        });
    });
  }

  /* 获取表单数据 */
  static list(pn, ps, type) {
    return new Promise((resolve) => {
      axios_.post(`/${this.typeInfo[type]}/${pn}/${ps}`).then((res) => {
        resolve(res);
      });
    });
  }

  /* 修改 */
  static update(obj, id, type) {
    return new Promise((resolve) => {
      axios_
        .put(`/${this.typeInfo[type]}/update/` + id, obj[0])
        .then((res) => {
          let code = res.data.code;
          resolve({
            code,
          });
        });
    });
  }

  /* 添加 */
  static add(obj, type) {
    return new Promise((resolve) => {
      console.log(obj);
      axios_
        .post(`/${this.typeInfo[type]}/add`, obj)
        .then((res) => {
          let code = res.data.code;
          resolve({
            code,
          });
        });
    });
  }

  /* 获取 */
  static getType(type) {
    switch (type) {
      case '0':
        this.typeName = "远程教育";
        break;
      case '1':
        this.typeName = "渔技文章";
        break;
      case '2':
        this.typeName = "演示文稿";
        break;
      case '3':
        this.typeName = "知识产权";
        break;
    }
  }
  // 根据level获取父类型或者子类型
  static getIntellectualPropertyRightsTypesByLevel(level) {
    return new Promise((resolve) => {
      axios_
        .post(`/intellectualPropertyRightsTypes/findByLevel/${level}/1/100`)
        .then((res) => {
          resolve(res.data.data.rows);
        });
    });
  }
  // 根据父类型Id获取子类型
  static getIntellectualPropertyRightsTypesByParentId(id) {
    return new Promise((resolve) => {
      axios_
        .post(`/intellectualPropertyRightsTypes/findSon/${id}/1/100`)
        .then((res) => {
          resolve(res.data.data.rows);
        });
    });
  }

};
