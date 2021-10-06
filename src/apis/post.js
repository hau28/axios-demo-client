import API from ".";

export const getPostListAPI = () => API.get("post/list");
export const getPostAPI = (id) => API.get(`post/view/${id}`);
export const deletePostAPI = (id) => API.delete(`post/delete/${id}`);
export const editPostAPI = (id) => API.put(`post/edit/${id}`);
