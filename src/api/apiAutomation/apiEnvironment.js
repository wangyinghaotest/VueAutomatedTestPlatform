import {getRequest, postRequest, deleteRequest,putRequest} from "../common/common";

// 获取所有API环境列表
export const getApiEnvironmentRequest = () =>{
    return getRequest("api/backend/api_environment/list/")
};

//添加API环境
export const addApiEnvironmentRequest = (data) =>{
    return putRequest("api/backend/api_environment/", data)
};

//获取单个API环境
export const getSingleApiEnvironmentRequest = (api_environment_id) =>{
    return getRequest("api/backend/api_environment/" + api_environment_id + "/")
};

//编辑单个API环境
export const updateSingleApiEnvironmentRequest = (api_environment_id, data) =>{
    return postRequest("api/backend/api_environment/" + api_environment_id + "/", data)
};

//删除单个API环境
export const deleteSingleApiEnvironmentRequest = (api_environment_id) =>{
    return deleteRequest("api/backend/api_environment/" + api_environment_id + "/")

};