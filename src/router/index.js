import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta: { title: '自述文件' },
      children: [
        {
          path: '/dashboard',
          component: resolve =>
            require(['../components/page/Dashboard.vue'], resolve),
          meta: { title: '系统首页' }
        },
        /** 活动管理*/
        {
          path: '/activity',
          component: resolve =>
            require(['../components/other/activity/Activity.vue'], resolve),
          meta: { title: '活动管理' }
        },
        /** 活动管理*/
        {
          path: '/editActivity',
          component: resolve =>
            require(['../components/other/activity/EditActivity.vue'], resolve),
          meta: { title: '活动管理' }
        },
        /** 赞助商管理*/
        {
          path: '/sponsor',
          component: resolve =>
            require(['../components/other/sponsor/Sponsor.vue'], resolve),
          meta: { title: '赞助商管理' }
        },
        /**新增赞助商 */
        {
          path: '/addsponsor',
          component: resolve =>
            require(['../components/other/sponsor/AddSponsor.vue'], resolve),
          meta: { title: '新增赞助商' }
        },

        /**编辑赞助商 */
        {
          path: '/editsponsor',
          component: resolve =>
            require(['../components/other/sponsor/EditSponsor.vue'], resolve),
          meta: { title: '编辑赞助商' }
        },

        /**赞助商详情 */
        {
          path: '/detailsponsor',
          component: resolve =>
            require(['../components/other/sponsor/DetailSponsor.vue'], resolve),
          meta: { title: '赞助商详情' }
        },

        /**赞助商类型管理 */
        {
          path: '/sponsortype',
          component: resolve =>
            require(['../components/other/sponsor/SponsorType.vue'], resolve),
          meta: { title: '赞助商类型管理' }
        },
        /**新增赞助商类型 */
        {
          path: '/addsponsortype',
          component: resolve =>
            require([
              '../components/other/sponsor/AddSponsorType.vue'
            ], resolve),
          meta: { title: '新增赞助商类型管理' }
        },

        /**编辑赞助商类型管理 */
        {
          path: '/editsponsortype',
          component: resolve =>
            require([
              '../components/other/sponsor/EditSponsorType.vue'
            ], resolve),
          meta: { title: '编辑赞助商类型管理' }
        },
        /** 奖品管理*/
        {
          path: '/prize',
          component: resolve =>
            require(['../components/other/prize/Prize.vue'], resolve),
          meta: { title: '奖品管理' }
        },
        /**新增奖品 */
        {
          path: '/addPrize',
          component: resolve =>
            require(['../components/other/prize/AddPrize.vue'], resolve),
          meta: { title: '新增奖品' }
        },
        /**编辑奖品 */
        {
          path: '/editPrize',
          component: resolve =>
            require(['../components/other/prize/EditPrize.vue'], resolve),
          meta: { title: '编辑奖品' }
        },
        /**新增活动组件 */
        {
          path: '/addActiv',
          component: resolve =>
            require(['../components/other/activity/addActiv.vue'], resolve),
          meta: { title: '添加活动' }
        },
        /**测试组件 */
        {
          path: '/test',
          component: resolve =>
            require(['../components/other/test.vue'], resolve),
          meta: { title: '测试' }
        },
        {
          // 富文本编辑器组件
          path: '/editor',
          component: resolve =>
            require(['../components/page/VueEditor.vue'], resolve),
          meta: { title: '富文本编辑器' }
        },
        {
          // markdown组件
          path: '/markdown',
          component: resolve =>
            require(['../components/page/Markdown.vue'], resolve),
          meta: { title: 'markdown编辑器' }
        },
        {
          // 图片上传组件
          path: '/upload',
          component: resolve =>
            require(['../components/page/Upload.vue'], resolve),
          meta: { title: '文件上传' }
        },
        {
          // vue-schart组件
          path: '/charts',
          component: resolve =>
            require(['../components/page/BaseCharts.vue'], resolve),
          meta: { title: 'schart图表' }
        },
        {
          // 拖拽列表组件
          path: '/drag',
          component: resolve =>
            require(['../components/page/DragList.vue'], resolve),
          meta: { title: '拖拽列表' }
        },
        {
          // 拖拽Dialog组件
          path: '/dialog',
          component: resolve =>
            require(['../components/page/DragDialog.vue'], resolve),
          meta: { title: '拖拽弹框' }
        },
        {
          // 国际化组件
          path: '/i18n',
          component: resolve =>
            require(['../components/page/I18n.vue'], resolve),
          meta: { title: '国际化' }
        },
        {
          // 权限页面
          path: '/permission',
          component: resolve =>
            require(['../components/page/Permission.vue'], resolve),
          meta: { title: '权限测试', permission: true }
        },
        {
          path: '/404',
          component: resolve =>
            require(['../components/page/404.vue'], resolve),
          meta: { title: '404' }
        },
        {
          path: '/403',
          component: resolve =>
            require(['../components/page/403.vue'], resolve),
          meta: { title: '403' }
        },
        {
          path: '/donate',
          component: resolve =>
            require(['../components/page/Donate.vue'], resolve),
          meta: { title: '支持作者' }
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
