<template>
    <div>
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-lx-calendar"></i> API项目
          </el-breadcrumb-item>
          <el-breadcrumb-item>API模块</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
        <el-row>
          <el-button @click="returnProjectList" >返回</el-button>

          <el-button type="primary" @click="addModulePopup" >创建API模块</el-button>
        </el-row>


        <el-dialog title="创建页面" :visible.sync="addModuledialogFormVisible">
            <el-form :model="addModuleData" :rules="rules" ref="addModuleFormRef">
                <el-form-item label="模块名称" label-width="100px" prop="api_module_name">
                    <el-input v-model="addModuleData.api_module_name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="模块描述" label-width="100px" prop="api_module_describe">
                    <el-input type="textarea" v-model="addModuleData.api_module_describe" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addModuledialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addModule">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑模块" :visible.sync="editModuledialogFormVisible">
            <el-form :model="editModuleData" :rules="rules" ref="editPageFormRef">
                <el-form-item label="模块名称" label-width="100px" prop="api_module_name">
                    <el-input v-model="editModuleData.api_module_name" autocomplete="off"></el-input>
                </el-form-item>


                <el-form-item label="模块描述" label-width="100px" prop="api_module_describe">
                    <el-input type="textarea" v-model="editModuleData.api_module_describe" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editModuledialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editModule">确 定</el-button>
            </div>
        </el-dialog>

        <div>
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
                        prop="api_project_name"
                        label="API项目名称"
                        sortable
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="api_module_name"
                        label="API模块名称"
                        sortable
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="api_module_describe"
                        label="API模块描述"
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
                                @click="editModulePopup(scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="deleteModulePopup(scope.row)">删除</el-button>
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
                :total="total_module">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {getApiModuleRequest, addApiModuleRequest, getSingleApiModuleRequest, updateSingleApiModuleRequest, deleteSingleApiModuleRequest, getSingleApiProjectModuleRequest} from '../../../../api/apiAutomation/apiModule';

    export default {
        name: 'ApiModule',
        props: ['type', 'apiProjectId'],

        data() {
            return {
                tableData: [],
                currentPage: 1,
                size_page: 10,
                total_module: 0,
                addModuledialogFormVisible: false,
                editModuledialogFormVisible: false,

                addModuleData: {
                    api_module_name: "",
                    api_module_describe: "",
                    api_project_id: this.projectId,
                },

                apiProjectSelect: [],

                apiProjectSelectId: "",

                editModuleData: {
                    api_module_name: "",
                    api_module_describe: "",
                    api_project_id: this.projectId,
                    id: 0,
                },

                moduleId: "",

                projectId: "",

                rules: {
                    api_module_name: [
                        {required: true, message: '请输入模块名称', trigger: 'blur'},
                    ],
                    api_module_describe: [
                        {required: true, message: '请输入模块描述', trigger: 'blur'},
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
            handleSizeChange(val) {
                this.size_page = val;
                this.getSingleAPIProjectModule()
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getSingleAPIProjectModule()
            },



            // 添加API模块
            addModule() {
                let req = JSON.parse(JSON.stringify(this.addModuleData));
                console.log(req)

                this.$refs.addModuleFormRef.validate((valid) => {
                    if (valid) { // 代表校验通过
                        addApiModuleRequest(req).then(data => {
                            console.log(data)
                            if (true === data.data.success) {
                                this.addModuledialogFormVisible = false;

                                this.getSingleAPIProjectModule()
                                this.$message.success("创建模块成功")
                            } else {
                                this.$message.error("创建模块失败")
                            }
                        })
                    } else {  //校验失败
                        return false;
                    }
                });
            },





            // 添加页面 弹窗
            addModulePopup(){

                this.addModuleData = {
                    api_module_name: "",
                    api_module_describe: "",
                    api_project_id: this.projectId,

                };
                this.addModuledialogFormVisible=true;


            },

            handleNodeClick(data) {
                this.currentServiceId = data.id;
            },


            //编辑模块
            editModule(){
                let req = JSON.parse(JSON.stringify(this.editModuleData));

                this.$refs.editPageFormRef.validate((valid) => {

                    console.log(this.projectId);
                    if (valid) { // 代表校验通过
                        updateSingleApiModuleRequest(this.moduleId, req).then(data => {
                            console.log(data)
                            if (true === data.data.success) {
                                this.getSingleAPIProjectModule()
                                this.editModuledialogFormVisible = false;
                                this.$message.success("编辑页面成功")
                            } else {
                                this.$message.error("编辑页面失败")
                            }
                        })
                    } else {  //校验失败
                        return false;
                    }
                });

            },

            //编辑页面弹窗并获取单个项目
            editModulePopup(data){
                this.moduleId = data.id;
                this.editModuleData = data
                console.log(this.moduleId);


                // 获取单个页面信息
                getSingleApiModuleRequest(this.moduleId).then(data => {
                        console.log(data);
                        if (true === data.data.success) {
                            this.editModuleData.api_module_name = data.data.data.api_module_name;
                            this.editModuleData.api_module_describe = data.data.data.api_module_describe;
                            this.editModuleData.api_project_id = data.data.data.api_project
                            console.log("这是获取项目id")
                            this.editModuledialogFormVisible=true;


                        } else {
                            this.$message.error("获取接口失败")
                        }
                    }
                );

            },


            //删除单个项目
            deleteModulePopup(data){

                this.moduleId = data.id;

                deleteSingleApiModuleRequest(this.moduleId).then(data => {
                        console.log(data);
                        if (true === data.data.success) {
                            this.getSingleAPIProjectModule();
                            this.$message.success("删除页面成功")

                        } else {
                            this.$message.error("删除页面失败")
                        }
                    }
                );

            },


            //获取 单个API项目中包含得所有模块
            getSingleAPIProjectModule(){
                getSingleApiProjectModuleRequest(this.projectId, this.size_page, this.currentPage).then(data => {
                        if (true === data.data.success) {
                            console.log(data.data.data)
                            this.tableData = data.data.data.data;
                            this.total_module = data.data.data.total_module
                        } else {
                            this.$message.error("获取接口失败")
                        }
                    }
                );
            },


          // 返回API项目列表
          returnProjectList(){
            this.$parent.apiProjectList();
          }



        },
        created() {
            console.log(this.apiProjectId)
            if ('enter'=== this.type){
                this.projectId = this.apiProjectId
                this.getSingleAPIProjectModule()

            }



        }



    };
</script>

<style scoped>

</style>