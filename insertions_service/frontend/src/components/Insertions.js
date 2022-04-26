import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Insertions(props) {
    /**
     ** VARIABLES
     */
    const [insertions, setInsertions] = useState([]);

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
            const response = await fetch(
                "http://localhost:8000/api/insertions/"
            );
            const data = await response.json();

            setInsertions(data);
        })();
    }, []);

    // Deletion
    const delete_insertion = async (insertion_id) => {
        if (window.confirm("Are you sure you want to delete this insertion?")) {
            await fetch(
                `http://localhost:8000/api/insertions/${insertion_id}`,
                {
                    method: "DELETE",
                }
            );
            // Keep all the insertions except the one deleted
            setInsertions(
                insertions.filter(
                    (prevInsertion) => prevInsertion.id !== insertion_id
                )
            );
        }
    };

    const insertions_array = insertions.map((insertion) => {
        return (
            <div className="col" key={insertion.id}>
                <div className="card">
                    <img src={insertion.image} className="card-img-top" />

                    <div className="card-body">
                        <h5 className="card-title">{insertion.title}</h5>

                        <p className="card-text">
                            Description: {insertion.description}
                        </p>

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
                                        Go to insertion page
                                    </Link>
                                </div>
                                <div className="col-sm">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            delete_insertion(insertion.id)
                                        }
                                        className="btn btn-outline-success"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="container-xl">
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {insertions_array}
            </div>
        </div>
    );
}

export default Insertions;
