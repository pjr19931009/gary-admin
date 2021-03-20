const layout = () => import("@/views/layout");
export default {
  path: "/table",
  name: "Table",
  redirect: "/table/index",
  component: layout,
  meta: { title: "表格", icon: "form", roles: ["admin"] },
  children: [
    {
      path: "index",
      name: "TablePage",
      meta: { title: "Table", roles: ["admin"] },
      component: () => import("@/views/table")
    }
  ]
};
