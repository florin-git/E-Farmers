import React from "react";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInsertions";
import { Link } from "react-router-dom";
import ListInsertions from "../components/ListInsertions";

function Home(props) {
  const [insertions, setInsertions] = useState([]);

  var date = new Date();
  useEffect(() => {
    /**
     * Retrieve insertions from backend
     */
    (async () => {
      /**
       * Because the 'await' keyword, the asynchronous
       * function is paused until the request completes.
       */
      await axiosInstance
        .get("insertions/", {
          params: { expiring: "4" },
        })
        .then((res) => {
          setInsertions(res.data);
        })
        .catch((error) => {
          return error.response;
        });
    })();
  }, []); // Whenever you delete an insertion, the fetch is repeated

  const insertions_array = insertions.map((insertion) => {
    // `/image/?${date.getMinutes()}` in order to avoid caching of the images
    return (
      <div className="col-lg-3 text-center" key={insertion.id}>
        <div className="card w-75">
          <img
            src={
              axiosInstance.defaults.baseURL +
              "insertions/" +
              insertion.id +
              `/image/?${date.getMinutes()}`
            }
            alt="img"
            className="card-img-top img-fluid"
          />

          <div className="card-body">
            <h5 className="card-title">{insertion.title}</h5>

            <p className="card-text">
              Expiration date: {insertion.expiration_date}
            </p>

            <div className="container">
              <div className="row">
                <div className="col-sm">
                  <Link
                    className="btn btn-outline-primary"
                    to={`insertions/${insertion.id}`}
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <main className="home">
      {/* Main Section */}
      <section className="main">
        <div className="container">
          <div className="row">
            <div className="col-lg text-center caption">
              <h1>100% FRESH AND ORGANIC FOODS</h1>
              <Link className="btn btn-primary fw-bold" to={"insertions/"}>
                Go to Insertions
              </Link>
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

      {insertions.length > 0 && (
        <section className="expiring-products">
          <div className="container py-5">
            <div className="row py-5">
              <div className="col-lg-5 m-auto text-center">
                <h1 className="fw-bold">Expiring Boxes</h1>
              </div>
            </div>
            <div className="row">{insertions_array}</div>

            <div className="row">
              <div className="col-lg-6 text-center m-auto">
                <Link
                  className="btn btn-primary fw-bold"
                  to={`../insertions/?search=expiring_products`}
                >
                  See Other Products
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

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
