import React, { useState } from "react";
import axiosCart from "../api/axiosCart";
import axiosInsertions from "../api/axiosInsertions";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import Modal from "react-bootstrap/Modal";

function Box(props) {
  let size;
  if (props.size === 0) {
    size = "Small";
  } else if (props.size === 1) {
    size = "Medium";
  } else if (props.size === 2) {
    size = "Large";
  }

  const { auth } = useAuth();
  const userId = auth.userId;
  const axiosPrivate = useAxiosPrivate();

  const [farmerId, setFarmerId] = useState(-1);
  const [insertionName, setInsertionName] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Manage Modal
  const handleCloseModal = () => setShowModal(false);

  /**
   * Delete current cart, Post new one with current farmer and Put the box
   */
  const handleDeletion = () => {
    axiosCart.delete(`users/${userId}/cart/`).then((res) => {
      console.log("CART DELETED!");
      console.log(farmerId)
      axiosCart
        .post(`users/${userId}/cart/`, {
          farmer: farmerId,
        })
        .then((res) => {
          console.log("CART CREATED!");

          axiosCart
            .put(`users/${userId}/cart/items/`, {
              insertion: props.insertion,
              box_id: props.id,
              name: insertionName,
              size: props.size,
              price: props.price,
              weight: props.weight,
              farmer: farmerId,
            })
            .then((res) => {
              // alert that box has been added to cart
              alert("BOX HAS BEEN ADDED TO THE CART!");
              setFarmerId(-1)
              setInsertionName("")
              console.log(res);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    });

    setShowModal(false);
  };

  const addBoxToCart = async () => {
    /**
     * Check the user token
     */
    await axiosPrivate
      .post(`token/verify/`, {
        user_id: userId,
      })
      .then((res) => {
        /**
         * Get the farmer id that made the insertion
         */

        axiosInsertions
          .get(`/insertions/${props.insertion}/`)
          .then((res) => {
            let farmer_id = res.data["farmer"];
            setFarmerId(farmer_id)
            let insertion_name = res.data["title"];
            setInsertionName(insertion_name)


            console.log(props)

            /**
             * Try to add the box to the cart
             */
            axiosCart
              .put(`users/${userId}/cart/items/`, {
                insertion: props.insertion,
                box_id: props.id,
                name: insertion_name,
                size: props.size,
                price: props.price,
                weight: props.weight,
                farmer: farmer_id,
              })
              .then((res) => {
                // alert that box has been added to cart
                alert("BOX HAS BEEN ADDED TO THE CART!");

                console.log(res);
              })
              .catch((error) => {
                /**
                 * Behavior:
                 *  409 --> The cart exists but the current farmer is different from
                 *          the box
                 *
                 *  404 --> The cart doesn't exist
                 */
                if (error.response["status"] == 409) {
                  /**
                   * If the current farmer is different then ask if delete and add new box
                   * with new farmer
                   */
                  setShowModal(true);
                }

                else if (error.response["status"] == 404) {
                  /**
                   * If the cart doesn't exist, Post new one and Put the box
                   */
                  axiosCart
                    .post(`users/${userId}/cart/`, {
                      farmer: farmer_id,
                    })
                    .then((res) => {
                      console.log("CART CREATED! SECOND IF");
                      axiosCart
                        .put(`users/${userId}/cart/items/`, {
                          insertion: props.insertion,
                          box_id: props.id,
                          name: insertion_name,
                          size: props.size,
                          price: props.price,
                          weight: props.weight,
                          farmer: farmer_id,
                        })
                        .then((res) => {
                          alert("BOX HAS BEEN ADDED TO THE CART!");
                          console.log(res);
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                } else {
                  console.log(error);
                }
              });
          })
          .catch((error) => {
            console.log(error);
          });
      });
  };

  return (
    <div className="col">
      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span>Change Cart</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Cart has already a box of another farmer, delete current cart?
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handleDeletion}>
            Yes
          </button>
        </Modal.Footer>
      </Modal>

      <div className="card">
        {props.size != 3 ? (
          <h4 className="card-header fw-bold">{size} boxes</h4>
        ) : (
          <h4 className="card-header fw-bold">Box</h4>
        )}
        <div className="card-body">
          <p className="card-text">
            Box Weight:{" "}
            <strong className="text-primary">{props.weight}kg</strong>
          </p>
          <p className="card-text">
            Box Price: <strong className="text-primary">{props.price}€</strong>
          </p>
          <p className="card-text">
            Available boxes:{" "}
            <strong className="text-primary">
              {props.number_of_available_boxes}
            </strong>
          </p>
          <button
            type="button"
            onClick={addBoxToCart}
            className="btn btn-primary"
          >
            Buy box
          </button>
        </div>
      </div>
    </div>
  );
}

export default Box;
