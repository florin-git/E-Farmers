import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axiosOrder from "../api/axiosOrder";
import axiosUsers from "../api/axiosUsers";

let id_order = 5792;
let total_price = 69.99;


function OrdersMainPage(props) {

    let email;
    const [orders, setOrders] = useState([]);


    // Authentication data from context storage
    const { auth } = useAuth();
    const userId = auth.userId;
    // axios function with JWT tokens
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        (async () => {
            await axiosPrivate
                .get(`users/${userId}/`)
                .then((res) => {
                    email = res.data[0].email;
                        axiosOrder.getOrder(email)
                            .then((res) => {
                                setOrders(res.data)
                                });
                            })
                            .catch((error) => {
                                console.log(error.response)
                            })
        })();
    }, []); 
    


    const orders_array = orders.map((order) => {
        return ( 
            // <tr key={order.id}>
            //     <td> {order.id} </td>
            //     <td> {order.email} </td>
            //     <td> {order.payment_method_id} </td>
            //     <td> {order.price} </td>
            // </tr>
            <li className="list-group-item">
                <div className="media align-items-lg-center flex-column flex-lg-row p-3">
                    <div className="media-body order-2 order-lg-1">
                        <h5 className="mt-0 font-weight-bold mb-2">Order N#:{order.payment_method_id}</h5>
                        <p className="font-italic text-muted mb-0 small"></p>
                        <div className="d-flex align-items-center justify-content-between mt-1">
                            <h6 className="font-weight-bold my-2">Total : {order.price}</h6>
                            <ul className="list-inline small">
                                <Link className="btn btn-primary m-1" to={"orders/"} id="orders" >
                                    Click to see More
                                </Link>
                            </ul>
                        </div>
                    </div>
                </div> 
            </li> 
        );
    });

    return (
        <div className="container py-5">
            <div className="row text-center mb-5">
                <div className="col-lg-7 mx-auto">
                    <h1 className="display-4">Order List</h1>
                </div>
            </div>
            
            <div className="row">
                <div className="col-lg-8 mx-auto">
               
                    <ul className="list-group shadow">
                        {orders_array}
                    </ul> 
                </div>
            </div>
        </div>
    )
}
export default OrdersMainPage;