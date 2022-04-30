import React from "react";

function Box(props) {
  let size;
  if (props.size === 0) {
    size = "Small";
  } else if (props.size === 1) {
    size = "Medium";
  } else if (props.size === 2) {
    size = "Large";
  }

  return (
    <div className="col">
      <div className="card">
        <h4 className="card-header fw-bold">{size} boxes</h4>
        <div className="card-body">
          <p className="card-text">
            Box Weight:{" "}
            <strong className="text-primary">{props.weight}kg</strong>
          </p>
          <p className="card-text">
            Price of the box:{" "}
            <strong className="text-primary">{props.price}€</strong>
          </p>
          <p className="card-text">
            Available boxes:{" "}
            <strong className="text-primary">
              {props.number_of_available_boxes}
            </strong>
          </p>
          <button type="button" className="btn btn-outline-success">
            Buy box
          </button>
        </div>
      </div>
    </div>
  );
}

export default Box;
