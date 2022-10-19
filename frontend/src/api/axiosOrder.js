import axios from "axios";

export const order_paymentURL = process.env.REACT_APP_API_PAYMENTS_ORDERS;

export const api = axios.create({
  baseURL: order_paymentURL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default class axiosOrder{
  static saveStripeInfo(data = {}){
    return api.post(`${order_paymentURL}/save-stripe-info/`, data)
  }
  static getOrder(email){
    return api.get(`${order_paymentURL}/get-orders/${email}`)
  }
}

