import axios from "axios";

// only running locally and for development
const insertionsURL = "http://localhost:8081/api/";
// Final version should use env variable:
// const insertionsURL = process.env.REACT_APP_API_INSERTIONS;

const axiosInstance = axios.create({
  baseURL: insertionsURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default axiosInstance;