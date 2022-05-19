(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["ApiTaskResult"],{"13bf":function(t,e,a){},"2c8a":function(t,e,a){!function(e,a){t.exports=a()}(0,(function(){"use strict";function t(t,e){for(var a=0;a<e.length;a++){var i=e[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function e(t){return function(t){if(Array.isArray(t)){for(var e=0,a=new Array(t.length);e<t.length;e++)a[e]=t[e];return a}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var a=window.devicePixelRatio||1,i=10*a,s=i/2;return function(){function n(t,e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),this.canvas=function(t){var e=document.getElementById(t),i=e.parentNode.clientWidth,s=e.parentNode.clientHeight;return e.style.width=i+"px",e.style.height=s+"px",e.width=i*a,e.height=s*a,e}(t),this.ctx=this.canvas.getContext("2d"),this.type="bar",this.showValue=!0,this.showGrid=!0,this.topPadding=60*a,this.leftPadding=50*a,this.rightPadding=10*a,this.bottomPadding=50*a,this.yEqual=5,this.yLength=0,this.xLength=0,this.ySpace=0,this.xRorate=0,this.yRorate=0,this.xRotate=0,this.yRotate=0,this.bgColor="#fff",this.axisColor="#666",this.gridColor="#eee",this.title={text:"",color:"#666",position:"top",font:"bold "+18*a+"px Arial",top:i,bottom:s},this.legend={display:!0,position:"top",color:"#666",font:14*a+"px Arial",top:45*a,bottom:15*a,textWidth:0},this.radius=100*a,this.innerRadius=60*a,this.colorList=["#4A90E2","#F5A623","#ff5858","#5e64ff","#2AC766","#743ee2","#b554ff","#199475"],this.init(e)}return function(e,a,i){a&&t(e.prototype,a),i&&t(e,i)}(n,[{key:"init",value:function(t){if(t.title=Object.assign({},this.title,t.title),t.legend=Object.assign({},this.legend,t.legend),Object.assign(this,t),!t.labels||!t.labels.length)throw new Error("缺少主要参数labels");if(!t.datasets||!t.datasets.length)throw new Error("缺少主要参数datasets");this.drawBackground(),"bar"===this.type||"line"===this.type?this.renderBarChart():this.renderPieChart(),this.drawLegend()}},{key:"renderBarChart",value:function(){this.yLength=Math.floor((this.canvas.height-this.topPadding-this.bottomPadding-i)/this.yEqual),this.xLength=Math.floor((this.canvas.width-this.leftPadding-this.rightPadding-i)/this.labels.length),this.ySpace=function(t,a){var i=t.map((function(t){return t.data.reduce((function(t,e){return e<t?t:e}))})),s=Math.ceil(Math.max.apply(Math,e(i))/a),n=s.toString().length-1;return n=2<n?2:n,Math.ceil(s/Math.pow(10,n))*Math.pow(10,n)}(this.datasets,this.yEqual),this.drawXAxis(),this.drawYAxis(),this.drawBarContent()}},{key:"drawBarContent",value:function(){var t=this.ctx,e=this.datasets.length;t.beginPath();for(var n=0;n<e;n++){t.font=this.legend.font,this.legend.textWidth+=Math.ceil(t.measureText(this.datasets[n].label).width),t.fillStyle=t.strokeStyle=this.datasets[n].fillColor||this.colorList[n];for(var r=this.datasets[n].data,o=0;o<r.length;o++)if(!(o>this.labels.length-1)){var l=this.xLength/(e+1),h=this.yLength/this.ySpace,c=this.leftPadding+this.xLength*o+l*(n+.5),u=c+l,d=this.canvas.height-this.bottomPadding,p=d-r[o]*h;if("bar"===this.type)t.fillRect(c,p,u-c,d-p),this.drawValue(r[o],c+l/2,p-s);else if("line"===this.type){var f=this.leftPadding+this.xLength*(o+.5);t.beginPath(),t.arc(f,p,3*a,0,2*Math.PI,!0),t.fill(),0!==o&&(t.beginPath(),t.strokeStyle=this.datasets[n].fillColor||this.colorList[n],t.lineWidth=2*a,t.moveTo(f-this.xLength,d-r[o-1]*h),t.lineTo(f,p),t.stroke(),t.lineWidth=1*a),this.drawValue(r[o],f,p-i)}}}t.stroke()}},{key:"renderPieChart",value:function(){for(var t=this.ctx,e=this.labels.length,a=this.datasets[0],i=a.data,s=i.reduce((function(t,e){return t+e})),n=-Math.PI/2,r=this.canvas.width/2,o=this.canvas.height/2,l=0;l<e;l++){t.font=this.legend.font,this.legend.textWidth+=Math.ceil(t.measureText(this.labels[l]).width),t.beginPath(),t.strokeStyle=t.fillStyle=a.colorList&&a.colorList[l]||this.colorList[l],t.moveTo(r,o);var h=n,c=n+=i[l]/s*2*Math.PI;t.arc(r,o,this.radius,h,c),t.closePath(),t.fill();var u=(h+c)/2;this.drawPieValue(i[l],u)}"ring"===this.type&&(t.beginPath(),t.fillStyle=this.bgColor,t.arc(r,o,this.innerRadius,0,2*Math.PI),t.closePath(),t.fill())}},{key:"drawValue",value:function(t,e,i){var s=this.ctx;this.showValue&&(s.textBaseline="middle",s.font=12*a+"px Arial",s.textAlign="center",s.fillText(t,e,i))}},{key:"drawPieValue",value:function(t,e){var a=this.ctx;if(this.showValue){var s=this.canvas.width/2,n=this.canvas.height/2,r=Math.ceil(Math.abs(this.radius*Math.cos(e))),o=Math.floor(Math.abs(this.radius*Math.sin(e)));a.textBaseline="middle",this.showValue&&(e<=0?(a.textAlign="left",a.moveTo(s+r,n-o),a.lineTo(s+r+i,n-o-i),a.moveTo(s+r+i,n-o-i),a.lineTo(s+r+3*i,n-o-i),a.stroke(),a.fillText(t,s+r+3.5*i,n-o-i)):0<e&&e<=Math.PI/2?(a.textAlign="left",a.moveTo(s+r,n+o),a.lineTo(s+r+i,n+o+i),a.moveTo(s+r+i,n+o+i),a.lineTo(s+r+3*i,n+o+i),a.stroke(),a.fillText(t,s+r+3.5*i,n+o+i)):e>Math.PI/2&&e<Math.PI?(a.textAlign="right",a.moveTo(s-r,n+o),a.lineTo(s-r-i,n+o+i),a.moveTo(s-r-i,n+o+i),a.lineTo(s-r-3*i,n+o+i),a.stroke(),a.fillText(t,s-r-3.5*i,n+o+i)):(a.textAlign="right",a.moveTo(s-r,n-o),a.lineTo(s-r-i,n-o-i),a.moveTo(s-r-i,n-o-i),a.lineTo(s-r-3*i,n-o-i),a.stroke(),a.fillText(t,s-r-3.5*i,n-o-i)))}}},{key:"drawBackground",value:function(){this.ctx.fillStyle=this.bgColor,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.drawTitle()}},{key:"drawTitle",value:function(){var t=this.title;if(t.text){var e=this.ctx;e.beginPath(),e.font=t.font,e.textAlign="center",e.fillStyle=t.color,"top"===t.position?(e.textBaseline="top",e.fillText(t.text,this.canvas.width/2,t.top)):(e.textBaseline="bottom",e.fillText(t.text,this.canvas.width/2,this.canvas.height-t.bottom))}}},{key:"drawXAxis",value:function(){var t=this.ctx,e=this.canvas.height-this.bottomPadding+.5;t.beginPath(),t.strokeStyle=this.axisColor,t.moveTo(this.leftPadding,e),t.lineTo(this.canvas.width-this.rightPadding,e),t.stroke(),this.drawXPoint()}},{key:"drawXPoint",value:function(){var t=this.ctx;t.beginPath(),t.font=12*a+"px Microsoft YaHei",t.textAlign=this.xRorate||this.xRotate?"right":"center",t.textBaseline="top",t.fillStyle=this.axisColor;for(var e=0;e<this.labels.length;e++){var n=this.labels[e],r=this.leftPadding+this.xLength*(e+1)+.5,o=this.canvas.height-this.bottomPadding;this.showGrid?(t.strokeStyle=this.gridColor,t.moveTo(r,o),t.lineTo(r,this.topPadding+i)):(t.moveTo(r,o),t.lineTo(r,o-s)),t.stroke(),t.save(),t.translate(r-this.xLength/2,o+s),this.xRorate?t.rotate(-this.xRorate*Math.PI/180):t.rotate(-this.xRotate*Math.PI/180),t.fillText(n,0,0),t.restore()}}},{key:"drawYAxis",value:function(){var t=this.ctx;t.beginPath(),t.strokeStyle=this.axisColor,t.moveTo(this.leftPadding-.5,this.canvas.height-this.bottomPadding+.5),t.lineTo(this.leftPadding-.5,this.topPadding+.5),t.stroke(),this.drawYPoint()}},{key:"drawYPoint",value:function(){var t=this.ctx;t.font=12*a+"px Microsoft YaHei",t.textAlign="right",t.textBaseline="middle",t.beginPath();for(var e=0;e<this.yEqual;e++){var n=this.leftPadding,r=this.canvas.height-this.bottomPadding-this.yLength*(e+1)+.5;this.showGrid?(t.strokeStyle=this.gridColor,t.moveTo(n,r),t.lineTo(this.canvas.width-this.rightPadding-i,r)):(t.strokeStyle=this.axisColor,t.moveTo(n-s,r),t.lineTo(n,r)),t.stroke(),t.save(),t.fillStyle=this.axisColor,t.translate(n-i,r),this.yRorate?t.rotate(-this.yRorate*Math.PI/180):t.rotate(-this.yRotate*Math.PI/180),t.fillText(this.ySpace*(e+1),0,0),t.restore()}}},{key:"drawLegend",value:function(){var t=this.legend;if(t.display){var e=this.ctx,a="pie"===this.type||"ring"===this.type;e.beginPath(),e.font=t.font,e.textAlign="left",e.textBaseline="middle";for(var n=a?this.labels.length:this.datasets.length,r=(this.canvas.width-(this.legend.textWidth+(5*n-2)*i))/2,o=0,l=0;l<n;l++){var h=a?this.datasets[0]:this.datasets[l],c=(a?this.labels[l]:h.label)||"";e.fillStyle=h.colorList&&h.colorList[l]||h.fillColor||this.colorList[l],"top"===t.position?(this.drawLegendIcon(r+5*i*l+o,t.top-s,2*i,i),e.fillStyle=t.color,e.fillText(c,r+(5*l+3)*i+o,t.top)):"bottom"===t.position?(this.drawLegendIcon(r+5*i*l+o,this.canvas.height-t.bottom-s,2*i,i),e.fillStyle=t.color,e.fillText(c,r+(5*l+3)*i+o,this.canvas.height-t.bottom)):(e.fillRect(i,t.top+2*i*l,2*i,i),e.fillStyle=t.color,e.fillText(c,4*i,t.top+2*i*l+.5*i)),o+=Math.ceil(e.measureText(c).width)}}}},{key:"drawLegendIcon",value:function(t,e,n,r){var o=this.ctx;"line"===this.type?(o.beginPath(),o.strokeStyle=o.fillStyle,o.lineWidth=2*a,o.moveTo(t,e+s),o.lineTo(t+2*i,e+s),o.stroke(),o.lineWidth=1*a,o.arc(t+i,e+s,3*a,0,2*Math.PI,!0),o.fill()):o.fillRect(t,e,n,r)}}]),n}()}))},"47ae":function(t,e,a){"use strict";a.d(e,"h",(function(){return s})),a.d(e,"a",(function(){return n})),a.d(e,"i",(function(){return r})),a.d(e,"l",(function(){return o})),a.d(e,"c",(function(){return l})),a.d(e,"g",(function(){return h})),a.d(e,"f",(function(){return c})),a.d(e,"b",(function(){return u})),a.d(e,"e",(function(){return d})),a.d(e,"d",(function(){return p})),a.d(e,"k",(function(){return f})),a.d(e,"j",(function(){return b}));var i=a("82f8"),s=function(t){return Object(i["c"])("api/backend/api_test_task/list/"+t+"/")},n=function(t){return Object(i["e"])("api/backend/api_test_task/",t)},r=function(t){return Object(i["c"])("api/backend/api_test_task/"+t+"/")},o=function(t,e){return Object(i["d"])("api/backend/api_test_task/"+t+"/",e)},l=function(t){return Object(i["a"])("api/backend/api_test_task/"+t+"/")},h=function(t){return Object(i["c"])("api/backend/api_test_task/get_api_case_tree/"+t+"/")},c=function(t){return Object(i["c"])("api/backend/api_test_task/check_result_list/"+t+"/")},u=function(t){return Object(i["a"])("api/backend/api_test_task/check_result/"+t+"/")},d=function(t,e,a){return Object(i["c"])("api/backend/api_test_task/check_result/"+t+"/"+e+"/"+a+"/")},p=function(t,e,a){return Object(i["c"])("api/backend/api_test_task/check_result/error/"+t+"/"+e+"/"+a+"/")},f=function(t,e){return Object(i["d"])("api/backend/api_test_task/single_check_result/"+t+"/",e)},b=function(t){return Object(i["d"])("api/backend/api_test_task/perform_api_task/"+t+"/")}},"559b":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"schart-box"},[a("schart",{staticClass:"schart",attrs:{canvasId:"pie",options:t.options3}})],1),a("div",{staticStyle:{width:"80%",height:"100px",margin:"0 auto"}},[a("el-row",[a("el-button",{attrs:{type:"primary"},on:{click:t.getApiCaseResultListFun}},[t._v("全部")]),a("el-button",{attrs:{type:"danger"},on:{click:t.getApiCaseResultErrorListFun}},[t._v("失败")])],1),a("el-table",{attrs:{data:t.tableData,height:"550",align:"center"}},[a("el-table-column",{attrs:{prop:"id",label:"id",sortable:"",width:"180"}}),a("el-table-column",{attrs:{prop:"api_task_name",label:"任务名称",sortable:"",width:"180"}}),a("el-table-column",{attrs:{prop:"api_business_test_name",label:"API业务测试名称",sortable:"",width:"180"}}),a("el-table-column",{attrs:{prop:"api_test_case_name",label:"测试用例名称",sortable:"",width:"180"}}),a("el-table-column",{attrs:{prop:"api_successful",label:"成功",width:"180"}}),a("el-table-column",{attrs:{prop:"api_error",label:"失败",width:"180"}}),a("el-table-column",{attrs:{prop:"create_time",label:"时间",width:"180"}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return t.SingleApiCaseReport(e.row)}}},[t._v("查看详情")]),a("el-dialog",{attrs:{title:"测试报告详情",visible:t.dialogTableVisible,fullscreen:!1},on:{"update:visible":function(e){t.dialogTableVisible=e}}},[a("el-tabs",{attrs:{model:t.apiCaseResultForm}},[a("el-tab-pane",{attrs:{label:"异常",name:"1"}},[a("p",[t._v(t._s(t.apiCaseResultForm.abnormal))])]),a("el-tab-pane",{attrs:{label:"json提取变量转换",name:"2"}},[a("p",[t._v(t._s(t.apiCaseResultForm.json_extract_variable_conversion))])]),a("el-tab-pane",{attrs:{label:"断言结果",name:"3"}},[a("p",[t._v(t._s(t.apiCaseResultForm.api_assertion_results))])]),a("el-tab-pane",{attrs:{label:"参数提取",name:"4"}},[a("json-viewer",{attrs:{value:t.apiCaseResultForm.api_variable_results,"expand-depth":5}})],1),a("el-tab-pane",{attrs:{label:"API请求结果",name:"5"}},[a("json-viewer",{attrs:{value:t.apiCaseResultForm.api_request_results,"expand-depth":5}})],1),a("el-tab-pane",{attrs:{label:"请求URL",name:"6"}},[a("p",[t._v(t._s(t.apiCaseResultForm.api_url))])]),a("el-tab-pane",{attrs:{label:"请求Header",name:"7"}},[a("p",[t._v(t._s(t.apiCaseResultForm.api_header))])]),a("el-tab-pane",{attrs:{label:"请求Body",name:"8"}},[a("p",[t._v(t._s(t.apiCaseResultForm.api_body))])])],1)],1)]}}])})],1),a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,20,30,40,50],"page-size":t.size_page,layout:"total, sizes, prev, pager, next, jumper",total:t.total_case},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])},s=[],n=(a("8e6e"),a("ac6a"),a("456d"),a("ade3")),r=a("47ae"),o=a("f5ac"),l=a("2b0e"),h=a("349e"),c=a.n(h);function u(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,i)}return a}function d(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?u(Object(a),!0).forEach((function(e){Object(n["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):u(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}l["default"].use(c.a);var p={name:"ApiTaskResult",components:{Schart:o["a"]},data:function(){return{apiParameterExtractionData:[{api_value_variable:"",api_key_variable:"",api_variable_results:""}],currentPage:1,total_case:0,size_page:10,tableData:[],api_state:0,testTaskId:"",api_Result:"",api_result_id:"",api_test_result_id:"",dialogTableVisible:!1,gridData:[],apiCaseResult:"second",apiCaseResultForm:{api_error:"",api_successful:"",abnormal:"",json_extract_variable_conversion:"",api_assertion_results:"",api_request_results:"",api_variable_results:"",api_url:"",api_header:"",api_body:""},activeNames:"",options3:{type:"pie",title:{text:"测试结果"},legend:{position:"left"},bgColor:"#fbfbfb",labels:["成功","失败"],datasets:[{data:[0,0]}]}}},mounted:function(){this.getApiCaseResultListFun()},methods:{handleSizeChange:function(t){this.size_page=t,0===this.api_state?this.getApiCaseResultListFun():this.getApiCaseResultErrorListFun()},handleCurrentChange:function(t){this.currentPage=t,0===this.api_state?this.getApiCaseResultListFun():this.getApiCaseResultErrorListFun()},getApiCaseResultListFun:function(){var t=this;Object(r["e"])(this.api_result_id,this.size_page,this.currentPage).then((function(e){!0===e.data.success?(t.api_state=0,t.tableData=e.data.data.data,t.options3.datasets[0].data=e.data.data.case_result_total,t.total_case=e.data.data.case_result_total[0]+e.data.data.case_result_total[1]):t.$message.error("获取接口失败")}))},getApiCaseResultErrorListFun:function(){var t=this;Object(r["d"])(this.api_result_id,this.size_page,this.currentPage).then((function(e){!0===e.data.success?(t.api_state=1,t.tableData=e.data.data.data,t.total_case=e.data.data.case_result_total[1]):t.$message.error("获取接口失败")}))},SingleApiCaseReport:function(t){var e=this;console.log("这是单独id",t.id),this.api_test_result_id=t.id,Object(r["k"])(this.api_test_result_id).then((function(t){if(!0===t.data.success){var a=t.data.data.data[0];e.dialogTableVisible=!0,e.apiCaseResultForm=d({},a)}else e.$message.error("获取接口失败")}))}},created:function(){this.api_result_id=this.$route.query.apiResultId}},f=p,b=(a("6615"),a("2877")),g=Object(b["a"])(f,i,s,!1,null,"fa24e140",null);e["default"]=g.exports},6615:function(t,e,a){"use strict";a("13bf")},f5ac:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("canvas",{attrs:{id:t.canvasId}})])},s=[],n=(a("8e6e"),a("ac6a"),a("456d"),a("ade3")),r=a("2c8a"),o=a.n(r);function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,i)}return a}function h(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(Object(a),!0).forEach((function(e){Object(n["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var c={props:{canvasId:{type:String,default:"",required:!0},options:{type:Object,required:!0}},mounted:function(){this.renderChart()},methods:{renderChart:function(){if(this.checkOptions()){var t=h({},this.options);new o.a(this.canvasId,t)}},checkOptions:function(){var t=this.options;return!(!t.datasets||!t.datasets.length)&&!(!t.labels||!t.labels.length)}},watch:{options:{handler:function(t,e){this.renderChart()},deep:!0}}},u=c,d=a("2877"),p=Object(d["a"])(u,i,s,!1,null,null,null);e["a"]=p.exports}}]);