/* 静态页面路由 */
const staticRouter = [
  {
    path: '/',
    redirect: '/index'
  }, 
  {
    path: '/',
    menu: true,
    name: 'layout',
    component: () => import('@/views/layout/TheLayout'),
    children: [
      {
        path: '/index',
        name: 'index',
        title: 'menu.home',
        icon: 'el-icon-s-home',
        component: () => import('@/views/pages/PageHome'),
      },
      
      // {
      //   // path: '/autoqa',
      //   // name: 'autoqa',
      //   // title: 'menu.list',
      //   // icon: 'el-icon-tickets',
      //   // component: () => import('@/views/layout/TheLayoutEmpty'),
      //   // children: [
      //   //   {
      //       path: '/table',
      //       name: 'table',
      //       title: 'menu.people',
      //       icon: 'el-icon-tickets',
      //       component: () => import('@/views/pages/forms/SearchTab')
      //     // }, 
      //   // ],
      // },
      // {
      //   path: '/formsBase',
      //   name: 'formsBase',
      //   title: 'menu.autoqa',
      //   icon: 'el-icon-search',
      //   component: () => import('@/views/pages/forms/PageFormsBase')
      // }, 
      // {
      //   path: '/about',
      //   name: 'about',
      //   title: 'menu.about',
      //   icon: 'el-icon-star-off',
      //   component: () => import('@/views/pages/PageAbout')
      // }
    ]
  }, {
    path: '/error/403',
    name: 'error403',
    component: () => import('@/views/error/AppError403')
  }, {
    path: '/error/500',
    name: 'error500',
    component: () => import('@/views/error/AppError500')
  }, {
    path: '*',
    name: 'error404',
    component: () => import('@/views/error/AppError404')
  }
]

export default staticRouter
