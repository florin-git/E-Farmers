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
                <div className="card-body">
                    <h5 className="card-title">{size} boxes</h5>

                    <p className="card-text">
                        Weight of the box: {props.weight}kg
                    </p>
                    <p className="card-text">
                        Price of the box: {props.price}€
                    </p>
                    <p className="card-text">
                        Number of available boxes:{" "}
                        {props.number_of_available_boxes}
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
