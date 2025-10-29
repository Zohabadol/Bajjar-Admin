import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async (queryParams) => {
    return await privateRequest.get(`/admin/unit?${queryParams}` );
};


/* resource store */
export const store = async(data) => {
    
    return await privateRequest.post('/admin/unit', data)
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/unit/${id}`)
}

/* reosurce update */
export const update = async(id, data) => {
    return await privateRequest.post(`/admin/unit/${id}`, data)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/admin/unit/${id}`)
}

