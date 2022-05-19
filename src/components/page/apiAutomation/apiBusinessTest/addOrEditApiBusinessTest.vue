<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> API项目
                </el-breadcrumb-item>
                <el-breadcrumb-item>API业务测试</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form  ref="apiBusinessTestFormRef" :model="apiBusinessTestForm" label-width="100px">

            <el-form-item label="API业务测试名称" style="width: 120px;">
                <el-input v-model="apiBusinessTestForm.api_business_test_name"  class="api_business_test_name"></el-input>
            </el-form-item>
            <el-form-item label="选择API项目">
                <el-select  v-model="apiBusinessTestForm.api_project_id"  filterable placeholder="请选择项目"  id="selectApiProject" @change="getSelectApiBusinessTestFun">
                    <el-option v-for="item in projectSelect" :key="item.project_id" :value="item.project_id" :label="item.api_project_name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="业务测试描述">
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="apiBusinessTestForm.api_business_test_describe"
                    class="business_test_describe">
                </el-input>
            </el-form-item>
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="API调式结果"
                    :autosize="{ minRows: 3, maxRows: 4}"
                    :readonly="true"
                    v-model="api_business_test_debug"
                    class="api_business_test_debug">
                </el-input>

            <el-form-item label="调试域名">
                <el-select  v-model="api_environment"  placeholder="请选择域名"  id="selectApiEnvironment" @change="getSelectApiEnvironmentFun">
                    <el-option v-for="item in environmentSelect" :key="item.id" :value="item.id" :label="item.api_environment_name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="debugApiBusinessTest">调试</el-button>
            </el-form-item>

            <div>
                <el-table
                    :data="apiBusinessTestTableData"
                    style="width: 66%"
                    row-key="api_test_case_id"
                >
                    <el-table-column prop="api_module_id" label="API模块" width="300">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.api_module_id" filterable placeholder="选择API模块" @change="getSelectApiModule(scope.row)" class="api_module">
                                <el-option v-for="item in apiModuleSelect" :key="item.api_module_id" :value="item.api_module_id"  :label="item.api_module_name">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>

                    <el-table-column prop="api_test_case_id" width="300" label="选择API测试用例">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.api_test_case_id" filterable placeholder="选择API测试用例" @change="handleSelectChange" class="api_test_case">
                                <el-option v-for="item in scope.row.apiTestCaseSelect" :key="item.api_test_case_id" :value="item.api_test_case_id"  :label="item.api_test_case_name">
                                </el-option>
                            </el-select>
                        </template>

                    </el-table-column>

                    <el-table-column prop="steps" label="操作步骤" width="300">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.steps" controls-position="right" style="width: 50%" ></el-input>
                        </template>
                    </el-table-column>


                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button @click="AddForm">添加行</el-button>
                            <el-button size="mini" type="danger" @click="Delete(scope.$index, apiBusinessTestTableData)" style="margin-left: 0px; margin-right: 13px; padding-right: 28px; text-align: center; ">删除</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </div>

            <div class="page-element-class">
                <el-form-item>
                    <el-button type="primary" @click="saveApiBusinessTest">保存</el-button>
                    <el-button type="default" @click="cancelSaveApiBusinessTest">取消</el-button>
                    <el-button type="default" @click="sorting(apiBusinessTestTableData)">自动排序</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script>
import {
    getSelectApiBusinessTestRequest,
    addApiBusinessTestRequest,
    updateBusinessTestRequest,
    getSingleApiBusinessTestRequest,
    postApiBusinessTestDeBugRequest
} from '../../../../api/apiAutomation/apiBusinessTest';
import Sortable from 'sortablejs';
import { getApiEnvironmentRequest } from '../../../../api/apiAutomation/apiEnvironment';
export default {
    name: 'addOrEditApiBusinessTest',
    // type 用来标识是编辑还是创建
    props:['type', 'apiBusinessTestId', 'apiBusinessTestData', 'apiProjectId'],
    data() {
        return {
            apiBusinessTestForm: {
                api_business_test_name: "",
                api_project_id: "",
                api_business_test_id: "",
                api_business_test_describe: "",

            },
            api_business_test_debug: "",

            apiBusinessTestTableData:[
                {
                    api_module_id: "",
                    api_test_case_id: "",
                    steps: "",
                }

            ],

            projectSelect: [],
            apiModuleSelect: [],
            apiTestCaseSelect: [],
            indexNum: 0,
            indexNum2: 0,

            newData: [],
            api_environment: '',
            api_environment_options:[
                {
                    api_environment_describe:'',
                    api_environment_name: '',
                    api_title: '',
                    id: ''

                }
            ],
            environmentSelect: [],



        }
    },
    mounted(){
        this.getSelectApiBusinessTestFun()
        this.rowDrop()
        this.getSelectApiEnvironmentFun()

    },

    watch: {
        apiBusinessTestForm: {
            deep: true,
            immediate: true,
            handler(val) {
                if (val.api_project_id) {

                    getSelectApiBusinessTestRequest(this.apiBusinessTestForm.api_project_id).then(data =>{

                        if (true === data.data.success) {
                            this.$set(this, 'projectSelect', data.data.data)

                            for (let i = 0;i<this.projectSelect.length; i++) {
                                let obj = this.projectSelect[i]

                                if (obj.project_id === this.apiBusinessTestForm.api_project_id){
                                    this.apiModuleSelect = obj.module_list;
                                    this.apiModuleSelect.forEach((item)=> {
                                        this.getSelectApiModule()
                                    })

                                }
                            }

                        } else {
                            this.$message.error("获取接口失败")
                        }
                    })



                }


            }
        }
    },


    methods: {
        //行拖拽
        rowDrop() {
            const tbody = document.querySelector('.el-table__body-wrapper tbody')
            const _this = this
            Sortable.create(tbody, {
                onEnd({ newIndex, oldIndex }) {
                    const currRow = _this.apiBusinessTestTableData.splice(oldIndex, 1)[0]
                    _this.apiBusinessTestTableData.splice(newIndex, 0, currRow)
                }
            })
        },
        // 获取域名
        getSelectApiEnvironmentFun(){
            getApiEnvironmentRequest().then(data =>{
                if (true === data.data.success) {

                    this.environmentSelect = data.data.data;

                } else {
                    this.$message.error("获取接口失败")
                }
            })


        },

        //获取项目--模块下拉框
        getSelectApiBusinessTestFun(value){
            getSelectApiBusinessTestRequest(this.apiBusinessTestForm.api_project_id).then(data =>{

                if (true === data.data.success) {
                    this.$set(this, 'newData', data.data.data)
                    this.$set(this, 'projectSelect', data.data.data)
                    for (let i = 0;i<this.projectSelect.length; i++) {
                        let obj = this.projectSelect[i]

                        if (obj.project_id === this.apiBusinessTestForm.api_project_id){
                            this.apiModuleSelect = obj.module_list;

                            break
                        }
                    }

                } else {
                    this.$message.info("获取接口失败")
                }
            })
        },
        // 获取api模块--api测试用例 下拉框
        getSelectApiModule(row){
            this.apiBusinessTestTableData.forEach(utct=>{
                for (let i = 0;i<this.apiModuleSelect.length; i++) {
                    var api_module = this.apiModuleSelect[i]

                    if (api_module.api_module_id === utct.api_module_id){
                        this.$set(utct, 'apiTestCaseSelect', api_module.api_test_case_list)
                    }
                }
            })

        },

        handleSelectChange(val){
        },

        // 保存
        saveApiBusinessTest() {
            if ('add' === this.type){

                this.addApiBusinessTest()
            }else {
                this.editApiBusinessTest()
            }
        },

        // 调试业务测试 debug
        debugApiBusinessTest() {
            let req = JSON.parse(JSON.stringify(this.apiBusinessTestForm));
            for(let i=0;i<this.apiBusinessTestTableData.length;i++){
                let steps
                steps = this.apiBusinessTestTableData[i]['steps']= i
            }
            console.log(this.apiBusinessTestTableData)

            req.api_business_test_data=this.apiBusinessTestTableData;
            req.environment = this.api_environment

            this.$refs.apiBusinessTestFormRef.validate((valid) => {

                console.log(this.$refs.apiBusinessTestFormRef.validate((valid)));
                if (valid) { // 代表校验通过
                    postApiBusinessTestDeBugRequest(req).then(data => {
                        console.log(data)
                        if (true === data.data.success) {
                            console.log(data.data.data)
                            this.api_business_test_debug = data.data.data
                            this.$message.success(data.data.data)
                        } else {
                            this.api_business_test_debug = data.data.error.message
                            this.$message.error(data.data.error.message)
                        }
                    })
                } else {  //校验失败
                    return false;
                }

            });

        },

        // 取消
        cancelSaveApiBusinessTest(){
            this.$emit('cancelSaveApiBusinessTest')

        },
        // 自动排序
        sorting(rows){
            for(let i=0;i<rows.length;i++){
                let steps
                steps = this.apiBusinessTestTableData[i]['steps']= i
                console.log(steps)
                }
            console.log(this.apiBusinessTestTableData)
        },

        //添加业务测试用例
        addApiBusinessTest(){
            let req = JSON.parse(JSON.stringify(this.apiBusinessTestForm));
            for(let i=0;i<this.apiBusinessTestTableData.length;i++){
                let steps
                steps = this.apiBusinessTestTableData[i]['steps']= i
            }
            console.log(this.apiBusinessTestTableData)

            req.api_business_test_data=this.apiBusinessTestTableData;
            console.log("这是table表单",this.apiBusinessTestTableData)
            this.$refs.apiBusinessTestFormRef.validate((valid) => {

                console.log(this.$refs.apiBusinessTestFormRef.validate((valid)));
                if (valid) { // 代表校验通过
                    addApiBusinessTestRequest(req).then(data => {
                        console.log(data)
                        if (true === data.data.success) {
                            this.$message.success("添加Api业务测试成功")
                        } else {
                            this.$message.error("添加Api业务测试失败")
                        }
                    })
                } else {  //校验失败
                    return false;
                }

                this.$emit('saveApiBusinessTest')

            });

        },

        //编辑Api业务测试
        editApiBusinessTest(){
            let req = JSON.parse(JSON.stringify(this.apiBusinessTestForm));
            for(let i=0;i<this.apiBusinessTestTableData.length;i++){
                let steps
                steps = this.apiBusinessTestTableData[i]['steps']= i
            }
            req.api_business_test_data=this.apiBusinessTestTableData;
            console.log("这是table表单",this.apiBusinessTestTableData)
            this.$refs.apiBusinessTestFormRef.validate((valid) => {
                if (valid) { // 代表校验通过
                    console.log(req);
                    updateBusinessTestRequest(this.apiBusinessTestForm.api_business_test_id, req).then(data => {
                        console.log(data)
                        if (true === data.data.success) {

                            this.$message.success("编辑页面元素成功")
                            this.showAddOrEditApiBusinessTest = false;
                            this.$forceUpdate();
                            this.getApiBusinessTestFun()
                        } else {
                            this.$message.error("编辑页面元素失败")
                        }
                    })
                } else {  //校验失败
                    return false;
                }
                this.$emit('saveApiBusinessTest')
            });
        },


        //获取单个测试用例列表
        getSingleApiBusinessTestFun() {
            getSingleApiBusinessTestRequest(this.apiBusinessTestForm.api_business_test_id).then(data => {
                if (true === data.data.success) {
                    let apiBusinessTest = data.data.data.api_business_test_data;

                    console.log("data数据",data.data.data.api_business_test_data)

                    this.apiBusinessTestTableData=[...apiBusinessTest];

                    console.log("apiTestCaseSelect：", this.apiBusinessTestTableData)

                } else {
                    this.$message.error("获取接口失败")
                }
            })
        },


        //添加行
        AddForm () {
            this.apiBusinessTestTableData.push( {
                api_module_id: "",
                api_test_case_id: "",
                steps: "",

            })

        },

        //删除行
        Delete(index, rows) {
            rows.splice(index, 1);

        }
    },

    created() {
        console.log(this.apiBusinessTestData)
        if ('edit'===this.type){
            this.apiBusinessTestForm = {
                api_project_id: this.apiBusinessTestData.api_project_id,
                api_business_test_name: this.apiBusinessTestData.api_business_test_name,
                api_business_test_id: this.apiBusinessTestData.id,
                api_business_test_describe: this.apiBusinessTestData.api_business_test_describe
            }
            this.getSingleApiBusinessTestFun()


        }

        if ('add'===this.type){
            console.log("这是id", this.apiProjectId)
            this.apiBusinessTestForm = {
                api_project_id: this.apiProjectId
            }



        }

    },
};
</script>

<style scoped>
.api_business_test_name{
    padding-left: 0px;
    border-left-width: 0px;
    padding-right: 0px;
    width: 501px;
    margin-left: 0px;
}

.api_module{
    width: 100%;
}
.api_test_case{
    width: 100%;
}
.business_test_describe{
    padding-left: 0px;
    border-left-width: 0px;
    padding-right: 0px;
    width: 501px;
    margin-left: 0px;
}
.api_business_test_debug{
    padding-left: 0px;
    border-left-width: 0px;
    padding-right: 0px;
    width: 501px;
    min-height: 83px;
    height: 77px;
    left: auto;
    margin-left: 99px;
}
</style>