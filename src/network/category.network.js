import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async ( queryParams) => {
    return await privateRequest.get(`/admin/category?${queryParams}` );
};
/* list of resource */
export const allCategory = async ( ) => {
    return await privateRequest.get(`admin/categories/all` );
};


/* resource store */
export const store = async(data) => {
    
    return await privateRequest.post('/admin/category', data)
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/category/${id}`)
}

/* reosurce update */
export const update = async(id, data) => {
    return await privateRequest.post(`/admin/category/${id}`, data)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/admin/category/${id}`)
}

/* resource destory */
export const bulkDestroy = async (ids) => {
    return await privateRequest.post(`/admin/bulk-destroy-category`,ids)
}
