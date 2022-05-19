<template>
    <div>
        <add-or-edit-ui-test-case
            :type="opsType"
            :uiTestCaseId="currentUiTestCaseId"
            :uiTestCaseData="currentUiTestCaseData"

            @saveUiTestCase="saveUiTestCase"
            @cancelSaveUiTestCase="cancelSaveUiTestCase"
            v-if="showAddOrEditUiTestCase">

        </add-or-edit-ui-test-case>
        <div v-else>
            <el-row>
                <el-button @click="returnProjectList">返回</el-button>
                <el-button type="primary" @click="openAddPageElement" >创建UI测试用例</el-button>
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
                        label="项目名称"
                        sortable
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="ui_test_case_name"
                        label="UI测试用例"
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
                                @click="openEditUiTestCase(scope.row)">编辑</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="deleteUiTestCasePopup(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>


    </div>
</template>

<script>
import { deleteSingleUiTestCaseRequest, getUiTestCaseRequest } from '../../../../api/uiAutomation/uiTestCase';
import addOrEditUiTestCase from './addOrEditUiTestCase';

export default {
    name: 'UiTestCase',
    props: ['type', 'uiProjectId'],
    inject:['reload'],
    data() {
        return {
            tableData: [],
            page: {
                page: 1,
                total: 0,
                size: 10,

            },
            inject:['reload'],
            uiTestCaseId: "",

            showAddOrEditUiTestCase:false,

            opsType: "add",

            // 当前uiTestCaseId
            currentUiTestCaseId: 0,

            //当前uiTestCase数据
            currentUiTestCaseData: {},

            rules: {
                ui_page_name: [
                    {required: true, message: '请输入页面名称', trigger: 'blur'},
                ],
                ui_page_describe: [
                    {required: true, message: '请输入页面描述', trigger: 'blur'},
                ],
                ui_project_id: [
                    { required: true, message: '请选择项目', trigger: 'change' }
                ],
            },
        }
    },

    methods: {

        formatter(row, column) {
            return row.address;
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        handleSizeChange(size) {
            this.page.size = size;
            this.getUiPageFun()
        },
        handleCurrentChange(index) {
            this.page.page = index;
            this.getUiTestCaseFun()
        },

        //获取所有测试用例列表
        getUiTestCaseFun() {
            let req = {
                page: this.page.page,
                size: this.page.size,
            };
            getUiTestCaseRequest(this.projectId).then(data => {
                console.log(data);
                if (true === data.data.success) {
                    this.tableData = data.data.data;

                } else {
                    this.$message.error("获取接口失败")
                }
            })
        },


        openAddPageElement(){
            this.opsType = 'add';
            this.currentUiTestCaseId = 0;
            this.currentUiTestCaseData = {};

            this.showAddOrEditUiTestCase = true


        },

        openEditUiTestCase(data){
            this.opsType = 'edit';
            this.currentUiTestCaseId = data.id;
            this.currentUiTestCaseData = data;
            console.log(data)

            this.showAddOrEditUiTestCase = true;


        },



        saveUiTestCase(){
            this.showAddOrEditUiTestCase = false
            this.getUiTestCaseFun();


        },
        cancelSaveUiTestCase(){
            this.showAddOrEditUiTestCase = false
            this.getUiTestCaseFun();
        },



        //删除单个测试用例元素
        deleteUiTestCasePopup(data){
            this.uiTestCaseId = data.id
            deleteSingleUiTestCaseRequest(this.uiTestCaseId).then(data => {
                    console.log(data);
                    if (true === data.data.success) {
                        this.getUiTestCaseFun();
                        this.$message.success("删除测试用例成功")

                    } else {
                        this.$message.error("删除测试用例失败")
                    }
                }
            );

        },

        // 返回项目首页列表
        returnProjectList() {
            this.$parent.projectList();
        }

    },

    components: {
        'add-or-edit-ui-test-case': addOrEditUiTestCase,

    },
    created() {
        if ('enter' === this.type){
            this.projectId = this.uiProjectId
            this.getUiTestCaseFun();
        }

    }
};
</script>

<style scoped>

</style>