import {getRequest, postRequest, deleteRequest,putRequest} from "../common/common";

// 获取所有ui元素操作列表
export const getUiElementOperationRequest = () =>{
    return getRequest("api/backend/ui_element_operation/list/")
};

//添加ui元素操作
export const addUiElementOperationRequest = (data) =>{
    return putRequest("api/backend/ui_element_operation/", data)
};

//获取单个ui元素操作
export const getSingleElementOperationRequest = (element_operation_id) =>{
    return getRequest("api/backend/ui_element_operation/" + element_operation_id + "/")
};

//编辑单个ui元素操作
export const updateUiElementOperationRequest = (element_operation_id, data) =>{
    return postRequest("api/backend/ui_element_operation/" + element_operation_id + "/", data)
};

//删除单个ui元素操作
export const deleteSingleElementOperationRequest = (element_operation_id) =>{
    return deleteRequest("api/backend/ui_element_operation/" + element_operation_id + "/")
};