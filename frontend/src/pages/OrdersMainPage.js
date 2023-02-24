import React, { useEffect, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axiosOrder from "../api/axiosOrder";

import MyModal from "../components/MyModal";

import axiosUsers from "../api/axiosUsers";
import Modal from "../hooks/Modal";
import review_css from "../my_css/review.css";

let id_order = 5792;
let total_price = 69.99;

function OrdersMainPage(props) {
  const [orders, setOrders] = useState([]);

  // Modal per display info orders
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
          axiosOrder.getOrder(email).then((res) => {
            setOrders(res.data);
          });
        })
        .catch((error) => {
          console.log(error.response);
        });
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
      <li key={order.id} className="list-group-item">
        <div className="media align-items-lg-center flex-column flex-lg-row p-3">
          <div className="media-body order-2 order-lg-1">
            <h5 className="mt-0 font-weight-bold mb-2">
              Order N#:{order.payment_method_id}
            </h5>
            <p className="font-italic text-muted mb-0 small"></p>
            <div className="d-flex align-items-center justify-content-between mt-1">
              <h6 className="font-weight-bold my-2">Total : {order.price}</h6>
              <ul className="list-inline small">
                <div>
                  <button
                    type="button"
                    className="btn btn-primary m-1"
                    variant="primary"
                    onClick={() => setModalShow(true)}
                  >
                    SEE PRODUCT INFORMATION
                  </button>
                  <MyModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </div>

                <div>
                  <button
                    onClick={() => setOpenModal(true)}
                    className="btn btn-primary m-1"
                  >
                    Leave a Review!
                  </button>
                  <Modal open={openModal} onClose={() => setOpenModal(false)} />
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
          <h1 className="display-4">Order List</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 mx-auto">
          <ul className="list-group shadow">{orders_array}</ul>
        </div>
      </div>
    </div>
  );
}
export default OrdersMainPage;
