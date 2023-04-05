import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Modal from "react-bootstrap/Modal";
import axiosSubscription from "../api/axiosSubscription";
import SubscriptionItem from "../components/SubscriptionItem";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function ListSubscriptions() {
  const { auth } = useAuth();
  const userId = auth.userId;
  const axiosPrivate = useAxiosPrivate();
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptionsArray, setSubscriptionsArray] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(-1);
  const [showSubscriptions, setShowSubscriptions] = useState(false);

  useEffect(() => {
    axiosSubscription.get(`customer/${userId}/subscriptions/`).then((res) => {
      const number_of_subscriptions = res.data.length;
      const farmers_names = new Array(number_of_subscriptions);
      const subscriptions_array = new Array(number_of_subscriptions);
      res.data.forEach((subscription_farmer_id, index) =>
        axiosPrivate
          .get(`farmers/${subscription_farmer_id}/`)
          .then((res) => {
            farmers_names[index] = [subscription_farmer_id, res.data.name];
            subscriptions_array[index] = [
              subscription_farmer_id,
              <SubscriptionItem
                farmer_id={subscription_farmer_id}
                farmer_name={res.data.name}
                onInteraction={handleShowModal}
              />,
            ];
            setSubscriptionsArray(subscriptions_array);
          })
          .catch((error) => {
            console.log(error.response);
          })
      );
      setSubscriptions(farmers_names);
    });
  }, []);

  // Manage Modal
  const handleCloseModal = () => {
    setSelectedId(-1);
    setShowModal(false);
  };

  // If you push the 'Delete' button
  const handleShowModal = (event) => {
    setSelectedId(event.target.id);
    setShowModal(true);
  };

  // Cancellation
  const handleCancelling = async () => {
    await axiosSubscription.patch(`customer/${userId}/`, {
      farmer_id: selectedId,
    });

    setShowModal(false); // Close modal

    setSubscriptions(
      subscriptions.filter(
        (prevSubscriptions) => prevSubscriptions[0] != selectedId
      )
    );

    setSubscriptionsArray(
      subscriptionsArray.filter(
        (prevSubscriptions) => prevSubscriptions[0] != selectedId
      )
    );

    setSelectedId(-1); // Update again the variable for the reloading
  };

  const handleShowSubscriptions = (event) => {
    setShowSubscriptions(true);
  };

  if (showSubscriptions) {
    return (
      <div className="container-lg py-5">
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              <span>Deletion</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span>Are you sure you want to cancel this subscription?</span>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-light" onClick={handleCloseModal}>
              Close
            </button>
            <button className="btn btn-danger" onClick={handleCancelling}>
              Confirm cancellation
            </button>
          </Modal.Footer>
        </Modal>
        <ul className="list-inline shadow g-3 pt-3 pb-3">
          {subscriptionsArray.length === 0 ? (
            <div className="h-100 d-flex align-items-center justify-content-center">
              You are not subscribed yet.
            </div>
          ) : (
            subscriptionsArray.map((subscription) => subscription[1])
          )}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="container-lg py-5">
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              <span>Deletion</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span>Are you sure you want to cancel this subscription?</span>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-light" onClick={handleCloseModal}>
              Close
            </button>
            <button className="btn btn-danger" onClick={handleCancelling}>
              Confirm cancellation
            </button>
          </Modal.Footer>
        </Modal>

        <div className="row d-flex justify-content-center align-items-center">
          <button
            className="btn btn-warning text-center"
            onClick={handleShowSubscriptions}
          >
            View subscriptions
          </button>
        </div>
      </div>
    );
  }
}

export default ListSubscriptions;
