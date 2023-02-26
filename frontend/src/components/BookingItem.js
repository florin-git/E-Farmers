import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

function BookingItem({ inbox, title, comment, weight, deadline, user, farmer }){
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
                    Weight: {weight}
                </p>

                <p className="card-text">
                    Deadline: {deadline}
                </p>

                <div className="container">
                    <div className="row">
                        {userId == user &&(
                            <div className="col-sm">
                                <button
                                        type="button"
                                        id={title}
                                        name="cancel"
                                        // onClick={(event) => handleShowModal(event)}
                                        className="btn btn-outline-danger"
                                    >
                                    Cancel booking
                                </button>
                            </div>
                        )}
                        
                        {/* Show delete button only if you were the published or the insertion */}
                        {inbox === 'true' && userId == farmer && (
                            <div className="col-sm">
                            <button
                                type="button"
                                id={title}
                                name="create"
                                // onClick={(event) => handleShowModal(event)}
                                className="btn btn-outline-primary"
                            >
                                Create insertion
                            </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingItem;