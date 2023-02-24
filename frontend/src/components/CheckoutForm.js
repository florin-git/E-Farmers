import "../my_css/PaymentOrderFE/PayForm.css";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import axiosOrder from "../api/axiosOrder";

const CheckoutForm = (props) => {
  const price = props.price;
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const stripe = useStripe();
  const elements = useElements(); // Handle real-time validation errors from the CardElement.
  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };
  // Handle form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const card = elements.getElement(CardElement);
    // add these lines
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });
    axiosOrder
      .saveStripeInfo({ email, payment_method_id: paymentMethod.id, price })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <main className="page payment-page">
      <section className="payment-form dark">
        <div className="container">
          <div className="block-heading">
            <h2>Confirm Payment</h2>
            <p>
              EDIT: eFarmers never ask u the password of your account. We don't
              save yuor credit card credential
            </p>
          </div>
          <form onSubmit={handleSubmit} className="stripe-form">
            <div className="products">
              <div className="total">
                Total<span className="price">${price}</span>
              </div>
            </div>
            <div className="card-details">
              <h3 className="title">Credit Card Details</h3>
              <div className="row">
                <div className="form-group col-sm-7">
                  <label htmlFor="card-holder">Email Address</label>
                  <input
                    className="form-input"
                    id="email"
                    name="name"
                    type="email"
                    placeholder="test@example.com"
                    required
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </div>
                <div className="form-group col-sm-8">
                  <label htmlFor="card-element">Credit or debit card</label>
                  <CardElement id="card-element" onChange={handleChange} />
                  <div className="card-errors" role="alert">
                    {error}
                  </div>
                </div>
                <div className="form-group col-sm-12">
                  <button type="submit" className="btn btn-primary btn-block">
                    Pay Now
                  </button>
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
