(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["uiProjectTestCase"],{2909:function(e,t,a){"use strict";function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,s=new Array(t);a<t;a++)s[a]=e[a];return s}function i(e){if(Array.isArray(e))return s(e)}function n(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function r(e,t){if(e){if("string"===typeof e)return s(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?s(e,t):void 0}}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(e){return i(e)||n(e)||r(e)||o()}a.d(t,"a",(function(){return c}))},4226:function(e,t,a){"use strict";a("f311")},8772:function(e,t,a){"use strict";a.d(t,"d",(function(){return i})),a.d(t,"a",(function(){return n})),a.d(t,"c",(function(){return r})),a.d(t,"e",(function(){return o})),a.d(t,"b",(function(){return c}));var s=a("82f8"),i=function(){return Object(s["c"])("api/backend/ui_element_operation/list/")},n=function(e){return Object(s["e"])("api/backend/ui_element_operation/",e)},r=function(e){return Object(s["c"])("api/backend/ui_element_operation/"+e+"/")},o=function(e,t){return Object(s["d"])("api/backend/ui_element_operation/"+e+"/",t)},c=function(e){return Object(s["a"])("api/backend/ui_element_operation/"+e+"/")}},"8b67":function(e,t,a){"use strict";a.d(t,"d",(function(){return i})),a.d(t,"a",(function(){return n})),a.d(t,"c",(function(){return r})),a.d(t,"e",(function(){return o})),a.d(t,"b",(function(){return c}));var s=a("82f8"),i=function(){return Object(s["c"])("api/backend/ui_project/list/")},n=function(e){return Object(s["e"])("api/backend/ui_project/",e)},r=function(e){return Object(s["c"])("api/backend/ui_project/"+e+"/")},o=function(e,t){return Object(s["d"])("api/backend/ui_project/"+e+"/",t)},c=function(e){return Object(s["a"])("api/backend/ui_project/"+e+"/")}},abbd:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"crumbs"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[a("i",{staticClass:"el-icon-lx-calendar"}),e._v(" UI测试用例 ")]),a("el-breadcrumb-item",[e._v("UI测试用例")])],1)],1),e.showUiTestCase?a("ui-test-case",{attrs:{type:e.opsType,uiProjectId:e.currentUiProjectId}}):a("div",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData}},[a("el-table-column",{attrs:{prop:"id",label:"id",sortable:"",width:"180"}}),a("el-table-column",{attrs:{prop:"ui_project_name",label:"项目名称",sortable:"",width:"180"}}),a("el-table-column",{attrs:{prop:"describe",label:"项目描述",width:"180"}}),a("el-table-column",{attrs:{prop:"updata_time",label:"更新时间",width:"180"}}),a("el-table-column",{attrs:{prop:"create_time",label:"创建时间",width:"180"}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.enterProjectTestCase(t.row)}}},[e._v("进入")])]}}])})],1)],1)],1)},i=[],n=a("8b67"),r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e.showAddOrEditUiTestCase?a("add-or-edit-ui-test-case",{attrs:{type:e.opsType,uiTestCaseId:e.currentUiTestCaseId,uiTestCaseData:e.currentUiTestCaseData},on:{saveUiTestCase:e.saveUiTestCase,cancelSaveUiTestCase:e.cancelSaveUiTestCase}}):a("div",[a("el-row",[a("el-button",{on:{click:e.returnProjectList}},[e._v("返回")]),a("el-button",{attrs:{type:"primary"},on:{click:e.openAddPageElement}},[e._v("创建UI测试用例")])],1),a("div",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData}},[a("el-table-column",{attrs:{prop:"id",label:"id",sortable:"",width:"180"}}),a("el-table-column",{attrs:{prop:"ui_project_name",label:"项目名称",sortable:"",width:"180"}}),a("el-table-column",{attrs:{prop:"ui_test_case_name",label:"UI测试用例",sortable:"",width:"180"}}),a("el-table-column",{attrs:{prop:"updata_time",label:"更新时间",width:"180"}}),a("el-table-column",{attrs:{prop:"create_time",label:"创建时间",width:"180"}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.openEditUiTestCase(t.row)}}},[e._v("编辑")]),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.deleteUiTestCasePopup(t.row)}}},[e._v("删除")])]}}])})],1)],1)],1)],1)},o=[],c=a("82f8"),l=function(e){return Object(c["c"])("api/backend/ui_test_case/list/"+e+"/")},u=function(e){return Object(c["e"])("api/backend/ui_test_case/",e)},d=function(e){return Object(c["c"])("api/backend/ui_test_case/"+e+"/")},p=function(e,t){return Object(c["d"])("api/backend/ui_test_case/"+e+"/",t)},_=function(e){return Object(c["a"])("api/backend/ui_test_case/"+e+"/")},f=function(){return Object(c["c"])("api/backend/ui_test_case/get_ui_test_case_select_data/")},m=function(e){return Object(c["d"])("api/backend/ui_test_case/debug_ui_test_case/",e)},g=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-form",{ref:"uiTestCaseFormRef",attrs:{model:e.uiTestCaseForm,rules:e.rules,"label-width":"100px"}},[a("el-form-item",{staticStyle:{width:"100px"},attrs:{label:"UI用例名称"}},[a("el-input",{staticClass:"ui_test_case_name",model:{value:e.uiTestCaseForm.ui_test_case_name,callback:function(t){e.$set(e.uiTestCaseForm,"ui_test_case_name",t)},expression:"uiTestCaseForm.ui_test_case_name"}})],1),a("el-form-item",{attrs:{label:"选择UI项目"}},[a("el-select",{attrs:{placeholder:"请选择项目",id:"selectUIProject"},on:{change:e.getSelectUiTestCaseFun},model:{value:e.uiTestCaseForm.ui_project_id,callback:function(t){e.$set(e.uiTestCaseForm,"ui_project_id",t)},expression:"uiTestCaseForm.ui_project_id"}},e._l(e.projectSelect,(function(e){return a("el-option",{key:e.project_id,attrs:{value:e.project_id,label:e.ui_project_name}})})),1)],1),a("el-input",{attrs:{type:"textarea",autosize:{minRows:3,maxRows:4},readonly:!0,placeholder:"DEBUG结果"},model:{value:e.debugTextarea,callback:function(t){e.debugTextarea=t},expression:"debugTextarea"}}),a("div",{staticClass:"ui-case-class"},[a("el-form-item",{staticStyle:{"margin-left":"100px",width:"600px"}},[a("el-button",{attrs:{type:"primary"},on:{click:e.saveUiTestCase}},[e._v("保存")]),a("el-button",{attrs:{type:"primary"},on:{click:e.deBugUiTestCase}},[e._v("调试")]),a("el-button",{attrs:{type:"default"},on:{click:e.cancelSaveUiTestCase}},[e._v("取消")]),a("el-button",{attrs:{type:"default"},on:{click:function(t){return e.sorting(e.uiTestCaseTableData)}}},[e._v("自动排序")])],1)],1),a("div",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.uiTestCaseTableData}},[a("el-table-column",{attrs:{prop:"ui_page_id",label:"UI页面",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-select",{attrs:{filterable:"",placeholder:"选择UI页面"},on:{change:function(a){return e.getSelectUIPageElement(t.row)}},model:{value:t.row.ui_page_id,callback:function(a){e.$set(t.row,"ui_page_id",a)},expression:"scope.row.ui_page_id"}},e._l(e.pageSelect,(function(e){return a("el-option",{key:e.ui_page_id,attrs:{value:e.ui_page_id,label:e.ui_page_name}})})),1)]}}])}),a("el-table-column",{attrs:{prop:"ui_page_element_id",width:"180",label:"选择UI页面元素"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-select",{attrs:{filterable:"",placeholder:"选择UI页面元素"},on:{change:e.handleSelectChange},model:{value:t.row.ui_page_element_id,callback:function(a){e.$set(t.row,"ui_page_element_id",a)},expression:"scope.row.ui_page_element_id"}},e._l(t.row.ui_element_Select,(function(e){return a("el-option",{key:e.ui_page_element_id,attrs:{value:e.ui_page_element_id,label:e.ui_page_element_name}})})),1)]}}])}),a("el-table-column",{attrs:{prop:"ui_element_operation_id",label:"元素操作",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-select",{attrs:{size:"small",filterable:"",placeholder:"请选择元素操作"},model:{value:t.row.ui_element_operation_id,callback:function(a){e.$set(t.row,"ui_element_operation_id",a)},expression:"scope.row.ui_element_operation_id"}},e._l(e.uiElementOperationSelect,(function(e){return a("el-option",{key:e.id,attrs:{value:e.id,label:e.elements_operation_title}})})),1)]}}])}),a("el-table-column",{attrs:{prop:"elements_output",label:"元素输出",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{staticStyle:{width:"100%"},attrs:{"controls-position":"right"},model:{value:t.row.elements_output,callback:function(a){e.$set(t.row,"elements_output",a)},expression:"scope.row.elements_output"}})]}}])}),a("el-table-column",{attrs:{prop:"x_coordinates",label:"X坐标",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{staticStyle:{width:"50%"},attrs:{"controls-position":"right"},model:{value:t.row.x_coordinates,callback:function(a){e.$set(t.row,"x_coordinates",a)},expression:"scope.row.x_coordinates"}})]}}])}),a("el-table-column",{attrs:{prop:"y_coordinates",label:"Y坐标",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{staticStyle:{width:"50%"},attrs:{"controls-position":"right"},model:{value:t.row.y_coordinates,callback:function(a){e.$set(t.row,"y_coordinates",a)},expression:"scope.row.y_coordinates"}})]}}])}),a("el-table-column",{attrs:{prop:"waiting_time",label:"等待时间",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{staticStyle:{width:"50%"},attrs:{"controls-position":"right"},model:{value:t.row.waiting_time,callback:function(a){e.$set(t.row,"waiting_time",a)},expression:"scope.row.waiting_time"}})]}}])}),a("el-table-column",{attrs:{prop:"steps",label:"操作步骤",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{staticStyle:{width:"50%"},attrs:{"controls-position":"right"},model:{value:t.row.steps,callback:function(a){e.$set(t.row,"steps",a)},expression:"scope.row.steps"}})]}}])}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{on:{click:e.AddForm}},[e._v("添加行")]),a("el-button",{staticStyle:{"margin-left":"0px","margin-right":"13px","padding-right":"28px","text-align":"center"},attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.Delete(t.$index,e.uiTestCaseTableData)}}},[e._v("删除")])]}}])})],1)],1)],1)],1)},b=[],h=a("2909"),T=(a("c5f6"),a("ac6a"),a("8772")),C={name:"addOrEditUiTestCase",props:["type","uiTestCaseId","uiTestCaseData"],data:function(){return{rules:{ui_page_element_id:[{required:!0,message:"请选择页面元素",trigger:"change"}]},debugTextarea:"",uiTestCaseForm:{ui_test_case_name:"",ui_project_id:"",ui_test_case_id:""},uiTestCaseTableData:[{elements_operation_title:"",ui_page_id:"",ui_page_element_id:"",ui_element_operation_id:"",elements_output:"",x_coordinates:"",y_coordinates:"",waiting_time:"",steps:""}],projectSelect:[],pageSelect:[],ui_element_Select:[],indexNum:0,indexNum2:0,uiElementOperationSelect:[],newData:[]}},mounted:function(){this.getSelectUiTestCaseFun()},watch:{uiTestCaseForm:{deep:!0,immediate:!0,handler:function(e){var t=this;e.ui_project_id&&f().then((function(e){if(!0===e.data.success){t.$set(t,"projectSelect",e.data.data);for(var a=0;a<t.projectSelect.length;a++){var s=t.projectSelect[a];s.project_id===t.uiTestCaseForm.ui_project_id&&(t.pageSelect=s.page_list,t.pageSelect.forEach((function(e){t.getSelectUIPageElement()})))}t.uiTestCaseTableData.forEach((function(e){console.log(8888,t.uiTestCaseTableData),t.$set(e,"ui_element_operation_id",e.ui_element_operation_id?Number(e.ui_element_operation_id):"")})),t.getUiElementOperationRequestFun()}else t.$message.error("获取接口失败")}))}}},methods:{getSelectUiTestCaseFun:function(e){var t=this;f().then((function(e){if(!0===e.data.success){t.$set(t,"newData",e.data.data),t.$set(t,"projectSelect",e.data.data);for(var a=0;a<t.projectSelect.length;a++){var s=t.projectSelect[a];if(s.project_id===t.uiTestCaseForm.ui_project_id){t.pageSelect=s.page_list;break}}}else t.$message.error("获取接口失败")}))},getSelectUIPageElement:function(e){var t=this;this.uiTestCaseTableData.forEach((function(e){for(var a=0;a<t.pageSelect.length;a++){var s=t.pageSelect[a];s.ui_page_id===e.ui_page_id&&t.$set(e,"ui_element_Select",s.ui_element_list)}}))},sorting:function(e){for(var t=0;t<e.length;t++){var a=void 0;a=this.uiTestCaseTableData[t]["steps"]=t,console.log(a)}console.log(this.uiTestCaseTableData)},handleSelectChange:function(e){},saveUiTestCase:function(){"add"===this.type?this.addUiTestCase():this.editUiTestCase()},cancelSaveUiTestCase:function(){this.$parent.cancelSaveUiTestCase()},addUiTestCase:function(){var e=this,t=JSON.parse(JSON.stringify(this.uiTestCaseForm));t.ui_test_case_data=this.uiTestCaseTableData,console.log("这是table表单",this.uiTestCaseTableData),console.log("这是获取到的",t),this.$refs.uiTestCaseFormRef.validate((function(a){if(console.log(e.$refs.uiTestCaseFormRef.validate(a)),!a)return!1;u(t).then((function(t){console.log(t),!0===t.data.success?(e.$message.success("添加UI测试用例成功"),e.$parent.saveUiTestCase()):!1===t.data.success?e.$message.error(t.data.error.message):e.$message.error("添加UI测试用例失败")}))}))},editUiTestCase:function(){var e=this,t=JSON.parse(JSON.stringify(this.uiTestCaseForm));t.ui_test_case_data=this.uiTestCaseTableData,console.log("这是table表单",this.uiTestCaseTableData),console.log("这是获取到的",t),this.$refs.uiTestCaseFormRef.validate((function(a){if(!a)return!1;console.log(t),p(e.uiTestCaseForm.ui_test_case_id,t).then((function(t){console.log(t),!0===t.data.success?(e.$message.success("编辑页面元素成功"),e.$parent.saveUiTestCase()):!1===t.data.success?e.$message.error(t.data.error.message):e.$message.error("编辑页面元素失败")}))}))},getUiElementOperationRequestFun:function(){var e=this;Object(T["d"])().then((function(t){console.log(t),!0===t.data.success?(e.uiTestCaseTableData.forEach((function(t){e.$set(t,"id","")})),e.uiElementOperationSelect=t.data.data):e.$message.error("获取接口失败")}))},getSingleUiTestCaseFun:function(){var e=this;d(this.uiTestCaseForm.ui_test_case_id).then((function(t){if(!0===t.data.success){var a=t.data.data.ui_test_case_data;console.log("data数据",t.data.data),console.log("获取单个测试用例数据",a),e.uiTestCaseTableData=Object(h["a"])(a),console.log("ui_element_Select：",e.uiTestCaseTableData)}else e.$message.error("获取接口失败")}))},deBugUiTestCase:function(){var e=this,t=JSON.parse(JSON.stringify(this.uiTestCaseForm));t.ui_test_case_data=this.uiTestCaseTableData,this.$refs.uiTestCaseFormRef.validate((function(a){if(!a)return!1;console.log(t),e.$message.success("调试测试用例中"),m(t).then((function(t){console.log(t),!0===t.data.success?(e.debugTextarea="调试测试用例成功",e.$message.success("调试测试用例成功")):4e4===t.data.error.code?e.$message.error("未知错误"):3e4===t.data.error.code?e.$message.error(t.data.error.message):(e.debugTextarea=t.data.error.message.debug_results+",  "+t.data.error.message.debug_results_message,e.$message.error("调试测试用例失败"))}))}))},AddForm:function(e,t){this.uiTestCaseTableData.push({elements_operation_title:"",ui_page_id:"",ui_page_element_id:"",ui_element_operation_id:"",elements_output:"",x_coordinates:"",y_coordinates:"",waiting_time:"",steps:""})},Delete:function(e,t){t.splice(e,1)}},created:function(){console.log(this.uiTestCaseData),"edit"===this.type&&(this.uiTestCaseForm={ui_project_id:this.uiTestCaseData.ui_project_id,ui_test_case_name:this.uiTestCaseData.ui_test_case_name,ui_test_case_id:this.uiTestCaseData.id},this.getSingleUiTestCaseFun()),"add"===this.type&&this.getUiElementOperationRequestFun()}},w=C,v=(a("4226"),a("2877")),U=Object(v["a"])(w,g,b,!1,null,"587bd80e",null),j=U.exports,y={name:"UiTestCase",props:["type","uiProjectId"],inject:["reload"],data:function(){return{tableData:[],page:{page:1,total:0,size:10},inject:["reload"],uiTestCaseId:"",showAddOrEditUiTestCase:!1,opsType:"add",currentUiTestCaseId:0,currentUiTestCaseData:{},rules:{ui_page_name:[{required:!0,message:"请输入页面名称",trigger:"blur"}],ui_page_describe:[{required:!0,message:"请输入页面描述",trigger:"blur"}],ui_project_id:[{required:!0,message:"请选择项目",trigger:"change"}]}}},methods:{formatter:function(e,t){return e.address},handleEdit:function(e,t){console.log(e,t)},handleDelete:function(e,t){console.log(e,t)},handleSizeChange:function(e){this.page.size=e,this.getUiPageFun()},handleCurrentChange:function(e){this.page.page=e,this.getUiTestCaseFun()},getUiTestCaseFun:function(){var e=this;this.page.page,this.page.size;l(this.projectId).then((function(t){console.log(t),!0===t.data.success?e.tableData=t.data.data:e.$message.error("获取接口失败")}))},openAddPageElement:function(){this.opsType="add",this.currentUiTestCaseId=0,this.currentUiTestCaseData={},this.showAddOrEditUiTestCase=!0},openEditUiTestCase:function(e){this.opsType="edit",this.currentUiTestCaseId=e.id,this.currentUiTestCaseData=e,console.log(e),this.showAddOrEditUiTestCase=!0},saveUiTestCase:function(){this.showAddOrEditUiTestCase=!1,this.getUiTestCaseFun()},cancelSaveUiTestCase:function(){this.showAddOrEditUiTestCase=!1,this.getUiTestCaseFun()},deleteUiTestCasePopup:function(e){var t=this;this.uiTestCaseId=e.id,_(this.uiTestCaseId).then((function(e){console.log(e),!0===e.data.success?(t.getUiTestCaseFun(),t.$message.success("删除测试用例成功")):t.$message.error("删除测试用例失败")}))},returnProjectList:function(){this.$parent.projectList()}},components:{"add-or-edit-ui-test-case":j},created:function(){"enter"===this.type&&(this.projectId=this.uiProjectId,this.getUiTestCaseFun())}},S=y,k=Object(v["a"])(S,r,o,!1,null,"10385b63",null),$=k.exports,O={name:"UiProjectTestCase",data:function(){return{tableData:[],page:{page:1,total:0,size:10},projectId:"",opsType:"enter",showUiTestCase:!1,currentUiProjectId:0}},methods:{handleEdit:function(e,t){console.log(e,t)},handleDelete:function(e,t){console.log(e,t)},handleSizeChange:function(e){this.page.size=e,this.getUiProjectFun()},handleCurrentChange:function(e){this.page.page=e,this.getUiProjectFun()},getUiProjectFun:function(){var e=this,t={page:this.page.page,size:this.page.size};Object(n["d"])(t).then((function(t){console.log(t),!0===t.data.success?(e.tableData=t.data.data,e.page.total=t.data.data.total,e.page.page=t.data.data.page,e.page.size=t.data.data.size):e.$message.error("获取接口失败")}))},enterProjectTestCase:function(e){this.opsType="enter",this.currentUiProjectId=e.id,this.showUiTestCase=!0},projectList:function(){this.showUiTestCase=!1}},components:{"ui-test-case":$},created:function(){this.getUiProjectFun()}},F=O,D=Object(v["a"])(F,s,i,!1,null,"26caf606",null);t["default"]=D.exports},f311:function(e,t,a){}}]);