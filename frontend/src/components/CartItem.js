import React from "react";
import axiosInstance from "../api/axiosCart";

function CartItem(props) {

  function makeCapital(word) {
    return word[0].toUpperCase() + word.substring(1);
  }

  let name = makeCapital(props.name);
  let weight = parseFloat(props.weight).toFixed(1);

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-row align-items-center">          
            <div className="ms-3">
              <p className="small mb-0">{name}</p>
            </div>
          </div>
          <div className="d-flex flex-row align-items-center">
            <div className="ms-3">
              <p className="small mb-0">Kg {weight}</p>
            </div>
          </div>
          <h5 className="mb-0">€ {props.price}</h5>
        </div>
        <i className="fas fa-trash-alt"></i>
      </div>
    </div>
  );
}

export default CartItem;
