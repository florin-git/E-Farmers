import axios from "axios";

const usersURL = process.env.REACT_APP_API_USERS;

const axiosInstance = axios.create({
  baseURL: usersURL,
  timeout: 5000,
  headers: {
    Authorization: null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default axiosInstance;
