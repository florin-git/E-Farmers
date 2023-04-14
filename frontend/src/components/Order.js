import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Modal from "../hooks/Modal";

function Order(props) {
  let order = props;

  const axiosPrivate = useAxiosPrivate();

  // Modal for review
  const [openModal, setOpenModal] = useState(false);
  const [farmerName, setFarmerName] = useState();
  const [riderName, setRiderName] = useState();

  useEffect(() => {
    /**
     * Retrieve the farmer's name
     */

    if (order.farmer === undefined) return;

    (async () => {
      await axiosPrivate
        .get(`users/${order.farmer}/name`)
        .then((res) => {
          setFarmerName(res.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    })();
  }, [order.farmer]);

  useEffect(() => {
    /**
     * Retrieve the rider's name
     */

    if (order.rider === undefined || order.rider <= 0) return;

    (async () => {
      await axiosPrivate
        .get(`users/${order.rider}/name`)
        .then((res) => {
          setRiderName(res.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    })();
  }, [order.rider]);

  /* Deduplicate boxes names */
  let names = [...new Set(order.box_names.split(" "))];
  let names_dedup = "";
  names.map((word) => {
    names_dedup += word + " ";
  });

  return (
    <li key={order.id} className="list-group-item">
      <div className="media align-items-lg-center flex-column flex-lg-row p-3">
        <div className="media-body order-2 order-lg-1">
          <h5 className="mt-0 font-weight-bold mb-2">
            Order Number: {order.payment_method_id}
          </h5>
          <h5 className="mt-0 font-weight-bold mb-2">
            Farmer:{" "}
            {
              <Link className="" to={`/farmer/profile/${order.farmer}`}>
                {farmerName}
              </Link>
            }
          </h5>
          {/* <h5 className="mt-0 font-weight-bold mb-2">Boxes: {names_dedup}</h5> */}
          <h5 className="mt-0 font-weight-bold mb-2">
            {order.rider === 0 ? (
              "Picked up at Warehouse"
            ) : order.rider === -1 ? (
              "Delivery Completed"
            ) : (
              <>
                <span>Rider: </span>
                <Link className="" to={`/rider/profile/${order.rider}`}>
                  {riderName}
                </Link>
              </>
            )}
          </h5>
          <p className="font-italic text-muted mb-0 small"></p>
          <div className="d-flex align-items-center justify-content-between mt-1">
            <h6 className="font-weight-bold my-2">Total : {order.price} €</h6>
            <ul className="list-inline small">
              <div>
                <button
                  onClick={() => setOpenModal(true)}
                  className="btn btn-primary m-1"
                >
                  Leave a Review!
                </button>
                <Modal
                  farmer={order.farmer}
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
}

export default Order;
