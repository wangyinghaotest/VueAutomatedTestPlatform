<template>
    <div>
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
            <el-button @click="returnReportList">返回</el-button>
            <el-button type="primary" @click="getApiCaseResultListFun">全部</el-button>
            <el-button type="danger" @click="getApiCaseResultErrorListFun">失败</el-button>
        </el-row>
        <div class="schart-box">
            <schart class="schart" canvasId="pie" :options="options3"></schart>
        </div>
        <div>
            <el-table
                :data="tableData"
                style="width: 100%"
            >
                <!--                    :default-sort = "{prop: 'date', order: 'descending'}">-->
                <el-table-column
                    prop="id"
                    label="id"
                    sortable
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="api_task_name"
                    label="任务名称"
                    sortable
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="api_business_test_name"
                    label="API业务测试名称"
                    sortable
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="api_test_case_name"
                    label="测试用例名称"
                    sortable
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="api_successful"
                    label="成功"
                    width="180">
                </el-table-column>

                <el-table-column
                    prop="api_error"
                    label="失败"
                    width="180">
                </el-table-column>

                <el-table-column
                    prop="create_time"
                    label="时间"
                    width="180">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="danger"
                            @click="SingleApiCaseReport(scope.row)">查看详情</el-button>

                        <el-dialog title="测试报告详情" :visible.sync="dialogTableVisible" :fullscreen=false>
                            <el-tabs :model="apiCaseResultForm">
                                <el-tab-pane label="异常" name="1">
                                    <p>{{ apiCaseResultForm.abnormal }}</p>
                                </el-tab-pane>
                                <el-tab-pane label="json提取变量转换" name="2">
                                    <p>{{apiCaseResultForm.json_extract_variable_conversion}}</p>
                                </el-tab-pane>
                                <el-tab-pane label="断言结果" name="3">
                                    <p>{{apiCaseResultForm.api_assertion_results}}</p>
                                </el-tab-pane>
                                <el-tab-pane label="参数提取" name="4">
                                    <!--                  <p>{{apiCaseResultForm.api_variable_results}}</p>-->
                                    <json-viewer :value="apiCaseResultForm.api_variable_results" :expand-depth=5></json-viewer>

                                </el-tab-pane>
                                <el-tab-pane label="API请求结果" name="5">
                                    <!--                  <pre>{{JSON.stringify(apiCaseResultForm.api_request_results,  null, 4)}}</pre>-->
                                    <json-viewer :value="apiCaseResultForm.api_request_results" :expand-depth=5></json-viewer>

                                </el-tab-pane>
                                <el-tab-pane label="请求URL" name="6">
                                    <p>{{ apiCaseResultForm.api_url }}</p>
                                </el-tab-pane>
                                <el-tab-pane label="请求Header" name="7">
                                    <p>{{ apiCaseResultForm.api_header }}</p>
                                </el-tab-pane>
                                <el-tab-pane label="请求Body" name="8">
                                    <!--                  <pre>{{JSON.stringify(apiCaseResultForm.api_body ,  null, 4)}}</pre>-->
                                    <p>{{ apiCaseResultForm.api_body }}</p>
                                </el-tab-pane>
                            </el-tabs>
                        </el-dialog>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40, 50]"
                :page-size="size_page"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total_case">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import {getApiCaseCheckResultListRequest, postSingleApiCaseCheckResultRequest, getApiCaseCheckResultErrorListRequest} from '../../../../api/apiAutomation/apiTestTask';
import Schart from 'vue-schart';
import Vue from 'vue'
import JsonViewer from 'vue-json-viewer'
Vue.use(JsonViewer)

export default {
    name: 'APITestTaskResultDetails',
    props: ['apiResultId'],
    components: {
        Schart
    },
    data(){

        return{

            apiParameterExtractionData:[
                {
                    api_value_variable: "",
                    api_key_variable: "",
                    api_variable_results: ""

                }
            ],

            currentPage: 1,
            total_case: 0,
            size_page: 10,
            tableData: [],
            api_state: 0,
            testTaskId: "",
            api_Result: "",
            api_result_id: "",
            api_test_result_id: "",
            dialogTableVisible: false,
            gridData: [],
            apiCaseResult: 'second',
            apiCaseResultForm: {
                api_error: "",
                api_successful : "",
                abnormal: "",
                json_extract_variable_conversion: "",
                api_assertion_results: "",
                api_request_results: "",
                api_variable_results: "",
                api_url: "",
                api_header: "",
                api_body: "",



            },
            activeNames: "",
            options3: {
                type: 'pie',
                title: {
                    text: '测试结果'
                },
                legend: {
                    position: 'left'
                },
                bgColor: '#fbfbfb',
                labels: ['成功', '失败'],
                datasets: [
                    {
                        data: [0,0]
                    },
                ]
            },

        }



    },
    mounted() {
        this.getApiCaseResultListFun()


    },
    methods: {

        // 页签-条/页 跳转
        handleSizeChange(val) {
            this.size_page = val
            if (this.api_state === 0){
                this.getApiCaseResultListFun()
            }
            else {
                this.getApiCaseResultErrorListFun()
            }
        },
        // 底部页签跳转
        handleCurrentChange(val) {
            this.currentPage = val
            if (this.api_state === 0){
                this.getApiCaseResultListFun()
            }
            else {
                this.getApiCaseResultErrorListFun()
            }
        },

        // 获取API测试用例结果列表
        getApiCaseResultListFun() {
            getApiCaseCheckResultListRequest(this.api_result_id, this.size_page, this.currentPage).then(data =>{
                if (true === data.data.success){
                    this.api_state = 0
                    this.tableData = data.data.data.data;
                    this.options3.datasets[0].data = data.data.data.case_result_total
                    this.total_case = data.data.data.case_result_total[0] + data.data.data.case_result_total[1]


                }else {
                    this.$message.error("获取接口失败")
                }

            })
        },

        // 获取API测试用例结果-失败列表
        getApiCaseResultErrorListFun() {
            getApiCaseCheckResultErrorListRequest(this.api_result_id, this.size_page, this.currentPage).then(data =>{
                if (true === data.data.success){
                    this.api_state = 1
                    this.tableData = data.data.data.data;
                    this.total_case = data.data.data.case_result_total[1]


                }else {
                    this.$message.error("获取接口失败")
                }

            })
        },


        // 获取单独测试用例测试报告
        SingleApiCaseReport(data){
            console.log("这是单独id",data.id)
            this.api_test_result_id = data.id


            postSingleApiCaseCheckResultRequest(this.api_test_result_id).then(data =>{
                console.log("zheshishuju", data.data.data.data)

                if (true === data.data.success){
                    let single_result = data.data.data.data[0]
                    this.dialogTableVisible = true
                    this.apiCaseResultForm = {...single_result }


                }else {
                    this.$message.error("获取接口失败")
                }

            })

        },

        // 返回API报告列表
        returnReportList(){
            this.$parent.returnAPIReportList();
        }




    },
    created() {
        console.log(this.apiResultId)
        this.api_result_id = this.apiResultId

    }


};
</script>

<style scoped>

.schart{
    height: 300px;
}

</style>