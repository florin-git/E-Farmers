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
  static getSpecificOrder(payment_method_id){
    return api.get(`${order_paymentURL}/getSpecificOrder/${payment_method_id}`)
  }
  static getSpecificOrderByRider(rider_id){
    return api.get(`${order_paymentURL}/getSpecificOrderByRider/${rider_id}`)
  }
  static updateOrder(data = {}){
    return api.patch(`${order_paymentURL}/update-order/`,data)
  }
  static updateStatusRider(data = {}){
    return api.patch(`${order_paymentURL}/update-status-rider/`,data)
  }
}

