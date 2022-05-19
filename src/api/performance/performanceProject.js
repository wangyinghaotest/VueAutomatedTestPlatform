import {getRequest, postRequest, deleteRequest,putRequest} from "../common/common";

// 获取所有性能测试项目列表
export const getPerformanceProjectRequest = () =>{
    return getRequest("api/backend/performance_test/performance_project_list/")
};

//添加性能测试项目
export const addPerformanceProjectRequest = (data) =>{
    return putRequest("api/backend/performance_test/performance_project/", data)
};

//获取单个性能测试项目
export const getSinglePerformanceProjectRequest = (performance_project_id) =>{
    return getRequest("api/backend/performance_test/performance_project/" + performance_project_id + "/")
};

//编辑单个性能测试项目
export const updateSinglePerformanceProjectRequest = (performance_project_id, data) =>{
    return postRequest("api/backend/performance_test/performance_project/" + performance_project_id + "/", data)
};

//删除单个性能测试项目
export const deleteSinglePerformanceProjectRequest = (performance_project_id) =>{
    return deleteRequest("api/backend/performance_test/performance_project/" + performance_project_id + "/")
};