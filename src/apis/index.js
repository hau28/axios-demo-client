import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL });

API.interceptors.request.use((config) => {
  console.log(process.env.REACT_APP_BACKEND_URL);
  const user = localStorage.getItem("user");
  if (user) {
    config.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user"))?.token
    }`;
  }
  return config;
});

export default API;
