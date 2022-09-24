import React, { useEffect } from "react";

import useAuth from "../hooks/useAuth";
import axiosInstance from "../api/axiosCart";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function ShoppingCart(props) {
  /**
   ** VARIABLES
   */

  // Authentication data from context storage
  const { auth } = useAuth();
  const userId = auth.userId;

  // axios function with JWT tokens
  const axiosPrivate = useAxiosPrivate();

  /**
   ** FUNCTIONS
   */

  useEffect(() => {
    /**
     * Retrieve the user info
     */
    (async () => {
      // Verify JWT token to perform API call
      await axiosPrivate
        .post(`token/verify/`, {
          user_id: userId,
        })
        .then(() => {
          // If the JWT token is valid, retrieve the user's cart
          axiosInstance
            .get(`users/${userId}/cart/`)
            .then((res) => {
              console.log(res.data);
            })
            .catch((error) => {
              console.log(error.response);
            });
        })
        .catch((error) => {
          console.log(error.response);
        });
    })();
  }, [userId, axiosPrivate]);

  return (
    <div>
      <section className="vh-100">
        <div className="container py-5 h-100">CART</div>
      </section>
    </div>
  );
}

export default ShoppingCart;
