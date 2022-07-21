import axios from "axios";

const insertionsURL = process.env.REACT_APP_API_INSERTIONS;

const axiosInstance = axios.create({
  baseURL: insertionsURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default axiosInstance;