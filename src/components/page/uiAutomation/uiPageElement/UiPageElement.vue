<template>
  <div>
    <add-or-edit-page-element
      :type="opsType"
      :uiPageId="currentPageId"
      :uiProjectId="currentProjectId"
      @savePageElement="savePageElement"
      @cancelSavePageElement="cancelSavePageElement"
      v-if="showAddOrEditPageElement"
    ></add-or-edit-page-element>


    <div v-else>
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-lx-calendar"></i> UI项目
          </el-breadcrumb-item>
          <el-breadcrumb-item>UI页面元素管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-button @click="returnProjectList">返回</el-button>
        <el-button type="primary" @click="openAddPageElement">创建页面元素</el-button>
      </el-row>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="id" sortable width="180"></el-table-column>
          <el-table-column prop="ui_project_name" label="项目名称" sortable width="180"></el-table-column>
          <el-table-column prop="ui_page_name" label="页面名称" sortable width="180"></el-table-column>

          <el-table-column prop="updata_time" label="更新时间" width="180"></el-table-column>

          <el-table-column prop="create_time" label="创建时间" width="180"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="openEditPageElement(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="deletePageElementPopup(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--                <el-pagination-->
        <!--                        class="page-class"-->
        <!--                        @size-change="handleSizeChange"-->
        <!--                        @current-change="handleCurrentChange"-->
        <!--                        :current-page="page.page"-->
        <!--                        :page-sizes="[10, 20, 50, 100]"-->
        <!--                        :page-size="page.size"-->
        <!--                        layout="total, sizes, prev, pager, next, jumper"-->
        <!--                        :total="page.total">-->
        <!--                </el-pagination>-->
      </div>
    </div>
  </div>
</template>

<script>
import {
    getSingleUiPageElementRequest,
    getUiPageElementRequest,
    deleteSingleUiPageElementRequest,
    updateSingleUiPageElementRequest,
    addUiPageElementRequest
} from '../../../../api/uiAutomation/uiPageElement';

import addOrEditPageElement from './addOrEditPageElement';
import { getSingleUiProjectPageRequest } from '../../../../api/uiAutomation/uiPage';

export default {
    name: 'UiPageElement',
    props: ['type', 'uiProjectId', 'showUiProjectPage'],
    data() {
        return {
            tableData: [],
            page: {
                page: 1,
                total: 0,
                size: 10
            },
            inject: ['reload'],
            pageElementId: '',
            // showUiProject: false,

            showAddOrEditPageElement: false,

            opsType: 'add',

            // 当前uiPageId
            currentPageId: 0,

            currentProjectId: 0,

            //当前uiPageElement数据
            currentUiPageElementData: {},

            rules: {
                ui_page_name: [{ required: true, message: '请输入页面名称', trigger: 'blur' }],
                ui_page_describe: [{ required: true, message: '请输入页面描述', trigger: 'blur' }],
                ui_project_id: [{ required: true, message: '请选择项目', trigger: 'change' }]
            }
        };
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
            this.getUiPageFun();
        },
        handleCurrentChange(index) {
            this.page.page = index;
            this.getUiPageElementFun();
        },

        //获取所有页面元素列表
        getUiPageElementFun() {
            let req = {
                page: this.page.page,
                size: this.page.size
            };
            getUiPageElementRequest(req).then(data => {
                console.log(data);
                if (true === data.data.success) {
                    this.tableData = data.data.data;
                } else {
                    this.$message.error('获取接口失败');
                }
            });
        },

        openAddPageElement() {
            this.opsType = 'add';
            this.currentUiPageElementId = 0;
            this.currentUiPageElementData = {};
            this.showAddOrEditPageElement = true;
        },

        openEditPageElement(data) {
            this.opsType = 'edit';
            this.currentPageId = data.id;
            console.log('这是页面id', data.id);
            this.currentProjectId = this.projectId;

            this.showAddOrEditPageElement = true;
        },

        savePageElement() {
            this.showAddOrEditPageElement = false;
        },
        cancelSavePageElement() {
            this.showAddOrEditPageElement = false;
        },

        //删除单个页面元素
        deletePageElementPopup(data) {
            this.pageElementId = data.id;

            deleteSingleUiPageElementRequest(this.pageElementId).then(data => {
                console.log(data);
                if (true === data.data.success) {
                    this.getUiPageElementFun();
                    this.$message.success('删除页面成功');
                } else {
                    this.$message.error('删除页面失败');
                }
            });
        },

        //获取 单个UI项目中包含得所有页面
        getSingleUiProjectPage() {
            getSingleUiProjectPageRequest(this.projectId).then(data => {
                if (true === data.data.success) {
                    console.log('这是获取数据');
                    console.log(data.data.data);
                    this.tableData = data.data.data;
                } else {
                    this.$message.error('获取接口失败');
                }
            });
        },

        // 返回项目首页列表
        returnProjectList() {

          this.$parent.returnProject();
        }
    },

    components: {
        'add-or-edit-page-element': addOrEditPageElement

    },
    created() {
        console.log(this.uiProjectId);
        if ('enter' === this.type) {
            this.projectId = this.uiProjectId;
            this.getSingleUiProjectPage();
        }
    }
};
</script>

<style scoped>
</style>