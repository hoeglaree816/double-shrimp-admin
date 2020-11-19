let axios = require('axios');
const zp_axios = axios.create({
  baseURL:"http://106.75.154.40:9012/info",
  headers:{'Content-Type': 'application/json'}
})
// zp_axios.defaults.baseURL="http://106.75.154.40:9012/info";
// zp_axios.header = "Content-Type: application/json";
module.exports = class {
  static labels = {
    id: "类型id",
    name: "文章分类",
    // parentId: "父级分类",
  };
  constructor(id, name) {
    this.id = id || "";
    this.name = name || "";
    // this.parentId = parentId || "";
  }
  static getById(id) {
    return new Promise((resolve) => {
      zp_axios
        .get("/informationTypes/" + id)
        .then((res) => {
          resolve([res.data.data]);
        });
    });
  }
  static list(pn, ps) {
    return new Promise((resolve) => {
      zp_axios.post(`/diseaseArticlesTypes/${pn}/${ps}`).then((res) => {
        res=res.data.data
        resolve(res.rows);
      });
    });
  }
  static update(obj, id) {
    return new Promise((resolve) => {
      zp_axios
        .put("/diseaseArticlesTypes/update/" + id, obj[0])
        .then((res) => {
          let code = res.data.code;
          resolve({
            code,
          });
        });
    });
  }
  
  static add(obj) {
    return new Promise((resolve) => {
      console.log(obj);
      zp_axios
        .post("/diseaseArticlesTypes/add", obj)
        .then((res) => {
          let code = res.data.code;
          resolve({
            code,
          });
        });
    });
  }
  // static delete(id) {
  //   return new Promise((resolve) => {
  //     zp_axios
  //       .delete("/diseaseArticlesTypes/delete/" + id)
  //       .then((res) => {
  //         let code = res.data.code;
  //         resolve({
  //           code,
  //         });
  //       });
  //   });
  // }
  static count() {
    return new Promise((resolve) => {
      zp_axios.get("/diseaseArticlesTypes").then((res) => {
        resolve(res.data.data.length);
      });
    });
  }
};
