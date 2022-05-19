import {getRequest, postRequest, deleteRequest,putRequest} from "../common/common";

// 获取所有数据库配置
export const getDatabaseRequest = () =>{
    return getRequest("api/backend/api_database/list/")
};

//添加数据库
export const addDatabaseRequest = (data) =>{
    return putRequest("api/backend/api_database/", data)
};

//获取单个数据库配置
export const getSingleDatabaseRequest = (api_database_id) =>{
    return getRequest("api/backend/api_database/" + api_database_id + "/")
};

//编辑单个数据库配置
export const updateSingleDatabaseRequest = (api_database_id, data) =>{
    return postRequest("api/backend/api_database/" + api_database_id + "/", data)
};

//删除单个数据库配置
export const deleteSingleDatabaseRequest = (api_database_id) =>{
    return deleteRequest("api/backend/api_database/" + api_database_id + "/")
};

//调试数据库配置连接
export const updateDebugDatabaseRequest = (data) =>{
    return postRequest("api/backend/api_debug_database/",data)
};