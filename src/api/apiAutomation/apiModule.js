import {getRequest, postRequest, deleteRequest,putRequest} from "../common/common";

// 获取所有模块列表
export const getApiModuleRequest = () =>{
    return getRequest("api/backend/api_module/list/")
};

//添加API模块
export const addApiModuleRequest = (data) =>{
    return putRequest("api/backend/api_module/", data)
};

//获取单个API模块
export const getSingleApiModuleRequest = (api_project_id) =>{
    return getRequest("api/backend/api_module/" + api_project_id + "/")
};

//编辑单个API模块
export const updateSingleApiModuleRequest = (api_project_id, data) =>{
    return postRequest("api/backend/api_module/" + api_project_id + "/", data)
};

//删除单个API模块
export const deleteSingleApiModuleRequest = (api_project_id) =>{
    return deleteRequest("api/backend/api_module/" + api_project_id + "/")
};

//获取单个API项目中包含得所有API模块
export const getSingleApiProjectModuleRequest = (api_project_id,size_page,page) =>{
    return getRequest("api/backend/api_project/api_module/" + api_project_id +"/" + size_page +  "/" + page + "/")
};