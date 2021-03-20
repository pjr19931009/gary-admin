import { handleToken, layoutStorage } from "utils/storage";
import router from "src/router";
import store from "src/store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
const layout = () => import("@/views/layout");
import { resetRouter } from "@/router"
// import { Message } from "element-ui";
NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login"]; //白名单

router.beforeEach((to, from, next) => {

  NProgress.start();

  const toName = to.name || ''
  handleToken.getItem("token")
    .then(async token => {

      store.dispatch('user/setToken', token);

      const isAuthenticated = token && typeof token === "string";


      if (isAuthenticated) {
        if (toName === "Login") {

          next('/'); //已登录,返回首页
          NProgress.done();
        } else {

          const hasRoles = store.state.user.roles && store.state.user.roles.length > 0;

          // 已登录,判断权限
          if (hasRoles) {
            // 已获得权限

            next();
            NProgress.done();
          } else {
            try {
              // getInfo
              const { roles } = await store.dispatch('user/getUserInfo');

              // 根据roles获得router权限
              //.....
              const accessRoutes = await store.dispatch(
                "permission/generateRoutes",
                roles
              );

              accessRoutes.push({
                path: "*",
                redirect: "/error",
                component: layout,
                hidden: true,
              })
              resetRouter()
              router.addRoutes(accessRoutes);


              next({ ...to, replace: true })
              NProgress.done();

            } catch (err) {

              //获取权限失败 返回登陆
              await store.dispatch("user/resetInfo") //重置信息
              next("/login?prePath=" + toName);
            }
          }
        }
      } else {

        if (whiteList.indexOf(to.path) !== -1) {

          next(); //无需登录
          NProgress.done();
        } else {

          next("/login?prePath=" + toName);
          NProgress.done();
        }
      }
    })
    .catch(() => {

      // 获取token失败 返回登陆
      handleToken.removeItem("token").then(_ => {
        next("/login");
        NProgress.done();
      })
    });

  layoutStorage.getItem('sidebarCollapse').then(isCollapse => {
    isCollapse = isCollapse || false
    store.dispatch('layout/setCollapse', isCollapse);
  }).catch((err) => {
    store.dispatch('layout/setCollapse', false);
    console.log(err);
  })

});

router.afterEach(() => {
  NProgress.done();
});
