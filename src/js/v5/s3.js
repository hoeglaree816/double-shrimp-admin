let axios = require('axios');
const zp_axios = axios.create({
  baseURL:"http://106.75.154.40:9012/info",
  headers:{'Content-Type': 'application/json'}
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
// zp_axios.defaults.baseURL="http://106.75.154.40:9012/info";
// zp_axios.header = "Content-Type: application/json";
module.exports = class {
  static labels = {
    id: "id",
    reply: "回复内容",
    replier: "回复者id",
    replierName: "回复者",
    postId: "帖子id",
    creationTime: "回复时间",
    images: "图片",
    experts: "身份",
    state: "状态",
  };
  constructor(
    id,
    reply,
    replier,
    replierName,
    postId,
    creationTime,
    images,
    experts,
    state
  ) {
    this.id = id;
    this.reply = reply;
    this.replier = replier;
    this.replierName = replierName;
    this.postId = postId;
    this.creationTime = creationTime;
    this.images = images;
    this.experts = experts;
    this.state = state;
  }
  static getById(id) {
    return new Promise((resolve) => {
      // axios.get('/education?id='+id)
      zp_axios
        .get(`/details/findById/${id}`)
        .then((res) => {
          if (res.data.data)
          res.data.data.creationTime = formatTime(res.data.data.creationTime)
          resolve(res.data);
        });
    });
  }
  static list(pn, ps, state) {
    let url = "";
    switch (parseInt(state)) {
      case 0:
        url = `/details/agreeing/${pn}/${ps}`;
        break;
      case 1:
        url = `/details/findAll/${pn}/${ps}`;
        break;
      case 2:
        url = `/details/failed/${pn}/${ps}`;
        break;
      case 3:
        url = `/details/findDelete/${pn}/${ps}`;
        break;
    }
    return new Promise((resolve) => {
      zp_axios.get(url).then((res) => {
        res.data.data.rows.forEach(item => item.creationTime = formatTime(item.creationTime))
        resolve(res.data);
      });
    });
  }
  static verify(id, flag) {
    return new Promise((resolve) => {
      let url = "";
      if (flag){
        url = `/details/agree/${id}`;
        zp_axios.put(url).then((res) => {
          resolve(res);
        });
      }
      else{
        url = `/details/refuse/${id}`;
        zp_axios.delete(url).then((res) => {
          resolve(res);
        });
      } 
    });
  }
  static delete(id) {
    return new Promise((resolve) => {
      axios
        .put(`http://106.75.154.40:9005/details/delete/${id}`)
        .then((res) => {
          resolve(res.data);
        });
    });
  }
};
