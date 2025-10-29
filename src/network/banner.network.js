import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async () => {
    return await privateRequest.get(`/admin/banner` );
};


/* resource store */
export const store = async(data) => {
    
    return await privateRequest.post('/admin/banner', data)
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/banner/${id}`)
}

/* reosurce update */
export const update = async(id, data) => {
    return await privateRequest.post(`/admin/banner/${id}`, data)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/admin/banner/${id}`)
}

