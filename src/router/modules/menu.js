const layout = () => import('@/views/layout')
const menuLayout = () => import('@/views/menu/layout')

export default {
  path: '/menu',
  name: 'Menu',
  redirect: '/menu/menu-1',
  component: layout,
  meta: { title: '菜单', icon: 'order', roles: ["admin","editor"] },
  children: [
    {
      path: 'menu-1',
      name: 'Menu-1',
      meta: { title: '菜单-1', roles: ["admin","editor"]},
      component: () => import('@/views/menu/menu-1/Index.vue'),
    },
    {
      path: 'menu-2',
      name: 'Menu-2',
      meta: { title: '菜单-2', roles: ["admin"]},
      redirect: '/menu/menu-2/menu-2-1',
      component: menuLayout,
      children: [
        {
          path: 'menu-2-1',
          name: 'Menu-2-1',
          meta: { title: '菜单-2-1', roles: ["admin"]},
          component: () => import('@/views/menu/menu-2/menu-2-1/Index.vue'),
        },
        {
          path: 'menu-2-2',
          name: 'Menu-2-2',
          meta: { title: '菜单-2-2', roles: ["admin"]},
          redirect: '/menu/menu-2/menu-2-2/menu-2-2-1',
          component: menuLayout,
          children: [
            {
              path: 'menu-2-2-1',
              name: 'Menu-2-2-1',
              meta: { title: '菜单-2-2-1', roles: ["admin"]},
              component: () => import('@/views/menu/menu-2/menu-2-2/menu-2-2-1/Index.vue'),
            },
            {
              path: 'menu-2-2-2',
              name: 'Menu-2-2-2',
              meta: { title: '菜单-2-2-2', roles: ["admin"]},
              component: () => import('@/views/menu/menu-2/menu-2-2/menu-2-2-2/Index.vue'),
            }
          ]
        }
      ]
    }
  ]
}
