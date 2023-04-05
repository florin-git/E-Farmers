import { Link } from "react-router-dom";

function SubscriptionItem({ farmer_name, farmer_id, onInteraction }) {
  return (
    <div className="card w-50 mx-auto mt-3 mb-3">
      <div className="card-body">
        <h5 className="card-title">{farmer_name}</h5>
        <hr />

        <div className="container">
          <div className="row">
            <div className="container">
              <div className="row">
                <div className="col-sm">
                  <button
                    type="button"
                    id={farmer_id}
                    value="cancel"
                    name="cancel"
                    onClick={(event) => onInteraction(event)}
                    className="btn btn-outline-danger"
                  >
                    Cancel subscription
                  </button>
                </div>
                <div className="col-sm">
                  <Link
                    className="btn btn-outline-primary"
                    to={`/farmer/profile/${farmer_id}`}
                  >
                    View farmer's page
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionItem;
