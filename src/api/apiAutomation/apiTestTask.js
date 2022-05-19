import {getRequest, postRequest, deleteRequest,putRequest} from "../common/common";

// 获取该项目---API测试任务列表
export const getApiTestTaskRequest = (api_project_id) =>{
    return getRequest("api/backend/api_test_task/list/" + api_project_id + "/")
};

//添加API测试任务
export const addAPITestTaskRequest = (data) =>{
    return putRequest("api/backend/api_test_task/", data)
};

//获取单个Api测试任务
export const getSingleApiTestTaskRequest = (api_test_task_id) =>{
    return getRequest("api/backend/api_test_task/" + api_test_task_id + "/")
};

//编辑单个Api测试任务
export const updateSingleApiTestTaskRequest = (api_test_task_id, data) =>{
    return postRequest("api/backend/api_test_task/" + api_test_task_id + "/", data)
};

//删除单个API任务
export const deleteSingleApiTestTaskRequest = (api_task_id) =>{
    return deleteRequest("api/backend/api_test_task/" + api_task_id + "/")
};

//获取所有业务测试用例树形结构
export const getApiCaseTreeRequest = (api_task_id) =>{
    return getRequest("api/backend/api_test_task/get_api_case_tree/" + api_task_id + "/")
};


//获取单独API测试用例的所有测试报告
export const getApiCaseResultRequest = (api_test_task_id) =>{
    return getRequest("api/backend/api_test_task/check_result_list/" + api_test_task_id + "/")
};

//删除单独API测试用例的所有测试报告
export const deleteApiCaseResultRequest = (api_test_result_id) =>{
    return deleteRequest("api/backend/api_test_task/check_result/" + api_test_result_id + "/")
};

//获取API测试报告列表-API测试用例报告列表
export const getApiCaseCheckResultListRequest = (api_test_result_id, size_page, page) =>{
    return getRequest("api/backend/api_test_task/check_result/" + api_test_result_id +"/" + size_page +  "/" + page + "/")
};

//获取API测试报告列表-API测试用例报告-失败列表
export const getApiCaseCheckResultErrorListRequest = (api_test_result_id, size_page, page) =>{
    return getRequest("api/backend/api_test_task/check_result/error/" + api_test_result_id +"/" + size_page +  "/" + page + "/")
};

//获取API测试报告列表-API测试用例报告列表-单独APi测试用例报告结果
export const postSingleApiCaseCheckResultRequest = (api_test_case_result_id, data) =>{
    return postRequest("api/backend/api_test_task/single_check_result/" + api_test_case_result_id + "/", data)
};

//执行API测试任务
export const postPerformApiTaskRequest = (api_test_task_id) =>{
    return postRequest("api/backend/api_test_task/perform_api_task/"  +  api_test_task_id + "/")
};