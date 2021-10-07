import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL });

API.interceptors.request.use(
  (config) => {
    console.log(process.env.REACT_APP_BACKEND_URL);
    const user = localStorage.getItem("user");
    if (user) {
      config.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("user"))?.token
      }`;
    }
    return config;
  },
  (error) => {
    //Do something with request error
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  function (response) {
    // Do something with 2xx response
    return response;
  },
  function (error) {
    // Do something with other-than-2xx response
    return Promise.reject(error);
  }
);

export default API;
