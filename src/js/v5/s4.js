let axios = require('axios');
const axios_ = axios.create({
  baseURL:"http://106.75.154.40:9012/info",
  headers:{'Content-Type': 'application/json'}
})
module.exports = class {
  static labels = {
    id: "类型id",
    name: "分类",
    // parentId: "父级分类",
  };

  static typeInfo = ['expertsType','diseaseArticlesTypes']

  /* 用于根据id查数据 */
  static typeById = ['expertsType/findById', 'informationTypes']

  constructor(id, name) {
    this.id = id || "";
    this.name = name || "";
    // this.parentId = parentId || "";
  }

  /* 根据id查数据 */
  static getById(id, type) {
    return new Promise((resolve) => {
      axios_
        .get(`/${this.typeById[type]}/` + id)
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

};
