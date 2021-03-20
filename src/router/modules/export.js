const layout = () => import("@/views/layout");
export default {
  path: "/export",
  name: "Export",
  redirect: "/export/excel",
  component: layout,
  meta: { title: "导出", icon: "download", roles: ["admin"] },
  children: [
    {
      path: "excel",
      name: "Excel",
      meta: { title: "导出excel", roles: ["admin"] },
      component: () => import("@/views/export")
    },
    {
      path: "zip",
      name: "Zip",
      meta: { title: "导出zip", roles: ["admin"] },
      component: () => import("@/views/export")
    },
    {
      path: "pdf",
      name: "PDF",
      meta: { title: "导出PDF", roles: ["admin"] },
      component: () => import("@/views/export")
    }
  ]
};
