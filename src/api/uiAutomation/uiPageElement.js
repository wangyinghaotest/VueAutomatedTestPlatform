import {getRequest, postRequest, deleteRequest,putRequest} from "../common/common";

// 获取所有页面元素列表
export const getUiPageElementRequest = () =>{
    return getRequest("api/backend/ui_page_element/list/")
};

//添加UI页面元素
export const addUiPageElementRequest = (data) =>{
    return putRequest("api/backend/ui_page_element/", data)
};

//获取单个ui页面元素
export const getSingleUiPageElementRequest = (page_id) =>{
    return getRequest("api/backend/ui_page_element/" + page_id + "/")
};

//编辑单个UI页面元素
export const updateSingleUiPageElementRequest = (ui_page_id, data) =>{
    return postRequest("api/backend/ui_page_element/" + ui_page_id + "/", data)
};

//删除单个ui页面元素
export const deleteSingleUiPageElementRequest = (page_element_id) =>{
    return deleteRequest("api/backend/ui_page_element/" + page_element_id + "/")
};

//获取所有项目-》页面列表
export const getSelectUiPageElementRequest = () =>{
    return getRequest("api/backend/ui_page_element/get_ui_page_select_data/")
};