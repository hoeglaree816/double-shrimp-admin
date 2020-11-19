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
// zp_axios.defaults.baseURL="http://106.75.154.40:9012/info"
// zp_axios.header = "Content-Type: application/json";
module.exports = class {
  static labels = {
    id: "id",
    name: "名称",
    picture: "头像",
    userId: "用户ID",
    onlineTime: "在线时间",
    typeId: "专家类型",
    address: "地址",
    goodAt: "擅长",
    introduction: "简介",
    state: "状态",
  };
  constructor(
    id,
    name,
    picture,
    userId,
    onlineTime,
    typeId,
    address,
    goodAt,
    introduction,
    state
  ) {
    this.id = id;
    this.name = name;
    this.picture = picture;
    this.userId = userId;
    this.onlineTime = onlineTime;
    this.typeId = typeId;
    this.address = address;
    this.goodAt = goodAt;
    this.introduction = introduction;
    this.state = state;
  }
  static getById(id) {
    return new Promise((resolve) => {
      // axios.get('/education?id='+id)
      zp_axios
        .get(`/experts/findById/${id}`)
        .then((res) => {
          resolve(res.data);
        });
    });
  }
  static list(pn, ps, state) {
    let url = "";
    switch (parseInt(state)) {
      case 0:
        url = `/experts/agreeing/${pn}/${ps}`;
        break;
      case 1:
        url = `/experts/findAll/${pn}/${ps}`;
        break;
      case 2:
        url = `/experts/failed/${pn}/${ps}`;
        break;
      case 3:
        url = `/experts/findDelete/${pn}/${ps}`;
        break;
    }
    return new Promise((resolve) => {
      zp_axios.get(url).then((res) => {
        resolve(res.data);
      });
    });
  }
  static verify(id, flag) {
    return new Promise((resolve) => {
      let url = "";
      if (flag) url = `/experts/agree/${id}`;
      else url = `/experts/refuse/${id}`;
      zp_axios.put(url).then((res) => {
        resolve(res);
      });
    });
  }
  static delete(id) {
    return new Promise((resolve) => {
      zp_axios
        .delete(`/experts/delete/${id}`)
        .then((res) => {
          resolve(res);
        });
    });
  }
};
