import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080/api/v1" });

API.interceptors.request.use((req) => {
  // when user login generate token and save it in localStorage
  if (localStorage.getItem("token")) {
    req.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

export default API;
