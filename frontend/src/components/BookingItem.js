import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function BookingItem({ id, inbox, accepted, insertion_id, title, comment, weight, deadline, user, farmer, onInteraction }){
    const { auth } = useAuth();
    const userId = auth.userId;

    return (
        <div className="card w-50 mx-auto mt-3 mb-3">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <hr/>
                <p className="card-text">
                    Comment: {comment}
                </p>
                    
                <p className="card-text">
                    Weight (kg): {weight}
                </p>

                <p className="card-text">
                    Deadline: {deadline}
                </p>

                {inbox === 'false' && (
                    <p className="card-text">
                        Farmer: {farmer}
                    </p>
                )}

                <div className="container">
                    <div className="row">
                        {inbox === 'false' && userId == user && accepted === false &&(
                            <div className="col-sm">
                                <button
                                        type="button"
                                        id={id}
                                        value="cancel"
                                        name="cancel"
                                        onClick={(event) => onInteraction(event)}
                                        className="btn btn-outline-danger"
                                    >
                                    Cancel booking
                                </button>
                            </div>
                        )}
                        {inbox === 'false' && userId == user && accepted === true &&(
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm">
                                        <button
                                                type="button"
                                                id={id}
                                                value="cancel"
                                                name="cancel"
                                                onClick={(event) => onInteraction(event)}
                                                className="btn btn-outline-danger"
                                            >
                                            Delete request
                                        </button>
                                    </div>
                                    <div className="col-sm">
                                        <button
                                                type="button"
                                                id={insertion_id}
                                                value="view"
                                                name="view"
                                                onClick={(event) => onInteraction(event)}
                                                className="btn btn-outline-primary"
                                            >
                                            Ready!
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Show decline/accept only if you are the farmer receiving the request */}
                        {inbox === 'true' && farmer == userId && accepted === false && (
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm">
                                        <button
                                            type="button"
                                            id={id}
                                            value='decline'
                                            name="decline"
                                            onClick={(event) => onInteraction(event)}
                                            className="btn btn-outline-danger"
                                        >
                                            Decline
                                        </button>
                                    </div>
                                    <div className="col-sm">
                                        <button
                                            type="button"
                                            id={id}
                                            value='accept'
                                            name="accept"
                                            onClick={(event) => onInteraction(event)}
                                            className="btn btn-outline-primary"
                                        >
                                            Accept
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {inbox === 'true' && farmer == userId && accepted === true && (
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm">
                                        <button
                                            type="button"
                                            id={id}
                                            value='delete'
                                            name="delete"
                                            onClick={(event) => onInteraction(event)}
                                            className="btn btn-outline-danger"
                                        >
                                            Delete request and insertion
                                        </button>
                                    </div>
                                    <div className="col-sm">
                                        <Link
                                            className="btn btn-outline-primary"
                                            to={`/insertions/${insertion_id}`}
                                        >
                                            View insertion
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingItem;