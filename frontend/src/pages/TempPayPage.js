//import PaymentForm from "./components/PaymentForm"

import React, { useEffect, useState } from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";
import CheckoutForm from "../components/CheckoutForm";

import axiosOrder from '../api/axiosOrder';

import axiosInstance from '../api/axiosCart';
import CartItem from "../components/CartItem";

import useAuth from "../hooks/useAuth";

function TempPayPage() {

    let price = 0;
/**
 * VARIABLES
 */

const stripePromise = loadStripe('pk_test_51LeK0EKut8s98N77mKeii9wLpQV1aG6HoNfQr2x8qjMu9bg3B5igb2ADSklcApQe5GU5tvuBaeeeuFX7bw4MdIA500A3nhBadE');
const { auth } = useAuth();
const userId = auth.userId;
const [cart, setCart] = useState([]);
const [boxes, setBoxes] = useState([]);

/**
 * FUNCTIONS
*/

    useEffect(() => {
        (async () => {
            /**Get Cart from userId */
            await axiosInstance
            .get(`users/${userId}/cart/`)
            .then((res) => {
                setCart(res.data);
                axiosInstance
                    .get(`users/${cart.user}/cart/items/`)
                    .then((res) => {
                        setBoxes(res.data);
                    })
                    // catch get boxes
                    .catch((error) => {
                        return error.response;
                    })
            // catch get cart
            }).catch((error) => {
                console.log(error);
                alert('ERROR: couldn\'t get cart with userId ' + userId);
            })
        })();
    }, [cart]);

    const boxes_array = boxes.map((box) => {
        return (<CartItem key={box.id} {...box} />);
    })

    /*
    function get_prices(boxes) {
        let current_price = 0;
        boxes.forEach(box => {
            current_price += box.price
        });
        return current_price;
    }

    price = get_prices(boxes_array);
    console.log(price);
    */

    return(
        <Elements stripe = {stripePromise}>
            <CheckoutForm price={price} />
        </Elements>
    );

};export default TempPayPage;


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