import { privateRequest } from "../config/axios.config";

/* list of resource */
export const index = async (queryParams) => {
  return await privateRequest.get(`/admin/vendor-list?${queryParams}`);
};

/* resource store */
export const store = async (data) => {
  
  return await privateRequest.post("/admin/vendor-list", data);
};

/* resource show */
export const show = async (id) => {
  return await privateRequest.get(`/admin/vendor-list/${id}`);
};

/* reosurce update */
export const update = async (id, data) => {
  return await privateRequest.post(`/admin/vendor-list/${id}`, data);
};

/* resource destory */
export const destroy = async (id) => {
  return await privateRequest.delete(`/admin/vendor-list/${id}`);
};

/* resource destory */
export const bulkDestroy = async (ids) => {
  return await privateRequest.post(`/admin/bulk-destroy-category`, ids);
};
