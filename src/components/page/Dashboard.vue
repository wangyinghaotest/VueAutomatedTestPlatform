<template>
    <div>
        <div class='home_page_list'>
            <el-row :gutter="20">
                <el-col :span="16">
                    <el-row :gutter="20" class="mgb20">
                        <el-col :span="8">
                            <el-card shadow="hover" :body-style="{padding: '0px'}">
                                <div class="grid-content grid-con-1">
                                    <i class="el-icon-lx-text grid-con-icon"></i>
                                    <div class="grid-cont-right">
                                        <a class="grid-num">{{ui_test_case_number}}</a>
                                        <div>UI测试用例数量</div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :span="8">
                            <el-card shadow="hover" :body-style="{padding: '0px'}">
                                <div class="grid-content grid-con-2">
                                    <i class="el-icon-lx-text grid-con-icon"></i>
                                    <div class="grid-cont-right">
                                        <a class="grid-num">{{api_test_case_number}}</a>
                                        <div>API测试用例数量</div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :span="8">
                            <el-card shadow="hover" :body-style="{padding: '0px'}">
                                <div class="grid-content grid-con-3">
                                    <i class="el-icon-lx-text grid-con-icon"></i>
                                    <div class="grid-cont-right">
                                        <div class="grid-num">
                                            <a class="grid-num" >{{performance_script_number}}</a>
                                        </div>
                                        <div>性能测试用例数量</div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>

        <div class="block">
            <span class="demonstration">日期 </span>
            <el-date-picker
                v-model="date_range"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions">
            </el-date-picker>
            <el-button  @click=queryApi style="margin-left: 10px;">查询</el-button>
        </div>
        <div v-for="(item,index) in apiChartList" :key="index" style="top: 20px;margin-top: 20px; ">
            <div :id="`chart${index}`" style="width: 90.7%;height: 50vh;left: 100px;"></div>
        </div>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
import  * as  echarts from 'echarts'
import moment from 'moment'
import {getSystemHomePageListRequest, postSystemHomePageApiStatisticsRequest} from "../../api/systemHomePage/systemHomePageList";

export default {
    name: 'dashboard',
    data() {
        return {
            name: localStorage.getItem('ms_username'),
            last_login: localStorage.getItem('last_login'),

            api_test_case_number: "",
            performance_script_number: "",
            ui_test_case_number: "",
            calendar: new Date(),

            date_range: "",
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        let start = moment(new Date().getTime() - 3600 * 24 * 1000 * 7).format('YYYY-MM-DD')

                        let end = moment().day(moment().day() - 1).format('YYYY-MM-DD')
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        let end = moment().day(moment().day() - 1).format('YYYY-MM-DD')
                        let start = moment(new Date().getTime() - 3600 * 24 * 1000 * 30).format('YYYY-MM-DD')

                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        let end = moment().day(moment().day() - 1).format('YYYY-MM-DD')

                        let start = moment(new Date().getTime() - 3600 * 24 * 1000 * 90).format('YYYY-MM-DD')

                        picker.$emit('pick', [start, end]);
                    }
                }]
            },

            time_scope: {
                time_scope_data: ''
            },

            apiChartList: [{}],




        };
    },
    components: {
        Schart
    },
    mounted () {
        this.$nextTick(function() {
            this.drawLine('main')
        })



    },
    computed: {
        role() {
            return this.name === 'admin' ? '超级管理员' : '普通用户';
        }
    },
    methods: {
        // 查询接口api统计
        queryApi(){
            this.getApi_StatisticsFun()
        },

        // 获取api统计
        getApi_StatisticsFun() {

            this.time_scope.time_scope_data = this.date_range

            postSystemHomePageApiStatisticsRequest(this.time_scope).then(data => {
                if (true === data.data.success) {

                    const api_chart_list_data = data.data.data.api_charts;

                    const api_chart_list_data_list = []

                    api_chart_list_data_list.push(api_chart_list_data)
                    this.apiChartList = api_chart_list_data_list
                    this.drawLine()

                } else {
                    this.$message.error('获取接口失败');
                }
            });
        },
        drawLine() {
            this.apiChartList.forEach((val, index) => {
                const myChart = this.$echarts.init( document.getElementById(`chart${index}`))
                myChart.setOption(this.apiChartList[index])
            })

        },

        //获取所有API项目列表
        getSystemHomePageListFun() {

            getSystemHomePageListRequest().then(data => {
                console.log(data);
                if (true === data.data.success) {
                    this.ui_test_case_number = data.data.data.ui_test_case_number
                    this.performance_script_number = data.data.data.performance_script_number
                    this.api_test_case_number = data.data.data.api_test_case_number

                } else {
                    this.$message.error("获取接口失败")
                }
            })
        },


    },
    created() {
        this.getSystemHomePageListFun();
        let startDate = moment(new Date().getTime() - 3600 * 24 * 1000 * 7).format('YYYY-MM-DD')
        let todayDate = moment().day(moment().day() - 1).format('YYYY-MM-DD')
        const data_time = []
        data_time.push(startDate,todayDate)
        this.date_range = data_time
        this.getApi_StatisticsFun();
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}

.proCharts{
    width: 100%;
    height: 400px;
    background: rgb(14, 51, 129);
}
.block{
    text-align: center;
    top: 50px;

}
.home_page_list{
    margin-left: 500px;
}
</style>
