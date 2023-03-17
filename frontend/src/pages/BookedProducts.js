import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInsertions";
import Modal from "react-bootstrap/Modal";
import BookingItem from "../components/BookingItem";
import useAuth from "../hooks/useAuth";

function BookedProducts() {
        // Authentication data from context storage
    const { auth } = useAuth();
    const userId = auth.userId;

    const [requests, setRequests] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(-1);
    const [action, setAction] = useState('cancel');

    useEffect(() => {
            (async () => {
            await axiosInstance
                .get(`booking/requests/${userId}/`)
                .then((res) => {
                setRequests(res.data);
                })
                .catch((error) => {
                return error.response;
                });
            })();
        }, [selectedId]);

    // Manage Modal
    const handleCloseModal = () => {
        setSelectedId(-1);
        setShowModal(false);
    }

    // If you push the 'Delete' button
    const handleShowModal = (event) => {
        setAction(event.target.value);
        setSelectedId(event.target.id);
        setShowModal(true);
    };

    // Cancellation
    const handleCancelling = async () => {
        await axiosInstance
            .delete(`booking/${selectedId}/`);

        setShowModal(false); // Close modal

        // Keep all the insertions except the one deleted
        setRequests(
            requests.filter((prevRequests) => prevRequests.id !== selectedId)
        );

        setSelectedId(-1); // Update again the variable for the reloading
    };

    const requets_array = requests.map((request) => {
        let accepted = (request.insertion != null)
        return (
            <BookingItem 
                inbox='false' 
                onInteraction={handleShowModal}
                id={request.id}
                accepted={accepted}
                insertion_id={request.insertion}
                title={request.title} 
                comment={request.comment} 
                weight={request.weight} 
                deadline={request.deadline} 
                user={request.user} 
                farmer={request.farmer} 
            />
        );
    })

    return (
        <div className="container-lg py-5">
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {action === 'cancel' && (
                            <span>Deletion</span>
                        )}
                        {action === 'view' && (
                            <span>Ready!</span>
                        )}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {action === 'cancel' && (
                        <span>Are you sure you want to cancel this request?</span>
                    )}
                    {action === 'view' && (
                        <span>The request is ready! Click the button to see the insertion that the farmer has prepared for you.</span>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-light" onClick={handleCloseModal}>
                        Close
                    </button>
                    {action === 'cancel' && (
                        <button className="btn btn-danger" onClick={handleCancelling}>
                            Confirm cancellation
                        </button>
                    )}
                    {action === 'view' && (
                        <Link
                            className="btn btn-primary"
                            to={`/insertions/${selectedId}`}
                        >
                            View insertion
                        </Link>
                    )}
                </Modal.Footer>
            </Modal>
            <ul className="list-inline shadow g-3 pt-3 pb-3">
                {requests.length == 0 && (
                    <div>
                        <h5 className="text-center">You have no booking requests.</h5>
                        <hr/>
                        <p className="text-center">
                            1) Subscribe to a farmer
                        </p>
                        <p className="text-center">
                            2) Go to the <Link to={`/calendar`}>calendar</Link> and start booking products!
                        </p>
                    </div>
                )}
                {requets_array}
            </ul>
        </div>
    );
}

export default BookedProducts;