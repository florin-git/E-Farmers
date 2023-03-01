import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
// Bootstrap Components
import Modal from "react-bootstrap/Modal";

import axiosInstance from "../api/axiosInsertions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

function Insertions(props) {
  /**
   ** VARIABLES
   */
  const [insertions, setInsertions] = useState([]);
  const [image, setImage] = useState();

  const [showModal, setShowModal] = useState(false);

  // It will contain the id of the deleted insertion
  const [idToDelete, setIdToDelete] = useState(-1);


  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchString, setSearchString] = useState(searchParams.get("search"));

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
        .get("insertions/", {
          params: { "search": searchString }
        })
        .then((res) => {
          setInsertions(res.data);
        })
        .catch((error) => {
          return error.response;
        });
    })();
  }, [idToDelete, searchString]); // Whenever you delete an insertion, the fetch is repeated
  
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

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setSearchString(document.getElementById("search").value)
  }

  var date = new Date();
  const insertions_array = insertions.map((insertion) => {
    // `/image/?${date.getMinutes()}` in order to avoid caching of the images
    return (
      <div>
        <div className="col" key={insertion.id}>
          <div className="card w-75">
            <img
              src={
                axiosInstance.defaults.baseURL +
                "insertions/" +
                insertion.id +
                `/image/?${date.getMinutes()}`
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
    <div className="container-lg py-5">
      <form className="mb-5 d-flex justify-content-center" onSubmit={handleSearchSubmit}>
        <div className="form-group d-flex w-50">
          <input
              className="form-control"
              type="text"
              id="search"
              name="search"
          />
          <button className="btn btn-primary" type="submit">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </form>
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
