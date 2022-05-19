<template>
    <div>
        <api-test-task-result_details
            :apiResultId = "result_id"
            v-if="showApiTestTaskResultDetails">
        </api-test-task-result_details>
        <div v-else>
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>
                        <i class="el-icon-lx-calendar"></i> API任务管理
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>API项目</el-breadcrumb-item>
                    <el-breadcrumb-item>API任务</el-breadcrumb-item>
                    <el-breadcrumb-item>API测试报告</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-row>
                <el-button @click="returnTaskList">返回</el-button>
                <el-button type="danger" @click="performApiTestTask">执行</el-button>
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
                        prop="api_test_result_name"
                        label="测试报告名称"
                        sortable
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="api_total_number"
                        label="总数"
                        sortable
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="api_successful_total_number"
                        label="成功"
                        sortable
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="api_error_total_number"
                        label="失败"
                        sortable
                        width="180">
                    </el-table-column>

                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="danger"
                                @click="detailsReport(scope.row)">查看报告</el-button>
<!--                            <el-button-->
<!--                                size="mini"-->
<!--                                type="danger"-->
<!--                                @click="checkReport(scope.row)">查看报告</el-button>-->
                            <el-button
                                size="mini"
                                type="danger"
                                @click="deleteReport(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import {getApiCaseResultRequest, deleteApiCaseResultRequest, postPerformApiTaskRequest} from '../../../../api/apiAutomation/apiTestTask';
import APITestTaskResultDetails from './APITestTaskResultDetails';
export default {
    name: 'ApiTestTaskResult',
    inject:['reload'],
    props: ['apiTestTaskData', 'apiTestTaskId'],
    data(){

        return{

            tableData: [],
            testTaskId: "",
            result_id: "",
            api_Result: "",
            showApiTestTaskResultDetails: false


        }



    },
    mounted() {
        this.getApiCaseResultFun()


    },
    methods: {
        detailsReport(data){
            const {href} = this.$router.resolve({
                path: '/api_test_task_result',
                query: {
                    apiResultId:data.id,
                }
            })
            window.open(href, '_blank')


        },

        // 执行测试任务
        performApiTestTask(){
            postPerformApiTaskRequest(this.testTaskId).then(data => {
                console.log(data)
                if (true === data.data.success){
                    // this.getApiTestTaskFun()
                    this.$message.success("执行测试任务成功")
                }
                else if(10200 === data.data.error.code.status){
                    this.$message.error("当前有API任务正在执行！")

                }
                else {
                    this.$message.error("执行API测试任务失败")
                }
            })
        },


        // 获取测试报告
        getApiCaseResultFun() {
            getApiCaseResultRequest(this.testTaskId).then(data =>{
                if (true === data.data.success){
                    this.tableData = data.data.data.data;

                }else {
                    this.$message.info("获取接口失败")
                }

            })
        },


        checkReport(data){
            this.showApiTestTaskResultDetails = true
            this.result_id = data.id

        },


        returnAPIReportList(){
            this.showApiTestTaskResultDetails = false
            this.getApiCaseResultFun()
        },

        // 删除报告
        deleteReport(data){
            this.result_id = data.id
            deleteApiCaseResultRequest(this.result_id).then(data =>{
                if (true === data.data.success){
                    this.getApiCaseResultFun()
                    this.$message.success("删除API测试报告成功")
                }
                else {
                    this.$message.error("删除API测试报告失败")
                }

            })
        },

        // 返回任务列表
        returnTaskList(){
            this.$parent.returnAPITaskList();

        }



    },
    components: {
        'api-test-task-result_details': APITestTaskResultDetails

    },
    created() {
        console.log(this.apiTestTaskData.id)
        this.testTaskId = this.apiTestTaskData.id

    }



};
</script>

<style scoped>

</style>