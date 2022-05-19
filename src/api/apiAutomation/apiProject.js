import {getRequest, postRequest, deleteRequest,putRequest} from "../common/common";

// 获取所有API项目列表
export const getApiProjectRequest = () =>{
    return getRequest("api/backend/api_project/list/")
};

//添加API项目
export const addApiProjectRequest = (data) =>{
    return putRequest("api/backend/api_project/", data)
};

//获取单个API项目
export const getSingleApiProjectRequest = (api_project_id) =>{
    return getRequest("api/backend/api_project/" + api_project_id + "/")
};

//编辑单个API项目
export const updateSingleApiProjectRequest = (api_project_id, data) =>{
    return postRequest("api/backend/api_project/" + api_project_id + "/", data)
};

//删除单个API项目
export const deleteSingleApiProjectRequest = (api_project_id) =>{
    return deleteRequest("api/backend/api_project/" + api_project_id + "/")
};