import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Box from "./Box";

function InsertionDetail(props) {
  /**
   ** VARIABLES
   */
  const [insertion, setInsertion] = useState([]);
  const [boxes, setBoxes] = useState([]);

  // Retrieve the id from the URL
  const { insertion_id } = useParams();

  // Array containing the sizes of the boxes of this insertion
  const box_sizes = [];

  /**
   ** FUNCTIONS
   */

  useEffect(() => {
    /**
     * Retrieve insertions from backend
     */
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

    /**
     * Retrieve the boxes of this insertion from backend
     */
    (async () => {
      const response = await fetch(
        `http://localhost:8000/api/insertions/${insertion_id}/boxes`
      );
      const data = await response.json();

      setBoxes(data);
    })();
  }, [insertion_id]);

  const boxes_array = boxes.map((box) => {
    // Add sizes already present
    box_sizes.push(box.size);

    /**
     * With the notation ...box are passed
     * all the attributes of box to the Componenet Box
     */
    return <Box key={box.id} {...box} />;
  });

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mb-5">
            <img
              src={insertion.image}
              alt="insertion_image"
              //   className="card-img-top w-50"
              className="img-fluid"
            />
            <div className="col-lg-6 pl-md-5">
              <h2>{insertion.title}</h2>
              <p className="">Description: {insertion.description}</p>
              <p className="">Expiration date: {insertion.expiration_date}</p>
              <p className="">
                Gathering location: {insertion.gathering_location}
              </p>
            </div>
            {/* <div className="row row-cols-1 row-cols-md-3 g-4">
              {boxes_array}
            </div> */}

            {/* If the insertion already contains all the possible boxes 
            (i.e., small, medium, large; so the array length is 3),
            then you cannot add more boxes */}
            {box_sizes.length !== 3 && (
              <Link to={`boxes/`} className="btn btn-outline-secondary">
                Add Boxes
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default InsertionDetail;
