(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["performanceProject"],{ef00:function(e,t,r){"use strict";r.d(t,"c",(function(){return o})),r.d(t,"a",(function(){return c})),r.d(t,"d",(function(){return n})),r.d(t,"e",(function(){return i})),r.d(t,"b",(function(){return s}));var a=r("82f8"),o=function(){return Object(a["c"])("api/backend/performance_test/performance_project_list/")},c=function(e){return Object(a["e"])("api/backend/performance_test/performance_project/",e)},n=function(e){return Object(a["c"])("api/backend/performance_test/performance_project/"+e+"/")},i=function(e,t){return Object(a["d"])("api/backend/performance_test/performance_project/"+e+"/",t)},s=function(e){return Object(a["a"])("api/backend/performance_test/performance_project/"+e+"/")}},fd81:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticClass:"crumbs"},[r("el-breadcrumb",{attrs:{separator:"/"}},[r("el-breadcrumb-item",[r("i",{staticClass:"el-icon-lx-calendar"}),e._v(" 性能测试项目 ")]),r("el-breadcrumb-item",[e._v("性能测试项目")])],1)],1),r("el-row",[r("el-button",{attrs:{type:"primary"},on:{click:e.addPerformanceProjectPopup}},[e._v("创建项目")])],1),r("el-dialog",{attrs:{title:"创建项目",visible:e.addPerformanceProjectdialogFormVisible},on:{"update:visible":function(t){e.addPerformanceProjectdialogFormVisible=t}}},[r("el-form",{ref:"addPerformanceProjectFormRef",attrs:{model:e.addPerformanceProjectData,rules:e.rules}},[r("el-form-item",{attrs:{label:"项目名称","label-width":"100px",prop:"performance_project_name"}},[r("el-input",{attrs:{autocomplete:"off"},model:{value:e.addPerformanceProjectData.performance_project_name,callback:function(t){e.$set(e.addPerformanceProjectData,"performance_project_name",t)},expression:"addPerformanceProjectData.performance_project_name"}})],1),r("el-form-item",{attrs:{label:"项目描述","label-width":"100px",prop:"describe"}},[r("el-input",{attrs:{type:"textarea",autocomplete:"off"},model:{value:e.addPerformanceProjectData.describe,callback:function(t){e.$set(e.addPerformanceProjectData,"describe",t)},expression:"addPerformanceProjectData.describe"}})],1)],1),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.addPerformanceProjectdialogFormVisible=!1}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:e.addPerformanceTestProject}},[e._v("确 定")])],1)],1),r("el-dialog",{attrs:{title:"编辑项目",visible:e.editPerformanceProjectdialogFormVisible},on:{"update:visible":function(t){e.editPerformanceProjectdialogFormVisible=t}}},[r("el-form",{ref:"editPerformanceProjectFormRef",attrs:{model:e.editPerformanceProjectData,rules:e.rules}},[r("el-form-item",{attrs:{label:"项目名称","label-width":"100px",prop:"performance_project_name"}},[r("el-input",{attrs:{autocomplete:"off"},model:{value:e.editPerformanceProjectData.performance_project_name,callback:function(t){e.$set(e.editPerformanceProjectData,"performance_project_name",t)},expression:"editPerformanceProjectData.performance_project_name"}})],1),r("el-form-item",{attrs:{label:"项目描述","label-width":"100px",prop:"describe"}},[r("el-input",{attrs:{type:"textarea",autocomplete:"off"},model:{value:e.editPerformanceProjectData.describe,callback:function(t){e.$set(e.editPerformanceProjectData,"describe",t)},expression:"editPerformanceProjectData.describe"}})],1)],1),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.editPerformanceProjectdialogFormVisible=!1}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:e.editProject}},[e._v("确 定")])],1)],1),r("div",[r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData}},[r("el-table-column",{attrs:{prop:"id",label:"id",sortable:"",width:"180"}}),r("el-table-column",{attrs:{prop:"performance_project_name",label:"项目名称",sortable:"",width:"180"}}),r("el-table-column",{attrs:{prop:"describe",label:"项目描述",width:"180"}}),r("el-table-column",{attrs:{prop:"updata_time",label:"更新时间",width:"180"}}),r("el-table-column",{attrs:{prop:"create_time",label:"创建时间",width:"180"}}),r("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{size:"mini"},on:{click:function(r){return e.editApiProjectPopup(t.row)}}},[e._v("编辑")]),r("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(r){return e.deleteProjectPopup(t.row)}}},[e._v("删除")])]}}])})],1)],1)],1)},o=[],c=r("ef00"),n={name:"performanceProject",data:function(){return{tableData:[],page:{page:1,total:0,size:10},addPerformanceProjectdialogFormVisible:!1,editPerformanceProjectdialogFormVisible:!1,addPerformanceProjectData:{performance_project_name:"",describe:""},editPerformanceProjectData:{performance_project_name:"",describe:"",id:0},performanceProjectId:"",performanceProjectData:"",rules:{performance_project_name:[{required:!0,message:"请输入名称",trigger:"blur"}],description:[{required:!0,message:"请输入描述",trigger:"blur"}]}}},methods:{formatter:function(e,t){return e.address},handleEdit:function(e,t){console.log(e,t)},handleDelete:function(e,t){console.log(e,t)},handleSizeChange:function(e){this.page.size=e,this.getPerformanceProjectFun()},handleCurrentChange:function(e){this.page.page=e,this.getPerformanceProjectFun()},getPerformanceProjectFun:function(){var e=this,t={page:this.page.page,size:this.page.size};Object(c["c"])(t).then((function(t){console.log(t),!0===t.data.success?(e.tableData=t.data.data,e.page.total=t.data.data.total,e.page.page=t.data.data.page,e.page.size=t.data.data.size):e.$message.error("获取接口失败")}))},addPerformanceTestProject:function(){var e=this,t=JSON.parse(JSON.stringify(this.addPerformanceProjectData));this.$refs.addPerformanceProjectFormRef.validate((function(r){if(!r)return!1;Object(c["a"])(t).then((function(t){console.log(t),!0===t.data.success?(e.getPerformanceProjectFun(),e.addPerformanceProjectdialogFormVisible=!1,e.$message.success("创建项目成功")):e.$message.error("创建项目失败")}))}))},addPerformanceProjectPopup:function(){this.addPerformanceProjectData={performance_project_name:"",describe:""},this.addPerformanceProjectdialogFormVisible=!0},handleNodeClick:function(e){this.currentServiceId=e.id},editProject:function(){var e=this,t=JSON.parse(JSON.stringify(this.editPerformanceProjectData));this.$refs.editPerformanceProjectFormRef.validate((function(r){if(console.log(e.performanceProjectId),!r)return!1;Object(c["e"])(e.performanceProjectId,t).then((function(t){console.log(t),!0===t.data.success?(e.getPerformanceProjectFun(),e.editPerformanceProjectdialogFormVisible=!1,e.$message.info("编辑性能测试项目成功")):e.$message.info("编辑性能测试项目失败")}))}))},editApiProjectPopup:function(e){var t=this;this.performanceProjectId=e.id,this.performanceProjectData=e,this.editPerformanceProjectdialogFormVisible=!0,console.log(this.performanceProjectId),console.log(this.performanceProjectData),Object(c["d"])(this.performanceProjectId).then((function(e){console.log(e),!0===e.data.success?(t.editPerformanceProjectData.performance_project_name=e.data.data.performance_project_name,t.editPerformanceProjectData.describe=e.data.data.describe):t.$message.error("获取接口失败")}))},deleteProjectPopup:function(e){var t=this;this.performanceProjectId=e.id,this.performanceProjectData=e,console.log(this.performanceProjectId),console.log(this.performanceProjectData),Object(c["b"])(this.performanceProjectId).then((function(e){console.log(e),!0===e.data.success?(t.getPerformanceProjectFun(),t.$message.success("删除性能测试项目成功")):t.$message.error("删除性能测试项目失败")}))}},created:function(){this.getPerformanceProjectFun()}},i=n,s=r("2877"),l=Object(s["a"])(i,a,o,!1,null,"52b7d223",null);t["default"]=l.exports}}]);