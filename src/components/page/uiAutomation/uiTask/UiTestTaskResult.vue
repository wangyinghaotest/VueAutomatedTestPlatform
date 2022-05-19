<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> UI任务管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>UI项目</el-breadcrumb-item>
        <el-breadcrumb-item>UI任务</el-breadcrumb-item>
        <el-breadcrumb-item>UI测试报告</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row>
      <el-button @click="returnUITaskList">返回</el-button>
      <el-button type="primary" @click="DownloadWebScriptTemplate">下载脚本模板</el-button>
    </el-row>
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
            prop="ui_test_result_name"
            label="测试报告名称"
            sortable
            width="180">
        </el-table-column>
        <el-table-column
            prop="ui_error_total_number"
            label="失败总数"
            sortable
            width="180">
        </el-table-column>
        <el-table-column
            prop="ui_successful_total_number"
            label="成功总数"
            sortable
            width="180">
        </el-table-column>
        <el-table-column
            prop="ui_total_number"
            label="用例总数"
            width="180">
        </el-table-column>
        <el-table-column
            prop="create_time"
            label="时间"
            width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                type="danger"
                @click="checkReport(scope.row)">查看报告</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="deleteSingleRequest(scope.row)">删除</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="DownloadWebScript(scope.row)">下载脚本</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-dialog
          :visible.sync="ui_ResultVisible"
          :fullscreen="false"
          :destroy-on-close="true"
          :show-close="true"
          width="70%">

        <div class="schart-box">
          <div class="content-title">测试结果</div>
          <schart class="schart" canvasId="pie" :options="options3"></schart>
        </div>
        <div>
          <el-table
              :data="ui_result_visible_table_data"
              style="width: 65%">
            <el-table-column
                prop="id"
                label="id"
                sortable
                width="180">
            </el-table-column>
            <el-table-column
                prop="ui_test_case_name"
                label="测试用例名称"
                sortable
                width="180">
            </el-table-column>
            <el-table-column
                prop="ui_error"
                label="失败"
                sortable
                width="180">
            </el-table-column>
            <el-table-column
                prop="ui_successful"
                label="成功"
                sortable
                width="180">
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="danger"
                    @click="check_abnormal(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

      </el-dialog>
    </div>
    <div>
      <el-dialog
          :visible.sync="UiTestAbnormalResult"
          :destroy-on-close="true"
          :show-close="true"
          :modal="true"
          title="异常消息"
          width="50%">
        <span>{{ui_test_abnormal}}</span>

      </el-dialog>
    </div>



  </div>

</template>

<script>
import {
  getUiCaseResultRequest,
  postUiCaseCheckResultRequest,
  getUiTestAbnormalRequest,
  deleteSingleUiTestResultRequest,
} from '../../../../api/uiAutomation/uiTestTask';
import Schart from 'vue-schart';
import { fileUrl } from '../../../../api/common/common';

export default {
  name: 'UiTestTaskResult',
  props: ['uiTestTaskData'],
  components: {
    Schart
  },

  data(){

    return{
      ui_result_visible_table_data: [],
      ui_test_abnormal_result_id: "",
      ui_test_abnormal: "",
      ui_test_script: "",

      tableData: [],
      testTaskId: "",
      result_id: "",
      ui_ResultVisible: false,
      UiTestAbnormalResult: false,
      ui_Result: "",
      options3: {
        type: 'pie',
        title: {
          text: '测试结果'
        },
        legend: {
          position: 'left'
        },
        bgColor: '#fbfbfb',
        labels: ['成功', '失败'],
        datasets: [
          {
            data: [334,22]
          },
        ]
      },



    }



  },
  mounted() {
    this.getUiCaseResultFun()


  },
  methods: {

    // 下载脚本
    DownloadWebScript(data){

      let download_web_script;
      this.result_id = data.id
      download_web_script = fileUrl + "api/backend/ui_test_task/check_result/ui_test_web_script/" + this.result_id + "/"
      console.log(download_web_script)

      return window.location.href = download_web_script

    },

    DownloadWebScriptTemplate(){

      let download_web_script_Template;
      download_web_script_Template = fileUrl + "api/backend/ui_test_task/check_result/ui_test_web_script/download_web_script_template/"
      console.log(download_web_script_Template)

      return window.location.href = download_web_script_Template

    },


    // 获取测试报告列表
    getUiCaseResultFun() {
      getUiCaseResultRequest(this.testTaskId).then(data =>{
        if (true === data.data.success){
          this.tableData = data.data.data.data;

        }else {
          this.$message.error("获取接口失败")
        }

      })
    },

    // 删除单独测试报告
    deleteSingleRequest(data) {
      this.result_id = data.id
      deleteSingleUiTestResultRequest(this.testTaskId, this.result_id).then(data =>{
        if (true === data.data.success){
          this.tableData = data.data.data.data;
          this.$message.success("删除成功")
          this.getUiCaseResultFun()

        }else {
          this.$message.error("获取接口失败")
        }

      })
    },


    // 查看报告详情
    checkReport(data){

      this.result_id = data.id

      postUiCaseCheckResultRequest(this.result_id).then(data =>{

        if (true === data.data.success){

          this.options3.datasets[0].data = data.data.data.case_result_total
          this.ui_result_visible_table_data = data.data.data.data

          this.ui_ResultVisible=true


        }else {
          this.$message.error("获取接口失败")
        }

      })

    },

    // 查看异常
    check_abnormal(data){
      this.ui_test_abnormal_result_id = data.id

      getUiTestAbnormalRequest(this.ui_test_abnormal_result_id).then(data =>{
            if (true === data.data.success){
              console.log(data.data.data.ui_test_abnormal)

              this.ui_test_abnormal = data.data.data.ui_test_abnormal
              this.UiTestAbnormalResult = true

            }else {
              this.$message.error("获取接口失败")
            }
          }
      )
    },



    // 关闭测试报告弹窗
    closeReport(){
      this.ui_ResultVisible=false
    },

    // 返回任务列表
    returnUITaskList(){
      this.$parent.returnTaskList();
    },



  },
  created() {
    console.log(this.uiTestTaskData.id)
    this.testTaskId = this.uiTestTaskData.id

  }




};
</script>

<style scoped>
.schart-box {
  display: inline-block;
  margin: 20px;
}
.content-title {
  clear: both;
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
.schart {
  width: 600px;
  height: 400px;
}

.executive_information{
  width: 600px;
  height: 400px;

}

</style>