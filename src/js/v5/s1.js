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
// zp_axios.header="Content-Type: application/json";
module.exports = class {
  static labels = {
    id: "id",
    title: "标题",
    userName: "发布者",
    creationTime: "发布时间",
    expertsId:"专家id",
    images: "图片",
    state: "状态",
  };
  constructor(
    id,
    title,
    creationTime,
    userName,
    expertsId,
    images,
    state,
  ) {
    this.id=id || "";
    this.title=title || "";
    this.creationTime=creationTime || "";
    this.userName=userName || "";
    this.expertsId=expertsId || "";
    this.images=images || "";
    this.state=state || "";
  }
  
  static getById(id) {
    return new Promise((resolve) => {
      // axios.get('/education?id='+id)
      zp_axios
        .get(`/post/findById/${id}`)
        .then((res) => {
          if(res.data.data)
          res.data.data.creationTime = formatTime(res.data.data.creationTime)
          resolve(res.data);
        });
    });
  }
  static list(pn, ps,state) {
    let url='';
    // console.log(state);
    switch(parseInt(state)){
      case 0 : url = `/post/agreeing/${pn}/${ps}`;break;
      case 1 : url = `/post/findAll/${pn}/${ps}`;break;
      case 2 : url = `/post/failed/${pn}/${ps}`;break;
      case 3: url = `/post/findDelete/${pn}/${ps}`;
      break;
    }
    return new Promise((resolve) => {
      zp_axios.get(url).then((res) => {
        res = res.data;
        if(res.code == 20000){
          res.data.rows.forEach(item => item.creationTime = formatTime(item.creationTime))
        }
        resolve(res);
      });
    });
  }
  static verify(id,flag) {
    return new Promise((resolve) => {
      let url='';
      if(flag)url = `/post/agree/${id}`;
      else url = `/post/refuse/${id}`;
      zp_axios.put(url).then((res) => {
        resolve(res);
      });
    });
  }
  static delete(id) {
    return new Promise((resolve) => {
      zp_axios
        .delete(`/post/delete/${id}`)
        .then((res) => {
          resolve(res)
        });
    });
  }
  static getByKeyWord(value, pn, ps) {
    console.log('value: ', value);
    return new Promise((resolve) => {
      axios.get(`http://106.75.154.40:9010/post/search/time/${pn}/${ps}?key=${value}`)
        .then((res) => {
          // console.log('res: ', res);
          res = res.data.data;
          res.rows.forEach(item => {
            item["createDate"] = formatTime(item["createDate"]);
          })
          resolve(res)
        })
        .catch(err => {
          console.log(err)
          // this.$message.error("未找到该信息")
        })
    })
  }
};
