import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '自动化测试平台', requireAuth: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404', requireAuth: false }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403', requireAuth: true }
                },
                {
                    path: '/uiProject',
                    component: () => import(/* webpackChunkName: "uiProject" */ '../components/page/uiAutomation/uiProject/UiProject.vue'),
                    meta: { title: 'UI项目', requireAuth: true }
                },
                {
                    path: '/uiProjectPage',
                    component: () => import(/* webpackChunkName: "uiProjectPage" */ '../components/page/uiAutomation/uiPage/UIProjectPage.vue'),
                    meta: { title: 'UI页面管理', requireAuth: true }

                },
                {

                    path: '/uiProjectPageElement',
                    component: () => import(/* webpackChunkName: "uiProjectPageElement" */ '../components/page/uiAutomation/uiPageElement/uiProjectPageElement.vue'),
                    meta: { title: 'UI页面元素管理', requireAuth: true }


                },
                {
                    path: '/uiProjectTestCase',
                    component: () => import(/* webpackChunkName: "uiProjectTestCase" */ '../components/page/uiAutomation/uiTestCase/UiProjectTestCase.vue'),
                    meta: { title: 'UI测试用例', requireAuth: true }
                },
                {
                    path: '/uiProjectTask',
                    component: () => import(/* webpackChunkName: "uiProjectTask" */ '../components/page/uiAutomation/uiTask/UiProjectTask.vue'),
                    meta: { title: 'UI任务管理', requireAuth: true }
                },
                {
                    path: '/uiPositioning',
                    component: () => import(/* webpackChunkName: "uiPositioning" */ '../components/page/uiAutomation/uiPositioning/UiPositioning.vue'),
                    meta: { title: 'UI定位', requireAuth: true }
                },
                {
                    path: '/uiElementOperation',
                    component: () => import(/* webpackChunkName: "uiElementOperation" */ '../components/page/uiAutomation/uiElementOperation/UiElementOperation.vue'),
                    meta: { title: 'UI元素操作', requireAuth: true }
                },

                {
                    path: '/apiProject',
                    component: () => import(/* webpackChunkName: "apiProject" */ '../components/page/apiAutomation/apiProject/ApiProject.vue'),
                    meta: { title: 'Api项目', requireAuth: true }
                },
                {
                    path: '/apiProjectModule',
                    component: () => import(/* webpackChunkName: "apiProjectModule" */ '../components/page/apiAutomation/apiModule/ApiProjectModule.vue'),
                    meta: { title: 'Api模块', requireAuth: true }
                },
                {
                    path: '/apiProjectTestCase',
                    component: () => import(/* webpackChunkName: "apiProjectTestCase" */ '../components/page/apiAutomation/apiTestCase/ApiProjectTestCase.vue'),
                    meta: { title: 'Api测试用例', requireAuth: true }
                },
                {
                    path: '/apiBusinessTest',
                    component: () => import(/* webpackChunkName: "apiBusinessTest" */ '../components/page/apiAutomation/apiBusinessTest/apiProjectBusinessTest.vue'),
                    meta: { title: 'Api业务测试', requireAuth: true }
                },
                {
                    path: '/apiTask',
                    component: () => import(/* webpackChunkName: "apiTask" */ '../components/page/apiAutomation/apiTask/ApiProjectTask.vue'),
                    meta: { title: 'Api任务管理', requireAuth: true }
                },
                {
                    path: '/apiEnvironment',
                    component: () => import(/* webpackChunkName: "apiEnvironment" */ '../components/page/apiAutomation/apiEnvironment/ApiEnvironment.vue'),
                    meta: { title: 'Api环境设置', requireAuth: true }
                },

                {
                    path: '/appProject',
                    component: () => import(/* webpackChunkName: "appProject" */ '../components/page/appAutomation/appProject/AppProject.vue'),
                    meta: { title: 'App项目管理', requireAuth: true }
                },
                {
                    path: '/apiDatabase',
                    component: () => import(/* webpackChunkName: "apiDatabase" */ '../components/page/apiAutomation/apiDatabase/ApiDatabase.vue'),
                    meta: { title: 'Api数据库管理', requireAuth: true }
                },

                {
                    path: '/performanceProject',
                    component: () => import(/* webpackChunkName: "performanceProject" */ '../components/page/performanceAutomation/performanceProject/performanceProject.vue'),
                    meta: { title: '性能测试项目', requireAuth: true }
                },
                {
                    path: '/performanceProjectScript',
                    component: () => import(/* webpackChunkName: "performanceProjectScript" */ '../components/page/performanceAutomation/performanceScript/performanceProjectScript.vue'),
                    meta: { title: '性能测试脚本', requireAuth: true }
                },
                {
                    path: '/performanceTask',
                    component: () => import(/* webpackChunkName: "performanceTask" */ '../components/page/performanceAutomation/performanceTask/performanceTask.vue'),
                    meta: { title: '性能测试任务', requireAuth: true}
                },
            ]
        },
        {
            path: '/api_test_task_result',
            component: () => import(/* webpackChunkName: "ApiTaskResult" */ '../components/page/apiAutomation/apiTask/ApiTaskResult.vue'),
            name: "ApiTaskResult",
            meta:{ title: 'Api任务测试报告', requireAuth: false}
        },
        {
            path: '/performanceReportPage',
            component: () => import(/* webpackChunkName: "performanceReportPage" */ '../components/page/performanceAutomation/performanceScript/performanceReportPage.vue'),
            name: "performanceReportPage",
            meta:{ title: '性能测试报告', requireAuth: false}
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录', requireAuth: false },
            name: 'login'
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
