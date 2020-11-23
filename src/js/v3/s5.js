let axios = require('axios');
const zp_axios = axios.create({
  baseURL:"http://106.75.154.40:9012/education",
  headers:{'Content-Type': 'application/json'}
})

module.exports = class {
  static labels = {
    id: "类型id",
    name: "类型分类",
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
        .get("/educationTypes/" + id)
        .then((res) => {
          console.log(res.data.data)
          resolve([res.data.data]);
        });
    });
  }
  static list(pn, ps) {
    return new Promise((resolve) => {
      zp_axios
        .get("/educationTypes")
        .then((res) => {
            console.log(res.data);
          let data = res.data.data;
          data = data.filter(
            (item, index) => index >= (pn - 1) * ps && index < pn * ps
          );
          let result = [];
          for (let i = 0; i < ps; i++) {
            data[i] ? result.push(data[i]) : "";
          }
          console.log(result);
          resolve(result);
        });
    });
  }
  static update(obj,id) {
    return new Promise((resolve) => {
      zp_axios
        .put(
          "/educationTypes/update/" + id,
          obj[0]
        )
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
        .post("/educationTypes/add", obj)
        .then((res) => {
          let code = res.data.code;
          resolve({
            code,
          });
        });
    });
  }
  static delete(id) {
    return new Promise((resolve) => {
      zp_axios
        .delete("/educationTypes/delete/" + id)
        .then((res) => {
          let code = res.data.code;
          resolve({
            code,
          });
        });
    });
  }
  static count() {
    return new Promise((resolve) => {
        zp_axios.get("/educationTypes").then((res) => {
          resolve(res.data.data.length);
        });
      
    });
  }
};
