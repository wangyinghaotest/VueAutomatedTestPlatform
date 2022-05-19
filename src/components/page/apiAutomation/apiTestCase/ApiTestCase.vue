<template>
    <div>
        <add-or-edit-api-test-case
            :type="opsType"
            :apiTestCaseId="currentApiTestCaseId"
            :apiTestCaseData="currentApiTestCaseData"
            :apiModuleId="currentApiModuleId"

            @saveApiTestCase="saveApiTestCase"
            @cancelSaveApiTestCase="cancelSaveApiTestCase"
            v-if="showAddOrEditApiTestCase">

        </add-or-edit-api-test-case>


        <div v-else>

            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>
                        <i class="el-icon-lx-calendar"></i> API项目
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>API模块</el-breadcrumb-item>
                    <el-breadcrumb-item>API测试用例</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-row>
                <el-button @click="returnAPIModuleList" >返回</el-button>
                <el-button type="primary" @click="openAddPageElement" >创建API测试用例</el-button>
                <el-button type="primary" @click="uploadTestCasesElement" >上传测试用例</el-button>
            </el-row>

            <el-dialog  v-loading="loading"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                        title="上传测试用例" :visible.sync="showUploadTestCasesFrom" :close-on-press-escape='false' :close-on-click-modal="false" :show-close='false'  v-if='uploadTestCase'>

                <el-upload
                    drag
                    :action="UploadApiTestCaseUrl()"
                    list-type="text"
                    ref="my-upload"
                    accept=".xlsx"
                    :show-file-list="true"
                    :on-success="onSuccess"
                    :on-error="onError"
                    :on-change="handleChange"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :multiple="false"
                    :on-exceed="handleExceed"
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传xlsx文件，且不超过500kb</div>
                </el-upload>
                <el-tag type="danger" style="margin-top: 20px;">以下是上传异常，需重新上传（如存在异常则需全部重新上传）</el-tag>
                <el-table
                    :data="uploadCaseTableData"
                    style="width: 100%"
                >
                    <el-table-column
                        prop="api_project_name"
                        label="项目名称"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="api_module_name"
                        label="模块名称"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="test_case_name"
                        label="用例名称"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="api_url"
                        label="URL">
                    </el-table-column>
                    <el-table-column
                        prop="error_reason"
                        label="失败原因">
                    </el-table-column>
                </el-table>
<!--                <el-progress :text-inside="true" :stroke-width="15" :percentage="num"></el-progress>-->
                <div style="margin-top: 30px;">
                    <el-button type="primary" @click="uploadCase">立即上传</el-button>
                    <el-button @click="testCaseExcelCancel">关闭弹窗</el-button>
                </div>

<!--                <div style="width: 70%;margin-left: 30px;margin-top: 30px;">-->
<!--                    <el-table-->
<!--                        :data="content"-->
<!--                        style="width: 100%;">-->
<!--                        <el-table-column-->
<!--                            prop="info"-->
<!--                            label="实时执行日志"-->
<!--                        >-->
<!--                        </el-table-column>-->
<!--                    </el-table>-->
<!--                    <br>-->
<!--                    <el-button type="primary" @click="onSubumit">提交</el-button>-->
<!--                </div>-->

            </el-dialog>

            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="id"
                    label="id"
                    sortable
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="api_module_name"
                    label="API模块"
                    sortable
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="api_test_case_name"
                    label="API测试用例"
                    sortable
                    width="180">
                </el-table-column>

                <el-table-column
                    prop="api_test_case_url"
                    label="API_URL"
                    sortable
                    width="500">
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
                            @click="openEditApiTestCase(scope.row)">编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="deleteApiTestCasePopup(scope.row)">删除</el-button>


                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>


</template>

<script>

import addOrEditApiTestCase from './addOrEditApiTestCase';
import {
    getApiTestCaseListRequest,
    deleteSingleApiTestCaseRequest,
    uploadApiCaseImportRequest
} from '../../../../api/apiAutomation/apiTestCase';
import { fileUrl } from '../../../../api/common/common';
import Vue from 'vue';

export default {
    name: 'ApiTestCase',
    // type 用来标识是编辑还是创建
    props:['type', 'apiModuleId', 'apiTestCaseProjectId'],
    inject:['reload'],
    data() {
        return {
            loading: false,
            num:1,
            content:[],
            uploadTestCase: false,
            fileList: [{}],
            fileDataList: [{}],
            tableData: [],
            uploadCaseTableData: [],
            moduleId: "",
            upload_case_address_name: "",

            currentApiTestCaseId: 0,
            currentApiModuleId: 0,
            currentApiTestCaseData:0,
            showAddOrEditApiTestCase:false,
            showUploadTestCasesFrom: false,
            uploadTestCasesFrom: {},





        }
    },
    mounted(){

    },
    methods: {
        onSubumit(){
            // 清空消息
            this.content = []
            // 执行webSocket
            this.webSocket()
        },
        webSocket() {
            const _this = this;
            if (typeof (WebSocket) == 'undefined') {
                this.$notify({
                    title: '提示',
                    message: '当前浏览器无法接收实时报警信息，请使用谷歌浏览器！',
                    type: 'warning',
                    duration: 0
                });
            } else {
                // 实例化socket
                const socketUrl = 'ws://127.0.0.1:8000/wx/';
                this.socket = new WebSocket(socketUrl);
                // 监听socket打开
                this.socket.onopen = function() {
                    console.log('浏览器WebSocket已打开');
                    //发送字符:
                    _this.socket.send(JSON.stringify(
                        {
                            "upload_case_address_name":"2022-03-25-11-31-46-72-testcase.xlsx",
                            "withCredentials":true
                        }
                        )
                    );
                };
                // 监听socket消息接收
                this.socket.onmessage = function(msg) {
                    // 追加到内容显示列表中
                    // this.num = msg.data
                    _this.content.push({"info":msg.data})
                };
                // 监听socket错误
                this.socket.onerror = function() {
                    _this.$notify({
                        title: '错误',
                        message: '服务器错误，无法接收实时报警信息',
                        type: 'error',
                        duration: 0
                    });
                };
                // 监听socket关闭
                this.socket.onclose = function() {
                    console.log('WebSocket已关闭');
                }
            }
        },

        uploadCase(data){
            let req = {} ;
            req.upload_case_address_name = this.upload_case_address_name
            this.loading = true
            uploadApiCaseImportRequest(req).then(data => {

                if (true === data.data.success) {
                    console.log(data)
                    this.loading = false
                    this.$message.success("上传成功")



                } else if(3000 === data.data.error.code) {
                    this.loading = false
                    this.$message.error(data.data.error.message.error_reason)
                    this.uploadCaseTableData = data.data.error.message.upload_results_list;
                }else if(3001 === data.data.error.code) {
                    this.loading = false
                    this.$message.error(data.data.error.message)
                }else{
                    this.loading = false
                    this.$message.error(data.data.error.message)
                }
            })

        },

        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleDataPreview(file){
            console.log(file)
        },
        handleDataRemove(file, fileDataList) {
            console.log(file, fileDataList);
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        onSuccess(res) {
            console.log(this.fileList)
            this.$alert(res.data.result, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                    console.log('上传成功');
                }
            });
            var upload_case_name = res.data.file;
            var index = upload_case_name.lastIndexOf("\/");
            this.upload_case_address_name = upload_case_name.substring(index + 1, upload_case_name.length);

        },

        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        beforeDataRemove(file, fileDataList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },

        handleChange(file, fileList) {

            this.fileList = fileList.slice(-1);

            if (fileList.length > 1) {
                fileList.splice(0,1);
                // this.fileList = [fileList[fileList.length - 1]]; // 这一步，是 展示最后一次选择的xls文件
            }

        },
        onError(res) {
            console.log('失败的回调' + JSON.stringify(res));
            this.$alert('创建失败', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                    console.log('上传失败');
                }
            });
        },
        onDataError(res) {
            console.log('失败的回调' + JSON.stringify(res));
            this.$alert('创建失败', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                    console.log('上传失败');
                }
            });
        },
        UploadApiTestCaseUrl(){
            return fileUrl + 'api/backend/api_test_case/upload_test_cases/';
        },

        // 取消上传
        testCaseExcelCancel(){
            this.showUploadTestCasesFrom = false;
            this.uploadTestCase = false;
            this.$refs['my-upload'].clearFiles();
            this.uploadCaseTableData = []
            this.getApiTestCaseFun();
        },

        openAddPageElement(){
            this.opsType = 'add';
            this.currentApiModuleId= this.moduleId
            this.currentApiTestCaseId = 0;
            this.currentApiTestCaseData = {};

            this.showAddOrEditApiTestCase = true
        },

        uploadTestCasesElement(){
            this.showUploadTestCasesFrom = true
            this.uploadTestCase = true
        },

        openEditApiTestCase(data){
            this.opsType = 'edit';
            this.currentApiTestCaseId = data.id;
            this.currentApiTestCaseData = data;
            console.log(data)

            this.showAddOrEditApiTestCase = true;
        },

        saveApiTestCase(){
            this.showAddOrEditApiTestCase = false
            this.getApiTestCaseFun();

        },

        cancelSaveApiTestCase(){
            this.showAddOrEditApiTestCase = false
            this.getApiTestCaseFun();

        },

        // 获取该模块下 API测试用例
        getApiTestCaseFun() {

            getApiTestCaseListRequest(this.moduleId).then(data => {
                console.log("这是api测试用例",data);
                if (true === data.data.success) {
                    this.tableData = data.data.data;

                } else {
                    this.$message.error("获取接口失败")
                }
            })
        },




        //删除单个Api测试用例元素
        deleteApiTestCasePopup(data){
            this.apiTestCaseId = data.id
            deleteSingleApiTestCaseRequest(this.apiTestCaseId).then(data => {
                    console.log(data);
                    if (true === data.data.success) {
                        this.getApiTestCaseFun();
                        this.$message.success("删除API测试用例成功")

                    } else {
                        this.$message.error("删除API测试用例失败")
                    }
                }
            );
        },


        // 返回API模块列表
        returnAPIModuleList(){
            this.$parent.apiModuleList();

        }

    },

    components: {
        'add-or-edit-api-test-case': addOrEditApiTestCase
    },

    created() {
        console.log(this.apiModuleId, this.apiTestCaseProjectId)
        if ('enter'===this.type){
            this.moduleId = this.apiModuleId
            this.getApiTestCaseFun();

        }

    }


};
</script>

<style scoped>

</style>