import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer(props) {
  return (
    <div>
      <footer className="pt-2 py-2">
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
      </footer>
    </div>
  );
}

export default Footer;
