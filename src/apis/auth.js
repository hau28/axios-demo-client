import API from ".";

export const login = (body) => API.post("user/login", body);
