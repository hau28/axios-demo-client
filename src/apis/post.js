import API from ".";

export const getPostListAPI = () => API.get("post/list");
export const getPostAPI = (id) => API.get(`post/${id}`);
export const deletePostAPI = (id) => API.delete(`post/${id}`);
export const editPostAPI = (id) => API.put(`post/${id}`);
