import axios from "axios";

const cartURL = process.env.REACT_APP_API_CART;

const axiosInstance = axios.create({
  baseURL: cartURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default axiosInstance;