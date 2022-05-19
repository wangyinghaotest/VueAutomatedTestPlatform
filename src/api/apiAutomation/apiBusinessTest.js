import {getRequest, postRequest, deleteRequest,putRequest} from "../common/common";

// 获取该项目的所有API业务测试列表
export const getApiBusinessTestRequest = (api_project_id) =>{
    return getRequest("api/backend/api_business_test/list/" + api_project_id + "/")
};

//添加API业务测试
export const addApiBusinessTestRequest = (data) =>{
    return putRequest("api/backend/api_business_test/", data)
};

//获取单个API业务测试
export const getSingleApiBusinessTestRequest = (api_business_test_id) =>{
    return getRequest("api/backend/api_business_test/" + api_business_test_id + "/")
};

//编辑API业务测试
export const updateBusinessTestRequest = (api_business_test_id, data) =>{
    return postRequest("api/backend/api_business_test/" + api_business_test_id + "/", data)
};

//删除API业务测试
export const deleteSingleApiBusinessTestRequest = (api_business_test_id) =>{
    return deleteRequest("api/backend/api_business_test/" + api_business_test_id + "/")
};

//获取模块-》api测试用例列表
export const getSelectApiBusinessTestRequest = (api_project_id) =>{
    return getRequest("api/backend/api_business_test/get_api_test_business_test_select_data/" + api_project_id + "/")
};

//api业务测试调试
export const postApiBusinessTestDeBugRequest = (data) =>{
    return postRequest("api/backend/api_business_test/api_business_test_debug/", data)
};

