import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async (queryParams ) => {
    return await privateRequest.get(`/admin/brand?${queryParams}` );
};


/* resource store */
export const store = async(data) => {
    
    return await privateRequest.post('/admin/brand', data)
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/brand/${id}`)
}

/* reosurce update */
export const update = async(id, data) => {
    return await privateRequest.post(`/admin/brand/${id}`, data)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/admin/brand/${id}`)
}

