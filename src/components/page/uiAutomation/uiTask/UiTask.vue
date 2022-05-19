<template>
    <div>

        <add-or-edit-ui-test-task
            :type="opsType"
            :uiTestTaskId="currentUiTestTaskId"
            :uiTestTaskData="currentUiTestTaskData"
            :projectId = "projectId"
            @saveUiTestTask="saveUiTestTask"
            @cancelSaveUiTestTask="cancelSaveUiTestTask"
            v-if="showAddOrEditUiTestTask">

        </add-or-edit-ui-test-task>

        <ui-test-task-result
            :uiTestTaskId="currentUiTestTaskId"
            :uiTestTaskData="currentUiTestTaskData"
            v-else-if="showUiTestTaskResult">
        </ui-test-task-result>

        <div v-else>
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>
                        <i class="el-icon-lx-calendar"></i> UI任务管理
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>UI项目</el-breadcrumb-item>
                    <el-breadcrumb-item>UI任务</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-row>
                <el-button @click="returnProjectList">返回</el-button>

                <el-button type="primary" @click="openAddUiTestTask" >创建UI测试任务</el-button>
                <el-button @click="getUiTestTaskFun" >刷新</el-button>
            </el-row>
            <div>
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <!--                    :default-sort = "{prop: 'date', order: 'descending'}">-->
                    <el-table-column
                        prop="id"
                        label="id"
                        sortable
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="ui_project_name"
                        label="项目"
                        sortable
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="ui_test_task_name"
                        label="任务名称"
                        sortable
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="状态"
                        sortable
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="describe"
                        label="描述"
                        sortable
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="updata_time"
                        label="更新时间"
                        width="180">
                    </el-table-column>

                    <el-table-column
                        prop="create_time"
                        label="创建时间"
                        width="180">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                @click="openEditUiTestTask(scope.row)">编辑</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="deleteUiTestTask(scope.row)">删除</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="performUiTestTask(scope.row)">执行</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="reportUiTestTask(scope.row)">查看报告</el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </div>
        </div>

    </div>
</template>

<script>
import { deleteSingleUiTestTaskRequest, getUiTestTaskRequest,postPerformUiTaskRequest} from '../../../../api/uiAutomation/uiTestTask';
import addOrEditUiTestTask from './addOrEditUiTestTask';
import UiTestTaskResult from './UiTestTaskResult';

export default {
    inject:['reload'],
    name: 'UiTask',
    props: ['type', 'uiProjectId'],

    data(){
        return{

            tableData: [],
            uiTestTaskId: "",

            showAddOrEditUiTestTask : false,

            showUiTestTaskResult: false,

            opsType: "add",

            //当前uiTestTaskId
            currentUiTestTaskId: 0,

            //当前 uitestCase数据
            currentUiTestTaskData: {},
            projectId:""





        }
    },

    methods:{

        //获取该项目下的所有UI测试任务列表
        getUiTestTaskFun() {
            getUiTestTaskRequest(this.uiProjectId).then(data => {
                console.log(data);
                if (true === data.data.success) {
                    this.tableData = data.data.data;

                } else {
                    this.$message.error("获取接口失败")
                }
            })
        },



        // 添加测试任务
        openAddUiTestTask(){
            this.opsType = 'add';
            this.currentUiTestTaskId = 0;
            this.currentUiTestTaskData = {};

            this.showAddOrEditUiTestTask = true


        },

        // 编辑测试任务
        openEditUiTestTask(data){
            this.opsType = 'edit';
            this.currentUiTestTaskId = data.id;
            this.currentUiTestTaskData = data;
            console.log(data)

            this.showAddOrEditUiTestTask = true;



        },

        //删除单个任务
        deleteUiTestTask(data){
            this.uiTestTaskId = data.id
            deleteSingleUiTestTaskRequest(this.uiTestTaskId).then(data => {
                console.log(data)
                if (true === data.data.success){
                    this.getUiTestTaskFun()
                    this.$message.success("删除测试任务成功")
                }
                else {
                    this.$message.error("删除测试任务失败")
                }
            })

        },

        //保存测试任务
        saveUiTestTask(){
            this.showAddOrEditUiTestTask = false
            this.getUiTestTaskFun()


        },

        // 取消保存测试任务
        cancelSaveUiTestTask(){
            this.showAddOrEditUiTestTask = false
            this.getUiTestTaskFun()

        },

        // 执行测试任务
        performUiTestTask(data){

            this.uiTestTaskId = data.id
            postPerformUiTaskRequest(this.uiTestTaskId).then(data => {
                console.log(data)
                if (true === data.data.success){
                    this.getUiTestTaskFun()
                    this.$message.success("执行测试任务成功")
                }
                else if(10200 === data.data.error.code.status){
                    this.$message.error("当前有任务正在执行！")

                }
                else {
                    this.$message.error("执行测试任务失败")
                }
            })
        },

        // 查看任务报告
        reportUiTestTask(data){
            this.currentUiTestTaskId = data.id;
            this.currentUiTestTaskData = data;
            console.log(data)
            this.showUiTestTaskResult = true

        },

        // 返回项目首页列表
        returnProjectList(){
            this.$parent.returnProject();
        },

        // 返回任务列表
        returnTaskList(){
            this.showUiTestTaskResult = false
            this.getUiTestTaskFun()
        },

    },
    components: {
        'add-or-edit-ui-test-task': addOrEditUiTestTask,
        'ui-test-task-result': UiTestTaskResult

    },
    created() {
        if ('enter'=== this.type){
            this.projectId = this.uiProjectId
            this.getUiTestTaskFun()

        }
    }


};
</script>

<style scoped>

</style>