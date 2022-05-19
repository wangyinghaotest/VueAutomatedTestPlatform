<template>
  <div>

    <performance-script
        :type="opsType"
        :performanceProjectId="currentPerformanceProjectId"
        v-if="showPerformanceScript">
    </performance-script>
    <div v-else>
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-lx-calendar"></i> 性能测试项目
          </el-breadcrumb-item>
          <el-breadcrumb-item>性能测试项目</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
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
            prop="performance_project_name"
            label="性能测试项目名称"
            sortable
            width="180">
        </el-table-column>
        <el-table-column
            prop="describe"
            label="性能项目描述"
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
                @click="enterPerformanceProjectScript(scope.row)">进入</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {getPerformanceProjectRequest} from "../../../../api/performance/performanceProject";
import performanceScript from './performanceScript';
export default {
  name: 'performanceProjectScript',
  data() {
    return {
      tableData: [],

      page: {
        page: 1,
        total: 0,
        size: 10,

      },

      performanceProjectId: "",

      opsType: "enter",

      showPerformanceScript: false,
      // 当前项目ID
      currentPerformanceProjectId: 0,



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
      this.getApiProjectFun()
    },
    handleCurrentChange(index) {
      this.page.page = index;
      this.getApiProjectFun()
    },

    //获取所有项目列表
    getPerformanceProjectFun() {
      let req = {
        page: this.page.page,
        size: this.page.size,
      };
      getPerformanceProjectRequest(req).then(data => {
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


    //进入API项目模块
    enterPerformanceProjectScript(data){

      this.performanceProjectId = data.id;

      console.log(this.performanceProjectId);

      this.opsType = 'enter';
      this.currentPerformanceProjectId = data.id;

      this.showPerformanceScript = true;
    },

    // 返回项目首页列表
    projectList() {

      this.showPerformanceScript = false
    }

  },


  components: {
    'performance-script': performanceScript
  },


  created() {
    this.getPerformanceProjectFun();
  }
};
</script>

<style scoped>

</style>