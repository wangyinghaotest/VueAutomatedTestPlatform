<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> API任务管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>API项目</el-breadcrumb-item>
                <el-breadcrumb-item>API任务</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form  ref="apiTestTaskFormRef" :model="apiTestTaskForm" label-width="100px">
            <el-form-item label="API测试任务"  prop="api_test_task_name">
                <el-input v-model="apiTestTaskForm.api_test_task_name"  class="api_test_task_name" ></el-input>
            </el-form-item>

            <el-form-item label="描述" prop="describe">
                <el-input type="textarea" v-model="apiTestTaskForm.describe" style="width: 230px;"></el-input>
            </el-form-item>
            <el-form-item label="域名">
                <el-select  v-model="apiTestTaskForm.api_environment_id"  placeholder="请选择域名"  id="selectApiEnvironment" @change="getSelectApiEnvironmentFun">
                    <el-option v-for="item in environmentSelect" :key="item.id" :value="item.id" :label="item.api_environment_name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="数据库">
                <el-select v-model="apiTestTaskForm.database_id" placeholder="请选择数据库"  @change="getSelectDatabaseFun" :clearable="true">
                    <el-option v-for="database_option in database_options" :key="database_option.id" :label="database_option.api_database_title" :value="database_option.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="API业务测试">
                <el-tree
                    :data="data"
                    show-checkbox
                    node-key="id"
                    :props="defaultProps"

                    ref="tree"
                    @check-change="handleBucketClick"
                    :default-expanded-keys="[]"
                    :default-checked-keys="defaultTask"

                    style="width: 500px;">
                </el-tree>
            </el-form-item>

            <el-form-item label="发送邮箱"  prop="api_send_email">
                <el-input v-model="apiTestTaskForm.api_send_email"  class="api_send_email" ></el-input>
            </el-form-item>

            <el-form-item label="企微监控"  prop="api_send_enterprise_wechat">
                <el-select v-model="apiTestTaskForm.api_send_enterprise_wechat" placeholder="请选择">
                    <el-option v-for="api_send_enterprise_wechat_option in api_send_enterprise_wechat_options" :key="api_send_enterprise_wechat_option.value" :label="api_send_enterprise_wechat_option.text" :value="api_send_enterprise_wechat_option.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="定时任务"  prop="timing_task_status">
                <el-switch
                    v-model="apiTestTaskForm.timing_task_status"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="true"
                    inactive-value="false"
                >
                </el-switch>
            </el-form-item>

<!--            <el-form-item label="起始时间">-->
<!--                <el-date-picker-->
<!--                    v-model="time_range"-->
<!--                    type="datetimerange"-->
<!--                    range-separator="至"-->
<!--                    start-placeholder="开始日期"-->
<!--                    end-placeholder="结束日期"-->
<!--                    value-format="yyyy-MM-dd"-->
<!--                >-->
<!--                </el-date-picker>-->
<!--            </el-form-item>-->

<!--            <el-form-item label="间隔时间">-->
<!--                <el-input placeholder="请输入天" v-model="apiTestTaskForm.time_interval_day" style="width: 150px;">-->
<!--                    <template slot="append">天</template>-->
<!--                </el-input>-->

<!--                <el-input-->
<!--                    placeholder="请输入时"-->
<!--                    v-model="apiTestTaskForm.time_interval_hours"-->
<!--                    style="width: 150px;"-->
<!--                >-->
<!--                    <template slot="append">时</template>-->
<!--                </el-input>-->
<!--                <el-input-->
<!--                    placeholder="请输入分"-->
<!--                    v-model="apiTestTaskForm.time_interval_minutes"-->
<!--                    style="width: 150px;"-->
<!--                >-->
<!--                    <template slot="append">分</template>-->
<!--                </el-input>-->
<!--                <el-input-->
<!--                    placeholder="请输入秒"-->
<!--                    v-model="apiTestTaskForm.time_interval_seconds"-->
<!--                    style="width: 150px;"-->
<!--                >-->
<!--                    <template slot="append">秒</template>-->
<!--                </el-input>-->

<!--            </el-form-item>-->


            <div class="page-element-class">
                <el-form-item>
                    <el-button type="primary" @click="saveApiTestTask">保存</el-button>
                    <el-button type="default" @click="cancelSaveApiTestTask">取消</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script>
import { getApiCaseTreeRequest, getSingleApiTestTaskRequest, addAPITestTaskRequest, updateSingleApiTestTaskRequest} from '../../../../api/apiAutomation/apiTestTask';
import { getApiEnvironmentRequest } from '../../../../api/apiAutomation/apiEnvironment';
import { getDatabaseRequest } from '../../../../api/apiAutomation/apiDatabase';

export default {
    inject:['reload'],
    name: 'addOrEditApiTask',
    props: ['type', 'apiTestTaskId', 'apiTestTaskData', 'projectId'],
    data(){

        return{
            apiTestTaskForm: {
                api_test_task_name: "",
                api_test_task_id: "",
                describe: "",
                api_send_email: "",
                api_send_enterprise_wechat: "",
                api_environment_id: "",
                database_id: "",
                time_interval_hours: '0',
                time_interval_minutes: '0',
                time_interval_seconds: '0',
                time_interval_day: '0',
                timing_task_status: '0',
            },
            time_range: [],
            api_send_enterprise_wechat_options: [
                { text: '请选择',
                    value: 0
                },
                { text: '是',
                    value: 1
                },
                { text: '否',
                    value: 2
                },
            ],
            api_environment_id: '',
            environmentSelect: [],
            database_options: [],
            count:"",//倒计时

            data: [],

            defaultProps: {
                label: "label",
                children: "children"

            },

            cases: [],
            defaultTask: [],
            api_project_id: ""


        }


    },
    mounted() {


    },
    methods: {


        //保存测试任务
        saveApiTestTask(){
            if ('add'===this.type){
                this.addApiTestTask()

            }else {
                this.editApiTestTask()
            }


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

        handleBucketClick(data){
            // console.log(data.api_test_cases_id)

        },

        //取消保存测试任务
        cancelSaveApiTestTask(){

            this.$emit('cancelSaveApiTestTask')


        },

        //创建测试任务
        addApiTestTask(){
            this.apiTestTaskForm.api_test_task_id = 0;

            let req = JSON.parse(JSON.stringify(this.apiTestTaskForm));

            console.log(this.$refs.tree.getCheckedNodes(true))
            let case_id = this.$refs.tree.getCheckedNodes(true)
            this.cases = []
            for (let i=0; i<case_id.length;i++){
                this.cases[i] = case_id[i].api_test_cases_id

            }
            req.cases = this.cases
            req.api_project_id =  this.api_project_id
            req.starting_time = this.time_range[0]
            req.end_time = this.time_range[1]


            this.$refs.apiTestTaskFormRef.validate((valid) => {

                if (valid) { // 代表校验通过
                    addAPITestTaskRequest(req).then(data => {
                        console.log(data)
                        if (true === data.data.success) {
                            this.showAddOrEditApiTestCase = false;
                            this.$message.success("添加API测试任务成功")
                            this.$emit('saveApiTestTask')

                        } else {
                            this.$message.error("添加APi测试任务失败")
                        }
                    })
                } else {  //校验失败
                    return false;
                }

            });

        },

        //编辑测试任务
        editApiTestTask(){

            let req = JSON.parse(JSON.stringify(this.apiTestTaskForm));
            let case_id = this.$refs.tree.getCheckedNodes(true)
            this.cases = []
            for (let i=0; i<case_id.length;i++){
                this.cases[i] = case_id[i].api_test_cases_id

            }
            req.cases = this.cases
            req.api_project_id =  this.api_project_id
            req.starting_time = this.time_range[0]
            req.end_time = this.time_range[1]
            this.$refs.apiTestTaskFormRef.validate((valid) => {
                if (valid) { // 代表校验通过
                    updateSingleApiTestTaskRequest(this.apiTestTaskForm.api_test_task_id,req).then(data => {
                        if (true === data.data.success) {
                            this.showAddOrEditApiTestCase = false;
                            this.$message.success("编辑API测试任务成功")
                            this.$emit('saveApiTestTask')

                        } else {
                            this.$message.error("编辑API测试任务失败")
                        }
                    })
                } else {  //校验失败
                    return false;
                }

            });
        },

        //获取测试用例树形结构
        getApiCaseTreeFun(){
            getApiCaseTreeRequest(this.api_project_id).then(data =>{
                if (true === data.data.success){
                    let apiTestTask = data.data.data;
                    let req = JSON.parse(JSON.stringify(apiTestTask));
                    for(var i =0;i<req.length;i++){
                        let children = req[i].children
                        req[i].label = req[i].api_project_name

                        for(var j=0;j<children.length;j++){
                            console.log(children.length)
                            req[i].children[j].label = req[i].children[j].api_test_case_name
                            req[i].children[j].id = req[i].children[j].api_test_cases_id
                        }
                    }
                    this.data = req
                }else {
                    this.$message.error("获取接口失败")
                }

            })

        },

        // 获取单独Api测试任务信息
        getSingleApiTestTaskFun() {
            getSingleApiTestTaskRequest(this.apiTestTaskForm.api_test_task_id).then(data =>{
                if (true === data.data.success){

                    this.defaultTask = JSON.parse(data.data.data.cases)

                }else {
                    this.$message.error("获取接口失败")
                }

            })
        },






        getCheckedKeys() {
            console.log(this.$refs.tree.getCheckedKeys());

        },
        setCheckedKeys(){
            this.$refs.tree.setCheckedKeys([]);
        }

    },
    created() {


        if ('edit'===this.type){
            this.api_project_id = this.projectId
            this.apiTestTaskForm = {
                api_test_task_name: this.apiTestTaskData.api_test_task_name,
                api_test_task_id: this.apiTestTaskData.id,
                describe: this.apiTestTaskData.describe,
                api_send_email: this.apiTestTaskData.api_send_email,
                api_send_enterprise_wechat: this.apiTestTaskData.api_send_enterprise_wechat,
                api_environment_id: this.apiTestTaskData.api_environment_id,
                database_id: this.apiTestTaskData.database_id,
                time_interval_hours: this.apiTestTaskData.time_interval_hours,
                time_interval_minutes: this.apiTestTaskData.time_interval_minutes,
                time_interval_seconds: this.apiTestTaskData.time_interval_seconds,
                time_interval_day: this.apiTestTaskData.time_interval_day,
                timing_task_status: this.apiTestTaskData.timing_task_status,
            }
            this.time_range = [this.apiTestTaskData.starting_time, this.apiTestTaskData.end_time]

            this.getApiCaseTreeFun()
            this.getSelectApiEnvironmentFun()
            this.getSelectDatabaseFun()
            this.getSingleApiTestTaskFun()




        }

        if ('add'===this.type){
            this.api_project_id = this.projectId
            this.getSelectApiEnvironmentFun()
            this.getSelectDatabaseFun()

            this.getApiCaseTreeFun()



        }




    },

};
</script>

<style scoped>
.api_test_task_name{
    width: 230px;
}
.api_send_email{
    width: 230px;
}

</style>