<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '系统首页'
                },
                {
                    icon: 'el-icon-lx-cascades',
                    index: 'webselemium',
                    title: 'web自动化',
                    subs: [
                        {
                            index: 'uiProject',
                            title: 'UI项目管理'
                        },
                        {
                            index: 'uiProjectPage',
                            title: 'UI页面管理'
                        },
                        {
                            index: 'uiProjectPageElement',
                            title: 'UI页面元素管理'
                        },
                        {
                            index: 'uiProjectTestCase',
                            title: 'UI测试用例'
                        },
                        {
                            index: 'uiProjectTask',
                            title: 'UI任务管理'
                        },
                        {
                            index: 'uiPositioning',
                            title: 'UI定位'
                        },
                        {
                            index: 'uiElementOperation',
                            title: 'UI元素操作'
                        },
                    ]

                },
                // {
                //     icon: 'el-icon-lx-cascades',
                //     index: 'appium',
                //     title: 'APP自动化',
                //     subs: [
                //         {
                //             index: 'appProject',
                //             title: 'APP项目管理'
                //         },
                //         {
                //             index: 'appProjectPage',
                //             title: 'APP页面管理'
                //         },
                //         {
                //             index: 'appProjectPageElement',
                //             title: 'APP页面元素管理'
                //         },
                //         {
                //             index: 'appProjectTestCase',
                //             title: 'APP测试用例'
                //         },
                //         {
                //             index: 'appProjectTask',
                //             title: 'APP任务管理'
                //         },
                //         {
                //             index: 'appPositioning',
                //             title: 'APP定位'
                //         },
                //         {
                //             index: 'appElementOperation',
                //             title: 'APP元素操作'
                //         },
                //     ]
                //
                // },
                {
                    icon: 'el-icon-lx-cascades',
                    index: 'api',
                    title: '接口自动化',
                    subs: [
                        {
                            index: 'apiProject',
                            title: 'API项目管理'
                        },
                        {
                            index: 'apiProjectModule',
                            title: 'API模块管理'
                        },
                        {
                            index: 'apiProjectTestCase',
                            title: 'API测试用例'
                        },
                        {
                            index: 'apiBusinessTest',
                            title: 'API业务测试'
                        },
                        {
                            index: 'apiTask',
                            title: 'API任务管理'
                        },
                        {
                            index: 'apiEnvironment',
                            title: 'API环境设置'
                        },
                        {
                            index: 'apiDatabase',
                            title: 'API数据库管理'
                        },
                    ]

                },
                                {
                    icon: 'el-icon-menu',
                    index: 'performanceTest',
                    title: '性能测试',
                    subs: [
                        {
                            index: 'performanceProject',
                            title: '性能测试项目'
                        },
                        {
                            index: 'performanceProjectScript',
                            title: '性能测试脚本'
                        },
                        // {
                        //     index: 'performanceTask',
                        //     title: '性能测试任务'
                        // },
                    ]

                },
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
