const layout = () => import("@/views/layout");
export default {
  path: "/transition",
  name: "Transition",
  redirect: "/transition/index",
  component: layout,
  meta: { title: "过渡", icon: "loading", roles: ["admin"] },
  children: [
    {
      path: "index",
      name: "Transition-Page",
      meta: { title: "过渡", roles: ["admin"] },
      component: () => import("@/views/transition")
    }
  ]
};
