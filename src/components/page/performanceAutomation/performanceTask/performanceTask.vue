<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 性能测试项目
                </el-breadcrumb-item>
                <el-breadcrumb-item>性能测试项目</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-row>
            <el-button type="primary" @click="addProjectPopup" >创建项目</el-button>
        </el-row>


        <el-dialog title="创建项目" :visible.sync="addApiProjectdialogFormVisible">
            <el-form :model="addApiProjectData" :rules="rules" ref="addApiProjectFormRef">
                <el-form-item label="项目名称" label-width="100px" prop="api_project_name">
                    <el-input v-model="addApiProjectData.api_project_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="项目描述" label-width="100px" prop="describe">
                    <el-input type="textarea" v-model="addApiProjectData.describe" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addApiProjectdialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addApiTestProject">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑项目" :visible.sync="editApiProjectdialogFormVisible">
            <el-form :model="editApiProjectData" :rules="rules" ref="editProjectFormRef">
                <el-form-item label="项目名称" label-width="100px" prop="api_project_name">
                    <el-input v-model="editApiProjectData.api_project_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="项目描述" label-width="100px" prop="describe">
                    <el-input type="textarea" v-model="editApiProjectData.describe" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editApiProjectdialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editProject">确 定</el-button>
            </div>
        </el-dialog>

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
                        prop="api_project_name"
                        label="项目名称"
                        sortable
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="describe"
                        label="项目描述"
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
                                @click="editApiProjectPopup(scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="deleteProjectPopup(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>
    </div>
</template>

<script>
    import {getApiProjectRequest, addApiProjectRequest, getSingleApiProjectRequest, updateSingleApiProjectRequest, deleteSingleApiProjectRequest} from "../../../../api/apiAutomation/apiProject";
    export default {
        name: 'apiProject',
        // props: {
        //     uiProject: Object,
        // },
        data() {
            return {
                tableData: [],

                page: {
                    page: 1,
                    total: 0,
                    size: 10,

                },
                addApiProjectdialogFormVisible: false,
                editApiProjectdialogFormVisible: false,

                addApiProjectData: {
                    api_project_name: "",
                    describe: ""
                },
                editApiProjectData: {
                    api_project_name: "",
                    describe: "",
                    id: 0,
                },
                apiProjectId: "",
                apiProjectData: "",

                rules: {
                    api_project_name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                    ],
                    description: [
                        {required: true, message: '请输入描述', trigger: 'blur'},
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
                this.getApiProjectFun()
            },
            handleCurrentChange(index) {
                this.page.page = index;
                this.getApiProjectFun()
            },

            //获取所有API项目列表
            getApiProjectFun() {
                let req = {
                    page: this.page.page,
                    size: this.page.size,
                };
                getApiProjectRequest(req).then(data => {
                    console.log(data);
                    if (true === data.data.success) {
                        this.tableData = data.data.data;
                        this.page.total = data.data.data.total;
                        this.page.page = data.data.data.page;
                        this.page.size = data.data.data.size;

                    } else {
                        this.$message.error("获取接口失败")
                    }
                })
            },

            // 添加API测试项目
            addApiTestProject() {
                let req = JSON.parse(JSON.stringify(this.addApiProjectData));

                this.$refs.addApiProjectFormRef.validate((valid) => {
                    if (valid) { // 代表校验通过
                        addApiProjectRequest(req).then(data => {
                            console.log(data)
                            if (true === data.data.success) {
                                this.getApiProjectFun();
                                this.addApiProjectdialogFormVisible = false;
                                this.$message.success("创建项目成功")
                            } else {
                                this.$message.error("创建项目失败")
                            }
                        })
                    } else {  //校验失败
                        return false;
                    }
                });
            },

            // 添加项目 弹窗
            addProjectPopup(){
                this.addApiProjectData = {
                    api_project_name: "",
                    describe: "",
                };
                this.addApiProjectdialogFormVisible=true;
            },

            handleNodeClick(data) {
                this.currentServiceId = data.id;
            },


            //编辑项目
            editProject(){
                let req = JSON.parse(JSON.stringify(this.editApiProjectData));

                this.$refs.editProjectFormRef.validate((valid) => {

                    console.log(this.apiProjectId);
                    if (valid) { // 代表校验通过
                        updateSingleApiProjectRequest(this.apiProjectId, req).then(data => {
                            console.log(data)
                            if (true === data.data.success) {
                                this.getApiProjectFun();
                                this.editApiProjectdialogFormVisible = false;
                                this.$message.info("编辑项目成功")
                            } else {
                                this.$message.info("编辑项目失败")
                            }
                        })
                    } else {  //校验失败
                        return false;
                    }
                });

            },

            //编辑项目弹窗并获取单个项目
            editApiProjectPopup(data){

                this.apiProjectId = data.id;
                this.apiProjectData = data;
                this.editApiProjectdialogFormVisible=true;

                console.log(this.apiProjectId);
                console.log(this.apiProjectData);

                getSingleApiProjectRequest(this.apiProjectId).then(data => {
                        console.log(data);
                        if (true === data.data.success) {
                            this.editApiProjectData.api_project_name = data.data.data.api_project_name;
                            this.editApiProjectData.describe = data.data.data.describe;
                        } else {
                            this.$message.info("获取接口失败")
                        }
                    }
                );

            },


            //删除单个项目
            deleteProjectPopup(data){

                this.apiProjectId = data.id;
                this.apiProjectData = data;

                console.log(this.apiProjectId);
                console.log(this.apiProjectData);

                deleteSingleApiProjectRequest(this.apiProjectId).then(data => {
                        console.log(data);
                        if (true === data.data.success) {
                            this.getApiProjectFun();
                            this.$message.info("删除项目成功")

                        } else {
                            this.$message.info("删除项目失败")
                        }
                    }
                );

            },





        },
        created() {
            this.getApiProjectFun();
        }
    };
</script>

<style scoped>


</style>