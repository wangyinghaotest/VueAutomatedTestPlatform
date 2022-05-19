<template>
    <div>
        <performance-script-result
            :performanceScriptId="currentPerformanceScriptId"
            :performanceScriptData="currentPerformanceScriptData"
            @performanceScriptList = "performanceScriptList"
            v-if="showPerformanceScriptResult"
        ></performance-script-result>

        <add-or-edit-performance-project-script
            :type='opsType'
            :performanceScriptId="currentPerformanceScriptId"
            :performanceScriptData="currentPerformanceScriptData"
            @savePerformanceScript="savePerformanceScript"
            @cancelPerformanceScript="cancelPerformanceScript"
            :performanceScriptProjectId="projectId"
            v-else-if="showAddOrEditPerformanceScript">
        </add-or-edit-performance-project-script>

        <div v-else>
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>
                        <i class="el-icon-lx-calendar"></i> 性能测试项目
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>性能测试项目</el-breadcrumb-item>
                    <el-breadcrumb-item>性能测试脚本</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-row>
                <el-button @click="returnProjectList" >返回</el-button>
                <el-button type="primary" @click="addPerformanceScriptPopup">创建性能脚本</el-button>
                <el-button @click="getSinglePerformanceProjectScript" >刷新</el-button>
            </el-row>

            <el-form :inline="true" :model="queryForm" class="demo-form-inline" style="margin-top: 20px;">
                <el-form-item label="脚本名称">
                    <el-input v-model="queryForm.performance_script_name" placeholder="脚本名称" @keyup.enter.native="querySubmit"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="querySubmit">查询</el-button>
                </el-form-item>
            </el-form>

            <div>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="id" label="id" sortable width="180"></el-table-column>
                    <el-table-column prop="performance_project_name" label="性能项目名称" sortable width="180"></el-table-column>
                    <el-table-column prop="performance_script_name" label="脚本名称" sortable width="180"></el-table-column>
                    <el-table-column prop="performance_status" label="状态" sortable width="180"></el-table-column>
                    <el-table-column prop="create_time" label="创建时间" width="180"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="editPerformanceScriptPopup(scope.row)">编辑</el-button>
                            <el-button
                                size="mini"
                                type="primary"
                                @click="NewPerformPerformanceScriptPopup(scope.row)"
                                :disabled="isDisabled"
                            >执行</el-button>
<!--                            <el-button-->
<!--                                size="mini"-->
<!--                                type="primary"-->
<!--                                @click="performPerformanceScriptPopup(scope.row)"-->
<!--                                :disabled="isDisabled"-->
<!--                            >执行</el-button>-->
                            <el-button
                                size="mini"
                                type="warning"
                                @click="performanceProjectScriptSuspendedPopup(scope.row)"
                                :disabled="isDisabled"
                            >暂停</el-button>
<!--                            <el-button-->
<!--                                size="mini"-->
<!--                                type="success"-->
<!--                                @click="performanceScriptReportPopup(scope.row)"-->
<!--                            >查看测试报告</el-button>-->

                            <el-button
                                size="mini"
                                type="success"
                                @click="performanceScriptReportPopup(scope.row)"
                            >查看测试报告</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="deletePerformanceScriptPopup(scope.row)"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40, 50, 60]"
                    :page-size="size_page"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total_script">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import {
    deleteSinglePerformanceScriptRequest, getPerformanceProjectScriptSuspendedRequest,
    getSinglePerformanceProjectScriptRequest, newPerformPerformanceScriptRequest,
    performPerformanceScriptRequest, postQueryPerformanceProjectScriptRequest
} from '../../../../api/performance/performanceScript';
import performanceReport from './performanceReport';
import addOrEditPerformanceProjectScript from './addOrEditPerformanceProjectScript';

export default {
    name: 'performanceScript',
    props: ['type', 'performanceProjectId'],

    data() {
        return {
            queryForm:{
                performance_script_name: ""
            },
            duration: true,
            isDisabled: false,
            tableData: [],

            currentPage: 1,
            size_page: 10,
            total_script: 0,

            fileList: [{}],
            performance_scheduler:"",
            loop_count_forever: "",
            showAddOrEditPerformanceScript: false,
            showPerformanceScriptResult: false,
            performanceScriptId: '',

            //当前performanceScriptId
            currentPerformanceScriptId: 0,
            currentPerformanceScriptProjectId: "",

            //当前 performanceScript数据
            currentPerformanceScriptData: {},

            projectId: '',

            rules: {
                performance_script_name: [{ required: true, message: '请输入脚本名称', trigger: 'blur' }],
                performance_threads: [{ required: true, message: '请输入线程数', trigger: 'blur' }],
                performance_ramp_up_time_seconds: [{ required: true, message: '请输入时间', trigger: 'blur' }],

            }
        };
    },
    methods: {
        savePerformanceScript(){
            this.showAddOrEditPerformanceScript = false
            this.getSinglePerformanceProjectScript();
        },
        cancelPerformanceScript(){
            this.showAddOrEditPerformanceScript = false
            this.getSinglePerformanceProjectScript();
        },

        formatter(row, column) {
            return row.address;
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        handleSizeChange(val) {
            this.size_page = val
            this.querySubmit();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.querySubmit();
        },

        // 查询脚本名称-提交
        querySubmit(){
            let req = JSON.parse(JSON.stringify(this.queryForm));
            req.performance_project_id = this.projectId
            postQueryPerformanceProjectScriptRequest(this.size_page, this.currentPage, req).then(data => {
                if (true === data.data.success) {
                    this.tableData = data.data.data.data;
                    this.total_script = data.data.data.total_script
                } else {
                    this.$message.error('获取接口失败');
                }
            }
            );


        },

        // 添加页面 弹窗
        addPerformanceScriptPopup() {
            this.opsType = 'add';
            this.showAddOrEditPerformanceScript = true
        },

        //编辑脚本
        editPerformanceScriptPopup(data) {
            this.opsType = 'edit';
            this.currentPerformanceScriptId = data.id;
            this.currentPerformanceScriptData = data;
            this.showAddOrEditPerformanceScript = true;
        },

        //删除性能脚本
        deletePerformanceScriptPopup(data) {
            this.performanceScriptId = data.id;

            deleteSinglePerformanceScriptRequest(this.performanceScriptId).then(data => {
                console.log(data);
                if (true === data.data.success) {
                    this.querySubmit();
                    this.$message.success('删除性能脚本成功');
                } else {
                    this.$message.error('删除性能脚本失败');
                }
            });
        },

        // 暂停性能任务
        performanceProjectScriptSuspendedPopup(data){

            getPerformanceProjectScriptSuspendedRequest(data.id).then(data => {

                if (true === data.data.success) {
                    this.querySubmit();
                    this.$message.success(data.data.data);

                }else if (false=== data.data.success){
                    this.$message.error(data.data.error.code.message)
                }else {
                    this.$message.error('获取接口失败');
                }


            })


        },
        // 执行性能测试脚本
        NewPerformPerformanceScriptPopup(data) {
            // this.$message.success('准备测试任务');
            this.isDisabled = true
            setTimeout(() => {
                this.isDisabled = false
            },1000)
            console.log('开始执行了');
            newPerformPerformanceScriptRequest(data.id).then(data => {
                this.querySubmit();
                if (true === data.data.success) {
                    this.querySubmit();
                    this.$message.success(data.data.data);

                }else if (false=== data.data.success){
                    this.$message.error(data.data.error.code.message)
                }else {
                    this.$message.error('获取接口失败');
                }
            });
        },

        // 执行性能测试脚本
        performPerformanceScriptPopup(data) {
            // this.$message.success('准备测试任务');
            this.isDisabled = true
            setTimeout(() => {
                this.isDisabled = false
            },1000)
            console.log('开始执行了');
            performPerformanceScriptRequest(data.id).then(data => {
                this.querySubmit();
                if (true === data.data.success) {
                    this.querySubmit();
                    this.$message.success(data.data.data);

                }else if (false=== data.data.success){
                    this.$message.error(data.data.error.code.message)
                }else {
                    this.$message.error('获取接口失败');
                }
            });
        },

        // 查看性能测试报告
        performanceScriptReportPopup(data) {
            this.currentPerformanceScriptId = data.id;
            this.currentPerformanceScriptData = data;
            this.showPerformanceScriptResult = true;
        },

        performanceScriptList() {
            this.showPerformanceScriptResult = false;
        },

        //获取 单个性能测试项目中包含得所有脚本----弃用
        getSinglePerformanceProjectScript() {
            getSinglePerformanceProjectScriptRequest(this.projectId, this.size_page, this.currentPage).then(data => {
                if (true === data.data.success) {
                    this.tableData = data.data.data.data;
                    this.total_script = data.data.data.total_script
                } else {
                    this.$message.error('获取接口失败');
                }
            });
        },

        // 返回性能项目列表
        returnProjectList(){
            this.$parent.projectList();
        }
    },

    components: {
        'performance-script-result': performanceReport,
        'add-or-edit-performance-project-script': addOrEditPerformanceProjectScript
    },
    created() {
        if ('enter' === this.type) {
            this.projectId = this.performanceProjectId;
            this.querySubmit();
        }
    }
};
</script>

<style scoped>
.upload_jmx{

}
/deep/.el-upload.el-upload--text{
    width: 82px !important;
    height: 32px !important;
}
/*去除upload组件过渡效果*/
.el-upload-list__item {
    transition: none !important;
}


</style>