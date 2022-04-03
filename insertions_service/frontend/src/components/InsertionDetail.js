import React, { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Box from "./Box";

function InsertionDetail(props) {
    const [insertion, setInsertion] = useState([]);
    const [boxes, setBoxes] = useState([]);
    // Retrieve the id from the URL
    const { insertion_id } = useParams();

    useEffect(() => {
        // Make an asynchronous HTTP request.
        (async () => {
            /* 
                Because the 'await' keyword, the asynchronous
                function is paused until the request completes. 
                */
            const response = await fetch(
                `http://localhost:8000/api/insertions/${insertion_id}`
            );
            const data = await response.json();

            setInsertion(data);
        })();

        (async () => {
            /* 
                Because the 'await' keyword, the asynchronous
                function is paused until the request completes. 
                */
            const response = await fetch(
                `http://localhost:8000/api/insertions/${insertion_id}/boxes`
            );
            const data = await response.json();

            setBoxes(data);
        })();
    }, []);


    // console.log(boxes)

    const boxes_array = boxes.map((box) => {
        // # With the notation ...box are passed
        // all the attributes of box to the Componenet Box
        return <Box key={box.id} {...box} />;
    });

    return (
        <div className="container-xl">
            <h1>{insertion.title}</h1>
            {/* <img src={insertion.image} style="width:30%" className="card-img-top" /> */}

            <p className="card-text">Description: {insertion.description}</p>
            <p className="card-text">
                Expiration date: {insertion.expiration_date}
            </p>
            <p className="card-text">
                Gathering location: {insertion.gathering_location}
            </p>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {boxes_array}
            </div>

            <Link to={`boxes/`} className="btn btn-outline-secondary">
                Edit insertion
            </Link>
        </div>
    );
}

export default InsertionDetail;
