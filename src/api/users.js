import {getRequest, postRequest, deleteRequest} from "./common/common";
import da from 'element-ui/src/locale/lang/da';

export const loginRequest = (userData) =>{
    return getRequest("api/backend/users/", userData)
};

export const registerRequest = (userData) => {
    return postRequest("api/backend/users/",userData)
};

export const logoutRequest = () => {
    return deleteRequest("api/backend/users/")
};

export const getUserInfoRequest = () => {
    return getRequest("api/backend/users/info/")
};

export const test = () => {
    return getRequest("test")
};

