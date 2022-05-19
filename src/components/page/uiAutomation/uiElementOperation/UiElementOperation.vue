<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> UI元素操作
                </el-breadcrumb-item>
                <el-breadcrumb-item>UI元素操作</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-row>
            <el-button type="primary" @click="addUiElementOperationPopup" >创建UI元素操作</el-button>
        </el-row>


        <el-dialog title="创建UI元素操作" :visible.sync="addUiElementOperationdialogFormVisible">
            <el-form :model="addUiElementOperationData" :rules="rules" ref="addUiElementOperationFormRef">
                <el-form-item label="UI元素操作名称" label-width="width: 121px;" prop="elements_operation_title">
                    <el-input v-model="addUiElementOperationData.elements_operation_title" autocomplete="off" style="width: 500px; "></el-input>
                </el-form-item>
                <el-form-item label="UI元素操作方法" label-width="width: 121px;" prop="elements_operation_name">
                    <el-input v-model="addUiElementOperationData.elements_operation_name" autocomplete="off" style="width: 500px; "></el-input>
                </el-form-item>
                <el-form-item label="是否关联接口" label-width="width: 121px;" prop="elements_operation_associated_interface" style="left: 23px;">
                    <el-switch
                        v-model="elements_operation_associated_interface"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-value="true"
                        inactive-value="false"
                        @change="associated_interface_switch($event,elements_operation_associated_interface)"
                        style="left: 21px;"
                    >
                    </el-switch>
                </el-form-item>
                <el-form-item label="接口地址" label-width="width: 121px;" prop="elements_operation_api_url"
                              v-if="showApi_url">
                    <el-input v-model="addUiElementOperationData.elements_operation_api_url"
                              autocomplete="off" style="width: 500px;left: 51px;"
                    ></el-input>
                </el-form-item>
                <el-form-item label="UI元素操作描述" label-width="width: 121px;" prop="elements_operation_describe">
                    <el-input type="textarea" v-model="addUiElementOperationData.elements_operation_describe" autocomplete="off" style="width: 500px; margin-left: 10px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addUiElementOperationdialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUiElementOperation">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑UI元素操作" :visible.sync="editUiElementOperationdialogFormVisible">
            <el-form :model="editUiElementOperationData" :rules="rules" ref="editUiElementOperationFormRef">
                <el-form-item label="UI元素操作名称" label-width="width: 121px;" prop="elements_operation_title">
                    <el-input v-model="editUiElementOperationData.elements_operation_title" autocomplete="off" style="width: 500px; "></el-input>
                </el-form-item>
                <el-form-item label="UI元素操作方法" label-width="width: 121px;" prop="elements_operation_name">
                    <el-input v-model="editUiElementOperationData.elements_operation_name" autocomplete="off" style="width: 500px;"></el-input>
                </el-form-item>
                <el-form-item label="是否关联接口" label-width="width: 121px;" prop="elements_operation_associated_interface" style="left: 23px;">
                    <el-switch
                        v-model="elements_operation_associated_interface"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-value="true"
                        inactive-value="false"
                        @change="associated_interface_switch($event,elements_operation_associated_interface)"
                        style="left: 21px;"
                    >
                    </el-switch>
                </el-form-item>
                <el-form-item label="接口地址" label-width="width: 121px;" prop="elements_operation_api_url"
                              v-if="showApi_url">
                    <el-input v-model="editUiElementOperationData.elements_operation_api_url"
                              autocomplete="off" style="width: 500px;left: 51px;"
                    ></el-input>
                </el-form-item>
                <el-form-item label="UI元素操作描述" label-width="width: 121px;" prop="elements_operation_describe">
                    <el-input type="textarea" v-model="editUiElementOperationData.elements_operation_describe" autocomplete="off" style="width: 500px; margin-left: 10px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editUiElementOperationdialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUiElementOperation">确 定</el-button>
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
                    prop="elements_operation_title"
                    label="UI元素操作名称"
                    sortable
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="elements_operation_name"
                    label="UI元素操作方法"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="elements_operation_describe"
                    label="UI元素操作描述"
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
                            @click="editUiElementOperationPopup(scope.row)">编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="deleteUiElementOperationPopup(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!--            <el-pagination-->
            <!--                    @size-change="handleSizeChange"-->
            <!--                    @current-change="handleCurrentChange"-->
            <!--                    :current-page="currentPage"-->
            <!--                    :page-sizes="[10, 20, 30, 40]"-->
            <!--                    :page-size="pageSize"-->
            <!--                    layout="total, sizes, prev, pager, next, jumper"-->
            <!--                    :total="400">-->
            <!--            </el-pagination>-->
        </div>
    </div>

</template>

<script>
import {getUiElementOperationRequest, addUiElementOperationRequest,getSingleElementOperationRequest, updateUiElementOperationRequest, deleteSingleElementOperationRequest} from '../../../../api/uiAutomation/uiElementOperation';

export default {
    name: 'UiElementOperation',

    data() {
        return {
            tableData: [],
            elements_operation_associated_interface: "",
            showApi_url: false,

            currentPage:3,// 当前页码
            pageSize:10,// 每页大小
            total:1000,

            page: {
                page: 1,
                total: 0,
                size: 10,

            },
            addUiElementOperationdialogFormVisible: false,
            editUiElementOperationdialogFormVisible: false,

            addUiElementOperationData: {
                elements_operation_describe: "",
                elements_operation_title: "",
                elements_operation_name: "",
                elements_operation_api_url: "",

            },
            editUiElementOperationData: {
                elements_operation_describe: "",
                elements_operation_title: "",
                elements_operation_name: "",
                elements_operation_api_url: "",
                id: 0,
            },
            uiElementOperationId: "",
            uiElementOperationData: "",

            rules: {
                elements_operation_title: [
                    {required: true, message: '请输入UI元素操作名称', trigger: 'blur'},
                ],
                elements_operation_name: [
                    {required: true, message: '请输入UI元素操作方法', trigger: 'blur'},
                ],
            },
        }
    },
    methods: {

        associated_interface_switch(elements_operation_associated_interface){
            console.log(elements_operation_associated_interface)
            if (elements_operation_associated_interface === 'true') {
                this.showApi_url = true;
            }
            if (elements_operation_associated_interface === 'false'){
                this.showApi_url = false;
            }

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
            console.log("长度改变:"+val)
        },
        handleCurrentChange(val) {
            console.log("当前改变："+val)
        },

        //获取所有元素操作列表
        getUiElementOperationFun() {
            let req = {
                page: this.page.page,
                size: this.page.size,
            };
            getUiElementOperationRequest(req).then(data => {
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

        // 添加UI元素操作
        addUiElementOperation() {
            let req = JSON.parse(JSON.stringify(this.addUiElementOperationData));
            req.elements_operation_associated_interface = this.elements_operation_associated_interface

            this.$refs.addUiElementOperationFormRef.validate((valid) => {
                if (valid) { // 代表校验通过
                    addUiElementOperationRequest(req).then(data => {
                        console.log(data)
                        if (true === data.data.success) {
                            this.getUiElementOperationFun();
                            this.addUiElementOperationdialogFormVisible = false;
                            this.$message.success("创建UI元素操作成功")
                        } else {
                            this.$message.error("创建UI元素操作失败")
                        }
                    })
                } else {  //校验失败
                    return false;
                }
            });
        },

        // 添加元素操作 弹窗
        addUiElementOperationPopup(){
            this.addUiElementOperationData = {
                elements_operation_describe: "",
                elements_operation_title: "",
                elements_operation_name: "",
                elements_operation_api_url: "",
            };
            this.addUiElementOperationdialogFormVisible=true;
        },


        //编辑元素操作
        editUiElementOperation(){
            let req = JSON.parse(JSON.stringify(this.editUiElementOperationData));
            req.elements_operation_associated_interface = this.elements_operation_associated_interface

            this.$refs.editUiElementOperationFormRef.validate((valid) => {

                console.log(this.uiElementOperationId);
                if (valid) { // 代表校验通过
                    updateUiElementOperationRequest(this.uiElementOperationId, req).then(data => {
                        console.log(data)
                        if (true === data.data.success) {
                            this.getUiElementOperationFun();
                            this.editUiElementOperationdialogFormVisible = false;
                            this.$message.success("编辑UI元素操作成功")
                        } else {
                            this.$message.error("编辑UI元素操作失败")
                        }
                    })
                } else {  //校验失败
                    return false;
                }
            });

        },

        //编辑项目弹窗并获取单个项目
        editUiElementOperationPopup(data){

            this.uiElementOperationId = data.id;
            this.uiElementOperationData = data;
            this.editUiElementOperationdialogFormVisible=true;
            console.log("-------------------------");
            console.log(this.uiElementOperationId);
            console.log(this.uiElementOperationData);

            getSingleElementOperationRequest(this.uiElementOperationId).then(data => {
                    console.log(data);
                    if (true === data.data.success) {
                        this.editUiElementOperationData.elements_operation_title = data.data.data.elements_operation_title;
                        this.editUiElementOperationData.elements_operation_name = data.data.data.elements_operation_name;
                        this.editUiElementOperationData.elements_operation_describe = data.data.data.elements_operation_describe;
                        this.editUiElementOperationData.id = data.data.data.id;
                        this.editUiElementOperationData.elements_operation_api_url = data.data.data.elements_operation_api_url
                    } else {
                        this.$message.error("获取接口失败")
                    }
                }
            );

        },


        //删除单个项目
        deleteUiElementOperationPopup(data){

            this.uiElementOperationId = data.id;

            console.log(this.uiElementOperationId);


            deleteSingleElementOperationRequest(this.uiElementOperationId).then(data => {
                    console.log(data);
                    if (true === data.data.success) {
                        this.getUiElementOperationFun();
                        this.$message.success("删除UI定位成功")

                    } else {
                        this.$message.error("删除UI定位失败")
                    }
                }
            );

        },
    },
    created() {
        this.getUiElementOperationFun();
    }







};
</script>

<style scoped>

</style>