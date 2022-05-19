<template>
    <div>
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
            <el-button @click="performanceReportList">返回</el-button>
        </el-row>
        <el-row>
            <el-button type="primary" plain @click=reportList style="margin-top: 20px;">报告对比</el-button>
        </el-row>
        <el-dialog title="报告列表" :visible.sync="report_dialog">
            <el-table :data="report_data"  @selection-change="check_data_report">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column property="performance_report_id" label="id" width="150"></el-table-column>
                <el-table-column property="performance_script_report_name" label="测试报告名称" width="200"></el-table-column>
                <el-table-column property="pressure_test_content" label="压测内容" width="200"></el-table-column>
            </el-table>
            <el-button  @click=reportCompared >确定</el-button>
            <el-button  @click=cancelReportList >取消</el-button>
        </el-dialog>

        <div v-for="(item,index) in chartList" :key="index" style="top: 20px;margin-top: 20px;">
            <div :id="`chart${index}`" style="width: 90.7%;height: 70vh;"></div>
        </div>
        <div v-for="item in tableData">
            <el-table
                :data="item.report_list"
                style="width: 90.7%; margin-top: 20px;"
                :header-cell-style="{textAlign: 'center'}">
                <el-table-column
                    label="测试报告内容"
                    prop="test_report_name"
                    width="100">
                    <el-table-column
                        prop="test_report_name"
                        label="测试报告名称"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="pressure_test_content"
                        label="压测内容"
                        width="120">
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    label="Requests"
                    width="150">
                    <el-table-column
                        prop="requests_label"
                        label="label"
                        width="120">
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    label="Executions(执行)"
                    width="150">
                    <el-table-column
                        prop="samples"
                        label="请求数量"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop="api_error"
                        label="失败率"
                        width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.api_error> 0 + ('%')" style="color:red">{{ scope.row.api_error }}</span>
                            <span v-else style="color: #37B328">{{ scope.row.api_error }}</span>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    label="响应时间(ms)"
                    width="150">
                    <el-table-column
                        prop="api_average"
                        label="平均响应"
                        width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.api_average>=8000" style="color:red">{{ scope.row.api_average }}</span>
                            <span v-else style="color: #37B328">{{ scope.row.api_average }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="api_min"
                        label="最小响应"
                        width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.api_min>=8000" style="color:red">{{ scope.row.api_min }}</span>
                            <span v-else style="color: #37B328">{{ scope.row.api_min }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="api_max"
                        label="最大响应"
                        width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.api_max>=8000" style="color:red">{{ scope.row.api_max }}</span>
                            <span v-else style="color: #37B328">{{ scope.row.api_max }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="api_median"
                        label="中位数"
                        width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.api_median>=8000" style="color:red">{{ scope.row.api_median }}</span>
                            <span v-else style="color: #37B328">{{ scope.row.api_median }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="api_90"
                        label="90%"
                        width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.api_90>=8000" style="color:red">{{ scope.row.api_90 }}</span>
                            <span v-else style="color: #37B328">{{ scope.row.api_90 }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="api_95"
                        label="95%"
                        width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.api_95>=8000" style="color:red">{{ scope.row.api_95 }}</span>
                            <span v-else style="color: #37B328">{{ scope.row.api_95 }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="api_99"
                        label="99%"
                        width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.api_99>=8000" style="color:red">{{ scope.row.api_99 }}</span>
                            <span v-else style="color: #37B328">{{ scope.row.api_99 }}</span>
                        </template>
                    </el-table-column>
                </el-table-column>

                <el-table-column
                    label="Throughput"
                    width="150">
                    <el-table-column
                        prop="api_transactions"
                        label="吞吐量(s)"
                        width="100">
                        <template slot-scope="scope">
                            <span v-if="scope.row.api_transactions<=10" style="color:red">{{ scope.row.api_transactions }}</span>
                            <span v-else style="color: #37B328">{{ scope.row.api_transactions }}</span>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    label="Network(KB/sec)"
                    width="150">
                    <el-table-column
                        prop="api_received"
                        label="每秒接收数据量"
                        width="120">
                    </el-table-column>
                </el-table-column>
            </el-table>
        </div>
        <div v-for="item in errorTableData">
            <el-table
                :data="item.jtl_error"
                style="width: 90.7%; margin-top: 20px;"
                :header-cell-style="{textAlign: 'center'}"
                :cell-style="{ textAlign: 'center' }">
                <el-table-column
                    prop="jtl_error"
                    label="是否存在异常"
                >
                    <template slot-scope="scope">
                        <span v-if="scope.row.jtl_error.indexOf('暂无异常') !== -1" style="color: #37B328">{{ scope.row.jtl_error }}</span>
                        <span v-else style="color:red">{{ scope.row.jtl_error }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>

<script>
import { newPerformanceScriptReportRequest, performanceScriptReportRequest } from '../../../../api/performance/performanceScript';
import  * as  echarts from 'echarts'
export default {
    name: 'newPerformanceReport.vue',
    props: ['performanceScriptReportData', 'performanceScriptId'],
    data() {
        return {
            chartList: [{}],
            chartList2: [{}],

            report_dialog: false,
            report_data: [],
            check_data: [],
            errorTableData: [
                {
                    jtl_error:[
                        {

                            jtl_error: '',
                        }
                    ],

                }

            ],
            tableData: [{
                report_list:[
                    {
                        test_report_name: '',
                        requests_label: '',
                        samples: '',
                        api_error:'',
                        api_min: '',
                        api_max: '',
                        api_median: '',
                        api_90: '',
                        api_95: '',
                        api_99: '',
                        api_transactions: '',
                        api_received: '',
                        api_average: '',
                        pressure_test_content: ''
                    }
                ],

            },
            ],
            performanceReportScriptId: "",
            performance_report_id_data: {}
        }
    },
    mounted() {
        this.getPerformanceReportFun();
    },
    methods: {
        initChart() {
            this.chartList.forEach((val, index) => {
                const myChart = this.$echarts.init( document.getElementById(`chart${index}`), 'dark')
                myChart.setOption(this.chartList[index])
            })
        },

        // 获取已选择报告
        check_data_report(val){
            this.check_data = val
        },

        // 报告对比
        reportCompared(){
            this.report_dialog = false
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });

            newPerformanceScriptReportRequest(this.check_data).then(data => {
                if (true === data.data.success) {
                    this.tableData = data.data.data;
                    this.chartList2 = data.data.data
                    this.errorTableData = data.data.data;

                    const response_time_varies_over_time = []

                    for (var i = 0; i < this.chartList2.length; i++) {
                        response_time_varies_over_time.push(this.chartList2[i].response_time_varies_over_time)
                    }
                    this.chartList = response_time_varies_over_time
                    if (this.chartList.length > 0) {
                        this.$nextTick(() => {
                            this.initChart()
                        })
                    }
                    loading.close();

                } else {
                    this.$message.error('获取接口失败');
                    loading.close();

                }
            });

        },
        // 关闭报告列表
        cancelReportList(){
            this.report_dialog = false
        },
        // 报告列表
        reportList(){
            this.report_dialog = true
            performanceScriptReportRequest(this.performanceReportScriptId).then(data => {
                if (true === data.data.success) {
                    this.report_data = data.data.data;
                } else {
                    this.$message.error('获取接口失败');
                }
            });

        },

        // 返回性能脚本列表
        performanceReportList(){
            this.$parent.performanceReportList();
        },

        // 获取测试报告
        getPerformanceReportFun() {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            newPerformanceScriptReportRequest(this.performanceScriptReportData).then(data => {
                if (true === data.data.success) {
                    console.log(data.data.data)
                    this.tableData = data.data.data;
                    this.errorTableData = data.data.data;
                    this.chartList2 = data.data.data;
                    const response_time_varies_over_time = []

                    for (var i = 0; i < this.chartList2.length; i++) {
                        response_time_varies_over_time.push(this.chartList2[i].response_time_varies_over_time)
                    }
                    this.chartList = response_time_varies_over_time
                    if (this.chartList.length > 0) {
                        this.$nextTick(() => {
                            this.initChart()
                        })
                    }
                    loading.close();


                } else {
                    this.$message.error(data.data.error.message);
                    loading.close();

                }
            });
        },

    },
    created() {
        this.performance_report_id_data = this.performanceScriptReportData
        this.performanceReportScriptId = this.performanceScriptId
    }
};
</script>

<style scoped>

</style>