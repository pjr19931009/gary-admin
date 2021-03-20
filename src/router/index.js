import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const layout = () => import("@/views/layout");

const routeFiles = require.context("./modules", true, /\.js$/);
let routeModules = [];
for (const file of routeFiles.keys()) {
  const value = routeFiles(file).default || null;
  if (value) routeModules.push(value);
}

const asyncSort = ["Permission", "Theme", "Menu", "Table", "Export", "Transition", "Error"];

const constantSort = ["Home", "Article", "Link"];



function sortRouter(arr) {
  let router = arr.map(item => {
    let res = null;
    routeModules.forEach(obj => {
      if (obj.name === item) {
        res = obj;
      }
    });
    return res;
  });
  return router
}

export const asyncRoutes = sortRouter(asyncSort)
export const constantRoutes = sortRouter(constantSort);






export const Routes = [
  {
    path: "/login",
    name: "Login",
    hidden: true,
    component: () => import("@/views/login/Index.vue")
  },
  {
    path: "/",
    name: "Root",
    redirect: "/home",
    hidden: true
  },
  ...constantRoutes,
];

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: Routes
})

const router = createRouter()


export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router;
