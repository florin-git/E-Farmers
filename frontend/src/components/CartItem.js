import React from "react";
import axiosInstance from "../api/axiosCart";
import useAuth from "../hooks/useAuth";

function CartItem(props) {

  const { auth } = useAuth();
  const userId = auth.userId;

  function makeCapital(word) {
    return word[0].toUpperCase() + word.substring(1);
  }

  let nameCap = makeCapital(props.name);
  let weight = parseFloat(props.weight).toFixed(1);

  console.log(props.name);
  console.log(props.weight);
  console.log(props.price);
/*
  const handleDeletion = async () => {
    await axiosInstance.delete(`/users/${userId}/cart/items/`, a
    {
      name: props.name,
      weight: props.weight,
      price:props.price

    }).then((res) => {
      alert('Cart Item deleted')
    })
  }
*/
  const handleDeletion = (event) => {
    axiosInstance.delete(`/users/${userId}/cart/items/`, 
    {data: {
      name: props.name,
      weight: props.weight,
      price:props.price
    }}).then((res) => {
      alert('Cart Item deleted');
    })
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-row align-items-center">          
            <div className="ms-3">
              <p className="small mb-0">{nameCap}</p>
            </div>
          </div>
          <div className="d-flex flex-row align-items-center">
            <div className="ms-3">
              <p className="small mb-0">Kg {weight}</p>
            </div>
          </div>
          <h5 className="mb-0">€ {props.price}</h5>
        </div>
          <div className="col-sm">
            <button onClick={handleDeletion} className="btn btn-primary">
              Delete
            </button>
          </div>
        <i className="fas fa-trash-alt"></i>
      </div>
    </div>
  );
}

export default CartItem;