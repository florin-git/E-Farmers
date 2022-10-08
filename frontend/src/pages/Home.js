import React from "react";


function Home(props) {
  return (
    <main className="home">
      {/* Main Section */}
      <section className="main">
        <div className="container">
          <div className="row">
            <div className="col-lg text-center caption">
              <h1>100% FRESH AND ORGANIC FOODS</h1>
              <button className="btn btn-primary fw-bold">Click here</button>
            </div>
          </div>
        </div>
      </section>

      {/* // ========================================================== */}
      {/* Badges */}

      <section className="badges">
        <div className="container py-5">
          <div className="row pt-5">
            <div className="col-lg-7 m-auto">
              <div className="row text-center">
                <div className="col-lg-3">
                  <img
                    src="images/rider.jpg"
                    className="img-fluid"
                    alt="rider"
                    width={150}
                    height={150}
                  />
                  <h6 className="fw-bold">DELIVERY BY RIDER</h6>
                </div>
                <div className="col-lg-3">
                  <img
                    src="images/fresh.jpg"
                    className="img-fluid"
                    alt="fresh"
                    width={150}
                    height={150}
                  />
                  <h6 className="fw-bold">ALWAYS FRESH</h6>
                </div>
                <div className="col-lg-3">
                  <img
                    src="images/quality.jpg"
                    className="img-fluid"
                    alt="quality"
                    width={150}
                    height={150}
                  />
                  <h6 className="fw-bold">QUALITY PRODUCTS</h6>
                </div>
                <div className="col-lg-3">
                  <img
                    src="images/support.jpg"
                    className="img-fluid"
                    alt="fresh"
                    width={150}
                    height={150}
                  />
                  <h6 className="fw-bold">24/7 SUPPORT</h6>
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
              <button className="btn btn-primary fw-bold">
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
              <button className="btn btn-primary fw-bold">
                See Other Products
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* // ========================================================== */}
      {/* Footer */}

      {/* <footer className="pt-2 py-2">
        <div className="container">
          <div className="row pt-5">
            <div className="col-lg-11 m-auto">
              <div className="row">
                <h1 className="pb-3">E-Farmers</h1>
                <div className="col-lg-3 py-3">
                  <ul>
                    <li>30 Sapienza Road</li>
                    <li>Rome, Italy</li>
                  </ul>
                </div>
                <div className="col-lg-3 py-3">
                  <ul>
                    <li>+39 0123456789</li>
                    <li>info@efarmers.com</li>
                  </ul>
                </div>
                <div className="col-lg-3 py-3">
                  <ul>
                    <Link
                      className="text-decoration-none text-reset"
                      to={"insertions/"}
                    >
                      Shop
                    </Link>
                    <li>About</li>
                  </ul>
                </div>

                <div className="col-lg-3 py-3">
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
      </footer> */}
    </main>
  );
}

export default Home;
