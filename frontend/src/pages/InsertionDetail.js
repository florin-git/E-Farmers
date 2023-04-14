import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Box from "../components/Box";
import Modal from "react-bootstrap/Modal";
import { useNavigate, useLocation } from "react-router-dom";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axiosInsertions from "../api/axiosInsertions";

import useAuth from "../hooks/useAuth";

// The component receives the insertion's detail from ProtectedRouteInsertion
function InsertionDetail({ insertion }) {
  /**
   ** VARIABLES
   */

  // Boxes of the insertion
  const [boxes, setBoxes] = useState([]);

  // Retrieve the id from the URL
  const { insertion_id } = useParams();

  // Array containing the sizes of the boxes of this insertion
  const box_sizes = [];

  // Authentication data from context storage
  const { auth } = useAuth();
  const userId = auth.userId;
  // axios function with JWT tokens
  const axiosPrivate = useAxiosPrivate();

  const [showModal, setShowModal] = useState(false);
  // It will contain the id of the deleted insertion

  // Farmer info
  const farmerId = insertion.farmer;
  const [farmerInfo, setFarmerInfo] = useState([]);

  const navigate = useNavigate();

  /**
   ** FUNCTIONS
   */

  // Manage Modal
  const handleCloseModal = () => setShowModal(false);

  // If there's no box
  const handleShowModal = () => {
    console.log('Insertion ID to delete :: ' + insertion_id)
    setShowModal(true);
  };

  // Deletion
  const handleDeletion = async () => {
    await axiosInsertions.delete(`insertions/${insertion_id}/`).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });

    setShowModal(false); // Close modal
    navigate("/insertions");
  };

  useEffect(() => {
    /**
     * Retrieve the farmer's info
     */

    if (farmerId === undefined) return;

    (async () => {
      await axiosPrivate
        .get(`farmers/${farmerId}/`)
        .then((res) => {
          setFarmerInfo(res.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    })();
  }, [farmerId]);

  useEffect(() => {
    /**
     * Retrieve the boxes of this insertion from backend
     */
    (async () => {
      console.log('Getting the boxes...')
      await axiosInsertions
        .get(`insertions/${insertion_id}/boxes/`)
        .then((res) => {
          console.log('FARMER ID ' + farmerId);
          console.log('USER ID ' + userId)
          if (res.data.length == 0 && farmerId == userId) {
            // there are no boxes
            handleShowModal()
          }
          setBoxes(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, [farmerId, userId, insertion_id]);

  const boxes_array = boxes.map((box) => {
    // Add sizes already present
    box_sizes.push(box.size);
    /**
     * With the notation ...box are passed
     * all the attributes of box to the Component Box
     */
    return <Box key={box.id} {...box} />;
  });


  var date = new Date();
  // `/image/?${date.getMinutes()}` in order to avoid caching of the images
  return (
    <section>
      <div className="container py-5">

        {/* Modal */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              <span>Deletion</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>There are no boxes. Do you want to delete the insertion?</Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={handleCloseModal}>
              Close
            </button>
            <button className="btn btn-primary" onClick={handleDeletion}>
              Yes
            </button>
          </Modal.Footer>
        </Modal>

        <div className="row">
          <div className="col-lg-6">
            <img
              src={
                axiosInsertions.defaults.baseURL +
                "insertions/" +
                insertion_id +
                `/image/?${date.getMinutes()}`
              }
              alt="insertion_image"
              className="img-fluid"
            />
          </div>
          <div className="col-lg-6 mt-4 mt-lg-0">
            <h2 className="fw-bold">{insertion.title}</h2>
            <p className="">
              <strong className="orange">Description</strong>:{" "}
              {insertion.description}
            </p>
            <p className="">
              <strong className="orange">Expiration date</strong>:{" "}
              {insertion.expiration_date}
            </p>
            <p className="">
              <strong className="orange">Gathering location</strong>:{" "}
              {insertion.gathering_location}
            </p>
            <p className="">
              <strong className="orange">Farmer</strong>:{" "}
              <Link className="" to={`/farmer/profile/${farmerInfo.user_id}`}>
                {farmerInfo.name} {farmerInfo.last_name}
              </Link>
            </p>

            <hr />

            {/* <div className="row mb-4">
              <div className=" col-4 mb-2">
                <label className="form-label fw-bold col" htmlFor="size">
                  Size
                </label>
                <select className="form-select col" id="size" name="size">
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </div>

              <div className=" col-3 mb-2">
                <label className="form-label fw-bold col" htmlFor="quantity">
                  Quantity
                </label>
                <input
                  type="number"
                  className="form-control col text-center"
                  id="quantity"
                  name="quantity"
                  min="0"
                  placeholder="0"
                />
              </div>
            </div> */}
          </div>

          <div className="row row-cols-1 row-cols-md-3 g-4 my-4">
            {boxes_array}
          </div>

          {/* If the insertion already contains all the possible boxes 
						(i.e., small, medium, large; so the array length is 3),
						then you cannot add more boxes */}
          {userId === insertion.farmer &&
            box_sizes.length !== 3 &&
            insertion.private === false && (
              <div className="my-2">
                <Link to={`boxes/`} className="btn btn-warning btn-lg">
                  Add Boxes
                </Link>
              </div>
            )}
          {userId === insertion.farmer && (
            <div className="my-2">
              <Link
                to={`${process.env.PUBLIC_URL}/insertions/${insertion_id}/edit/`}
                className="btn btn-warning btn-lg"
              >
                Modify Insertion
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default InsertionDetail;
