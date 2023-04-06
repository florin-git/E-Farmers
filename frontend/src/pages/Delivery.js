import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// import axiosUsers from "../api/axiosUsers";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axiosOrder from "../api/axiosOrder";

import "../my_css/PaymentOrderFE/rider_selection.css";
import rider from "../my_css/img/rider.png";
import warehouse from "../my_css/img/warehouse.png";

function Delivery() {
  // Way to pass props by navigate and location
  const { state } = useLocation();
  const { payment_method_id } = state;
  // axios function with JWT tokens
  const axiosPrivate = useAxiosPrivate();

  const [flagPayment, setFlagPayment] = useState(0);

  function handleUpdate(riderId) {
    (async () => {
      await axiosOrder
        .updateOrder({ payment_method_id, riderId })
        .then((res) => {
          setFlagPayment(1);
          if (riderId !== undefined && riderId !== 0) {
            const id = riderId;
            axiosPrivate
              .patch(`riders/${id}/`, {
                available: false,
              })
              .then((res) => {
                console.log("Put Rider NOT AVAILABLE");
              })
              .catch((res) => {
                console.log(res.response);
              });
          } else {
            console.log("Ritiro presso il magazzino.");
          }
        })
        .catch((res) => {
          console.log(res.response);
        });
    })();
  }

  function handleClick(params) {
    if (params === 0) {
      handleUpdate(0);
    } else {
      (async () => {
        await axiosPrivate
          .get(`riders/`)
          .then((res) => {
            console.log(res.data);

            const userRiderId = res.data;
            if (userRiderId === undefined) {
              alert(
                "There are no available riders at the moment. You can only collect the purchase by yourself."
              );
            } else {
              // Ok adesso in res ho il primo rider disponibile.
              handleUpdate(userRiderId);
            }
          })
          .catch((error) => {
            alert(
              "There are no available riders at the moment. You can only collect the purchase by yourself."
            );
            console.log(error.response);
          });
      })();
      /*
      Logica: semplice get sui rider, e prendiamo il primo rider con available = true
      */
    }
  }
  return (
    <div>
      {flagPayment === 1 && (
        <div className="wrapper">
          <div className="typing-demo">
            Congrat! You have completed your purchase !!
          </div>
        </div>
      )}
      {flagPayment === 0 && (
        <div>
          <br></br>
          <h4 align="center"> Delivery Shipping Selection </h4>
          <br></br>
          <div className="container2">
            <div className="card">
              <div className="face face1">
                <div className="content">
                  <img src={rider} />
                  <h3>Shipping with Rider</h3>
                </div>
              </div>
              <div className="face face2">
                <div className="content">
                  <p>
                    If you select, shipping with rider, your shipping will be
                    handled by the first available rider.
                  </p>
                  <button onClick={() => handleClick(1)}>Continue</button>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="face face1">
                <div className="content">
                  <img src={warehouse} />
                  <h3>Go to Warehouse</h3>
                </div>
              </div>
              <div className="face face2">
                <div className="content">
                  <p>
                    In this way you need to pick up the goods at the warehouse
                  </p>
                  <button onClick={() => handleClick(0)}>Continue</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <br></br>
    </div>
  );
}

export default Delivery;
