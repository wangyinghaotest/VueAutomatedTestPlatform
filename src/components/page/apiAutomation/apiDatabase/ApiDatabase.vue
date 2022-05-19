<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> API数据库
                </el-breadcrumb-item>
                <el-breadcrumb-item>API数据库</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-row>
            <el-button type="primary" @click="addDatabasePopup" >创建API数据库</el-button>
        </el-row>


        <el-dialog title="创建API数据库" :visible.sync="addApiDatabasedialogFormVisible">
            <el-form :model="addDatabaseData" :rules="rules" ref="addDatabaseFormRef">
                <el-form-item label="数据库名称" label-width="100px" prop="api_database_title">
                    <el-input v-model="addDatabaseData.api_database_title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Host" label-width="100px" prop="api_host">
                    <el-input v-model="addDatabaseData.api_host" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="端口号" label-width="100px" prop="api_port">
                    <el-input v-model="addDatabaseData.api_port" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户名" label-width="100px" prop="user">
                    <el-input v-model="addDatabaseData.user" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="100px" prop="password">
                    <el-input v-model="addDatabaseData.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="数据库表名" label-width="100px" prop="database">
                    <el-input v-model="addDatabaseData.database" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="debugAddDatabase">调试</el-button>
                <el-button @click="addApiDatabasedialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addApiDatabase">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑环境" :visible.sync="editApiDatabasedialogFormVisible">
            <el-form :model="editDatabaseData" :rules="rules" ref="editDatabaseFormRef">
                <el-form-item label="数据库名称" label-width="100px" prop="api_database_title">
                    <el-input v-model="editDatabaseData.api_database_title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Host" label-width="100px" prop="api_host">
                    <el-input v-model="editDatabaseData.api_host" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="端口号" label-width="100px" prop="api_port">
                    <el-input type="textarea" v-model="editDatabaseData.api_port" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户名" label-width="100px" prop="user">
                    <el-input v-model="editDatabaseData.user" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="100px" prop="password">
                    <el-input v-model="editDatabaseData.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="数据库表名" label-width="100px" prop="database">
                    <el-input v-model="editDatabaseData.database" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="debugDatabase">调试</el-button>
                <el-button @click="editApiDatabasedialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editDatabase">确 定</el-button>
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
                        prop="api_database_title"
                        label="数据库"
                        sortable
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="api_host"
                        label="Host"
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
                                @click="editApiDatabasePopup(scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="deleteDatabasePopup(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>
    </div>

</template>

<script>
    import {getDatabaseRequest, addDatabaseRequest,getSingleDatabaseRequest,updateSingleDatabaseRequest, deleteSingleDatabaseRequest, updateDebugDatabaseRequest} from '../../../../api/apiAutomation/apiDatabase';
    export default {
        name: 'ApiDatabase',
        data() {
            return {
                tableData: [],

                page: {
                    page: 1,
                    total: 0,
                    size: 10,

                },
                addApiDatabasedialogFormVisible: false,
                editApiDatabasedialogFormVisible: false,

                //数据库表字段
                addDatabaseData: {
                    api_database_title: "",
                    api_host: "",
                    api_port: "",
                    user: "",
                    password: "",
                    database: ""
                },
                editDatabaseData: {
                    api_database_title: "",
                    api_host: "",
                    api_port: "",
                    user: "",
                    password: "",
                    database: "",
                    id: 0,
                },
                databaseId: "",
                databaseData: "",

                rules: {
                    api_database_title: [
                        {required: true, message: '请输入数据库名称', trigger: 'blur'},
                    ],
                    api_host: [
                        {required: true, message: '请输入Host', trigger: 'blur'},
                    ],
                    api_port: [
                        {required: true, message: '请输入Port', trigger: 'blur'},
                    ],
                    user: [
                        {required: true, message: '请输入数据库用户名', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入数据库密码', trigger: 'blur'},
                    ],
                    database: [
                        {required: true, message: '请输入数据库表名', trigger: 'blur'},
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
                this.getDatabaseFun()
            },
            handleCurrentChange(index) {
                this.page.page = index;
                this.getDatabaseFun()
            },

            //获取所有API环境列表
            getDatabaseFun() {
                let req = {
                    page: this.page.page,
                    size: this.page.size,
                };
                getDatabaseRequest(req).then(data => {
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

            // 添加API环境
            addApiDatabase() {
                let req = JSON.parse(JSON.stringify(this.addDatabaseData));

                this.$refs.addDatabaseFormRef.validate((valid) => {
                    if (valid) { // 代表校验通过
                        addDatabaseRequest(req).then(data => {
                            console.log(data)
                            if (true === data.data.success) {
                                this.getDatabaseFun();
                                this.addApiDatabasedialogFormVisible = false;
                                this.$message.success("创建数据库配置成功")
                            } else {
                                this.$message.error("创建数据库配置失败")
                            }
                        })
                    } else {  //校验失败
                        return false;
                    }
                });
            },

            // 添加API数据库 弹窗
            addDatabasePopup(){
                this.addDatabaseData = {
                    api_database_title: "",
                    api_host: "",
                    api_port: "",
                };
                this.addApiDatabasedialogFormVisible=true;
            },

            handleNodeClick(data) {
                this.currentServiceId = data.id;
            },
            //新增-调试数据库是否连接
            debugAddDatabase(){
                let req = JSON.parse(JSON.stringify(this.addDatabaseData));

                this.$refs.addDatabaseFormRef.validate((valid) => {
                    if (valid) { // 代表校验通过
                        updateDebugDatabaseRequest(req).then(data => {
                            console.log(data)
                            if (true === data.data.success) {
                                this.$message.success("数据库配置调试成功")
                            } else {
                                this.$message.error("数据库配置调试失败")
                            }
                        })
                    } else {  //校验失败
                        return false;
                    }
                });



            },

            //编辑-调试数据库是否连接
            debugDatabase(){
                let req = JSON.parse(JSON.stringify(this.editDatabaseData));

                this.$refs.editDatabaseFormRef.validate((valid) => {
                    if (valid) { // 代表校验通过
                        updateDebugDatabaseRequest(req).then(data => {
                            console.log(data)
                            if (true === data.data.success) {
                                this.$message.success("数据库配置调试成功")
                            } else {
                                this.$message.error("数据库配置调试失败")
                            }
                        })
                    } else {  //校验失败
                        return false;
                    }
                });



            },


            //编辑API数据库
            editDatabase(){
                let req = JSON.parse(JSON.stringify(this.editDatabaseData));

                this.$refs.editDatabaseFormRef.validate((valid) => {

                    console.log(this.databaseId);
                    if (valid) { // 代表校验通过
                        updateSingleDatabaseRequest(this.databaseId, req).then(data => {
                            console.log(data)
                            if (true === data.data.success) {
                                this.getDatabaseFun();
                                this.editApiDatabasedialogFormVisible = false;
                                this.$message.success("编辑数据库配置成功")
                            } else {
                                this.$message.error("编辑数据库配置失败")
                            }
                        })
                    } else {  //校验失败
                        return false;
                    }
                });

            },

            //编辑数据库配置弹窗并获取单个数据库配置
            editApiDatabasePopup(data){

                this.databaseId = data.id;
                this.databaseData = data;
                this.editApiDatabasedialogFormVisible=true;

                console.log(this.databaseData);

                getSingleDatabaseRequest(this.databaseId).then(data => {
                        console.log(data);
                        if (true === data.data.success) {
                            this.editDatabaseData.api_database_title = data.data.data.api_database_title;
                            this.editDatabaseData.api_port = data.data.data.api_port;
                            this.editDatabaseData.api_host = data.data.data.api_host;
                            this.editDatabaseData.user = data.data.data.user;
                            this.editDatabaseData.password = data.data.data.password;
                            this.editDatabaseData.database = data.data.data.database;
                        } else {
                            this.$message.error("获取接口失败")
                        }
                    }
                );

            },


            //删除单个数据库配置
            deleteDatabasePopup(data){

                this.databaseId = data.id;
                this.databaseData = data;

                console.log(this.databaseId);
                console.log(this.databaseData);

                deleteSingleDatabaseRequest(this.databaseId).then(data => {
                        console.log(data);
                        if (true === data.data.success) {
                            this.getDatabaseFun();
                            this.$message.success("删除数据库配置成功")

                        } else {
                            this.$message.error("删除数据库配置失败")
                        }
                    }
                );

            },





        },
        created() {
            this.getDatabaseFun();
        }
    };
</script>

<style scoped>

</style>