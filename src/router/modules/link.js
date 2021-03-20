const layout = () => import('@/views/layout')
export default {
  path: '/link',
  name: 'Link',
  component: layout,
  meta: { title: '链接', icon: 'link' },
  children: [
    {
      path: 'https://element.eleme.cn/#/zh-CN',
      name:'ElementUI',
      meta: { title: 'element-ui', },

    },
    {
      path: 'https://www.baidu.com/',
      name:'Baidu',
      meta: { title: '百度', },
    },
  ]
}
