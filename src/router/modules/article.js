const layout = () => import('@/views/layout')
export default {
  path: '/article',
  name: 'Article',
  redirect: '/article/list',
  component: layout,
  meta: { title: '文章管理', icon: 'writing' },
  children: [
    {
      path: 'list',
      name: 'List',
      meta: { title: '文章列表' },
      component: () => import('@/views/article/list/Index.vue'),
    },
    {
      path: 'category',
      name: 'Category',
      meta: { title: '文章分类' },
      component: () => import('@/views/article/category/Index.vue'),
    },
    {
      path: 'publish',
      name: 'Publish',
      meta: { title: '文章发布' },
      component: () => import('@/views/article/publish/Index.vue'),
    }
  ]
}
