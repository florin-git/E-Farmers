import axios from "axios";

const orderURL = process.env.REACT_APP_API_ORDERS;

const axiosInstance = axios.create({
  baseURL: "http://localhost:8083/api/",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default axiosInstance;