<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> App项目
                </el-breadcrumb-item>
                <el-breadcrumb-item>App项目</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-row>
            <el-button type="primary" @click="addProjectPopup" >创建App项目</el-button>
        </el-row>


        <el-dialog title="创建App项目" :visible.sync="addProjectdialogFormVisible">
            <el-form :model="addProjectData" :rules="rules" ref="addProjectFormRef">
                <el-form-item label="项目名称" label-width="100px" prop="ui_project_name">
                    <el-input v-model="addProjectData.ui_project_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="项目描述" label-width="100px" prop="describe">
                    <el-input type="textarea" v-model="addProjectData.describe" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addProjectdialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addProject">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑项目" :visible.sync="editProjectdialogFormVisible">
            <el-form :model="editProjectData" :rules="rules" ref="editProjectFormRef">
                <el-form-item label="项目名称" label-width="100px" prop="ui_project_name">
                    <el-input v-model="editProjectData.ui_project_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="项目描述" label-width="100px" prop="describe">
                    <el-input type="textarea" v-model="editProjectData.describe" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editProjectdialogFormVisible = false">取 消</el-button>
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
                        prop="ui_project_name"
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
                                @click="editProjectPopup(scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="deleteProjectPopup(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

<!--            <el-pagination-->
<!--                    class="page-class"-->
<!--                    @size-change="handleSizeChange"-->
<!--                    @current-change="handleCurrentChange"-->
<!--                    :current-page="page.page"-->
<!--                    :page-sizes="[10, 20, 50, 100]"-->
<!--                    :page-size="page.size"-->
<!--                    layout="total, sizes, prev, pager, next, jumper"-->
<!--                    :total="page.total">-->
<!--            </el-pagination>-->
        </div>
    </div>
</template>

<script>
    import {getUiProjectRequest, addUiProjectRequest, getSingleUiProjectRequest, updateSingleUiProjectRequest, deleteSingleUiProjectRequest} from "../../../../api/uiAutomation/uiProject";
    export default {
        name: 'AppProject',
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
                addProjectdialogFormVisible: false,
                editProjectdialogFormVisible: false,

                addProjectData: {
                    ui_project_name: "",
                    describe: ""
                },
                editProjectData: {
                    ui_project_name: "",
                    describe: "",
                    id: 0,
                },
                projectId: "",
                projectData: "",

                rules: {
                    ui_project_name: [
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
                this.getUiProjectFun()
            },
            handleCurrentChange(index) {
                this.page.page = index;
                this.getUiProjectFun()
            },

            //获取所有项目列表
            getUiProjectFun() {
                let req = {
                    page: this.page.page,
                    size: this.page.size,
                };
                getUiProjectRequest(req).then(data => {
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

            // 添加UI项目
            addProject() {
                let req = JSON.parse(JSON.stringify(this.addProjectData));

                this.$refs.addProjectFormRef.validate((valid) => {
                    if (valid) { // 代表校验通过
                        addUiProjectRequest(req).then(data => {
                            console.log(data)
                            if (true === data.data.success) {
                                this.getUiProjectFun();
                                this.addProjectdialogFormVisible = false;
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
                this.addProjectData = {
                    ui_project_name: "",
                    describe: "",
                };
                this.addProjectdialogFormVisible=true;
            },

            handleNodeClick(data) {
                this.currentServiceId = data.id;
            },


            //编辑项目
            editProject(){
                let req = JSON.parse(JSON.stringify(this.editProjectData));

                this.$refs.editProjectFormRef.validate((valid) => {

                    console.log(this.projectId);
                    if (valid) { // 代表校验通过
                        updateSingleUiProjectRequest(this.projectId, req).then(data => {
                            console.log(data)
                            if (true === data.data.success) {
                                this.getUiProjectFun();
                                this.editProjectdialogFormVisible = false;
                                this.$message.success("编辑项目成功")
                            } else {
                                this.$message.error("编辑项目失败")
                            }
                        })
                    } else {  //校验失败
                        return false;
                    }
                });

            },

            //编辑项目弹窗并获取单个项目
            editProjectPopup(data){

                this.projectId = data.id;
                this.projectData = data;
                this.editProjectdialogFormVisible=true;

                console.log(this.projectId);
                console.log(this.projectData);

                getSingleUiProjectRequest(this.projectId).then(data => {
                        console.log(data);
                        if (true === data.data.success) {
                            this.editProjectData.ui_project_name = data.data.data.ui_project_name;
                            this.editProjectData.describe = data.data.data.describe;
                        } else {
                            this.$message.error("获取接口失败")
                        }
                    }
                );

            },


            //删除单个项目
            deleteProjectPopup(data){

                this.projectId = data.id;
                this.projectData = data;

                console.log(this.projectId);
                console.log(this.projectData);

                deleteSingleUiProjectRequest(this.projectId).then(data => {
                        console.log(data);
                        if (true === data.data.success) {
                            this.getUiProjectFun();
                            this.$message.success("删除项目成功")

                        } else {
                            this.$message.error("删除项目失败")
                        }
                    }
                );

            },





        },
        created() {
            this.getUiProjectFun();
        }
    };
</script>

<style scoped>


</style>