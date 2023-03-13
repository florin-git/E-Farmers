//import PaymentForm from "./components/PaymentForm"
import React, {useEffect,useState} from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";
import CheckoutForm from "../components/CheckoutForm";

/*__*/
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from "../hooks/useAuth";
import axiosInstance from '../api/axiosCart';
import axiosInsertions from '../api/axiosInsertions';

// Cart components
import CartItem from "../components/CartItem";

const TempPayPage = () => {

    let price = 0;
    /**
     * VARIABLES
     */

    const [stripePromise, setStripePromise] = useState(() => loadStripe('pk_test_51LeK0EKut8s98N77mKeii9wLpQV1aG6HoNfQr2x8qjMu9bg3B5igb2ADSklcApQe5GU5tvuBaeeeuFX7bw4MdIA500A3nhBadE'))

    const {auth} = useAuth();
    const userId = auth.userId;
    const axiosPrivate = useAxiosPrivate();

    const [cart, setCart] = useState([]);
    const [boxes, setBoxes] = useState([]);


    const [userEmail, setUserEmail] = useState();
    const [totalPrice, setTotalPrice] = useState(0);    

    console.log('USER ID ' + userId);

    /**
     * FUNCTIONS
     */
    useEffect(() => {
        (async () => {
            //Get Cart from userId 
            await axiosPrivate
            .get(`users/${userId}`)
            .then((res)=>{
                setUserEmail(res.data[0].email)
                axiosInstance
                .get(`users/${userId}/cart/`)
                .then((res) => {
                    setCart(res.data);
                    axiosInstance
                        .get(`users/${userId}/cart/items/`)
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
            })
            .catch((error) => {
                console.log(error)
            })
        })();
    }, [userId]);
  
    // Get the ID of the CartItem and pass to CheckoutForm in order to save the Order that contain all the ID of the CartItem 
    const id_boxesArray = boxes.map((box) => (box.box_id)) 
    boxes.map((box) => { price += parseFloat(box.price) }) 
    console.log(boxes)

    return ( 
        <Elements stripe = {stripePromise}>
            <CheckoutForm price = {price} email = {userEmail} boxes_array = {id_boxesArray} /> 
        </Elements>
    );

};
export default TempPayPage;
