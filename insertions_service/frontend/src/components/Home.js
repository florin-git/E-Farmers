import React from "react";

function Home(props) {
  return (
    <section>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="./images/hero1.jpg"
              className="d-block w-100"
              alt="..."
              // width="1066px"
              height="800px"
            />
          </div>
          <div className="carousel-item">
            <img
              src="./images/hero2.jpg"
              className="d-block w-100"
              alt="..."
              width="1066px"
              height="800px"
            />
          </div>
          <div className="carousel-item">
            <img
              src="./images/hero3.jpg"
              className="d-block w-100"
              alt="..."
              width="1066px"
              height="800px"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
}

export default Home;
