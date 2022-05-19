import {getRequest, postRequest, deleteRequest,putRequest} from "../common/common";

// 获取该模块下所有API测试用例
export const getApiTestCaseListRequest = (api_module_id) =>{
    return postRequest("api/backend/api_test_case/list/" + api_module_id + "/")
};

//添加API测试用例
export const addApiTestCaseRequest = (data) =>{
    return putRequest("api/backend/api_test_case/", data)
};

//获取单个API测试用例
export const getSingleApiTestCaseRequest = (api_test_case_id) =>{
    return getRequest("api/backend/api_test_case/" + api_test_case_id + "/")
};

//编辑单个API测试用例
export const updateSingleApiTestCaseRequest = (api_test_case_id, data) =>{
    return postRequest("api/backend/api_test_case/" + api_test_case_id + "/", data)
};

//删除单个API测试用例
export const deleteSingleApiTestCaseRequest = (api_test_case_id) =>{
    return deleteRequest("api/backend/api_test_case/" + api_test_case_id + "/")

};

//调试API测试用例
export const deBugApiTestCaseRequest = (data) =>{
    return postRequest("api/backend/api_test_case/debug/", data)
};

//上传API测试用例
export const uploadApiTestCaseRequest = (data) =>{
    return postRequest("api/backend/api_test_case/upload_test_cases/", data)
};

//API测试用例导入
export const uploadApiCaseImportRequest = (data) =>{
    return putRequest("api/backend/api_test_case/upload_api_case_import/", data)
};