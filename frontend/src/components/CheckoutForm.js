import "../my_css/PaymentOrderFE/PayForm.css";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import axiosOrder from "../api/axiosOrder";
import axiosInsertions from "../api/axiosInsertions";
import axiosCart from "../api/axiosCart";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

const CheckoutForm = (props) => {
    // Getting parameters
    const price = parseFloat(props.price).toFixed(2);
    const email = props.email;
    const boxes_array = props.boxes_array;
    const box_names = props.box_names;
    const farmer = props.farmer;
    
    // Authentication data from context storage
    const { auth } = useAuth();
    const userId = auth.userId;

    // Stripe handling errors
    const [error, setError] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const location = useLocation();
    
    
    // Handle real-time validation errors from the CardElement.
    const handleChange = (event) => {
        if (event.error)
            setError(event.error.message);
        else
            setError(null);
    }

    // Handle form submission.
    const handleSubmit = async (event) => {
        event.preventDefault();
        const card = elements.getElement(CardElement);
        // add these lines
        const {paymentMethod, error} = await stripe.createPaymentMethod({
            type: 'card',
            card: card
        });
        
        axiosOrder.saveStripeInfo({ email, payment_method_id: paymentMethod.id , price, box_names, farmer})
        .then(response => {
            boxes_array.map((box_id) => (
                axiosInsertions.patch(`boxes/${box_id}/decrease/`)
            ))
            axiosCart.delete(`users/${userId}/cart/`)
            .then(() => {
                console.log("Redirecting to the selection of rider")
        
                const url = location.pathname + '/Delivery';
                const state = {
                    payment_method_id : paymentMethod.id
                }
                // Navigate to the new URL
                navigate(url, {state});
            })
        })
        .catch(error => {
            console.log(error);
        })
    };
    return (
        <main className="page payment-page">
          <section className="payment-form dark">
              <div className="container">
                  <div className="block-heading">
                  <h2>Confirm Payment</h2>
                  <p>EDIT: eFarmers never ask u the password of your account. We don't save yuor credit card credential</p>
                  </div>
                  <form onSubmit={handleSubmit} className="stripe-form">
                  <div className="products">
                      <div className="total">Total<span className="price">${price}</span></div>
                  </div>
                  <div className="card-details">
                      <h3 className="title">Credit Card Details</h3>
                      <div className="row">
                      <div className="form-group col-sm-7">
                          <label htmlFor="card-holder">Email Address</label>&emsp;
                          {email}
                      </div>
                      <div className="form-group col-sm-8">
                          <label htmlFor="card-element">Credit or debit card</label> 
                          <CardElement id="card-element" onChange={handleChange}/>
                          <div className="card-errors" role="alert">{error}</div>
                      </div>
                      <div className="form-group col-sm-12">
                          <button type="submit" className="btn btn-primary btn-block">Pay Now</button>
                      </div>
                      </div>
                  </div>
                  </form>
              </div>
          </section>
        </main>
  );
};
export default CheckoutForm;