import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axiosInstance from "../api/axiosCart";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import ShoppingCart from "../pages/ShoppingCart";

function ProtectedRouteCart() {
  /**
   ** VARIABLES
   */
  // Variable to store the cart's details
  const [cart, setCart] = useState([]);

  // True If the URL is associated with an existing cart
  const [existsURL, setExistsURL] = useState(false);

  // Retrieve the id from the JWT token
  const { auth } = useAuth();
  const userId = auth.userId;
  const axiosPrivate = useAxiosPrivate();

  // This variable is used for the redirection
  const navigate = useNavigate();

  /**
   ** FUNCTIONS
   */

  useEffect(() => {
    /**
     * Try to access the cart page
     */
    (async () => {

        await axiosPrivate
        .post(`token/verify/`, {
          user_id: userId,
        })
        .then((res) => {

            console.log('<LOG REACT> :: ACCOUNT VERIFIED');
            axiosInstance
            .get(`users/${userId}/cart/`)
            .then((res) => {
                // cart exists
                setExistsURL(true);
                setCart(res.data);
                console.log('<LOG REACT> :: CART')
                console.group(cart)
            })
            .catch((error) => {
              alert('ADD A BOX!');
              // If cart doesn't exist
              setExistsURL(false);
              navigate("/");
            });
        })
        .catch((error) => {
            console.log(error);
        })
    })();
  }, [userId, navigate]);

  return (
    // If the cart exists go to the cart page
    <div>{existsURL === true && <ShoppingCart cart={cart} />}</div>
  );
}

export default ProtectedRouteCart;
