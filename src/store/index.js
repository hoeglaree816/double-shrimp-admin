import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // menulist:[]//这样子在浏览器刷新之后，menulist重新赋值为空数组
    menulist: JSON.parse(sessionStorage.getItem("menulist") || "[]"), //刷新之后可以在sessionStorage中拿
    userRole: sessionStorage.getItem("userRole") || "", //同上
    userName: sessionStorage.getItem("userName") || "", //同上
    userLoginId: sessionStorage.getItem("userLoginId") || "", //同上
    // fun: JSON.parse(sessionStorage.getItem("fun") || "[]"), //同上
    userId:sessionStorage.getItem("userId")||"",//同上
    baseId:sessionStorage.getItem("baseId")||"",//同上
    baseIdentity:sessionStorage.getItem("baseIdentity")||"",//同上
    photo:sessionStorage.getItem("photo")||"",//同上
  },
  mutations: {
    setMenulist(state, data) {//权限菜单
      state.menulist = data;
      sessionStorage.setItem("menulist", JSON.stringify(data)); //将数据放在sessionStorage中，使得刷新不会丢失
    },
    setUserRole(state, data) {//用户角色
      state.userRole = data;
      sessionStorage.setItem("userRole", data); //同上
    },
    setUserName(state, data) {//用户名
      state.userName = data;
      sessionStorage.setItem("userName", data); //同上
    },
    setUserLoginId(state, data) {//用户登陆Id
      state.userLoginId = data;
      sessionStorage.setItem("userLoginId", data); //同上
    },
    // setFun(state, data) {
    //   state.fun = data;
    //   sessionStorage.setItem("fun",JSON.stringify(data))
    // },
    setUserId(state,data){//用户Id
      state.userId =data;
      sessionStorage.setItem("userId",data);//同上
    },
    setBaseId(state,data){//用户基地Id
      state.baseId =data;
      sessionStorage.setItem("baseId",data);//同上
    },
    setBaseIdentity(state,data){//用户基地身份
      state.baseIdentity =data;
      sessionStorage.setItem("baseIdentity",data);//同上
    },
    setPhoto(state,data){//用户头像
      state.photo =data;
      sessionStorage.setItem("photo",data);//同上
    }
  },
  actions: {},
  modules: {},
});
