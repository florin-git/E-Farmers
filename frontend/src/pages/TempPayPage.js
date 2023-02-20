//import PaymentForm from "./components/PaymentForm"

import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe('pk_test_51LeK0EKut8s98N77mKeii9wLpQV1aG6HoNfQr2x8qjMu9bg3B5igb2ADSklcApQe5GU5tvuBaeeeuFX7bw4MdIA500A3nhBadE');

//This price should be a get on the cart in order to retrieve the total amount of the payments.
let price = 1000;

const TempPayPage = () => (
    <Elements stripe = {stripePromise}>
        <CheckoutForm price={price} />
    </Elements>
);export default TempPayPage;


/*
function TempPayPage(props){

 Ci arriviamo dal carrello quindi devo fare una get del cazzo per prendere i dati che devo mandare al form 

    return (
        <Elements stripe={stripePromise}>
            <PaymentForm price="1000" />
        </Elements>
    )
}
export default TempPayPage;
*/