import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Bootstrap Components
import Modal from "react-bootstrap/Modal";

import axiosInstance from "../api/axiosInsertions";

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

  // On submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // If all the inputs are valid
    if (validate()) {
      // FormData object for the new insertion
      let form_data = new FormData();

      form_data.append("search", formData.search);

      /**
       * Create new insertion through API call
       */
      axiosInstance
        .get("insertions/", form_data)
        .then(() => {
          // If the submission was successful
          navigate("/insertions");
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  const insertions_array = insertions.map((insertion) => {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input
                  type="text"
                  className="form-control"
                  id="searchbar"
                  ref={titleRef}
                  placeholder="search..."
                  value={formData.search}
                  name="searchbar"
                  onChange={(event) => {
                    handleChange(event);
                  }}
                  required
                />
          <button className="mt-4 btn btn-primary" type="submit">
            Save
          </button>
        </form>
        <div className="col" key={insertion.id}>
          <div className="card w-75">
            <img
              src={
                axiosInstance.defaults.baseURL +
                "insertions/" +
                insertion.id +
                "/image/"
              }
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
                      className="btn btn-outline-primary"
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
      </div>
    );
  });

  return (
    <div className="container-lg mt-3 py-5">
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
