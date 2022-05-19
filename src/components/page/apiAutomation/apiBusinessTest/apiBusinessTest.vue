<template>
  <div>
    <add-or-edit-api-business-test
        :type="opsType"
        :apiBusinessTestId="currentApiBusinessTestId"
        :apiBusinessTestData="currentApiBusinessTestData"
        :apiProjectId = "apiProjectId"

        @saveApiBusinessTest="saveApiBusinessTest"
        @cancelSaveApiBusinessTest="cancelSaveApiBusinessTest"
        v-if="showAddOrEditApiBusinessTest">

    </add-or-edit-api-business-test>
    <div v-else>
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-lx-calendar"></i> API项目
          </el-breadcrumb-item>
          <el-breadcrumb-item>API业务测试</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-button @click="returnProjectList">返回</el-button>
        <el-button type="primary" @click="openAddBusinessTest" >创建API业务测试</el-button>
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
              label="项目名称"
              sortable
              width="180">
          </el-table-column>
          <el-table-column
              prop="api_business_test_name"
              label="Api业务测试"
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
                  @click="openEditApiBusinessTest(scope.row)">编辑</el-button>
              <el-button
                  size="mini"
                  type="danger"
                  @click="deleteApiBusinessTest(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>


  </div>

</template>


<script>
import { getApiBusinessTestRequest, deleteSingleApiBusinessTestRequest} from '../../../../api/apiAutomation/apiBusinessTest';
import addOrEditApiBusinessTest from './addOrEditApiBusinessTest';
export default {
  name: 'apiBusinessTest',
  props: ['type', 'apiProjectId'],
  inject:['reload'],
  data() {
    return {
      tableData: [],
      page: {
        page: 1,
        total: 0,
        size: 10,

      },
      inject:['reload'],
      apiBusinessTestId: "",

      showAddOrEditApiBusinessTest:false,

      opsType: "add",

      // 当前currentApiBusinessTestId
      currentApiBusinessTestId: 0,

      //当前apiBusinessTest数据
      currentApiBusinessTestData: {},

      rules: {

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
    },
    handleCurrentChange(index) {
      this.page.page = index;
      this.getApiBusinessTestFun()
    },

    //获取该项目下所有业务测试用例列表
    getApiBusinessTestFun() {
      let req = {
        page: this.page.page,
        size: this.page.size,
      };
      getApiBusinessTestRequest(this.projectId).then(data => {
        console.log(data);
        if (true === data.data.success) {
          this.tableData = data.data.data;

        } else {
          this.$message.error("获取接口失败")
        }
      })
    },


    openAddBusinessTest(){
      this.opsType = 'add';
      this.currentApiBusinessTestId = 0;
      this.currentApiBusinessTestData = {};

      this.showAddOrEditApiBusinessTest = true


    },

    openEditApiBusinessTest(data){
      this.opsType = 'edit';
      this.currentApiBusinessTestId = data.id;
      this.currentApiBusinessTestData = data;
      console.log(data)

      this.showAddOrEditApiBusinessTest = true;


    },



    saveApiBusinessTest(){
      this.showAddOrEditApiBusinessTest = false
      this.getApiBusinessTestFun();


    },
    cancelSaveApiBusinessTest(){
      this.showAddOrEditApiBusinessTest = false
      this.getApiBusinessTestFun();

    },



    //删除单个业务测试
    deleteApiBusinessTest(data){
      this.apiBusinessTestId = data.id
      deleteSingleApiBusinessTestRequest(this.apiBusinessTestId).then(data => {
            console.log(data);
            if (true === data.data.success) {
              this.getApiBusinessTestFun();
              this.$message.success("删除测试用例成功")

            } else {
              this.$message.error("删除测试用例失败")
            }
          }
      );


    },

    // 返回项目首页列表
    returnProjectList() {

      this.$parent.returnProject();
    },

  },

  components: {
    'add-or-edit-api-business-test': addOrEditApiBusinessTest,

  },
  created() {
    console.log('xxxxxxxxxxx',this.apiProjectId)

    if ('enter' === this.type){
      this.projectId = this.apiProjectId
      this.getApiBusinessTestFun();
    }

  }




};
</script>

<style scoped>

</style>