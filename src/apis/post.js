import API from ".";

export const getPostList = () => API.get("post/list");
export const getFullPost = (id) => API.get(`post/view/${id}`);
export const deletePost = (id) => API.get(`post/delete/${id}`);
export const editPost = (id) => API.get(`post/edit/${id}`);
