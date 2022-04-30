import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Bootstrap Components
import Modal from "react-bootstrap/Modal";

function Insertions(props) {
  /**
   ** VARIABLES
   */
  const [insertions, setInsertions] = useState([]);

  const [showModal, setShowModal] = useState(false);

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
      const response = await fetch("http://localhost:8000/api/insertions/");
      const data = await response.json();

      setInsertions(data);
    })();
  }, []);

  // Manage Modal
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // Deletion
  const handleDeletion = async (insertion_id) => {
    await fetch(`http://localhost:8000/api/insertions/${insertion_id}`, {
      method: "DELETE",
    });

    setShowModal(false); // Close modal

    // Keep all the insertions except the one deleted
    setInsertions(
      insertions.filter((prevInsertion) => prevInsertion.id !== insertion_id)
    );
  };

  const insertions_array = insertions.map((insertion) => {
    return (
      <div className="col">
        <div className="card w-75" key={insertion.id}>
          <img src={insertion.image} alt="img" className="card-img-top img-fluid" />

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
                    onClick={handleShowModal}
                    className="btn btn-outline-success"
                  >
                    Delete
                  </button>
                  {/* Modal */}
                  <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>
                        <span>Deletion</span>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Are you sure you want to delete this insertion?
                    </Modal.Body>
                    <Modal.Footer>
                      <button
                        className="btn btn-secondary"
                        onClick={handleCloseModal}
                      >
                        Close
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleDeletion(insertion.id)}
                      >
                        Yes
                      </button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="container-lg">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">{insertions_array}</div>
    </div>
  );
}

export default Insertions;
