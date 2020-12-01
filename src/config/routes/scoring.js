/* eslint-disable no-undef */
const category = {
    path: '/scoring',
    name: 'scoring',
    hideChildrenInMenu: true,
    redirect: '/scoring/list',
    meta: { title: 'Scoring', keepAlive: true, icon: 'folder-open', permission: [ 'dashboard' ] },
      children: [
        {
            path: '/scoring/list',
            name: 'scoring-list',
            component: () => import('../../custom/Scoring'),
            meta: { title: 'Список scoring', keepAlive: true }
            // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
        },
        {
          path: '/scoring/list/new',
          name: 'new-scoring',
          component: () => import('../../custom/Scoring/Form'),
          meta: { title: 'Новая scoring', keepAlive: true }
          // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
      },
      {
        path: '/scoring/list/edit/:id',
        name: 'edit-scoring',
        component: () => import('../../custom/Scoring/Form'),
        meta: { title: 'Изменить scoring', keepAlive: true }
        // meta: { title: 'cms.settings.forms', keepAlive: true, permission: [ 'dashboard' ] }
    }
    ]
  }

export default category
