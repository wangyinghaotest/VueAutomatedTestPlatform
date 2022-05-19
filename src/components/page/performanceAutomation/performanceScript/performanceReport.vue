<template>
    <div>
        <new-performance-script-result
            @performanceReportList = "performanceReportList"
            :performanceScriptReportData = "currentPerformanceScriptReportData"
            :performanceScriptId = "performanceScriptId"
            v-if="showNewPerformanceScriptResult"
        ></new-performance-script-result>
        <div v-else>
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>
                        <i class="el-icon-lx-calendar"></i> 性能测试项目
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>性能测试项目</el-breadcrumb-item>
                    <el-breadcrumb-item>性能测试脚本</el-breadcrumb-item>
                    <el-breadcrumb-item>性能测试报告</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-row>
                <el-button @click="returnScriptList" >返回</el-button>
            </el-row>
            <div>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column
                        prop="performance_report_id"
                        label="id"
                        width="180"
                    ></el-table-column>
                    <el-table-column
                        prop="performance_script_report_name"
                        label="性能测试报告名称"
                        sortable
                        width="180"
                    ></el-table-column>
                    <el-table-column
                        prop="create_time"
                        sortable
                        label="创建时间"
                        width="180"
                    ></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" type="danger" @click="NewCheckReport(scope.row)">查看报告</el-button>
                            <el-button size="mini" type="danger"
                                       v-clipboard:copy="report_address"
                                       v-clipboard:success="onCopy"
                                       v-clipboard:error="onError"
                                       @click="NewPageCheckReport(scope.row)">分享报告</el-button>
                            <!--                            <el-button size="mini" type="danger" @click="checkReport(scope.row)">查看报告</el-button>-->
                            <el-button size="mini" type="danger" @click="deleteReport(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import { performanceScriptReportDeleteRequest, performanceScriptReportRequest } from '../../../../api/performance/performanceScript';
import newPerformanceReport from './newPerformanceReport';
import { fileUrl } from '../../../../api/common/common';
export default {
    name: 'performanceReport',
    props: ['performanceScriptData'],
    data() {
        return {
            tableData: [],
            report_address: '',
            report_host: "",
            performanceScriptId: '',
            report_id: '',
            performance_script_report_name: '',
            performance_script_report_url: '',
            performance_report_id: '',
            create_time: '',
            currentPerformanceScriptReportURL: {},
            // currentPerformanceScriptId: this.performanceScriptId,
            showNewPerformanceScriptResult: false,
            currentPerformanceScriptReportData: [{}]
        };
    },
    mounted() {
        this.getPerformanceScriptReportFun();
    },
    methods: {
        onCopy: function (e) {
            this.$message.success('复制成功')
        },
        onError: function (e) {
            this.$message.error('复制失败，请稍后重试')
        },
        performanceReportList() {
            this.showNewPerformanceScriptResult = false;
        },

        NewPageCheckReport(data){
            if (fileUrl === "http://localhost:8000/"){
                this.report_host = 'http://localhost:8080/'
            }
            else {
                this.report_host = fileUrl
            }
            this.report_address = this.report_host + 'performanceReportPage#/performanceReportPage?performanceResultId='+ data.performance_report_id + '&performanceScriptId=' + this.performanceScriptId
            // const {href} = this.$router.resolve({
            //     path: '/performanceReportPage',
            //     query: {
            //         performanceResultId:data.performance_report_id,
            //         performanceScriptId: this.performanceScriptId
            //     }
            // })
            // window.open(href, '_blank')
        },


        // 获取测试报告
        getPerformanceScriptReportFun() {
            performanceScriptReportRequest(this.performanceScriptId).then(data => {
                if (true === data.data.success) {
                    this.tableData = data.data.data;
                } else {
                    this.$message.error('获取接口失败');
                }
            });
        },

        // New查看性能测试报告
        NewCheckReport(data) {
            this.showNewPerformanceScriptResult = true
            this.currentPerformanceScriptReportData[0].performance_report_id = data.performance_report_id
        },

        // 查看性能测试报告
        checkReport(data) {
            this.performance_script_report_name = data.performance_script_report_name;
            this.performance_report_id = data.performance_report_id;
            this.create_time = data.create_time;
            this.performance_script_report_url = data.file;
            this.currentPerformanceScriptReportURL = data.file;
            window.open(this.currentPerformanceScriptReportURL);
        },

        // 删除性能测试报告
        deleteReport(data) {
            this.performance_script_report_name = data.performance_script_report_name;
            this.performance_report_id = data.performance_report_id;

            performanceScriptReportDeleteRequest(this.performance_script_report_name, this.performance_report_id).then(data => {
                if (true === data.data.success) {
                    this.$message.success('删除成功');
                    this.getPerformanceScriptReportFun()
                } else {
                    this.$message.error('获取接口失败');
                }
            });
            console.log(this.performance_script_report_name)
        },

        // 返回性能脚本列表
        returnScriptList(){
            this.$parent.performanceScriptList();
        },
    },

    components: {
        'new-performance-script-result': newPerformanceReport,

    },

    created() {
        this.performanceScriptId = this.performanceScriptData.id;
    }
};
</script>

<style scoped>
</style>