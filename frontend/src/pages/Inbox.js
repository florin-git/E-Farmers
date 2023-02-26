import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInsertions";
import Modal from "react-bootstrap/Modal";
import BookingItem from "../components/BookingItem";
import useAuth from "../hooks/useAuth";

function Inbox() {
        // Authentication data from context storage
    const { auth } = useAuth();
    const userId = auth.userId;

    const [requests, setRequests] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(-1);
    const [action, setAction] = useState('decline');

    useEffect(() => {
            (async () => {
            await axiosInstance
                .get("booking/inbox/", {
                params: {
                    farmer_id: userId,
                },
                })
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

    // Decline
    const handleDeclining = async () => {
        await axiosInstance
            .delete("booking/", {
                params: {
                    request_id: selectedId,
                }
            });

        setShowModal(false); // Close modal

        // Keep all the insertions except the one deleted
        setRequests(
            requests.filter((prevRequests) => prevRequests.id !== selectedId)
        );

        setSelectedId(-1); // Update again the variable for the reloading
    };

    const requets_array = requests.map((request) => {
        return (
            <BookingItem 
                inbox='true' 
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
                        {action === 'decline' && (
                            <span>Decline request</span>
                        )}
                        {action === 'accept' && (
                            <span>Accept request</span>
                        )}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {action === 'decline' && (
                        <span>Are you sure you want to decline this request?</span>
                    )}
                    {action === 'accept' && (
                        <span>Would you like to proceed with the creation of the insertion?</span>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-light" onClick={handleCloseModal}>
                        Close
                    </button>
                    {action === 'decline' && (
                        <button className="btn btn-danger" onClick={handleDeclining}>
                            Yes
                        </button>
                    )}
                    {action === 'accept' && (
                        <Link
                            className="btn btn-primary"
                            to={`/insertions/new/private/?request_id=${selectedId}`}
                        >
                            Yes
                        </Link>
                    )}
                </Modal.Footer>
            </Modal>
            <ul className="list-inline shadow g-3 pt-3 pb-3">
                {requets_array}
            </ul>
        </div>
    );
}

export default Inbox;