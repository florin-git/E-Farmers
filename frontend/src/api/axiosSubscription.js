import axios from "axios";

const subscriptionURL = process.env.REACT_APP_API_SUBSCRIPTION;

const axiosInstance = axios.create({
  baseURL: subscriptionURL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default axiosInstance;