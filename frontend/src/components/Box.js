import React from "react";
import axiosInstance from "../api/axiosCart";
import axiosInstanceInsertion from "../api/axiosInsertions";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function Box(props) {
  let size;
  if (props.size === 0) {
    size = "Small";
  } else if (props.size === 1) {
    size = "Medium";
  } else if (props.size === 2) {
    size = "Large";
  }


  const { auth } = useAuth();
  const userId = auth.userId;
  const axiosPrivate = useAxiosPrivate();

  const addBoxToCart = async () => {

    /**
     * Check the user token
     */
    await axiosPrivate
    .post(`token/verify/`, {
      user_id: userId,
    })
    .then((res) => {

      /**
       * Get the farmer id that made the insertion
       */
      axiosInstanceInsertion
        .get(`/insertions/${props.insertion}/`)
        .then((res) => {
          let farmer_id = res.data['farmer']
          let insertion_name = res.data['title']
          
          /**
           * Try to add the box to the cart
           */
          axiosInstance
          .put(`users/${userId}/cart/items/`, 
              {
                insertion: props.insertion,
                box_id: props.id,
                name: insertion_name,
                size: props.size,
                price: props.price,
                weight: props.weight,
                farmer: farmer_id
              })
          .then((res) => {
            console.log(props.id);
            // alert that box has been added to cart
            alert('BOX HAS BEEN ADDED!');
            console.log(res);
          })
          .catch((error) => {
            /**
             * Behaviour:
             *  409 --> The cart exists but the current farmer is different from
             *          the box
             *  
             *  404 --> The cart doesn't exist
             */
            console.log('ERROR GET CART')
            console.log(error.response['status']);
            if(error.response['status'] == 409) {

              /**
               * If the current farmer is different then ask if delete and add new box
               * with new farmer
               */
              alert('Cart has already a box of another farmer, delete current cart?')

              //TODO: add a popup to ask the user to choose
              let choose = 1;

              if(choose == 1) {
                /**
                 * Delete current cart, Post new one with current farmer and Put the box
                 */
                  axiosInstance
                    .delete(`users/${userId}/cart/`)
                    .then((res) => {
                      alert('CART DELETED!')
                      axiosInstance
                      .post(`users/${userId}/cart/`, {
                        'farmer': farmer_id
                      })
                      .then((res) => {
                        alert('CART CREATED! FIRST IF');
                        console.log(res);
                        axiosInstance
                        .put(`users/${userId}/cart/items/`, 
                          {
                            insertion: props.insertion,
                            name: insertion_name,
                            size: props.size,
                            price: props.price,
                            weight: props.weight,
                            farmer: farmer_id
                          })
                        .then((res) => {
                          // alert that box has been added to cart
                          alert('BOX HAS BEEN ADDED!');
                          console.log(res);
                        })
                        .catch((error) => {
                          console.log(error)
                        })
                      })
                    })
              }
            } else if(error.response['status'] == 404) {
              /**
               * If the cart doesn't exist, Post new one and Put the box
               */
                console.log(farmer_id);
                axiosInstance
                .post(`users/${userId}/cart/`, {
                  'farmer': farmer_id
                })
                .then((res) => {
                  alert('CART CREATED! SECOND IF');
                  console.log(res);
                  axiosInstance
                  .put(`users/${userId}/cart/items/`, 
                    {
                      insertion: props.insertion,
                      name: insertion_name,
                      size: props.size,
                      price: props.price,
                      weight: props.weight,
                      farmer: farmer_id
                    })
                  .then((res) => {
                    // alert that box has been added to cart
                    alert('BOX HAS BEEN ADDED!');
                    console.log(res);
                  })
                  .catch((error) => {
                    console.log(error)
                  })
                })
                .catch((error) => {
                  console.log(error)
                })
            } else {
                alert('ERROR UKNOWN');
                console.log(error)
            }
          })
        })
        .catch((error) => {
          console.log(error);
        })
    })
  };

  return (
    <div className="col">
      <div className="card">
        {props.size != 3
          ? <h4 className="card-header fw-bold">{size} boxes</h4>
          : <h4 className="card-header fw-bold">Box</h4>
        }
        <div className="card-body">
          <p className="card-text">
            Box Weight:{" "}
            <strong className="text-primary">{props.weight}kg</strong>
          </p>
          <p className="card-text">
            Box Price:{" "}
            <strong className="text-primary">{props.price}€</strong>
          </p>
          <p className="card-text">
            Available boxes:{" "}
            <strong className="text-primary">
              {props.number_of_available_boxes}
            </strong>
          </p>
          <button 
            type="button"
            onClick={addBoxToCart} 
            className="btn btn-primary">
            Buy box
          </button>
        </div>
      </div>
    </div>
  );
}

export default Box;
