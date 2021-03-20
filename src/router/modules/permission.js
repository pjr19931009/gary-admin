const layout = () => import('@/views/layout')
export default {
  path: '/permission',
  name: 'Permission',
  redirect: '/permission/switch',
  component: layout,
  meta: { title: '权限管理', icon: 'guanliyuan', roles: ["admin", "editor"] },
  children: [
    {
      path: 'switch',
      name: 'Switch',
      meta: { title: '权限切换', roles: ["admin", "editor"] },
      component: () => import('@/views/permission/switch/Index.vue'),
    }
  ]
}
