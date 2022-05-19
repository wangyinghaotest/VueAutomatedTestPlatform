<template>
  <div>

    <add-or-edit-api-task
        :type="opsType"
        :apiProjectId="currentApiTestTaskId"
        :apiTestTaskData="currentApiTestTaskData"
        :projectId = "projectId"
        @saveApiTestTask="saveApiTestTask"
        @cancelSaveApiTestTask="cancelSaveApiTestTask"
        v-if="showAddOrEditApiTestTask">

    </add-or-edit-api-task>

    <api-test-task-result
        :apiTestTaskId="currentApiTestTaskId"
        :apiTestTaskData="currentApiTestTaskData"
        v-else-if="showApiTestTaskResult">
    </api-test-task-result>

    <div v-else>
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-lx-calendar"></i> API任务管理
          </el-breadcrumb-item>
          <el-breadcrumb-item>API项目</el-breadcrumb-item>
          <el-breadcrumb-item>API任务</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-button @click="returnProjectList">返回</el-button>
        <el-button type="primary" @click="openAddApiTestTask" >创建API测试任务</el-button>
        <el-button @click="getApiTestTaskFun" >刷新</el-button>
      </el-row>
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
              prop="api_project_name"
              label="项目"
              sortable
              width="180">
          </el-table-column>
          <el-table-column
              prop="api_test_task_name"
              label="任务名称"
              sortable
              width="180">
          </el-table-column>
          <el-table-column
              prop="status"
              label="状态"
              sortable
              width="180">
          </el-table-column>
          <el-table-column
              prop="describe"
              label="描述"
              sortable
              width="180">
          </el-table-column>
          <el-table-column
              prop="update_time"
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
                  @click="openEditApiTestTask(scope.row)">编辑</el-button>
              <el-button
                  size="mini"
                  type="danger"
                  @click="deleteApiTestTask(scope.row)">删除</el-button>
              <el-button
                  size="mini"
                  type="danger"
                  @click="performApiTestTask(scope.row)">执行</el-button>
              <el-button
                  size="mini"
                  type="danger"
                  @click="reportApiTestTask(scope.row)">查看报告</el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>
    </div>

  </div>

</template>

<script>

import { getApiTestTaskRequest, deleteSingleApiTestTaskRequest, postPerformApiTaskRequest } from '../../../../api/apiAutomation/apiTestTask';
import addOrEditApiTask from './addOrEditApiTask';
import ApiTestTaskResult from './ApiTestTaskResult';

export default {
  name: 'ApiTask',
  inject:['reload'],
  props: ['type', 'apiProjectId'],
  data(){
    return{

      tableData: [],
      apiTestTaskId: "",

      showAddOrEditApiTestTask : false,

      showApiTestTaskResult: false,

      opsType: "add",

      //当前apiTestTaskId
      currentApiTestTaskId: 0,

      //当前 apiTestCase数据
      currentApiTestTaskData: {},
      projectId:""





    }
  },
  methods:{

    //获取该项目下的所有Api测试任务列表
    getApiTestTaskFun() {
      getApiTestTaskRequest(this.apiProjectId).then(data => {
        console.log(data);
        if (true === data.data.success) {
          this.tableData = data.data.data;

        } else {
          this.$message.error("获取接口失败")
        }
      })
    },



    // 添加测试任务
    openAddApiTestTask(){
      this.opsType = 'add';
      this.currentApiTestTaskId = 0;
      this.currentApiTestTaskData = {};

      this.showAddOrEditApiTestTask = true


    },

    // 编辑API测试任务
    openEditApiTestTask(data){
      this.opsType = 'edit';
      this.currentApiTestTaskId = data.id;
      this.currentApiTestTaskData = data;
      console.log(data)

      this.showAddOrEditApiTestTask = true;



    },

    //删除单个API测试任务
    deleteApiTestTask(data){
      this.apiTestTaskId = data.id
      deleteSingleApiTestTaskRequest(this.apiTestTaskId).then(data => {
        console.log(data)
        if (true === data.data.success){
          this.getApiTestTaskFun()
          this.$message.success("删除API测试任务成功")
        }
        else {
          this.$message.error("删除API测试任务失败")
        }
      })

    },

    //保存测试任务
    saveApiTestTask(){
      this.showAddOrEditApiTestTask = false
      this.getApiTestTaskFun()


    },

    // 取消保存测试任务
    cancelSaveApiTestTask(){
      this.showAddOrEditApiTestTask = false
      this.getApiTestTaskFun()

    },

    // 执行测试任务
    performApiTestTask(data){

      this.apiTestTaskId = data.id
      postPerformApiTaskRequest(this.apiTestTaskId).then(data => {
        console.log(data)
        if (true === data.data.success){
          this.getApiTestTaskFun()
          this.$message.success("执行测试任务成功")
        }
        else if(10200 === data.data.error.code.status){
          this.$message.error("当前有API任务正在执行！")

        }
        else {
          this.$message.error("执行API测试任务失败")
        }
      })
    },

    // 查看任务报告
    reportApiTestTask(data){
      this.currentApiTestTaskId = data.id;
      this.currentApiTestTaskData = data;
      console.log(data)
      this.showApiTestTaskResult = true

    },

    // 返回项目列表
    returnProjectList(){
      this.$parent.returnProject();

    },

    // 返回项目列表
    returnAPITaskList(){
      this.showApiTestTaskResult = false
      this.getApiTestTaskFun()
    }


  },
  components: {
    'add-or-edit-api-task': addOrEditApiTask,
    'api-test-task-result': ApiTestTaskResult

  },
  created() {
    if ('enter'=== this.type){
      this.projectId = this.apiProjectId
      this.getApiTestTaskFun()

    }
  }
};
</script>

<style scoped>

</style>