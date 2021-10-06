import API from ".";

export const loginAPI = (body) => API.post("user/login", body);
