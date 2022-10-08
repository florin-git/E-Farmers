import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axiosInstance from "../api/axiosOrders";

function Checkout(props){

    const { auth } = useAuth();
    const user_id = auth.userId;
    // axios function with JWT tokens


    const handleSubmit = (event) => {
        event.preventDefault();
        (async () => {
        await axiosInstance
            .post(`orders/${user_id}/`, {
                amount : 20,
                description : "Sono un ordine",
                phone_number : 222222222222222,
                billing_address : "Casa",
                shipping_address : "Casa 2",
            })
            .then( () => {
                console.log("Sonon nel then")
            })
            .catch((error) => {
                console.log(error.response)
            })
        }) ();
    }

    return(
        <div> 
            <h1>HESUHSUBSBSJKSBSBJSBHJSBHJBS</h1>
        
            <form onSubmit={handleSubmit}>
                <button type="submit"  className="btn btn-primary btn-lg" > POST </button>
            </form>
            
      </div>

    )

}

export default Checkout;