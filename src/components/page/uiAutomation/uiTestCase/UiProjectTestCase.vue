<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> UI测试用例
        </el-breadcrumb-item>
        <el-breadcrumb-item>UI测试用例</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <ui-test-case
        :type="opsType"
        :uiProjectId="currentUiProjectId"
        v-if="showUiTestCase">
    </ui-test-case>
    <div v-else>
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
            prop="ui_project_name"
            label="项目名称"
            sortable
            width="180">
        </el-table-column>
        <el-table-column
            prop="describe"
            label="项目描述"
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
            <el-button
                size="mini"
                @click="enterProjectTestCase(scope.row)">进入</el-button>
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
import {getUiProjectRequest} from "../../../../api/uiAutomation/uiProject";
import UiTestCase from './UiTestCase';
export default {
  name: 'UiProjectTestCase',
  data() {
    return {
      tableData: [],

      page: {
        page: 1,
        total: 0,
        size: 10,

      },

      projectId: "",

      opsType: "enter",

      showUiTestCase: false,
      // 当前项目ID
      currentUiProjectId: 0,



    }
  },
  methods: {


    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(size) {
      this.page.size = size;
      this.getUiProjectFun()
    },
    handleCurrentChange(index) {
      this.page.page = index;
      this.getUiProjectFun()
    },

    //获取所有项目列表
    getUiProjectFun() {
      let req = {
        page: this.page.page,
        size: this.page.size,
      };
      getUiProjectRequest(req).then(data => {
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


    //进入项目页面
    enterProjectTestCase(data){

      this.opsType = 'enter';
      this.currentUiProjectId = data.id;

      this.showUiTestCase = true;

    },

    // 返回项目首页列表
    projectList() {

      this.showUiTestCase = false
    }

  },


  components: {
    'ui-test-case': UiTestCase
  },


  created() {
    this.getUiProjectFun();
  }

};
</script>

<style scoped>

</style>