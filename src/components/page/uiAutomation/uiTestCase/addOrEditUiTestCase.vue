<template>
    <div>
        <el-form  ref="uiTestCaseFormRef" :model="uiTestCaseForm"  :rules="rules" label-width="100px">

            <el-form-item label="UI用例名称" style="width: 100px;">
                <el-input v-model="uiTestCaseForm.ui_test_case_name"  class="ui_test_case_name"></el-input>
            </el-form-item>
            <el-form-item label="选择UI项目">
                <el-select  v-model="uiTestCaseForm.ui_project_id"  placeholder="请选择项目"  id="selectUIProject" @change="getSelectUiTestCaseFun">
                    <el-option v-for="item in projectSelect" :key="item.project_id" :value="item.project_id" :label="item.ui_project_name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 4}"
                :readonly="true"
                placeholder="DEBUG结果"
                v-model="debugTextarea">
            </el-input>

            <div class="ui-case-class">
                <el-form-item style="margin-left: 100px;width: 600px;">
                    <el-button type="primary" @click="saveUiTestCase">保存</el-button>
                    <el-button type="primary" @click="deBugUiTestCase">调试</el-button>
                    <el-button type="default" @click="cancelSaveUiTestCase">取消</el-button>
                    <el-button type="default" @click="sorting(uiTestCaseTableData)">自动排序</el-button>
                </el-form-item>
            </div>

            <div>
                <el-table
                    :data="uiTestCaseTableData"
                    style="width: 100%">

                    <el-table-column prop="ui_page_id" label="UI页面" width="180">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.ui_page_id" filterable placeholder="选择UI页面" @change="getSelectUIPageElement(scope.row)">
                                <el-option v-for="item in pageSelect" :key="item.ui_page_id" :value="item.ui_page_id"  :label="item.ui_page_name">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>

                    <el-table-column prop="ui_page_element_id" width="180" label="选择UI页面元素">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.ui_page_element_id" filterable placeholder="选择UI页面元素" @change="handleSelectChange">
                                <el-option v-for="item in scope.row.ui_element_Select" :key="item.ui_page_element_id" :value="item.ui_page_element_id"  :label="item.ui_page_element_name">
                                </el-option>
                            </el-select>
                        </template>

                    </el-table-column>

                    <el-table-column prop="ui_element_operation_id" label="元素操作" width="180">
                        <template slot-scope="scope">
                            <el-select size="small" filterable v-model="scope.row.ui_element_operation_id"   placeholder="请选择元素操作">
                                <el-option v-for="item in uiElementOperationSelect" :key="item.id" :value="item.id" :label="item.elements_operation_title">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>

                    <el-table-column prop="elements_output" label="元素输出" width="200">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.elements_output" controls-position="right" style="width: 100%" ></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column prop="x_coordinates" label="X坐标" width="200">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.x_coordinates" controls-position="right" style="width: 50%" ></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column prop="y_coordinates" label="Y坐标" width="200">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.y_coordinates" controls-position="right" style="width: 50%" ></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column prop="waiting_time" label="等待时间" width="200">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.waiting_time" controls-position="right" style="width: 50%" ></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column prop="steps" label="操作步骤" width="200">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.steps" controls-position="right" style="width: 50%" ></el-input>
                        </template>
                    </el-table-column>


                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button @click="AddForm">添加行</el-button>
                            <el-button size="mini" type="danger" @click="Delete(scope.$index, uiTestCaseTableData)" style="margin-left: 0px; margin-right: 13px; padding-right: 28px; text-align: center; ">删除</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </div>
        </el-form>
    </div>

</template>

<script>

import {getUiElementOperationRequest} from '../../../../api/uiAutomation/uiElementOperation';
import {
    addUiTestCaseRequest,
    getSelectUiTestCaseRequest, getSingleUiTestCaseRequest,
    updateSingleUiTestCaseRequest,
    postDebugUiTestCaseRequest
} from '../../../../api/uiAutomation/uiTestCase';


export default {
    name: 'addOrEditUiTestCase',

    // type 用来标识是编辑还是创建
    props:['type', 'uiTestCaseId', 'uiTestCaseData'],

    data() {
        return {

            rules: {

                ui_page_element_id: [
                    { required: true, message: '请选择页面元素', trigger: 'change' }
                ],
            },
            debugTextarea: '',

            uiTestCaseForm: {
                ui_test_case_name: "",
                ui_project_id: "",
                ui_test_case_id: "",

            },

            uiTestCaseTableData:[
                {
                    elements_operation_title: "",
                    ui_page_id: "",
                    ui_page_element_id: "",
                    ui_element_operation_id: "",
                    elements_output: "",

                    x_coordinates: "",
                    y_coordinates: "",

                    waiting_time: "",
                    steps: "",

                }

            ],

            projectSelect: [],
            pageSelect: [],
            ui_element_Select: [],
            indexNum: 0,
            indexNum2: 0,

            uiElementOperationSelect: [],

            newData: []



        }
    },
    mounted(){
        this.getSelectUiTestCaseFun()

    },

    watch: {
        uiTestCaseForm: {
            deep: true,
            immediate: true,
            handler(val) {
                if (val.ui_project_id) {

                    getSelectUiTestCaseRequest().then(data =>{

                        if (true === data.data.success) {
                            this.$set(this, 'projectSelect', data.data.data)

                            for (let i = 0;i<this.projectSelect.length; i++) {
                                let obj = this.projectSelect[i]

                                if (obj.project_id === this.uiTestCaseForm.ui_project_id){
                                    this.pageSelect = obj.page_list;
                                    this.pageSelect.forEach((item)=> {
                                        this.getSelectUIPageElement()
                                    })

                                }
                            }

                            this.uiTestCaseTableData.forEach((item) => {
                                console.log(8888,  this.uiTestCaseTableData)
                                this.$set(item,'ui_element_operation_id', item.ui_element_operation_id?Number(item.ui_element_operation_id):'')
                            })

                            this.getUiElementOperationRequestFun()
                            // this.$forceUpdate();
                        } else {
                            this.$message.error("获取接口失败")
                        }
                    })



                }


            }
        }
    },


    methods: {

        //获取所有项目-》页面 --》页面元素
        getSelectUiTestCaseFun(value){

            getSelectUiTestCaseRequest().then(data =>{
                if (true === data.data.success) {
                    this.$set(this, 'newData', data.data.data)
                    this.$set(this, 'projectSelect', data.data.data)
                    for (let i = 0;i<this.projectSelect.length; i++) {
                        let obj = this.projectSelect[i]

                        if (obj.project_id === this.uiTestCaseForm.ui_project_id){
                            this.pageSelect = obj.page_list;

                            break
                        }
                    }

                } else {
                    this.$message.error("获取接口失败")
                }
            })
        },
        // 获取ui页面元素 下拉框
        getSelectUIPageElement(row){
            this.uiTestCaseTableData.forEach(utct=>{
                for (let i = 0;i<this.pageSelect.length; i++) {
                    var ui_page = this.pageSelect[i]

                    if (ui_page.ui_page_id === utct.ui_page_id){
                        this.$set(utct, 'ui_element_Select', ui_page.ui_element_list)
                    }
                }
            })

        },

        // 自动排序
        sorting(rows){
            for(let i=0;i<rows.length;i++){
                let steps
                steps = this.uiTestCaseTableData[i]['steps']= i
                console.log(steps)
            }
            console.log(this.uiTestCaseTableData)
        },

        handleSelectChange(val){
        },

        // 保存
        saveUiTestCase() {
            if ('add' === this.type){

                this.addUiTestCase()
            }else {
                this.editUiTestCase()
            }
        },

        // 取消
        cancelSaveUiTestCase(){
            this.$parent.cancelSaveUiTestCase();


        },

        //添加测试用例
        addUiTestCase(){
            let req = JSON.parse(JSON.stringify(this.uiTestCaseForm));
            req.ui_test_case_data=this.uiTestCaseTableData;
            console.log("这是table表单",this.uiTestCaseTableData)
            console.log("这是获取到的",req);
            this.$refs.uiTestCaseFormRef.validate((valid) => {

                console.log(this.$refs.uiTestCaseFormRef.validate((valid)));
                if (valid) { // 代表校验通过
                    addUiTestCaseRequest(req).then(data => {
                        console.log(data)
                        if (true === data.data.success) {
                            this.$message.success("添加UI测试用例成功")

                            this.$parent.saveUiTestCase();
                        }
                        else if (false === data.data.success){
                            this.$message.error(data.data.error.message)
                        }

                        else {
                            this.$message.error("添加UI测试用例失败")
                        }
                    })
                } else {  //校验失败
                    return false;
                }
            });

        },

        //编辑页面元素
        editUiTestCase(){
            let req = JSON.parse(JSON.stringify(this.uiTestCaseForm));
            req.ui_test_case_data=this.uiTestCaseTableData;
            console.log("这是table表单",this.uiTestCaseTableData)
            console.log("这是获取到的",req);
            this.$refs.uiTestCaseFormRef.validate((valid) => {
                if (valid) { // 代表校验通过
                    console.log(req);
                    updateSingleUiTestCaseRequest(this.uiTestCaseForm.ui_test_case_id, req).then(data => {
                        console.log(data)
                        if (true === data.data.success) {

                            this.$message.success("编辑页面元素成功")
                            this.$parent.saveUiTestCase();

                        }else if (false=== data.data.success){
                            this.$message.error(data.data.error.message)
                        }else {
                            this.$message.error("编辑页面元素失败")
                        }
                    })
                } else {  //校验失败
                    return false;
                }
            });
        },

        //获取所有UI元素操作列表
        getUiElementOperationRequestFun() {
            getUiElementOperationRequest().then(data => {
                console.log(data);
                if (true === data.data.success) {
                    this.uiTestCaseTableData.forEach(utct=>{
                        this.$set(utct, 'id', '')

                    })

                    this.uiElementOperationSelect = data.data.data;

                } else {
                    this.$message.error("获取接口失败")
                }
            })
        },

        //获取单个测试用例列表
        getSingleUiTestCaseFun() {
            getSingleUiTestCaseRequest(this.uiTestCaseForm.ui_test_case_id).then(data => {
                if (true === data.data.success) {
                    let uiTestCase = data.data.data.ui_test_case_data;

                    console.log("data数据",data.data.data)
                    console.log("获取单个测试用例数据",uiTestCase)

                    this.uiTestCaseTableData=[...uiTestCase];

                    console.log("ui_element_Select：", this.uiTestCaseTableData)

                } else {
                    this.$message.error("获取接口失败")
                }
            })
        },


        // 调试测试用例
        deBugUiTestCase(){
            let req = JSON.parse(JSON.stringify(this.uiTestCaseForm));
            req.ui_test_case_data=this.uiTestCaseTableData;
            this.$refs.uiTestCaseFormRef.validate((valid) => {
                if (valid) { // 代表校验通过
                    console.log(req);
                    this.$message.success("调试测试用例中")
                    postDebugUiTestCaseRequest(req).then(data => {
                        console.log(data)
                        if (true === data.data.success) {
                            this.debugTextarea = "调试测试用例成功"
                            this.$message.success("调试测试用例成功")
                        } else if (40000=== data.data.error.code){
                            this.$message.error("未知错误")
                        }else if (30000=== data.data.error.code){
                            this.$message.error(data.data.error.message)
                        }else {
                            this.debugTextarea = data.data.error.message.debug_results + ",  " + data.data.error.message.debug_results_message
                            this.$message.error("调试测试用例失败")
                        }
                    })
                } else {  //校验失败
                    return false;
                }
            });

        },


        //添加行
        AddForm (index, row) {

            //添加新的行数
            // this.uiTestCaseTableData.splice(index, 0, {})
            this.uiTestCaseTableData.push( {
                elements_operation_title: "",
                ui_page_id: "",
                ui_page_element_id: "",
                ui_element_operation_id: "",
                elements_output: "",
                x_coordinates: "",
                y_coordinates: "",
                waiting_time: "",
                steps: "",
            })
        },

        //删除行
        Delete(index, rows) {
            rows.splice(index, 1);

        }
    },

    created() {
        console.log(this.uiTestCaseData)
        if ('edit'===this.type){
            this.uiTestCaseForm = {
                ui_project_id: this.uiTestCaseData.ui_project_id,
                ui_test_case_name: this.uiTestCaseData.ui_test_case_name,
                ui_test_case_id: this.uiTestCaseData.id
            }
            this.getSingleUiTestCaseFun()


        }

        if ('add'===this.type){
            this.getUiElementOperationRequestFun()
        }

    },



};
</script>

<style scoped>
.ui_test_case_name{
    padding-left: 0px;
    border-left-width: 0px;
    padding-right: 0px;
    width: 501px;
    margin-left: 0px;
}
.ui-case-class{

    margin-bottom: 0px;
    width: 300px;

}

</style>