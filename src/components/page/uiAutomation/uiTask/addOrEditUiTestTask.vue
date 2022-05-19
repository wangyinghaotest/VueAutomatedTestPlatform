<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> UI任务管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>UI任务管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form  ref="uiTestTaskFormRef" :model="uiTestTaskForm" label-width="100px">
      <el-form-item label="UI测试任务"  prop="ui_test_task_name">
        <el-input v-model="uiTestTaskForm.ui_test_task_name"  class="ui_test_task_name" ></el-input>
      </el-form-item>

      <el-form-item label="描述" prop="describe">
        <el-input type="textarea" v-model="uiTestTaskForm.describe" style="width: 230px;"></el-input>
      </el-form-item>

      <el-form-item label="UI测试用例">
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


      <div class="page-element-class">
        <el-form-item>
          <el-button type="primary" @click="saveUiTestTask">保存</el-button>
          <el-button type="default" @click="cancelSaveUiTestTask">取消</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>


</template>

<script>
import { addUiTestTaskRequest, getUiCaseTreeRequest, getSingleUiTestTaskRequest,updateSingleUiTestTaskRequest } from '../../../../api/uiAutomation/uiTestTask';


export default {

  inject:['reload'],
  name: 'addOrEditUiTestTask',
  props: ['type', 'uiTestTaskId', 'uiTestTaskData', 'projectId'],
  data(){

    return{
      uiTestTaskForm: {
        ui_test_task_name: "",
        ui_test_task_id: "",
        describe: ""

      },
      count:"",//倒计时

      data: [],

      defaultProps: {
        label: "label",
        children: "children"

      },

      cases: [],
      defaultTask: [],
      ui_project_id: ""


    }


  },
  mounted() {


  },
  methods: {


    //保存测试任务
    saveUiTestTask(){
      if ('add'===this.type){
        this.addUiTestTask()

      }else {
        this.editUiTestTask()
      }


    },

    handleBucketClick(data){
      // console.log(data.ui_test_cases_id)

    },


    //取消保存测试任务
    cancelSaveUiTestTask(){

      this.$emit('cancelSaveUiTestTask')


    },

    //创建测试任务
    addUiTestTask(){
      this.uiTestTaskForm.ui_test_task_id = 0;

      let req = JSON.parse(JSON.stringify(this.uiTestTaskForm));

      console.log(this.$refs.tree.getCheckedNodes(true))
      let case_id = this.$refs.tree.getCheckedNodes(true)
      this.cases = []
      for (let i=0; i<case_id.length;i++){
        this.cases[i] = case_id[i].ui_test_cases_id

      }
      console.log("这是cases", this.cases)

      req.cases = this.cases
      req.ui_project_id =  this.ui_project_id


      console.log("这是获取到的",req);
      this.$refs.uiTestTaskFormRef.validate((valid) => {

        console.log(this.$refs.uiTestTaskFormRef.validate((valid)));
        if (valid) { // 代表校验通过
          addUiTestTaskRequest(req).then(data => {
            console.log(data)
            if (true === data.data.success) {
              this.$message.success("添加UI测试任务成功")
              this.$forceUpdate();
              this.$emit('saveUiTestTask')


            } else {
              this.$message.error("添加UI测试任务失败")
              this.$emit('saveUiTestTask')

            }
          })
        } else {  //校验失败
          return false;
        }

      });

    },

    //编辑测试任务
    editUiTestTask(){

      let req = JSON.parse(JSON.stringify(this.uiTestTaskForm));

      console.log(this.$refs.tree.getCheckedNodes(true))
      let case_id = this.$refs.tree.getCheckedNodes(true)
      this.cases = []
      for (let i=0; i<case_id.length;i++){
        this.cases[i] = case_id[i].ui_test_cases_id

      }
      console.log("这是cases", this.cases)

      req.cases = this.cases
      req.ui_project_id =  this.ui_project_id



      console.log("这是获取到的",req);
      this.$refs.uiTestTaskFormRef.validate((valid) => {
        console.log("这是id：",this.uiTestTaskForm.ui_test_task_id)
        console.log(this.$refs.uiTestTaskFormRef.validate((valid)));
        if (valid) { // 代表校验通过
          updateSingleUiTestTaskRequest(this.uiTestTaskForm.ui_test_task_id,req).then(data => {
            console.log(data)
            if (true === data.data.success) {
              this.showAddOrEditUiTestCase = false;
              this.$message.success("编辑UI测试任务成功")

              this.$forceUpdate();
            } else {
              this.$message.error("编辑UI测试任务失败")
            }
          })
        } else {  //校验失败
          return false;
        }
        this.$emit('saveUiTestTask')


      });
    },

    //获取测试用例树形结构
    getUiCaseTreeFun(){
      console.log("zhesahoidshasd",this.ui_project_id)
      getUiCaseTreeRequest(this.ui_project_id).then(data =>{
        if (true === data.data.success){
          let uiTestTask = data.data.data;
          let req = JSON.parse(JSON.stringify(uiTestTask));
          console.log("uiTestTask：", req)
          for(var i =0;i<req.length;i++){
            let children = req[i].children
            req[i].label = req[i].ui_project_name

            for(var j=0;j<children.length;j++){
              console.log(children.length)
              req[i].children[j].label = req[i].children[j].ui_test_case_name
              req[i].children[j].id = req[i].children[j].ui_test_cases_id
            }
          }
          console.log("uiTestTask222222222：", req)
          this.data = req
        }else {
          this.$message.info("获取接口失败")
        }

      })

    },

    // 获取单独测试任务信息
    getSingleUiTestTaskFun() {
      getSingleUiTestTaskRequest(this.uiTestTaskForm.ui_test_task_id).then(data =>{
        if (true === data.data.success){
          let uiTestTask = data.data.data;
          console.log(uiTestTask)


          let req = JSON.parse(JSON.stringify(uiTestTask));
          console.log("uiTestTask2333333333333：", req.cases)


          this.defaultTask = JSON.parse(data.data.data.cases)
          console.log(this.defaultTask)

          console.log(typeof (this.defaultTask))


          console.log("这是默认选中返回得数据：", this.defaultTask)



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
      console.log("编辑测试任务222222")
      console.log(this.uiTestTaskData)
      this.ui_project_id = this.projectId
      this.uiTestTaskForm = {
        ui_test_task_name: this.uiTestTaskData.ui_test_task_name,
        ui_test_task_id: this.uiTestTaskData.id,
        describe: this.uiTestTaskData.describe

      }
      console.log("编辑测试任务")
      console.log("编辑测试任务",this.uiTestTaskForm.ui_test_task_id )
      this.getUiCaseTreeFun()
      this.getSingleUiTestTaskFun()




    }

    if ('add'===this.type){
      console.log("新增测试任务", this.projectId)
      this.ui_project_id = this.projectId

      this.getUiCaseTreeFun()



    }




  },
};
</script>

<style scoped>
.ui_test_task_name{
  width: 230px;
}

</style>