import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axiosOrder from "../api/axiosOrder";
import MyModal from "../components/MyModal"
import Modal from "../hooks/Modal";

function OrdersMainPage(props) {

    
    const [orders, setOrders] = useState([]);

    // Modal per display info ordine
    const [modalShow, setModalShow] = React.useState(false);

    // Modal per la review
    const [openModal, setOpenModal] = useState(false);

    // Authentication data from context storage
    const { auth } = useAuth();
    const userId = auth.userId;

    // axios function with JWT tokens
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let email;
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

        /*Deduplicate boxes names */
        let names = [... new Set(order.box_names.split(' '))];
        let names_dedup = '';
        names.map((word) => {
            names_dedup += (word + ' ');
        });

        return ( 
            <li key={order.id} className="list-group-item">
                <div className="media align-items-lg-center flex-column flex-lg-row p-3">
                    <div className="media-body order-2 order-lg-1">
                        <h5 className="mt-0 font-weight-bold mb-2">Order Number: {order.payment_method_id}</h5>
                        <h5 className="mt-0 font-weight-bold mb-2">Farmer: {order.farmer}</h5>
                        <h5 className="mt-0 font-weight-bold mb-2">Boxes: {names_dedup}</h5>
                        <p className="font-italic text-muted mb-0 small"></p>
                        <div className="d-flex align-items-center justify-content-between mt-1">
                            <h6 className="font-weight-bold my-2">Total : {order.price}</h6>
                            <ul className="list-inline small">

                            <div>
                                <button type="button" className="btn btn-primary m-1" variant="primary" onClick={() => setModalShow(true)}>
                                    See Product Information
                                </button>
                                <MyModal
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                />
                            </div>
                            
                            <div> 
                                <button 
                                    onClick={() => setOpenModal(true)} 
                                    className="btn btn-primary m-1">
                                        Leave a Review!
                                </button>
                                <Modal 
                                    open={openModal} 
                                    onClose={() => setOpenModal(false)} 
                                />
                            </div>
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
                    <h1 className="display-4">Orders List</h1>
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