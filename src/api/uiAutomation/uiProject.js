import {getRequest, postRequest, deleteRequest,putRequest} from "../common/common";

// 获取所有项目列表
export const getUiProjectRequest = () =>{
    return getRequest("api/backend/ui_project/list/")
};

//添加UI项目
export const addUiProjectRequest = (data) =>{
    return putRequest("api/backend/ui_project/", data)
};

//获取单个ui项目
export const getSingleUiProjectRequest = (ui_project_id) =>{
    return getRequest("api/backend/ui_project/" + ui_project_id + "/")
};

//编辑单个UI项目
export const updateSingleUiProjectRequest = (ui_project_id, data) =>{
    return postRequest("api/backend/ui_project/" + ui_project_id + "/", data)
};

//删除单个ui项目
export const deleteSingleUiProjectRequest = (ui_project_id) =>{
    return deleteRequest("api/backend/ui_project/" + ui_project_id + "/")
};