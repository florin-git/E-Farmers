import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Home(props) {
  return (
    <>
      {/* Main Section */}
      <section className="main">
        <div className="container">
          <div className="row">
            <div className="col-lg text-center caption">
              <h1>100% FRESH AND ORGANIC FOODS</h1>
              <button className="btn btn-primary rounded-pill fw-bold">
                Click here
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* // ========================================================== */}

      <section className="new">
        <div className="container py-5">
          <div className="row pt-5">
            <div className="col-lg-7 m-auto">
              <div className="row text-center">
                <div className="col-lg-4">
                  <img
                    src="./images/food/carrot.jpg"
                    className="img-fluid"
                    alt="carrot"
                  />
                  <h6>NATURAL</h6>
                </div>
                <div className="col-lg-4">
                  <img
                    src="./images/food/tomatoe.jpg"
                    className="img-fluid"
                    alt="tomatoe"
                  />
                  <h6>ORGANIC</h6>
                </div>
                <div className="col-lg-4">
                  <img
                    src="./images/food/broccoli.jpg"
                    className="img-fluid"
                    alt="broccoli"
                  />
                  <h6>HEALTH</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* // ========================================================== */}
      {/* Expiring Boxes */}

      <section className="expiring-products">
        <div className="container py-5">
          <div className="row py-5">
            <div className="col-lg-5 m-auto text-center">
              <h1 className="fw-bold">Expiring Boxes</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 text-center">
              <div className="card border-0 mb-2">
                <div className="card-body">
                  <img
                    src="./images/food/strawberry.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
              <h6>Strawberry</h6>
              <p>40.00 &euro;</p>
            </div>
            <div className="col-lg-3 text-center">
              <div className="card border-0 mb-2">
                <div className="card-body">
                  <img
                    src="./images/food/orange.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
              <h6>Orange</h6>
              <p>40.00 &euro;</p>
            </div>
            <div className="col-lg-3 text-center">
              <div className="card border-0 mb-2">
                <div className="card-body">
                  <img
                    src="./images/food/mango.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
              <h6>Mango</h6>
              <p>40.00 &euro;</p>
            </div>
            <div className="col-lg-3 text-center">
              <div className="card border-0 mb-2">
                <div className="card-body">
                  <img
                    src="./images/food/lemon.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
              <h6>Lemon</h6>
              <p>40.00 &euro;</p>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 text-center m-auto">
              <button className="btn btn-primary rounded-pill fw-bold">
                See Other Products
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* // ========================================================== */}
      {/* Products */}

      <section className="shop">
        <div className="container py-5">
          <div className="row py-5">
            <div className="col-lg-5 m-auto text-center">
              <h1 className="fw-bold">Our Products</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 text-center">
              <div className="card border-0 mb-2">
                <div className="card-body">
                  <img
                    src="./images/food/strawberry.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
              <h6>Strawberry</h6>
              <p>40.00 &euro;</p>
            </div>
            <div className="col-lg-3 text-center">
              <div className="card border-0 mb-2">
                <div className="card-body">
                  <img
                    src="./images/food/orange.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
              <h6>Orange</h6>
              <p>40.00 &euro;</p>
            </div>
            <div className="col-lg-3 text-center">
              <div className="card border-0 mb-2">
                <div className="card-body">
                  <img
                    src="./images/food/mango.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
              <h6>Mango</h6>
              <p>40.00 &euro;</p>
            </div>
            <div className="col-lg-3 text-center">
              <div className="card border-0 mb-2">
                <div className="card-body">
                  <img
                    src="./images/food/lemon.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
              <h6>Lemon</h6>
              <p>40.00 &euro;</p>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 text-center m-auto">
              <button className="btn btn-primary rounded-pill fw-bold">
                See Other Products
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* // ========================================================== */}
      {/* Footer */}

      <footer className="pt-5 py-2">
        <div className="container">
          {/* <div className="row">
            <div className="col-lg-9 m-auto text-center">
              <h1>Join Our Secret Society</h1>
              <input type="text" placeholder="Enter" />
              <button className="btn">Submit</button>
            </div>
          </div> */}

          <div className="row pt-5">
            <div className="col-lg-11 m-auto">
              <div className="row">
                <div className="col-lg-3 py-3">
                  <h1 className="pb-3">E-Farmers</h1>
                  <ul className="">
                    <li>Address: 30 Sapienza Road, Rome, Italy</li>
                    <li>Phone: +39 0123456789</li>
                    <li>Email: info@efarmers.com</li>
                  </ul>
                </div>
                <div className="col-lg-3 py-3">
                  <h5 className="pb-3">E-Farmers</h5>
                </div>
                <div className="col-lg-3 py-3">
                  <h5>E-Farmers</h5>
                  <p></p>
                </div>

                <div className="col-lg-3 py-3">
                  <h5 className="pb-3"></h5>
                  <span>
                    <FontAwesomeIcon className="fab" icon={faFacebook} />
                  </span>
                  <span>
                    <FontAwesomeIcon className="fab" icon={faInstagram} />
                  </span>
                  <span>
                    <FontAwesomeIcon className="fab" icon={faTwitter} />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <p className="text-center small">
            Copyright ©2022 All rights reserved | This template is made with{" "}
            <FontAwesomeIcon icon={faHeart} /> by Sapienza Students
          </p>
        </div>
      </footer>
    </>
  );
}

export default Home;
