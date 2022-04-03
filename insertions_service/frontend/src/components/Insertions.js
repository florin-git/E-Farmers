import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

function Insertions(props) {
    const [insertions, setInsertions] = useState([]);

    // setInsertions(insert);

    // One possiblity
    useEffect(() => {
        // Make an asynchronous HTTP request.
        (async () => {
            /* 
                Because the 'await' keyword, the asynchronous
                function is paused until the request completes. 
                */
            const response = await fetch(
                "http://localhost:8000/api/insertions/"
            );
            const data = await response.json();

            setInsertions(data);
        })();
    }, []);

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
                insertions.filter((prevInsertion) => prevInsertion.id !== insertion_id)
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
                                        onClick={() => delete_insertion(insertion.id)}
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
        // <Container>
        //     <Row>{insertions_array}</Row>
        // </Container>
        <div className="container-xl">
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {insertions_array}
            </div>
        </div>
    );
}

export default Insertions;
