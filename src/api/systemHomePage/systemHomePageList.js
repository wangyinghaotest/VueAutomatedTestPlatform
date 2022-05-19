import {getRequest, postRequest, deleteRequest,putRequest} from "../common/common";

// 获取所有项目测试用例
export const getSystemHomePageListRequest = () =>{
    return getRequest("api/backend/system_home_page_list/")

};

// 获取API接口自动化统计
export const postSystemHomePageApiStatisticsRequest = (data) =>{
    return postRequest("api/backend/system_home_page_list/api_statistics/",data)

};