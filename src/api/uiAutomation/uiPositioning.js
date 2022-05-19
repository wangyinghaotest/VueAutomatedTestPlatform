import {getRequest, postRequest, deleteRequest,putRequest} from "../common/common";

// 获取所有ui定位方式列表
export const getUiPositioningRequest = () =>{
    return getRequest("api/backend/ui_positioning/list/")
};

//添加ui定位方式
export const addUiPositioningRequest = (data) =>{
    return putRequest("api/backend/ui_positioning/", data)
};

//获取单个ui定位方式
export const getSingleUiPositioningRequest = (element_positioning_id) =>{
    return getRequest("api/backend/ui_positioning/" + element_positioning_id + "/")
};

//编辑单个ui定位方式
export const updateUiPositioningRequest = (element_positioning_id, data) =>{
    return postRequest("api/backend/ui_positioning/" + element_positioning_id + "/", data)
};

//删除单个ui定位方式
export const deleteSingleUiPositioningRequest = (element_positioning_id) =>{
    return deleteRequest("api/backend/ui_positioning/" + element_positioning_id + "/")
};