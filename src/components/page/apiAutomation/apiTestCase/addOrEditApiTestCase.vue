<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> API项目
                </el-breadcrumb-item>
                <el-breadcrumb-item>API模块</el-breadcrumb-item>
                <el-breadcrumb-item>API测试用例</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form ref="apiTestCaseFormRef" :model="apiTestCaseForm" label-width="120px" size="medium">
            <el-form-item label="API测试用例">
                <el-input v-model="apiTestCaseForm.api_test_case_name"  class="api_test_case_name"></el-input>
            </el-form-item>
            <el-form-item label="API接口文档地址">
                <el-input v-model="apiTestCaseForm.api_documentation"  class="api_documentation"></el-input>
            </el-form-item>
            <el-form-item label="域名">
                <el-select  v-model="api_environment"  placeholder="请选择域名"  id="selectApiEnvironment" @change="getSelectApiEnvironmentFun">
                    <el-option v-for="item in environmentSelect" :key="item.id" :value="item.id" :label="item.api_environment_name">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="请求地址">
                <el-input placeholder="请输入请求地址" v-model="apiTestCaseForm.api_url" class="input-with-select">
                    <el-select v-model="api_method" slot="prepend" placeholder="请选择" class="address">
                        <el-option v-for="option in api_method_options" :key="option.value" :label="option.text" :value="option.value">
                        </el-option>
                    </el-select>
                </el-input>
                <el-button @click="SendRequest">发送请求</el-button>
                <el-drawer
                    title="请求结果!"
                    :visible.sync="drawer"
                    size="60%">
                    <el-tabs style="height: 300px;width: 1620px;margin-left: 8px; " >
                        <el-tab-pane label="请求信息">
                            <el-collapse v-model="activeNames" style="height: 400px; width: 500px;">
                                <el-collapse-item title="请求地址">
                                    <p>{{requestsForm.requests_url}}</p>
                                </el-collapse-item>

                                <el-collapse-item title="headers" name="2" style="width: 500px;">
                                    <!--                                    <el-input-->
                                    <!--                                        type="textarea"-->
                                    <!--                                        :autosize="{ minRows: 10, maxRows: 15}"-->
                                    <!--                                        v-model="requestsForm.requests_headers"-->
                                    <!--                                        :readonly="true"-->
                                    <!--                                        style="min-height: 54px;height: 222px;width: 532px;">-->
                                    <!--                                    </el-input>-->
                                    <json-viewer :value="requestsForm.requests_headers" :expand-depth=5 copyable style="overflow-y: auto;position: absolute;width: 500px;height: 100%;"></json-viewer>

                                </el-collapse-item>
                                <el-collapse-item title="body" name="3" style="width: 500px;">
                                    <json-viewer :value="requestsForm.requests_payload" :expand-depth=5 copyable style="overflow-y: auto;position: absolute;width: 500px;height: 100%;"></json-viewer>
                                    <!--                                    <pre>{{JSON.stringify(requestsForm.requests_payload,  null, 4)}}</pre>-->
                                </el-collapse-item>
                            </el-collapse>
                        </el-tab-pane>
                        <el-tab-pane label="响应信息">
                            <el-collapse v-model="activeNames" style="height: 500px; width: 500px;">
                                <el-collapse-item title="响应结果" name="1" style="width: 500px;">
                                    <!--                  <el-input-->
                                    <!--                      type="textarea"-->
                                    <!--                      :autosize="{ minRows: 9, maxRows: 10}"-->
                                    <!--                      :readonly="true"-->
                                    <!--                      placeholder="请输入内容"-->
                                    <!--                      v-model="requestsForm.response_message"-->
                                    <!--                      style="min-height: 54px;height: 222px;width: 532px;">-->
                                    <!--                  </el-input>-->
                                    <!--                                    <textarea style="margin: 0px; width: 498px; height: 394px;">{{JSON.parse(requestsForm.response_message,  null, 4)   }}</textarea>-->
                                    <json-viewer :value="requestsForm.response_message" :expand-depth=5 copyable style="overflow-y: auto;position: absolute;width: 500px;height: 100%;"></json-viewer>

                                    <!--                  <pre class="pre_json">{{JSON.parse(requestsForm.response_message,  null, 4)   }}</pre>-->
                                </el-collapse-item>
                                <el-collapse-item title="响应时间" name="2" style="width: 500px;">
                                    <p>{{requestsForm.response_time}}</p>
                                </el-collapse-item>
                                <el-collapse-item title="状态码" name="3" style="width: 500px;">
                                    <p>{{requestsForm.requests_status_code}}</p>
                                </el-collapse-item>
                            </el-collapse>
                        </el-tab-pane>
                        <el-tab-pane label="断言结果">
                            <el-collapse v-model="activeNames" style="width: 500px;">
                                <el-collapse-item title="断言结果" name="1">
                                    <p>{{requestsForm.api_assert}}</p>
                                </el-collapse-item>

                            </el-collapse>
                        </el-tab-pane>
                        <el-tab-pane label="参数提取" >
                            <el-collapse v-model="activeNames" style="width: 500px;">
                                <el-collapse-item title="参数提取" name="1">
                                    <!--                  <textarea style="margin: 0px; height: 240px; width: 385px;">{{requestsForm.api_variable_results}}</textarea>-->
                                    <json-viewer :value="requestsForm.api_variable_results" :expand-depth=5></json-viewer>

                                </el-collapse-item>
                            </el-collapse>
                        </el-tab-pane>
                    </el-tabs>
                </el-drawer>
            </el-form-item>
            <el-form-item label="请求参数">
                <el-tabs :tab-position="tabPosition" style="height: 300px;width: 1500px;margin-left: 0px;">
                    <el-tab-pane label="Header请求头">
                        <el-input type="textarea" placeholder="请输入JSON格式参数" :rows="10" v-model="apiTestCaseForm.api_headers" style="min-height: 31px;width: 532px;height: 212px;"></el-input>
                    </el-tab-pane>
                    <el-tab-pane label="Params">
                        <div>
                            <el-table
                                :data="apiParameterData"
                                style="width: 70%"
                            >
                                <el-table-column prop="api_parameter_name" label="参数名称">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.api_parameter_name" placeholder="" controls-position="right"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="api_must_parameter" label="必填">
                                    <template slot-scope="scope">
                                        <el-switch
                                            v-model="scope.row.api_must_parameter"
                                            active-color="#13ce66"
                                            inactive-color="#ff4949"
                                            active-value="true"
                                            inactive-value="false"
                                            @change="api_must_switch($event,scope.row.api_must_parameter)"
                                        >
                                        </el-switch>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="api_parameter_value" label="参数值">
                                    <template slot-scope="scope" >
                                        <el-input v-model="scope.row.api_parameter_value" placeholder="" controls-position="right" ></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="api_field_describe" label="字段描述">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.api_field_describe" placeholder="" controls-position="right"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button @click="AddParameterRow">添加行</el-button>
                                        <el-button size="mini" type="danger" @click="DeleteParameter(scope.$index, apiParameterData)" style="width: 68px;padding-top: 9px;padding-bottom: 9px;margin-left: 10px;">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="Body" style="width: 500px;">
                        <div>
                            <el-radio-group v-model="apiTestCaseForm.api_parameter_types"
                                            @change='radioChange($event, apiTestCaseForm.api_parameter_types)'>
                                <el-radio :label="1" value="1">form-data</el-radio>
                                <el-radio :label="2" value="2">JSON</el-radio>
                                <el-radio :label="3" value="3">x-www-form-urlencoded</el-radio>
                                <el-radio :label="4" value="4">none</el-radio>
                            </el-radio-group>
                        </div>
                        <div style="min-height: 31px;width: 532px;height: 212px;top: 10px;">
                            <el-input type="textarea" placeholder="请输入JSON格式参数" :rows="10" v-model="apiTestCaseForm.api_parameter_body" style="min-height: 32px;margin-top: 10px;">
                            </el-input>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="断言">
                        <div>
                            <el-table
                                :data="assertionsData"
                                style="width: 45%"
                                max-height="200">

                                <el-table-column prop="api_assert_type" label="断言类型">
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.api_assert_type" placeholder="请选择">
                                            <el-option v-for="api_assert_type_option in api_assert_type_options" :key="api_assert_type_option.value" :label="api_assert_type_option.text" :value="api_assert_type_option.value">
                                            </el-option>
                                        </el-select>
                                    </template>

                                </el-table-column>
                                <el-table-column label="数据库">
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.database_options" placeholder="请选择数据库"  @change="getSelectDatabaseFun" :clearable="true">
                                            <el-option v-for="database_option in database_options" :key="database_option.id" :label="database_option.api_database_title" :value="database_option.id">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="database_sql" label="数据库语句">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.database_sql" controls-position="right" ></el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="api_assert_text" label="断言(Value)">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.api_assert_text" controls-position="right" ></el-input>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="参数提取">
                        <div>
                            <el-table
                                :data="apiParameterExtractionData"
                                style="width: 90%"
                                max-height="200">

                                <el-table-column prop="api_value_variable" label="提取表达式" width="500">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.api_value_variable" placeholder="请用 英文‘点’逐层 '.' " controls-position="right" style="width: 453px" ></el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="api_key_variable" label="变量名称" width="500">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.api_key_variable" placeholder="请用  ${xxx}  命名" controls-position="right" style="width: 453px" ></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="api_variable_results" label="变量结果" width="250px">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.api_variable_results" placeholder="变量结果" controls-position="right" style="width: 200px" ></el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button @click="AddParameterExtractionRow">添加行</el-button>
                                        <el-button size="mini" type="danger" @click="DeleteParameterExtraction(scope.$index, apiParameterExtractionData)" style="margin-left: 0px; margin-right: 13px; padding-right: 28px; text-align: center; ">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-form-item>
            <el-form-item size="large">
                <el-button type="primary" @click="saveApiTestCase">保存</el-button>
                <el-button @click="cancelSaveApiTestCase">取消</el-button>
            </el-form-item>

        </el-form>

    </div>


</template>

<script>
import {getApiEnvironmentRequest } from '../../../../api/apiAutomation/apiEnvironment';
import {getDatabaseRequest} from '../../../../api/apiAutomation/apiDatabase';

import {addApiTestCaseRequest, updateSingleApiTestCaseRequest, getSingleApiTestCaseRequest, deBugApiTestCaseRequest} from '../../../../api/apiAutomation/apiTestCase';
import Vue from 'vue'
import JsonViewer from 'vue-json-viewer'
Vue.use(JsonViewer)


export default {
    name: 'addOrEditApiTestCase',
    // type 用来标识是编辑还是创建
    props:['type', 'apiTestCaseId', 'apiTestCaseData', 'apiModuleId'],
    data() {
        return {
            drawer: false,
            gridData: [],
            api_method_options: [
                { text: 'GET', value: 1 },
                { text: 'POST', value: 2 },
                { text: 'PUT', value: 3 },
                { text: 'DELETE', value: 4 },
            ],
            api_method: '',
            api_module_id: '',


            api_assert_type_options: [
                { text: '包含',
                    value: 1
                },
                { text: '匹配',
                    value: 2
                },
                { text: '数据库校验',
                    value: 3
                },
                { text: '状态码',
                    value: 4
                },
            ],
            database_options: [],

            api_environment: '',
            api_environment_options:[
                {
                    api_environment_describe:'',
                    api_environment_name: '',
                    api_title: '',
                    id: ''

                }
            ],

            requestsForm: {
                requests_url: "",
                requests_headers: "",
                requests_payload: "null",
                requests_status_code: "",
                response_message: "null",
                response_time: "",
                api_assert: "null",
                api_assert_type: "",
                api_variable_results: [
                    {
                        api_variable_results: ""

                    }
                ],

            },


            apiTestCaseForm: {
                api_test_case_name: "",
                api_documentation: "",
                api_url: "",
                api_parameter_types: 2,
                // api_headers: "{\"Content-Type\": \"application/json\"}",
                api_headers: "{\"Content-Type\": \"application/json\",\n" +
                    "\"authorization\": \"Bearer ${Token}\"\n" +
                    "}",
                api_parameter_body: "{}",
                api_parameter: "{}",
                api_test_case_id: "",
            },
            tabPosition: 'top',
            environmentSelect: [],


            // 断言
            assertionsData:[
                {
                    api_assert_type: 4,
                    api_assert_text: "200",
                    database_sql: '',
                    database_options: '',

                }
            ],
            api_assert_text: '',

            apiParameterExtractionData:[
                {
                    api_value_variable: "",
                    api_key_variable: "",
                    api_variable_results: ""

                }
            ],

            apiParameterData:[
                {
                    api_parameter_name: "",
                    api_must_parameter: "",
                    api_parameter_value: "",
                    api_field_describe: ""

                }
            ],
            activeNames: "",


        };
    },

    methods: {

        radioChange(api_parameter_types){
            console.log(api_parameter_types)

        },

        saveApiTestCase() {
            if ('add' === this.type){
                this.addApiTestCase()
            }else {
                this.editApiTestCase()
            }
        },

        api_must_switch(index,api_must_parameter){

            console.log(api_must_parameter)
        },

        // 取消
        cancelSaveApiTestCase(){
            this.$parent.cancelSaveApiTestCase();

        },

        //添加Api测试用例
        addApiTestCase(){
            let req = JSON.parse(JSON.stringify(this.apiTestCaseForm));
            req.api_method = this.api_method;
            req.api_assert_type = this.assertionsData[0].api_assert_type;
            req.api_assert_text = this.assertionsData[0].api_assert_text;
            req.database_sql = this.assertionsData[0].database_sql;
            req.dataBase_id = this.assertionsData[0].database_options;
            req.api_parameter_extraction = this.apiParameterExtractionData
            req.api_environment_id = this.api_environment
            req.api_module_id = this.apiModuleId
            req.api_parameter = this.apiParameterData

            this.$refs.apiTestCaseFormRef.validate((valid) => {
                    console.log(this.$refs.apiTestCaseFormRef.validate((valid)));
                    if (valid) { // 代表校验通过
                        addApiTestCaseRequest(req).then(data => {
                            console.log(data)
                            if (true === data.data.success) {
                                this.$message.success("添加Api测试用例成功")
                                this.$parent.saveApiTestCase();

                            } else {
                                this.$message.error(data.data.error.message)
                            }
                        })
                    } else {  //校验失败
                        return false;
                    }

                }
            );

        },




        //编辑Api测试用例
        editApiTestCase(){
            let req = JSON.parse(JSON.stringify(this.apiTestCaseForm));
            req.api_method = this.api_method;
            req.api_assert_type = this.assertionsData[0].api_assert_type;
            req.api_assert_text = this.assertionsData[0].api_assert_text;
            req.api_assert_text = this.assertionsData[0].api_assert_text;
            req.database_sql = this.assertionsData[0].database_sql;
            req.dataBase_id = this.assertionsData[0].database_options;
            req.api_environment_id = this.api_environment
            req.api_module_id =  this.api_module_id
            req.api_parameter_extraction = this.apiParameterExtractionData
            req.api_parameter = this.apiParameterData
            console.log("这是获取到的xxxxxxxxxxxxxxxx",req);
            this.$refs.apiTestCaseFormRef.validate((valid) => {
                if (valid) { // 代表校验通过
                    updateSingleApiTestCaseRequest(this.apiTestCaseData.id, req).then(data => {
                        if (true === data.data.success) {
                            this.$message.success("编辑Api测试用例成功")

                            this.$parent.saveApiTestCase();

                        } else {
                            this.$message.error(data.data.error.message)
                        }
                    })
                } else {  //校验失败
                    return false;
                }
            });
        },


        // 获取单个API测试用例
        getSingleApiTestCaseFun() {
            getSingleApiTestCaseRequest(this.apiTestCaseForm.api_test_case_id).then(data => {
                if (true === data.data.success) {
                    let apiTestCase = data.data.data;
                    let api_parameter_extraction = data.data.data.api_parameter_extraction
                    let api_parameter = data.data.data.api_parameter
                    this.apiTestCaseForm = {...apiTestCase }
                    this.api_method = data.data.data.api_method

                    if (0 === api_parameter.length){
                        console.log(api_parameter.length)

                    } else {
                        this.apiParameterData = api_parameter
                    }


                    this.assertionsData = [
                        {
                            api_assert_type : apiTestCase.api_assert_type,
                            api_assert_text : apiTestCase.api_assert_text,
                            database_sql : apiTestCase.database_sql,
                            database_options : apiTestCase.dataBase,


                        }
                    ]
                    if (0 === api_parameter_extraction.length){
                        console.log(api_parameter_extraction.length)

                    } else {
                        this.apiParameterExtractionData = JSON.parse(JSON.stringify(api_parameter_extraction));
                    }

                    this.database_id = apiTestCase.database
                    this.database_sql = data.data.data.database_sql
                    this.api_environment = data.data.data.api_environment
                    this.api_module_id = data.data.data.api_module


                } else {
                    this.$message.error("获取接口失败")
                }
            })
        },

        //获取数据库
        getSelectDatabaseFun(){
            getDatabaseRequest().then(data =>{
                if (true === data.data.success) {
                    this.database_options = data.data.data;
                } else {
                    this.$message.error("获取接口失败")
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

        //添加参数提取行
        AddParameterExtractionRow(index, row){
            this.apiParameterExtractionData.push(
                {
                    api_value_variable: "",
                    api_key_variable: "",
                    api_variable_results: ""
                }
            )

        },

        //添加参数行
        AddParameterRow(index, row){
            this.apiParameterData.push(
                {
                    api_parameter_name: "",
                    api_must_parameter: false,
                    api_parameter_value: "",
                    api_field_describe: ""

                }
            )

        },

        //删除参数提取行
        DeleteParameterExtraction(index, rows){

            if (1 === this.apiParameterExtractionData.length){
                this.$message.error("至少保留一行")

            } else {
                rows.splice(index, 1);
            }
        },

        //删除参数行
        DeleteParameter(index, rows){
            if (1 === this.apiParameterData.length){
                console.log(this.apiParameterData.length)
                this.$message.error("至少保留一行")

            } else {
                rows.splice(index, 1);
            }
        },

        // 发送请求
        SendRequest(){
            let req = JSON.parse(JSON.stringify(this.apiTestCaseForm));
            req.api_method = this.api_method;
            req.api_assert_type = this.assertionsData[0].api_assert_type;
            req.api_assert_text = this.assertionsData[0].api_assert_text;
            req.api_environment_id = this.api_environment
            req.api_parameter_extraction = this.apiParameterExtractionData
            req.api_parameter = this.apiParameterData
            deBugApiTestCaseRequest(req).then(data =>{
                if (true === data.data.success) {
                    this.$message.success("调试Api测试用例成功")
                    this.jsonData = data.data.data.response_message
                    this.requestsForm.requests_url = data.data.data.api_url
                    this.requestsForm.requests_headers = data.data.data.api_header
                    this.requestsForm.requests_payload = data.data.data.api_body
                    this.requestsForm.requests_status_code = data.data.data.api_code
                    this.requestsForm.response_message = this.jsonData
                    this.requestsForm.response_time = data.data.data.response_time
                    this.requestsForm.api_assert = data.data.data.api_assert
                    this.requestsForm.api_variable_results = data.data.data.api_parameter_extraction
                    this.apiParameterExtractionData = this.requestsForm.api_variable_results


                }
                if (false === data.data.success){
                    this.$message.error(data.data.error.message)
                }
            })
            this.drawer = true

        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },

    },

    created() {
        console.log(this.apiTestCaseData)
        if ('edit'===this.type){
            this.getSelectApiEnvironmentFun()
            this.getSelectDatabaseFun()
            this.apiTestCaseForm.api_test_case_id =  this.apiTestCaseData.id

            this.getSingleApiTestCaseFun()



        }

        if ('add'===this.type){
            this.getSelectApiEnvironmentFun()
            this.getSelectDatabaseFun()
            console.log("这是模块id", this.apiModuleId)
        }

    },




};
</script>

<style scoped>
.api_test_case_name{
    width: 215px;
}
.address{
    width: 100px;
}
.input-with-select{
    width: 1000px;
}
.parameter{
    width: 1000px;
}
.assertions{
    width: 300px;
}
.requests_url{
    background: #00d1b2;
}
.pre_json{
    outline: 1px solid #ccc; padding: 5px; margin: 5px;
    white-space: pre-wrap;
    word-wrap: break-word;
    width: 500px;
    height: auto;


}
.api_documentation{
    width: 500px;
}




</style>