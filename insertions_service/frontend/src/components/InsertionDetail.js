import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Box from "./Box";

// The component receives the insertion's detail from ProtectedRouteInsertion
function InsertionDetail({ insertion }) {
  /**
   ** VARIABLES
   */

  // Boxes of the insertion
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
     * Retrieve the boxes of this insertion from backend
     */
    (async () => {
      const response = await fetch(
        `http://localhost:8000/api/insertions/${insertion_id}/boxes`
      );
      const data = await response.json();

      /**
       ** Sort boxes based on their size.
       * In this way, "Small" boxes are shown
       * before the others, even if in the
       * insertion "Small" comes after.
       */
      data.sort((a, b) => {
        if (a.size < b.size) return -1;
        else if (a.size > b.size) return 1;
        else return 0;
      });

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
          <div className="col-lg-6">
            <img
              src={insertion.image}
              alt="insertion_image"
              className="img-fluid"
            />
          </div>
          <div className="col-lg-6 mt-4 mt-lg-0">
            <h2 className="fw-bold">{insertion.title}</h2>
            <p className="">
              <strong className="orange">Description</strong>:{" "}
              {insertion.description}
            </p>
            <p className="">
              <strong className="orange">Expiration date</strong>:{" "}
              {insertion.expiration_date}
            </p>
            <p className="">
              <strong className="orange">Gathering location</strong>:{" "}
              {insertion.gathering_location}
            </p>

            <hr />

            <div className="row mb-4">
              {/* <div className=" col-4 mb-2">
                <label className="form-label fw-bold col" htmlFor="size">
                  Size
                </label>
                <select className="form-select col" id="size" name="size">
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </div> */}

              <div className=" col-3 mb-2">
                <label className="form-label fw-bold col" htmlFor="quantity">
                  Quantity
                </label>
                <input
                  type="number"
                  className="form-control col text-center"
                  id="quantity"
                  name="quantity"
                  min="0"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-md-3 g-4 my-4">
            {boxes_array}
          </div>

          {/* If the insertion already contains all the possible boxes 
						(i.e., small, medium, large; so the array length is 3),
						then you cannot add more boxes */}
          {box_sizes.length !== 3 && (
            <div className="my-2">
              <Link to={`boxes/`} className="btn btn-warning btn-lg">
                Add Boxes
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default InsertionDetail;
