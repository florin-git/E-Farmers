import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

// Account information to hold for rappresentation
let type;
let element;


function modify_button(type) {
  if ( type == 1 ) 
    document.getElementById("farmer").style.pointerEvents = "none";
  else if ( type == 2 )
    document.getElementById("rider").style.pointerEvents = "none";
}

function UserProfile(props) {
  /**
   ** VARIABLES
   */

  // Authentication data from context storage
  const { auth } = useAuth();
  const userId = auth.userId;
  // axios function with JWT tokens
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();
  /**
   ** FUNCTIONS
   */

  function extra_get_call(type){
    console.log("EXTRA_GET_CALL")
    axiosPrivate
      .get(`users/${userId}/${type}/`)      //GET per prendere le informazioni extra
      .then((res) => {
        console.log(res.data)
        //const containerInfo = ReactDOM.createRoot(document.getElementById('extrainfo'))
        //console.log(containerInfo)
        if(type == 1){
          document.getElementById('specialInfo').innerHTML = "Farmer Details";
          element = (
            <div>
              <div className="col-6 mb-3">
                <h6>Bio</h6>
                <p className="text-muted" id="bio"> { res.data.bio } </p>
              </div>
              <div className="col-6 mb-3">
                <h6>Farm Location</h6>
                <p className="text-muted" id="FarmLocation"> { res.data.farm_location } </p>
              </div>
            </div>
          )
          //document.getElementById('bio').innerHTML = res.data.bio
          //document.getElementById('farmlocation').innerHTML = res.data.farmlocation
          //ReactDOM.render(element, document.getElementById('extra_info'));
        }
        else if(type == 2) {
          document.getElementById('specialInfo').innerHTML = "Rider Details";
          element = (
            <div>
              <div className="col-6 mb-3">
                <h6>Bio</h6>
                <p className="text-muted" id="bio"> { res.data.bio } </p>
              </div>
              <div className="col-6 mb-3">
                <h6>Avalaible</h6>
                <p className="text-muted" id="Avalaible"> { res.data.avalaible } </p>
              </div>
            </div>
          )
        }
      })
      .catch((error) => {
        console.log(error)
      })
  };

  useEffect(() => {
    /**
     * Retrieve the user info
     */
    (async () => {
      axiosPrivate
        .get(`users/${userId}/`)
        .then((res) => {
          //console.log(res.data);
          document.getElementById('name').innerHTML = res.data.name;
          document.getElementById('email').innerHTML = res.data.email;
          document.getElementById('phone').innerHTML = res.data.phone;
          document.getElementById('saddress').innerHTML = res.data.saddress;
          document.getElementById('baddress').innerHTML = res.data.baddress;
          /*
            LEGENDA =   [ 0 : USER -- 1 : FARMER -- 2 : RIDER ]
          */
          type = res.data.account_type ;
          if(type == 1 || type == 2){
            console.log("User speciale ongoing new actions.")
            modify_button(type);
            extra_get_call(type);
          }
          document.getElementById('account_type').innerHTML = type;
        })
        .catch((error) => {
          console.log(error.response);
        });
    })();

  }, [userId, axiosPrivate, location, navigate]);

  return (
    <div>
      <section>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-6 mb-4 mb-lg-0">
              <div className="card mb-3">
                <div className="row g-0">
                  <div
                    className="col-md-4 gradient-custom text-center text-white"
                    // style="border-top-left-radius: .5rem; border-bottom-left-radius: .5rem;"
                  >
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="Avatar"
                      className="img-fluid my-5"
                      width="80px;"
                    />
                  <div>
                    <div className="row d-flex justify-content-center align-items-center"> 
                      <Link className="btn btn-primary m-1" to={"orders/"} id="orders" >
                        Orders
                      </Link>
                    </div>
                    <div className="row d-flex justify-content-center align-items-center"> 
                      <Link className="btn btn-primary m-1 " to={"/"} >
                        Cards
                        </Link>   
                    </div>
                    <div className="row d-flex justify-content-center align-items-center"> 
                    <Link className="btn btn-primary m-1 " to={"/"} >
                        Utils
                      </Link>
                    </div>                                    
                  </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h6>Information</h6>
                        <div className="row pt-1">
                          <div className="col-6 mb-3">
                            <h6>Name</h6>
                            <p className="text-muted" id="name"></p>
                          </div>
                          <div className="col-6 mb-3">
                            <h6>Email</h6>
                            <p className="text-muted" id="email"></p>
                          </div>
                          <div className="col-6 mb-3">
                            <h6>Phone</h6>
                            <p className="text-muted" id="phone"></p>
                          </div>
                        </div>
                      <h6>Other Information</h6>
                        <div className="row pt-1">
                          <div className="col-6 mb-3">
                            <h6>ShippingAddress</h6>
                            <p className="text-muted" id="saddress"></p>
                          </div>
                          <div className="col-6 mb-3">
                            <h6>BillingAddress</h6>
                            <p className="text-muted" id="baddress"></p>
                          </div>
                        </div>
                      <h6>Advanced</h6>
                        <div className="row pt-1">
                          <div className="col-6 mb-3">
                            <h6>AccountType</h6>
                            <p className="text-muted" id="account_type"></p>
                          </div>
                        </div>
                      <h6> Upgrade </h6>
                      <div className="row pt-1">
                          <div className="col-6 mb-3">
                            <div> 
                              <Link className="btn btn-warning" to={"farmer_update/"} id = "farmer" >
                                            Become a Farmer!
                              </Link>
                            </div>
                          </div>
                          <div className="col-6 mb-3">
                            <div>
                              <Link className="btn btn-warning" to={"rider_update/"} id = "rider" >
                                            Become a Rider!
                              </Link>
                            </div>
                          </div>

                          <div className="col-6 mb-3">
                            <div> 
                              <Link className="btn btn-warning" to={"payments/"} id = "payments" >
                                            Payments Page!
                              </Link>
                            </div>
                          </div>
                      </div> 

                      <div className = "row pt-1" id = "extrainfo">
                        <h6 id="specialInfo">  </h6>
                        {element} 
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  </div>
  );
}

export default UserProfile;
/*
{accountUp && (          
  <div className="row pt-1" id="root">
  <h6>Special Information</h6>
    <div className="col-6 mb-3">
      <h6>Bio</h6>
      <p className="text-muted" id="bio"></p>
    </div>
    {type = 1 && (
      <div className="col-6 mb-3">
        <h6>Farm Location</h6>
        <p className="text-muted" id="FarmLocation"></p>
      </div>
    )}
    {type = 2 && (
    <div className="col-6 mb-3">
      <h6>Avalaible</h6>
      <p className="text-muted" id="Avalaible"></p>
    </div>
    )}
  </div>
)}      */