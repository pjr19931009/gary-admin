const layout = () => import("@/views/layout");
export default {
  path: "/theme",
  name: "Theme",
  redirect: "/theme/change",
  component: layout,
  meta: { title: "主题", icon: "brand", roles: ["admin"] },
  children: [
    {
      path: "change",
      name: "Change",
      meta: { title: "更换主题", roles: ["admin"] },
      component: () => import("@/views/theme")
    }
  ]
};
