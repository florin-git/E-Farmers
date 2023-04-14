import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosCart";
import { Link, useNavigate } from "react-router-dom";

import Modal from "react-bootstrap/Modal";
import { boxSizing } from "@mui/system";

function ShoppingCart({ cart }) {
  /**
   ** VARIABLES
   */

  // Boxes of the cart
  const [boxes, setBoxes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // It will contain the id of the deleted insertion
  const [idToDelete, setIdToDelete] = useState(-1);

  console.log("CART", cart);

  /**
   ** FUNCTIONS
   */
  useEffect(() => {
    (async () => {
      await axiosInstance
        .get(`users/${cart.user}/cart/items/`)
        .then((res) => {
          setBoxes(res.data);
        })
        .catch((error) => {
          return error.response;
        });
    })();
  }, [cart.user, idToDelete]);

  console.log("BOXES", boxes);

  // Manage Modal
  const handleCloseModal = () => setShowModal(false);

  // If you push the 'Delete' button
  const handleShowModal = (event) => {
    setIdToDelete(event.target.id);
    setShowModal(true);
  };

  // Deletion
  const handleDeletion = async () => {
    await axiosInstance.delete(`/users/${cart.user}/cart/items/`, {
      data: { box_id: idToDelete },
    });  
    
    setShowModal(false); // Close modal

    // Keep all the boxes except the one deleted
    setBoxes(boxes.filter((prevBox) => prevBox.id !== idToDelete));

    setIdToDelete(-1); // Update again the variable for the reloading
  };

  const boxes_array = boxes.map((box) => {
    return (
      <div className="card mb-3" key={box.id}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <button
              type="button"
              id={box.id}
              name="delete"
              onClick={(event) => handleShowModal(event)}
              className="btn btn-outline-danger"
            >
              Delete
            </button>
            <div className="d-flex flex-row align-items-center">
              <div className="ms-3">
                <p className="small mb-0">{box.name}</p>
              </div>
            </div>
            <div className="d-flex flex-row align-items-center">
              <div className="ms-3">
                <p className="small mb-0">Kg {box.weight}</p>
              </div>
            </div>
            <h5 className="mb-0">€ {box.price}</h5>
          </div>
          <i className="fas fa-trash-alt"></i>
        </div>
      </div>
    );
  });

  return (
    <div className="container py-5 h-100">
      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span>Deletion</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this insertion?</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handleDeletion}>
            Yes
          </button>
        </Modal.Footer>
      </Modal>

      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col">
          <div className="card">
            <div className="card-body p-4">
              <div className="row">
                <div className="col-lg-7">
                  <div className="d-flex justify-content-center align-items-center mb-4">
                    <div>
                      <div className="mb-1">
                        <h3>Shopping cart</h3>
                      </div>
                    </div>
                  </div>
                  {boxes_array}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Link className="btn btn-primary mx-md-2" to={"payment"}>
        Place Order
      </Link>
    </div>
  );
}

export default ShoppingCart;

/** 
  <section className="h-100 h-custom">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12">
        <div className="card card-registration card-registration-2">
          <div className="card-body p-0">
            <div className="row g-0">
              <div className="col-lg-8">
                <div className="p-5">
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
                  </div>
                  <hr className="my-4"/>

                  <div className="row mb-4 d-flex justify-content-between align-items-center">
                    <div className="col-md-2 col-lg-2 col-xl-2">
                      <img
                        src="https://healthiersteps.com/wp-content/uploads/2021/12/green-apple-benefits.jpeg"
                        className="img-fluid rounded-3" alt="Cotton T-shirt"/>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-3">
                      <h6 className="text-muted">USER</h6>
                      <h6 className="text-black mb-0">Golden Apples</h6>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-3">
                      <h6 className="text-black mb-0">Location Gathered</h6>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                      <button className="btn btn-link px-2"
                        onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                        <i className="fas fa-minus"></i>
                      </button>

                      <input id="form1" min="0" name="quantity" value="1" type="number"
                        className="form-control form-control-sm" />

                      <button className="btn btn-link px-2"
                        onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                      <h6 className="mb-0">€ 1.00</h6>
                    </div>
                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                      <a href="#!" className="text-muted"><i className="fas fa-times"></i></a>
                    </div>
                  </div>

                  <hr className="my-4"/>

                  <div className="row mb-4 d-flex justify-content-between align-items-center">
                    <div className="col-md-2 col-lg-2 col-xl-2">
                      <img
                        src="https://healthiersteps.com/wp-content/uploads/2021/12/green-apple-benefits.jpeg"
                        className="img-fluid rounded-3" alt="Cotton T-shirt"/>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-3">
                      <h6 className="text-muted">Apples</h6>
                      <h6 className="text-black mb-0">Golden Apples</h6>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                      <button className="btn btn-link px-2"
                        onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                        <i className="fas fa-minus"></i>
                      </button>

                      <input id="form1" min="0" name="quantity" value="1" type="number"
                        className="form-control form-control-sm" />

                      <button className="btn btn-link px-2"
                        onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                      <h6 className="mb-0">€ 1.00</h6>
                    </div>
                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                      <a href="#!" className="text-muted"><i className="fas fa-times"></i></a>
                    </div>
                  </div>

                  <hr className="my-4"/>

                  <div className="row mb-4 d-flex justify-content-between align-items-center">
                    <div className="col-md-2 col-lg-2 col-xl-2">
                      <img
                        src="https://healthiersteps.com/wp-content/uploads/2021/12/green-apple-benefits.jpeg"
                        className="img-fluid rounded-3" alt="Cotton T-shirt"/>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-3">
                      <h6 className="text-muted">Apples</h6>
                      <h6 className="text-black mb-0">Golden Apples</h6>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                      <button className="btn btn-link px-2"
                        onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                        <i className="fas fa-minus"></i>
                      </button>

                      <input id="form1" min="0" name="quantity" value="1" type="number"
                        className="form-control form-control-sm" />

                      <button className="btn btn-link px-2"
                        onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                      <h6 className="mb-0">€ 1.00</h6>
                    </div>
                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                      <a href="#!" className="text-muted"><i className="fas fa-times"></i></a>
                    </div>
                  </div>

                  <hr className="my-4"/>

                  <div className="pt-5">
                    <h6 className="mb-0"><a href="#!" className="text-body"><i
                          className="fas fa-long-arrow-alt-left me-2"></i>Back to shop</a></h6>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 bg-grey">
                <div className="p-5">
                  <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                  <hr className="my-4"/>

                  <div className="d-flex justify-content-between mb-4">
                    <h5 className="text-uppercase">items 3</h5>
                    <h5>€ 3.00</h5>
                  </div>

                  <h5 className="text-uppercase mb-3">Shipping</h5>

                  <div className="mb-4 pb-2">
                    <select className="select">
                      <option value="1">Standard-Delivery- €5.00</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                      <option value="4">Four</option>
                    </select>
                  </div>

                  <hr className="my-4"/>

                  <div className="d-flex justify-content-between mb-5">
                    <h5 className="text-uppercase">Total price</h5>
                    <h5>€ 3.00</h5>
                  </div>

                  <button type="button" className="btn btn-dark btn-block btn-lg"
                    data-mdb-ripple-color="dark">Register</button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
*/
