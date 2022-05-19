import {getRequest, postRequest, deleteRequest,putRequest} from "../common/common";

// 获取所有性能脚本列表
export const getPerformanceScriptRequest = () =>{
    return getRequest("api/backend/api_module/list/")
};

//添加性能脚本
export const addPerformanceScriptRequest = (data) =>{
    return putRequest("api/backend/performance_test/performance_script/", data)
};

//获取单个性能脚本
export const getSinglePerformanceScriptRequest = (performance_script_id) =>{
    return getRequest("api/backend/performance_test/performance_script/" + performance_script_id + "/")
};

//编辑单个性能脚本
export const updateSinglePerformanceScriptRequest = (performance_script_id, data) =>{
    return postRequest("api/backend/performance_test/performance_script/" + performance_script_id + "/", data)
};

//删除单个性能脚本
export const deleteSinglePerformanceScriptRequest = (performance_script_id) =>{
    return deleteRequest("api/backend/performance_test/performance_script/" + performance_script_id + "/")
};

//获取单个性能项目中包含得所有性能脚本--弃用
export const getSinglePerformanceProjectScriptRequest = (performance_project_id, size_page, page) =>{
    return getRequest("api/backend/performance_test/performance_project_script/" + performance_project_id + "/" + size_page +  "/" + page + "/")
};

// 查询性能脚本
export const postQueryPerformanceProjectScriptRequest = (size_page, page, data) =>{
    return postRequest("api/backend/performance_test/performance_project_script/" + size_page +  "/" + page + "/", data)
};

//性能脚本-暂停运行
export const getPerformanceProjectScriptSuspendedRequest = (performance_script_id) =>{
    return getRequest("api/backend/performance_test/performance_project_script/script_suspended/" + performance_script_id + "/")
};

//上传脚本
export const uploadPerformanceScriptRequest = (data) =>{
    return postRequest("api/backend/performance_test/performance_project/", data)
};

//执行脚本
export const performPerformanceScriptRequest = (performance_script_id) =>{
    return getRequest("api/backend/performance_test/perform_performance_script/" + performance_script_id + "/")
};

//New-执行脚本
export const newPerformPerformanceScriptRequest = (performance_script_id) =>{
    return getRequest("api/backend/performance_test/new_perform_performance_script/" + performance_script_id + "/")
};

//单独性能脚本报告
export const performanceScriptReportRequest = (performance_script_id) =>{
    return getRequest("api/backend/performance_test/performance_script_report/" + performance_script_id + "/")
};

//New单独性能脚本报告
export const newPerformanceScriptReportRequest = (data) =>{
    return postRequest("api/backend/performance_test/performance_script_report/", data)
};

//删除单独性能脚本报告
export const performanceScriptReportDeleteRequest = (report_name, report_id) =>{
    return deleteRequest("api/backend/performance_test/performance_script_report/" + report_name + "/" + report_id + "")
};

//性能脚本报告页面
export const performanceScriptReportGetRequest = (performance_report_id) =>{
    return getRequest("api/backend/performance_test/performance_script_report_page/" + performance_report_id + "/")
};