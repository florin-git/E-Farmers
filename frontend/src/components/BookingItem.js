import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

function BookingItem({ id, inbox, title, comment, weight, deadline, user, farmer, onInteraction }){
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
                        {inbox === 'false' && userId == user &&(
                            <div className="col-sm">
                                <button
                                        type="button"
                                        id={id}
                                        name="cancel"
                                        onClick={(event) => onInteraction(event)}
                                        className="btn btn-outline-danger"
                                    >
                                    Cancel booking
                                </button>
                            </div>
                        )}
                        
                        {/* Show delete button only if you were the published or the insertion */}
                        {inbox === 'true' && farmer == userId && (
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingItem;