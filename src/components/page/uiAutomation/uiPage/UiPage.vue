<template>
    <div>
        <el-row>
            <el-button @click="returnProjectList" >返回</el-button>
            <el-button type="primary" @click="addPagePopup" >创建页面</el-button>
        </el-row>


        <el-dialog title="创建页面" :visible.sync="addPagedialogFormVisible">
            <el-form :model="addPageData" :rules="rules" ref="addPageFormRef">
                <el-form-item label="页面名称" label-width="100px" prop="ui_page_name">
                    <el-input v-model="addPageData.ui_page_name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="页面描述" label-width="100px" prop="ui_page_describe">
                    <el-input type="textarea" v-model="addPageData.ui_page_describe" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addPagedialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addPage">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑页面" :visible.sync="editPagedialogFormVisible">
            <el-form :model="editPageData" :rules="rules" ref="editPageFormRef">
                <el-form-item label="页面名称" label-width="100px" prop="ui_page_name">
                    <el-input v-model="editPageData.ui_page_name" autocomplete="off"></el-input>
                </el-form-item>


                <el-form-item label="页面描述" label-width="100px" prop="ui_page_describe">
                    <el-input type="textarea" v-model="editPageData.ui_page_describe" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editPagedialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editPage">确 定</el-button>
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
                    prop="ui_project_name"
                    label="项目名称"
                    sortable
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="ui_page_name"
                    label="页面名称"
                    sortable
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="ui_page_describe"
                    label="页面描述"
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
                            @click="editPagePopup(scope.row)">编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="deletePagePopup(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import {addUiPageRequest, deleteSingleUiPageRequest, updateSingleUiPageRequest, getSingleUiPageRequest, getSingleUiProjectPageRequest} from '../../../../api/uiAutomation/uiPage';


export default {
    name: 'UiPage',
    props: ['type', 'uiProjectId'],
    data() {
        return {
            tableData: [],

            page: {
                page: 1,
                total: 0,
                size: 10,

            },
            addPagedialogFormVisible: false,
            editPagedialogFormVisible: false,

            addPageData: {
                ui_page_name: "",
                ui_page_describe: "",
                ui_project_id: this.projectId,
            },

            projectSelect: [],

            projectSelectId: "",

            editPageData: {
                ui_page_name: "",
                ui_page_describe: "",
                ui_project_id: this.projectId,
                id: 0,
            },

            pageId: "",

            projectId: "",

            rules: {
                ui_page_name: [
                    {required: true, message: '请输入页面名称', trigger: 'blur'},
                ],
                ui_page_describe: [
                    {required: true, message: '请输入页面描述', trigger: 'blur'},
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
            this.getUiPageFun()
        },



        // 添加UI页面
        addPage() {
            let req = JSON.parse(JSON.stringify(this.addPageData));
            console.log(req)

            this.$refs.addPageFormRef.validate((valid) => {
                if (valid) { // 代表校验通过
                    addUiPageRequest(req).then(data => {
                        console.log(data)
                        if (true === data.data.success) {
                            this.addPagedialogFormVisible = false;

                            this.getSingleUiProjectPage()
                            this.$message.success("创建页面成功")
                        } else {
                            this.$message.error("创建页面失败")
                        }
                    })
                } else {  //校验失败
                    return false;
                }
            });
        },





        // 添加页面 弹窗
        addPagePopup(){

            this.addPageData = {
                ui_page_name: "",
                ui_page_describe: "",
                ui_project_id: this.projectId,

            };
            this.addPagedialogFormVisible=true;


        },

        handleNodeClick(data) {
            this.currentServiceId = data.id;
        },


        //编辑页面
        editPage(){
            let req = JSON.parse(JSON.stringify(this.editPageData));

            this.$refs.editPageFormRef.validate((valid) => {

                console.log(this.projectId);
                if (valid) { // 代表校验通过
                    updateSingleUiPageRequest(this.pageId, req).then(data => {
                        console.log(data)
                        if (true === data.data.success) {
                            this.getSingleUiProjectPage()
                            this.editPagedialogFormVisible = false;
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
        editPagePopup(data){
            this.pageId = data.id;
            this.editPageData = data
            console.log(this.pageId);


            // 获取单个页面信息
            getSingleUiPageRequest(this.pageId).then(data => {
                    console.log(data);
                    if (true === data.data.success) {
                        this.editPageData.ui_page_name = data.data.data.ui_page_name;
                        this.editPageData.ui_page_describe = data.data.data.ui_page_describe;
                        this.editPageData.ui_project_id = data.data.data.ui_project
                        this.editPagedialogFormVisible=true;


                    } else {
                        this.$message.error("获取接口失败")
                    }
                }
            );

        },


        //删除单个项目
        deletePagePopup(data){

            this.pageId = data.id;

            deleteSingleUiPageRequest(this.pageId).then(data => {
                    console.log(data);
                    if (true === data.data.success) {
                        this.getSingleUiProjectPage()
                        this.$message.success("删除页面成功")

                    } else {
                        this.$message.error("删除页面失败")
                    }
                }
            );

        },


        //获取 单个UI项目中包含得所有页面
        getSingleUiProjectPage(){
            getSingleUiProjectPageRequest(this.projectId).then(data => {
                    if (true === data.data.success) {
                        console.log(data.data.data)
                        this.tableData = data.data.data;
                    } else {
                        this.$message.error("获取接口失败")
                    }
                }
            );
        },


        //返回项目列表
        returnProjectList(){
            this.$parent.projectList();
        }



    },
    created() {
        console.log(this.uiProjectId)
        if ('enter'=== this.type){
            this.projectId = this.uiProjectId
            this.getSingleUiProjectPage()

        }



    }
};
</script>

<style scoped>


</style>