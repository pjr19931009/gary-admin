const layout = () => import('@/views/layout')
export default {
  path: "/error",
  name: "Error",
  redirect: "/error/404",
  component: layout,
  meta: { title: "Error", icon: "help", roles: ["admin", "editor"] },
  children: [
    {
      path: "401",
      name: "401",
      meta: { title: "401", roles: ["admin", "editor"] },
      component: () => import("@/views/error/401.vue")
    },
    {
      path: "404",
      name: "404",
      meta: { title: "404", roles: ["admin", "editor"] },
      component: () => import("@/views/error/404.vue")
    }
  ]
};
