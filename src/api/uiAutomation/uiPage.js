import {getRequest, postRequest, deleteRequest,putRequest} from "../common/common";

// 获取所有页面列表
export const getUiPageRequest = () =>{
    return getRequest("api/backend/ui_page/list/")
};

//添加UI页面
export const addUiPageRequest = (data) =>{
    return putRequest("api/backend/ui_page/", data)
};

//获取单个ui页面
export const getSingleUiPageRequest = (ui_page_id) =>{
    return getRequest("api/backend/ui_page/" + ui_page_id + "/")
};

//编辑单个UI页面
export const updateSingleUiPageRequest = (ui_page_id, data) =>{
    return postRequest("api/backend/ui_page/" + ui_page_id + "/", data)
};

//删除单个ui页面
export const deleteSingleUiPageRequest = (ui_page_id) =>{
    return deleteRequest("api/backend/ui_page/" + ui_page_id + "/")
};

//获取单个UI项目中包含得所有页面
export const getSingleUiProjectPageRequest = (ui_project_id) =>{
    return getRequest("api/backend/ui_page_element/ui_project_page/" + ui_project_id + "/")
};