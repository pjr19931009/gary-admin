const layout = () => import("@/views/layout");
export default {
  path: "/home",
  name: "Home",
  redirect: "/home/dashboard",
  component: layout,
  meta: { title: "首页", icon: "home", keepTag: true },
  children: [
    {
      path: "dashboard",
      name: "Dashboard",
      meta: { title: "工作台" },
      component: () => import("@/views/home/dashboard")
    }
  ]
}
