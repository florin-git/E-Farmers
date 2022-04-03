import React, { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";


function InsertionDetail(props) {
    const [insertion, setInsertion] = useState([]);
    // Retrieve the id from the URL
    const { insertion_id } = useParams();

    useEffect(() => {
        // Make an asynchronous HTTP request.
        (async () => {
            /* 
                Because the 'await' keyword, the asynchronous
                function is paused unitl the request completes. 
                */
            const response = await fetch(
                `http://localhost:8000/api/insertions/${insertion_id}`
            );
            const data = await response.json();

            setInsertion(data);
        })();
    }, []);


    return (
        <div className="container-xl">
            <h1>{insertion.title}</h1>
            {/* <img src={insertion.image} style="width:30%" className="card-img-top" /> */}

            <p className="card-text">Description: {insertion.description}</p>
            <p className="card-text">Expiration date: {insertion.expiration_date}</p>
            <p className="card-text">Gathering location: {insertion.gathering_location}</p>
            <div className="row row-cols-1 row-cols-md-3 g-4">
            {/* {% for box in boxes %} */}
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            
                            <h5 className="card-title">Small boxes</h5>
                         
                            <h5 className="card-title">Medium boxes</h5>
                        
                            <h5 className="card-title">Big boxes</h5>
                      
                            {/* <p className="card-text">Weight of the box: {box.weight}kg</p>
                            <p className="card-text">Price of the box: {box.price}€</p>
                            <p className="card-text">Number of available boxes: {box.number_of_available_boxes}</p> */}
                            <button type="button" className="btn btn-outline-success">Buy box</button>
                        </div>
                    </div>
                </div>

            </div>
 
           
            <button type="button" className="btn btn-outline-secondary">Edit insertion</button>
        </div>
    );
}

export default InsertionDetail;