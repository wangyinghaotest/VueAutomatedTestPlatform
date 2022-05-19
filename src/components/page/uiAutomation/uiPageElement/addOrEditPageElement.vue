<template>
    <div>
        <el-form  ref="pageElementFormRef" :model="uiPageElementForm" label-width="100px">
            <el-form-item label="选择UI项目">
                <el-select  v-model="uiPageElementForm.ui_project_id" placeholder="请选择项目"  id="selectUIProject" @change="getSelectUiPageElementFun">
                    <el-option v-for="item in projectSelect" :key="item.project_id" :value="item.project_id" :label="item.ui_project_name">
                    </el-option>
                </el-select>

            </el-form-item>

            <el-form-item label="选择UI页面">
                <el-select v-model="uiPageElementForm.ui_page_id"  placeholder="选择UI页面">
                    <el-option v-for="item in pageSelect" :key="item.ui_page_id" :value="item.ui_page_id"  :label="item.ui_page_name">
                    </el-option>
                </el-select>
            </el-form-item>
            <div class="page-element-class">
                <el-form-item>
                    <el-button type="primary" @click="savePageElement">保存</el-button>
                    <el-button type="default" @click="cancelSavePageElement">取消</el-button>
                </el-form-item>
            </div>
            <div>
                <el-table
                    :data="uiPageElementTableData"
                    style="width: 100%">s
                    <el-table-column label="页面元素名称" width="200">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.ui_page_element_name" controls-position="right" style="width: 100%"  placeholder="请输入内容"></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column label="页面元素" width="200">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.ui_page_element" controls-position="right" style="width: 100%" ></el-input>
                        </template>

                    </el-table-column>

                    <el-table-column prop="ui_page_element_table" label="定位方式" width="180">
                        <template slot-scope="scope">
                            <el-select size="small" filterable v-model="scope.row.ui_element_positioning_id"   placeholder="请选择定位方式">
                                <el-option v-for="item in positioningSelect" :key="item.id" :value="item.id" :label="item.positioning_name">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>

                    <el-table-column label="元素-多个" width="200">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.ui_page_element_more" controls-position="right" style="width: 100%" ></el-input>
                        </template>

                    </el-table-column>


                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" type="danger" @click="Delete(scope.$index, uiPageElementTableData)">删除</el-button>
                            <el-button size="mini" type="danger" @click="AddForm">添加行</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

        </el-form>
    </div>

</template>

<script>
import {
    getSelectUiPageElementRequest,
    addUiPageElementRequest,
    updateSingleUiPageElementRequest,
    getSingleUiPageElementRequest
} from '../../../../api/uiAutomation/uiPageElement';
import {getUiPositioningRequest} from '../../../../api/uiAutomation/uiPositioning';


export default {
    name: 'addOrEditPageElement',

    // type 用来标识是编辑还是创建
    props:['type', 'uiPageId', 'uiProjectId'],





    data() {
        return {
            uiPageElementForm: {
                ui_project_id: "",
                ui_page_id: "",
            },

            uiPageElementTableData:[
                {
                    ui_page_element_name: "",
                    ui_page_element: "",
                    ui_element_positioning_id: "",
                    ui_page_element_more: ""
                }

            ],

            projectSelect: [],
            pageSelect: [],
            indexNum: 0,

            positioningSelect: []




        }
    },
    mounted(){
        this.getSelectUiPageElementFun()

    },


    methods: {

        //获取所有项目-》页面
        getSelectUiPageElementFun(value){
            getSelectUiPageElementRequest().then(data =>{

                if (true === data.data.success) {
                    this.projectSelect = data.data.data;

                    let i = 0;
                    for (i = 0;i<this.projectSelect.length;i++) {
                        if (this.projectSelect[i].project_id === this.uiPageElementForm.ui_project_id){
                            this.indexNum = i;
                            break
                        }
                    }

                    this.pageSelect = this.projectSelect[this.indexNum].page_list;



                } else {
                    this.$message.error("获取接口失败")
                }
            })
        },

        // 保存
        savePageElement() {
            if ('add' === this.type){

                this.addUiPageElement()
            }else {
                this.editUiPageElement()
            }
        },

        // 取消
        cancelSavePageElement(){
            this.$emit('cancelSavePageElement')

        },

        //添加页面元素
        addUiPageElement(){
            let req = JSON.parse(JSON.stringify(this.uiPageElementForm));
            req.ui_page_element_data=this.uiPageElementTableData
            console.log(req);
            this.$refs.pageElementFormRef.validate((valid) => {

                console.log(this.$refs.pageElementFormRef.validate((valid)));
                if (valid) { // 代表校验通过
                    addUiPageElementRequest(req).then(data => {
                        console.log(data)
                        if (true === data.data.success) {
                            this.$message.success("添加页面元素成功")

                            this.$forceUpdate();
                            this.$emit('savePageElement')
                        } else {
                            this.$message.error("添加页面元素失败")
                        }
                    })
                } else {  //校验失败
                    return false;
                }



            });

        },

        //编辑页面元素
        editUiPageElement(){
            let req = JSON.parse(JSON.stringify(this.uiPageElementForm));
            req.ui_page_element_data=this.uiPageElementTableData

            this.$refs.pageElementFormRef.validate((valid) => {

                if (valid) { // 代表校验通过
                    console.log(req);
                    updateSingleUiPageElementRequest(this.uiPageElementForm.ui_page_id, req).then(data => {
                        console.log(data)
                        if (true === data.data.success) {
                            this.$message.success("编辑页面元素成功")

                            this.$forceUpdate();
                            this.$emit('savePageElement')
                        } else {
                            this.$message.error("编辑页面元素失败")
                        }
                    })
                } else {  //校验失败
                    return false;
                }

            });
        },

        //获取所有UI定位方式列表
        getUiPositioningFun() {
            getUiPositioningRequest().then(data => {
                console.log(data);
                if (true === data.data.success) {

                    this.positioningSelect = data.data.data;

                    console.log(this.positioningSelect)

                } else {
                    this.$message.error("获取接口失败")
                }
            })
        },


        //获取UI页面元素信息
        getSingleUiPageElementFun() {
            getSingleUiPageElementRequest(this.uiPageElementForm.ui_page_id).then(data => {
                console.log(data.data.data.length)
                if (true === data.data.success) {
                    if (data.data.data.length === 0){
                        return  true
                    }
                    else {
                        let ui_page_element_data = data.data.data.ui_page_element_data;

                        this.uiPageElementTableData = [...ui_page_element_data];
                    }

                } else {
                    this.$message.error("获取接口失败")
                }
            })
        },

        //添加行

        AddForm (index, row) {
            this.uiPageElementTableData.push(

                {
                    ui_page_element_name: "",
                    ui_page_element: "",
                    ui_element_positioning_id: "",
                    ui_page_element_more: ""
                }

            )


        },

        //删除行
        Delete(index, rows) {
            rows.splice(index, 1);

        }






    },

    created() {
        if ('edit'===this.type){
            this.uiPageElementForm = {
                ui_project_id: this.uiProjectId,
                ui_page_id: this.uiPageId,
            }
            this.getSingleUiPageElementFun()
            this.getUiPositioningFun()
        }

        if ('add'===this.type){
            this.getUiPositioningFun()
        }

    }
};
</script>

<style scoped>
.page-element-class{
    margin-bottom: 10px;
}

</style>