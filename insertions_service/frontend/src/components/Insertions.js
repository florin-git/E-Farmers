import React, { useEffect, useState } from "react";
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
                function is paused unitl the request completes. 
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
            console.log(insertion_id)
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
            // <Col key={insertion.id}>
            //     <Card style={{ width: "18rem" }}>
            //         <Card.Img variant="top" src={insertion.image} alt="img" />
            //         <Card.Body>
            //             <Card.Title>{insertion.title}</Card.Title>
            //             <Card.Text>{insertion.description}</Card.Text>
            //         </Card.Body>
            //         <ListGroup className="list-group-flush">
            //             <ListGroupItem>
            //                 {insertion.expiration_date}
            //             </ListGroupItem>
            //         </ListGroup>
            //         <Card.Footer>
            //             <Button variant="info">Go to insertion page</Button>
            //             <Button variant="info">Buy Now</Button>
            //         </Card.Footer>
            //     </Card>
            // </Col>

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
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                    >
                                        Go to insertion page
                                    </button>
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
