import React from "react";

function FarmerProfile(props) {

  const handleFollow = (event) => {
    event.preventDefault();

    // RabbitMQ...
  };

  return (
    <div>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-md-9 col-lg-7 col-xl-5">
              <div className="card">
                <div className="card-body p-4">
                  <div className="d-flex text-black">
                    <div className="flex-shrink-0">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Farmer_meme.jpg"
                        alt="Profile"
                        className="img-fluid"
                        width="180px"
                        // style={{width: "180px", border-radius: "10px"}}
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5 className="mb-1">Danny McLoan</h5>
                      <p className="mb-2 pb-1">Senior Farmer</p>
                      <div
                        className="d-flex justify-content-start rounded-3 p-2 mb-2"
                        // style="background-color: #efefef;"
                      >
                        <div>
                          <p className="small text-muted mb-1">Insertions</p>
                          <p className="mb-0">41</p>
                        </div>
                        <div className="px-3">
                          <p className="small text-muted mb-1">Followers</p>
                          <p className="mb-0">976</p>
                        </div>
                        <div>
                          <p className="small text-muted mb-1">Rating</p>
                          <p className="mb-0">5</p>
                        </div>
                      </div>
                      <form onSubmit={handleFollow}>
                        <div className="d-flex pt-1">
                          <button
                            type="button"
                            className="btn btn-outline-primary me-1 flex-grow-1"
                          >
                            Chat
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary flex-grow-1"
                          >
                            Follow
                          </button>
                        </div>
                      </form>
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

export default FarmerProfile;
