import {getRequest, postRequest, deleteRequest,putRequest} from "../common/common";

// 获取该项目的所有UI测试用例列表
export const getUiTestCaseRequest = (ui_project_id) =>{
    return getRequest("api/backend/ui_test_case/list/" + ui_project_id + "/")
};

//添加UI测试用例
export const addUiTestCaseRequest = (data) =>{
    return putRequest("api/backend/ui_test_case/", data)
};

//获取单个UI测试用例
export const getSingleUiTestCaseRequest = (ui_test_case_id) =>{
    return getRequest("api/backend/ui_test_case/" + ui_test_case_id + "/")
};

//编辑单个UI测试用例
export const updateSingleUiTestCaseRequest = (ui_test_case_id, data) =>{
    return postRequest("api/backend/ui_test_case/" + ui_test_case_id + "/", data)
};

//删除单个UI测试用例
export const deleteSingleUiTestCaseRequest = (ui_test_case_id) =>{
    return deleteRequest("api/backend/ui_test_case/" + ui_test_case_id + "/")
};

//获取所有项目-》页面列表
export const getSelectUiTestCaseRequest = () =>{
    return getRequest("api/backend/ui_test_case/get_ui_test_case_select_data/")
};

//调试测试用例
export const postDebugUiTestCaseRequest = (data) =>{
    return postRequest("api/backend/ui_test_case/debug_ui_test_case/", data)
};