import Vue from "vue";
import VueRouter from "vue-router";
import index from "../views/index.vue";
// import register from "../views/register/index.vue";
import retrievePassword from "../views/retrievePassword/index.vue";
import noAccess from "../views/v6/noAccess.vue";
import store from "../store/index.js";
import personalInformation from "../views/personalInfo/personalInformation.vue";
import personalInformationChange from "../views/personalInfo/personalInformationChange.vue"
import applyBaseManager from "../views/personalInfo/applyBaseManager.vue";
import changePassword from "../views/personalInfo/changePassword.vue";
import welcome from "../views/welcome/welcome.vue";
Vue.use(VueRouter);

//动态添加权限的路由规则
const userRule = [
  { path: "s1", name: "v6s1", component: () => import(`../views/v6/s1.vue`) },
  {
    path: "s1-detail",
    name: "v6s1-detail",
    component: () => import(`../views/v6/s1-detail.vue`),
  },
  {
    path: "s1-insert",
    name: "v6s1-insert",
    component: () => import(`../views/v6/s1-insert.vue`),
  },
  {
    path: "s1-update",
    name: "v6s1-update",
    component: () => import(`../views/v6/s1-update.vue`),
  },
];
const roleRule = [
  { path: "s2", name: "v6s2", component: () => import(`../views/v6/s2.vue`) },
  {
    path: "s2-detail",
    name: "v6s2-detail",
    component: () => import(`../views/v6/s2-detail.vue`),
  },
  {
    path: "s2-insert",
    name: "v6s2-insert",
    component: () => import(`../views/v6/s2-insert.vue`),
  },
  {
    path: "s2-update",
    name: "v6s2-update",
    component: () => import(`../views/v6/s2-update.vue`),
  },
];
const functionRule = [
  { path: "s3", name: "v6s3", component: () => import(`../views/v6/s3.vue`) },
  {
    path: "s3-detail",
    name: "v6s3-detail",
    component: () => import(`../views/v6/s3-detail.vue`),
  },
  // {//暂时不需要
  //   path: "s3-insert",
  //   name: "v6s3-insert",
  //   component: () => import(`../views/v6/s3-insert.vue`),
  // },
  // {
  //   path: "s3-update",
  //   name: "v6s3-update",
  //   component: () => import(`../views/v6/s3-update.vue`),
  // },
];
const adminRule = [
  { path: "s4", name: "v6s4", component: () => import(`../views/v6/s4.vue`) },
  {
    path: "s4-detail",
    name: "v6s4-detail",
    component: () => import(`../views/v6/s4-detail.vue`),
  },
  {
    path: "s4-insert",
    name: "v6s4-insert",
    component: () => import(`../views/v6/s4-insert.vue`),
  },
  {
    path: "s4-update",
    name: "v6s4-update",
    component: () => import(`../views/v6/s4-update.vue`),
  },
];

const ruleMapping = {
  authority_user: userRule,
  authority_role: roleRule,
  authority_function: functionRule,
  authority_admin:adminRule
};

function createRoute(v, s) {
  let obj = {
    path: `/v${v}`,
    name: ``,
    component: () => import(`../views/v${v}/index.vue`),
    children: [{ path: "", redirect: "welcome" },
    {
      path: `welcome`,
      name: ``,
      component: () => import(`../views/v${v}/welcome.vue`),
    },],
  };
  for (let i = 1; i <= s; i++) {
    obj.children.push({
      path: `s${i}`,
      name: ``,
      component: () => import(`../views/v${v}/s${i}.vue`),
    });
    obj.children.push({
      path: `s${i}-detail`,
      name: ``,
      component: () => import(`../views/v${v}/s${i}-detail.vue`),
    });
    obj.children.push({
      path: `s${i}-insert`,
      name: ``,
      component: () => import(`../views/v${v}/s${i}-insert.vue`),
    });
    obj.children.push({
      path: `s${i}-update`,
      name: ``,
      component: () => import(`../views/v${v}/s${i}-update.vue`),
    });
  }
  return obj;
}

const routes = [
  {
    //登陆页面
    path: "/",
    name: "",
    component: index,
  },
  // {
  //   //注册页面
  //   path: "/register",
  //   name: "",
  //   component: register,
  // },
  {
    //找回密码页面
    path: "/retrievePassword",
    name: "",
    component: retrievePassword,
  },
  {
    //无权访问提示页面
    path: "/noAccess",
    name: "",
    component: noAccess,
  },
  {
    //v6单独注册
    path: "/v6",
    name: "",
    component: () => import("../views/v6/index.vue"),
    children: [
      { path: "", redirect: "welcome" },
      // {
      //   path: `noFunction`,
      //   name: ``,
      //   component: () => import(`../views/v6/noFunction.vue`),
      // },
      {
        path: `welcome`,
        name: ``,
        component: () => import(`../views/v6/welcome.vue`),
      },
    ],
  },
  {
    //查看申请信息页面
    path: "/applyBaseManager",
    name: "",
    component: applyBaseManager,
  },
  {
    //查看个人信息页面
    path: "/personalInformation",
    name: "",
    component: personalInformation,
  },
  {
    //修改个人信息页面
    path: "/personalInformationChange",
    name: "",
    component: personalInformationChange,
  },
  {
    //修改个人密码页面
    path: "/changePassword",
    name: "",
    component: changePassword,
  },
  {
    //欢迎管理员进入后台系统页面
    path: "/welcome",
    name: "",
    component: welcome,
  },
  createRoute(1, 2),
  createRoute(2, 2),
  createRoute(3, 4),//3.20版本->变成4
  createRoute(4, 6),
  createRoute(5, 6),//3.19版本->变成6
  // createRoute(6, 4),
  // 创建路由
  createRoute(7, 2),
  createRoute(8, 2)//政策法规
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  //导航守卫
  //1
  if (to.path === "/") {
    //如果是去往登陆页面，放行
    next();
  } else if (to.path === "/retrievePassword") {
    next();
  } else {
    //其他则判断是否登陆，若未登陆则留在(跳往)登陆页面
    const token = sessionStorage.getItem("token");
    if (!token) {
      next("/");
      alert("请登陆！"); //提示用户登陆
    } else {
      next();
    }
  }
  if (to.matched.length === 0) {
    //如果未匹配到路由
    from.name ? next({ name: from.name }) : console.log("无匹配路由");//如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
    
  } else {
    // next()
  }
});

export function initDynamicRoutes() {
  //根据权限对路由规则进行动态添加
  // console.log(router.options.routes);
  const currentRoutes = router.options.routes; //拿到路由表
  const menulist = store.state.menulist;//拿到权限表
  menulist.forEach((item) => {
    if(item.name =="authority"){
      if(!item.children.length == 0){
        for(let i=0; i<item.children.length;i++){
          const temp = ruleMapping[item.children[i].name];
          if(typeof(temp)=="undefined"){
            console.log(temp)
          }else{
            for (let i = 0; i < temp.length; i++) {
              currentRoutes[3].children.push(temp[i]);//这里的数组下标要对好routes数组的下标
            }
          }
        }
      }
    }
  });
  router.addRoutes(currentRoutes);
}

export default router;
