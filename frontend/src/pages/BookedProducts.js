import React, { useEffect, useState } from "react";
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
    const [idToCancel, setIdToCancel] = useState(-1);

    useEffect(() => {
            (async () => {
            await axiosInstance
                .get("booking/requests/", {
                params: {
                    user_id: userId,
                },
                })
                .then((res) => {
                setRequests(res.data);
                })
                .catch((error) => {
                return error.response;
                });
            })();
        }, [idToCancel]);

    // Manage Modal
    const handleCloseModal = () => setShowModal(false);

    // If you push the 'Delete' button
    const handleShowModal = (event) => {
        setIdToCancel(event.target.id);
        setShowModal(true);
    };

    // Cancellation
    const handleCancelling = async () => {
        await axiosInstance
            .delete("booking/", {
                params: {
                    request_id: idToCancel,
                }
            });

        setShowModal(false); // Close modal

        // Keep all the insertions except the one deleted
        setRequests(
            requests.filter((prevRequests) => prevRequests.id !== idToCancel)
        );

        setIdToCancel(-1); // Update again the variable for the reloading
    };

    const requets_array = requests.map((request) => {
        return (
            <BookingItem 
                inbox='false' 
                onInteraction={handleShowModal}
                id={request.id}
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
                        <span>Deletion</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this insertion?</Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger" onClick={handleCancelling}>
                        Confirm cancellation
                    </button>
                </Modal.Footer>
            </Modal>
            <ul className="list-inline shadow g-3 pt-3 pb-3">
                {requests.length == 0 && (<h5 className="text-center">Subscribe to a farmer and start booking products!</h5>)}
                {requets_array}
            </ul>
        </div>
    );
}

export default BookedProducts;