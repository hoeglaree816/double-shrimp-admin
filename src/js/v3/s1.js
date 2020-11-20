let axios = require('axios');
const zp_axios = axios.create({
  baseURL: "http://106.75.154.40:9012/education",
  headers: {
    'Content-Type': 'application/json'
  }
})


module.exports = class {
  static labels = {
    id: "id",
    title: "标题",
    typeId: "分类",
    brief: "简介",
    // detail: "详情",
    createBy: "创建者",
    createDate: "创建时间",
    updateBy: "更新者",
    updateDate: "更新时间",
    pic: "封面",
    contentUrl: "视频",
  };
  constructor(
    id,
    title,
    typeId,
    brief,
    pic,
    detail,
    videoUrl,
    createBy,
    createDate,
    updateBy,
    updateDate,
  ) {
    this.id = id || "";
    this.title = title || "";
    this.typeId = typeId || "";
    this.brief = brief || "";
    this.detail = detail || "";
    this.createBy = createBy || "";
    this.createDate = createDate || "";
    this.updateBy = updateBy || "";
    this.updateDate = updateDate || "";
    this.pic = pic || "";
    this.videoUrl = videoUrl || "";
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
        resolve(res.data.data);
      });
    });
  }
  static update(obj, id) {
    return new Promise((resolve) => {
      obj[0].createDate = new Date(obj[0].createDate);
      obj[0].updateDate = new Date();
      console.log(obj[0]);
      zp_axios
        .put("/education/update/" + id, obj[0])
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
  static count() {
    return new Promise((resolve) => {
      zp_axios
        .get("/education")
        .then((res) => {
          resolve(res.data.data.length);
        });
    });
  }
  static getEduTypes(){
    return new Promise((resolve) => {
      zp_axios
        .get("/educationTypes")
        .then((res) => {
          resolve(res.data.data);
        });
    });
  }
  static formatTime (date) {
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
    console.log("times: ", times);

    return times;
  }
};