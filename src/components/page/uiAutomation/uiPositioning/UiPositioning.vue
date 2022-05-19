<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> UI定位
                </el-breadcrumb-item>
                <el-breadcrumb-item>UI定位</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-row>
            <el-button type="primary" @click="addPositioningPopup" >创建UI定位方式</el-button>
        </el-row>


        <el-dialog title="创建UI定位方式" :visible.sync="addPositioningPopupdialogFormVisible">
            <el-form :model="addPositioningData" :rules="rules" ref="addPositioningFormRef">
                <el-form-item label="UI定位方式名称" label-width="width: 121px;" prop="positioning_name">
                    <el-input v-model="addPositioningData.positioning_name" autocomplete="off" style="width: 500px; "></el-input>
                </el-form-item>
                <el-form-item label="UI定位方法" label-width="width: 121px;" prop="locating_method">
                    <el-input v-model="addPositioningData.locating_method" autocomplete="off" style="width: 500px;margin-left: 29px; "></el-input>
                </el-form-item>
                <el-form-item label="UI定位方式描述" label-width="width: 121px;" prop="describe">
                    <el-input type="textarea" v-model="addPositioningData.describe" autocomplete="off" style="width: 500px; margin-left: 10px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addPositioningPopupdialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addPositioning">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑UI定位方式" :visible.sync="editPositioningPopupdialogFormVisible">
            <el-form :model="editPositioningData" :rules="rules" ref="editPositioningFormRef">
                <el-form-item label="UI定位方式名称" label-width="width: 121px;" prop="positioning_name">
                    <el-input v-model="editPositioningData.positioning_name" autocomplete="off" style="width: 500px; "></el-input>
                </el-form-item>
                <el-form-item label="UI定位方法" label-width="width: 121px;" prop="locating_method">
                    <el-input v-model="editPositioningData.locating_method" autocomplete="off" style="width: 500px;margin-left: 29px; "></el-input>
                </el-form-item>
                <el-form-item label="UI定位方式描述" label-width="width: 121px;" prop="describe">
                    <el-input type="textarea" v-model="editPositioningData.describe" autocomplete="off" style="width: 500px; margin-left: 10px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editPositioningPopupdialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editPositioning">确 定</el-button>
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
                        prop="positioning_name"
                        label="UI定位方式名称"
                        sortable
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="locating_method"
                        label="UI定位方法"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="describe"
                        label="UI定位方式描述"
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
                        <!--                        <el-button-->
                        <!--                                size="mini"-->
                        <!--                                @click="editProjectPopup(scope.$index, scope.row)">编辑</el-button>-->
                        <el-button
                                size="mini"
                                @click="editPositioningPopup(scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="deletePositioningPopup(scope.row)">删除</el-button>
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
    import {getUiPositioningRequest, addUiPositioningRequest, getSingleUiPositioningRequest,updateUiPositioningRequest, deleteSingleUiPositioningRequest} from '../../../../api/uiAutomation/uiPositioning';

    export default {
        name: 'UiPositioning',

        data() {
            return {
                tableData: [],

                page: {
                    page: 1,
                    total: 0,
                    size: 10,

                },
                addPositioningPopupdialogFormVisible: false,
                editPositioningPopupdialogFormVisible: false,

                addPositioningData: {
                    positioning_name: "",
                    locating_method: "",
                    describe: ""
                },
                editPositioningData: {
                    positioning_name: "",
                    locating_method: "",
                    describe: "",
                    id: 0,
                },
                positioningId: "",
                positioningData: "",

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
                this.getUiPositioningFun()
            },
            handleCurrentChange(index) {
                this.page.page = index;
                this.getUiPositioningFun()
            },

            //获取所有项目列表
            getUiPositioningFun() {
                let req = {
                    page: this.page.page,
                    size: this.page.size,
                };
                getUiPositioningRequest(req).then(data => {
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

            // 添加UI定位方法
            addPositioning() {
                let req = JSON.parse(JSON.stringify(this.addPositioningData));

                this.$refs.addPositioningFormRef.validate((valid) => {
                    if (valid) { // 代表校验通过
                        addUiPositioningRequest(req).then(data => {
                            console.log(data)
                            if (true === data.data.success) {
                                this.getUiPositioningFun();
                                this.addPositioningPopupdialogFormVisible = false;
                                this.$message.success("创建UI定位成功")
                            } else {
                                this.$message.error("创建UI定位失败")
                            }
                        })
                    } else {  //校验失败
                        return false;
                    }
                });
            },

            // 添加项目 弹窗
            addPositioningPopup(){
                this.addPositioningData = {
                    positioning_name: "",
                    locating_method: "",
                    describe: ""
                };
                this.addPositioningPopupdialogFormVisible=true;
            },


            //编辑项目
            editPositioning(){
                let req = JSON.parse(JSON.stringify(this.editPositioningData));

                this.$refs.editPositioningFormRef.validate((valid) => {

                    console.log(this.positioningId);
                    if (valid) { // 代表校验通过
                        updateUiPositioningRequest(this.positioningId, req).then(data => {
                            console.log(data)
                            if (true === data.data.success) {
                                this.getUiPositioningFun();
                                this.editPositioningPopupdialogFormVisible = false;
                                this.$message.success("编辑UI定位成功")
                            } else {
                                this.$message.error("编辑UI定位失败")
                            }
                        })
                    } else {  //校验失败
                        return false;
                    }
                });

            },

            //编辑项目弹窗并获取单个项目
            editPositioningPopup(data){

                this.positioningId = data.id;
                console.log(this.positioningId)
                this.positioningData = data;
                this.editPositioningPopupdialogFormVisible=true;
                console.log(this.positioningData);

                getSingleUiPositioningRequest(this.positioningId).then(data => {

                        if (true === data.data.success) {
                            this.editPositioningData.positioning_name = data.data.data.positioning_name;
                            this.editPositioningData.locating_method = data.data.data.locating_method;
                            this.editPositioningData.describe = data.data.data.describe;
                        } else {
                            this.$message.error("获取接口失败")
                        }
                    }
                );

            },


            //删除单个项目
            deletePositioningPopup(data){

                this.positioningId = data.id;
                this.positioningData = data;

                console.log(this.positioningId);
                console.log(this.positioningData);

                deleteSingleUiPositioningRequest(this.positioningId).then(data => {
                        console.log(data);
                        if (true === data.data.success) {
                            this.getUiPositioningFun();
                            this.$message.success("删除UI定位成功")

                        } else {
                            this.$message.error("删除UI定位失败")
                        }
                    }
                );

            },
        },
        created() {
            this.getUiPositioningFun();
        }




    };




</script>

<style scoped>

</style>