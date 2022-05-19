import {getRequest, postRequest, deleteRequest,putRequest} from "../common/common";

// 获取所有UI测试任务列表
export const getUiTestTaskRequest = (ui_project_id) =>{
    return getRequest("api/backend/ui_test_task/list/" + ui_project_id + "/")
};

//添加UI测试任务
export const addUiTestTaskRequest = (data) =>{
    return putRequest("api/backend/ui_test_task/", data)
};

//获取单个UI测试任务
export const getSingleUiTestTaskRequest = (ui_test_task_id) =>{
    return getRequest("api/backend/ui_test_task/" + ui_test_task_id + "/")
};

//编辑单个UI测试任务
export const updateSingleUiTestTaskRequest = (ui_test_task_id, data) =>{
    return postRequest("api/backend/ui_test_task/" + ui_test_task_id + "/", data)
};

//删除单个UI测试任务
export const deleteSingleUiTestTaskRequest = (ui_test_task_id) =>{

    return deleteRequest("api/backend/ui_test_task/" + ui_test_task_id + "/")
};

//获取所有测试用例树形结构
export const getUiCaseTreeRequest = (ui_project_id) =>{
    return getRequest("api/backend/ui_test_task/get_ui_case_tree/" + ui_project_id + "/")
};

//获取单独测试任务的用例树形结构
export const postUiCaseTreeRequest = (ui_test_task_id) =>{
    return postRequest("api/backend/ui_test_task/get_ui_case_tree/" + ui_test_task_id + "/")
};

//执行测试任务
export const postPerformUiTaskRequest = (ui_test_task_id) =>{
    return postRequest("api/backend/ui_test_task/perform_ui_task/" + ui_test_task_id + "/")
};

//获取单独测试用例的所有测试报告
export const getUiCaseResultRequest = (ui_test_task_id) =>{
    return getRequest("api/backend/ui_test_task/check_result_list/" + ui_test_task_id + "/")
};

//获取单独测试用例的-单独的测试报告
export const postUiCaseCheckResultRequest = (ui_test_result_id) =>{
    return postRequest("api/backend/ui_test_task/check_result/" + ui_test_result_id + "/")
};

//编辑单个UI测试报告
export const deleteSingleUiTestResultRequest = (ui_test_task_id, ui_test_result_id) =>{
    return deleteRequest("api/backend/ui_test_task/check_result_list/" + ui_test_task_id + "/" + ui_test_result_id + "/")
};

//获取单独测试用例的-单独的测试报告异常详情
export const getUiTestAbnormalRequest = (ui_test_abnormal_result_id) =>{
    return getRequest("api/backend/ui_test_task/check_result/ui_test_abnormal/" + ui_test_abnormal_result_id + "/")
};

// 下载Web 自动化脚本
export const getDownloadWebScriptRequest = (ui_test_result_id) =>{
    return getRequest("api/backend/ui_test_task/check_result/ui_test_web_script/" + ui_test_result_id + "/")
};