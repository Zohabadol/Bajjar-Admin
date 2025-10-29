import { privateRequest, publicRequest } from "../config/axios.config";


export const login = async (data) => {
    console.log("data",data)
    return await publicRequest.post(`auth/login`, data);
};

/* list of resource */
export const index = async () => {
    return await privateRequest.get('admin/user-list');
};
/* list of resource */
export const profile = async () => {
    return await privateRequest.get('admin/user-list/profile');
};
/* list of resource */
export const myProfile = async () => {
    return await privateRequest.get('admin/profile');
};
/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/user-list/${id}`)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/admin/user-list/${id}`)
}
// forgot password
export const forgotpass = async (data) => {
    console.log("data",data)
    return await publicRequest.post(`/auth/forgot/password/sms-send`, data);
};
// forgot password
export const forgotpassSend = async (data) => {
    console.log("data",data)
    return await publicRequest.post(`/forgot-code-check`, data);
};