import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Bootstrap Components
import Modal from "react-bootstrap/Modal";

import axiosInstance from "../axiosInsertions";

function Insertions(props) {
  /**
   ** VARIABLES
   */
  const [insertions, setInsertions] = useState([]);

  const [showModal, setShowModal] = useState(false);

  // It will contain the id of the deleted insertion
  const [idToDelete, setIdToDelete] = useState(-1);

  /**
   ** FUNCTIONS
   */

  useEffect(() => {
    /**
     * Retrieve insertions from backend
     */
    (async () => {
      /**
       * Because the 'await' keyword, the asynchronous
       * function is paused until the request completes.
       */
      await axiosInstance
        .get("insertions/")
        .then((res) => {
          setInsertions(res.data);
        })
        .catch((error) => {
          return error.response;
        });
    })();
  }, [idToDelete]); // Whenever you delete an insertion, the fetch is repeated

  // Manage Modal
  const handleCloseModal = () => setShowModal(false);

  // If you push the 'Delete' button
  const handleShowModal = (event) => {
    setIdToDelete(event.target.id);
    setShowModal(true);
  };

  // Deletion
  const handleDeletion = async () => {
    await axiosInstance.delete(`insertions/${idToDelete}/`);

    setShowModal(false); // Close modal

    // Keep all the insertions except the one deleted
    setInsertions(
      insertions.filter((prevInsertion) => prevInsertion.id !== idToDelete)
    );

    setIdToDelete(-1); // Update again the variable for the reloading
  };

  const insertions_array = insertions.map((insertion) => {
    return (
      <div className="col" key={insertion.id}>
        <div className="card w-75">
          <img
            src={insertion.image}
            alt="img"
            className="card-img-top img-fluid"
          />

          <div className="card-body">
            <h5 className="card-title">{insertion.title}</h5>

            <p className="card-text">
              Expiration date: {insertion.expiration_date}
            </p>

            <div className="container">
              <div className="row">
                <div className="col-sm">
                  <Link
                    className="btn btn-outline-secondary"
                    to={`${insertion.id}`}
                  >
                    View
                  </Link>
                </div>

                <div className="col-sm">
                  <button
                    type="button"
                    id={insertion.id}
                    name="delete"
                    onClick={(event) => handleShowModal(event)}
                    className="btn btn-outline-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="container-lg mt-3">
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
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {insertions_array}
      </div>
    </div>
  );
}

export default Insertions;
