import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axiosOrder from "../api/axiosOrder";
import Order from "../components/Order";

function OrdersMainPage(props) {
  const [orders, setOrders] = useState([]);

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
          console.log(email);
          axiosOrder.getOrder(email).then((res) => {
            setOrders(res.data);
            console.log(res.data)
          });
        })
        .catch((error) => {
          console.log(error.response);
        });
    })();
  }, [userId]);

  const orders_array = orders.map((order) => {
    return <Order key={order.id} {...order} />;
  });

  return (
    <div className="container py-5">
      <div className="row text-center mb-5">
        <div className="col-lg-7 mx-auto">
          <h1 className="text-center">Orders List</h1>
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
