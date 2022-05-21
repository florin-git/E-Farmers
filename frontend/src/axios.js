import axios from "axios";

const userURL = `${process.env.REACT_APP_API_USER}`;

const axiosInstance = axios.create({
  baseURL: userURL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "JWT " + localStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});
