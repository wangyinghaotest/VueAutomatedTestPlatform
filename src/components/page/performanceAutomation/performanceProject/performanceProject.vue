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
            <el-button type="primary" @click="addPerformanceProjectPopup" >创建项目</el-button>
        </el-row>


        <el-dialog title="创建项目" :visible.sync="addPerformanceProjectdialogFormVisible">
            <el-form :model="addPerformanceProjectData" :rules="rules" ref="addPerformanceProjectFormRef">
                <el-form-item label="项目名称" label-width="100px" prop="performance_project_name">
                    <el-input v-model="addPerformanceProjectData.performance_project_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="项目描述" label-width="100px" prop="describe">
                    <el-input type="textarea" v-model="addPerformanceProjectData.describe" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addPerformanceProjectdialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addPerformanceTestProject">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑项目" :visible.sync="editPerformanceProjectdialogFormVisible">
            <el-form :model="editPerformanceProjectData" :rules="rules" ref="editPerformanceProjectFormRef">
                <el-form-item label="项目名称" label-width="100px" prop="performance_project_name">
                    <el-input v-model="editPerformanceProjectData.performance_project_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="项目描述" label-width="100px" prop="describe">
                    <el-input type="textarea" v-model="editPerformanceProjectData.describe" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editPerformanceProjectdialogFormVisible = false">取 消</el-button>
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
                        prop="performance_project_name"
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
    import {getPerformanceProjectRequest, addPerformanceProjectRequest, getSinglePerformanceProjectRequest, updateSinglePerformanceProjectRequest, deleteSinglePerformanceProjectRequest} from "../../../../api/performance/performanceProject";
    export default {
        name: 'performanceProject',

        data() {
            return {
                tableData: [],

                page: {
                    page: 1,
                    total: 0,
                    size: 10,

                },
                addPerformanceProjectdialogFormVisible: false,
                editPerformanceProjectdialogFormVisible: false,

                addPerformanceProjectData: {
                    performance_project_name: "",
                    describe: ""
                },
                editPerformanceProjectData: {
                    performance_project_name: "",
                    describe: "",
                    id: 0,
                },
                performanceProjectId: "",
                performanceProjectData: "",

                rules: {
                    performance_project_name: [
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
                this.getPerformanceProjectFun()
            },
            handleCurrentChange(index) {
                this.page.page = index;
                this.getPerformanceProjectFun()
            },

            //获取所有性能测试项目列表
            getPerformanceProjectFun() {
                let req = {
                    page: this.page.page,
                    size: this.page.size,
                };
                getPerformanceProjectRequest(req).then(data => {
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

            // 添加性能测试项目
            addPerformanceTestProject() {
                let req = JSON.parse(JSON.stringify(this.addPerformanceProjectData));

                this.$refs.addPerformanceProjectFormRef.validate((valid) => {
                    if (valid) { // 代表校验通过
                        addPerformanceProjectRequest(req).then(data => {
                            console.log(data)
                            if (true === data.data.success) {
                                this.getPerformanceProjectFun();
                                this.addPerformanceProjectdialogFormVisible = false;
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

            // 添加性能测试项目 弹窗
            addPerformanceProjectPopup(){
                this.addPerformanceProjectData = {
                    performance_project_name: "",
                    describe: "",
                };
                this.addPerformanceProjectdialogFormVisible=true;
            },

            handleNodeClick(data) {
                this.currentServiceId = data.id;
            },


            //编辑性能测试项目
            editProject(){
                let req = JSON.parse(JSON.stringify(this.editPerformanceProjectData));

                this.$refs.editPerformanceProjectFormRef.validate((valid) => {

                    console.log(this.performanceProjectId);
                    if (valid) { // 代表校验通过
                        updateSinglePerformanceProjectRequest(this.performanceProjectId, req).then(data => {
                            console.log(data)
                            if (true === data.data.success) {
                                this.getPerformanceProjectFun();
                                this.editPerformanceProjectdialogFormVisible = false;
                                this.$message.info("编辑性能测试项目成功")
                            } else {
                                this.$message.info("编辑性能测试项目失败")
                            }
                        })
                    } else {  //校验失败
                        return false;
                    }
                });

            },

            //编辑性能测试项目弹窗并获取单个项目
            editApiProjectPopup(data){

                this.performanceProjectId = data.id;
                this.performanceProjectData = data;
                this.editPerformanceProjectdialogFormVisible=true;

                console.log(this.performanceProjectId);
                console.log(this.performanceProjectData);

                getSinglePerformanceProjectRequest(this.performanceProjectId).then(data => {
                        console.log(data);
                        if (true === data.data.success) {
                            this.editPerformanceProjectData.performance_project_name = data.data.data.performance_project_name;
                            this.editPerformanceProjectData.describe = data.data.data.describe;
                        } else {
                            this.$message.error("获取接口失败")
                        }
                    }
                );

            },


            //删除单个性能测试项目
            deleteProjectPopup(data){

                this.performanceProjectId = data.id;
                this.performanceProjectData = data;

                console.log(this.performanceProjectId);
                console.log(this.performanceProjectData);

                deleteSinglePerformanceProjectRequest(this.performanceProjectId).then(data => {
                        console.log(data);
                        if (true === data.data.success) {
                            this.getPerformanceProjectFun();
                            this.$message.success("删除性能测试项目成功")

                        } else {
                            this.$message.error("删除性能测试项目失败")
                        }
                    }
                );

            },





        },
        created() {
            this.getPerformanceProjectFun();
        }
    };
</script>

<style scoped>


</style>