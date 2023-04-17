import React, { useEffect, useState, useRef } from "react";
import Calendar from "rc-year-calendar";
import Modal from "react-bootstrap/Modal";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axiosInsertions from "../api/axiosInsertions";
import axiosSubscription from "../api/axiosSubscription";

/*
function SeasonsCalendar(props) {
    return (
        <Calendar />
    );
}*/

const seasonal_food = new Map();
seasonal_food.set("Winter", [
  "Chestnuts",
  "Grapefruit",
  "Lemons",
  "Oranges",
  "Tangerines",
  "Kale",
  "Leeks",
  "Radicchio",
  "Radishes",
  "Rutabaga",
  "Turnips",
]);
seasonal_food.set("Spring", [
  "Apricots",
  "Avocado",
  "Mango",
  "Pineapple",
  "Rhubarb",
  "Strawberries",
  "Artichoke",
  "Asparagus",
  "Carrots",
  "Celeriac",
  "Chives",
  "Collards",
  "Fava Beans",
  "Fennel",
  "Fiddlehead Ferns",
  "Morels",
  "Mustard Greens",
]);
seasonal_food.set("Summer", [
  "Blackberries",
  "Blueberries",
  "Nectarines",
  "Peaches",
  "Plums",
  "Raspberries",
  "Tomatoes",
  "Watermelon",
  "Broccoli",
  "Cucumber",
  "Green Beans",
  "Zucchini",
]);
seasonal_food.set("Fall", [
  "Apples",
  "Cranberries",
  "Figs",
  "Grapes",
  "Pears",
  "Pomegranate",
  "Quince",
  "Butternut Squash",
  "Cauliflower",
  "Garlic",
  "Ginger",
  "Mushrooms",
  "Potatoes",
  "Pumpkin",
  "Sweet Potatoes",
  "Swiss Chard",
]);

const seasons = new Map();
for (const x of Array(12).keys()) {
  if (x < 2 || x === 11) {
    seasons.set(x, "Winter");
  } else if (x < 5) {
    seasons.set(x, "Spring");
  } else if (x < 8) {
    seasons.set(x, "Summer");
  } else {
    seasons.set(x, "Fall");
  }
}
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

function SeasonsCalendar() {
  /*
  // {this.state.logs.map(log => <div key={log}>{log}</div>)}
  addLog(date) {
    // this.setState({ logs: this.state.logs.concat([message]) });
    this.setState({ value: seasonal_food.get(seasons.get(date)) });
  }
  */
  const { auth } = useAuth();
  const userId = auth.userId;
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();

  const [seasonalFood, setSeason] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setProduct] = useState("");
  const [subscriptions, setSubscriptions] = useState([]);
  const [formData, setFormData] = useState({
    comment: "",
    weight: "",
    deadline: "",
    farmer: "",
  });

  const [formValidation, setformValidation] = useState({
    weight: "",
    deadline: "",
  });

  const [formValidationClass, setformValidationClass] = useState({
    weight_for_class: "",
    deadline_for_class: "",
  });

  const getSubscriptions = async () => {
    await axiosSubscription
      .get(`customer/${userId}/subscriptions/`)
      .then((res) => {
        const farmers_names = new Array(res.data.length);
        res.data.forEach((subscription_farmer_id, index) =>
          axiosPrivate
            .get(`farmers/${subscription_farmer_id}/`)
            .then((res) => {
              farmers_names[index] = [subscription_farmer_id, res.data.name];

              // setFormData((prevFormData) => {
              //   return {
              //     ...prevFormData,
              //     [farmer]: subscription_farmer_id,
              //   };
              // });
            })
            .catch((error) => {
              console.log(error.response);
            })
        );
        setSubscriptions(farmers_names);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    setSeason(seasonal_food.get(seasons.get(tomorrow.getMonth())));
    getSubscriptions();
  }, []);

  function handleChange(event) {
    // Get name and value of the changed field
    const { name, value } = event.target;

    // Update formData with the changed value
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function validate() {
    const date = new Date();
    // Get the date of today
    const today_str =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    const today = new Date(today_str);

    // If the deadline was inputted
    if (formData.deadline) {
      // Convert the string into a Date object
      const deadline = new Date(formData.deadline);

      // Check date
      if (deadline < today) {
        formValidation.deadline = "The expiration date cannot be in the past!";
        formValidationClass.deadline_for_class = "is-invalid";
      } else {
        formValidation.deadline = "";

        // If previously you inserted a wrong input
        if (formValidationClass.deadline_for_class === "is-invalid")
          formValidationClass.deadline_for_class = "is-valid";
      }
    }

    // Check weight
    if (formData.weight <= 0) {
      formValidation.weight = "The weight must be greater than 0 kg!";
      formValidationClass.weight_for_class = "is-invalid";
    } else {
      formValidation.weight = "";

      // If previously you inserted a wrong input
      if (formValidationClass.weight_for_class === "is-invalid")
        formValidationClass.weight_for_class = "is-valid";
    }

    // Update formValidation
    setformValidation((prevFormValidation) => {
      return {
        ...prevFormValidation,
      };
    });

    // Update formValidationClass
    setformValidationClass((prevFormValidationClass) => {
      return {
        ...prevFormValidationClass,
      };
    });

    let valid = true;

    /**
     * The inputs are valid if formValidation does not
     * contain error messages (i.e., strings with lengths
     * greater than 0)
     */
    Object.values(formValidation).forEach(
      // if val.length > 0 then valid = false
      (val) => val.length > 0 && (valid = false)
    );

    return valid;
  }

  // On submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // If all the inputs are valid
    if (validate()) {
      // FormData object for the new insertion
      let form_data = new FormData();

      form_data.append("user", userId);
      form_data.append("title", selectedProduct);
      form_data.append("comment", formData.comment);
      form_data.append("weight", formData.weight);
      form_data.append("deadline", formData.deadline);
      form_data.append("farmer", formData.farmer);

      /**
       * Create new insertion through API call
       */
      await axiosInsertions
        .post("booking/", form_data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          // If the submission was successful
          navigate("/");
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  const handleDaySelection = (event) => {
    setSeason(seasonal_food.get(seasons.get(event.date.getMonth())));
  };

  // Manage Modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = (event) => {
    setShowModal(true);
    setProduct(event.target.id);
  };

  function redirectToInsertions(event) {
    const name = event.target.id;
    window.location.replace(`../insertions?search=${name}`);
  }

  function handleFarmerChange(event) {
    // Get name and value of the changed field
    const { name, value } = event.target;

    // Update formData with the changed value
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  const seasonal_items = seasonalFood.map((item) => {
    /*
    return (
      <div>
        <div className="col" key={item}>
          <button className="btn btn-outline-primary" id={item} onClick={redirectToInsertions}>{item}</button>
        </div>
      </div>
      
    );*/
    return (
      <div>
        <div className="col" key={item}>
          <div className="card w-75">
            <div className="card-body">
              <h5 className="card-title">{item}</h5>
              <br />
              <div className="container">
                <div className="row">
                  <div className="col-sm">
                    <button
                      className="btn btn-outline-primary"
                      id={item}
                      onClick={redirectToInsertions}
                    >
                      View
                    </button>
                  </div>
                </div>
                {subscriptions.length != 0 && (
                  <div>
                    <br />
                    <div className="row">
                      <div className="col-sm">
                        <button
                          type="button"
                          id={item}
                          name="book"
                          onClick={(event) => handleShowModal(event)}
                          className="btn btn-outline-warning"
                        >
                          Book from a farmer
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div id="events-log">
        <h1 className="text-center">The Calendar of Seasonal Food</h1>
      </div>
      {showModal == false && (
        <Calendar
          minDate={new Date()}
          enableRangeSelection={true}
          onDayClick={(event) => handleDaySelection(event)}
        />
      )}
      {showModal == true && <Calendar />}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span>Booking</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>
            Use this form to send a request to a farmer you are subscribed to.
          </h6>
          <div className="container-md py-5">
            <div className="row ">
              <div className="d-flex justify-content-center align-items-center h-100">
                <form onSubmit={handleSubmit}>
                  <h3>{selectedProduct}</h3>

                  <div className="form-group mt-3">
                    <label htmlFor="comment">Comment</label>
                    <textarea
                      className="form-control"
                      id="comment"
                      placeholder="Comment"
                      value={formData.comment}
                      name="comment"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label htmlFor="weight">Weight (kg)</label>
                    <input
                      type="number"
                      className="form-control"
                      id="weight"
                      min="0.0000"
                      step="0.001"
                      placeholder="0"
                      value={formData.weight}
                      name="weight"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="row">
                    <div className="form-group mt-3">
                      <label htmlFor="expiration_date">Deadline</label>
                      <input
                        type="date"
                        className={`form-control ${formValidationClass.deadline_for_class}`}
                        id="deadline"
                        placeholder="Deadline"
                        value={formData.deadline}
                        name="deadline"
                        onChange={handleChange}
                        required
                      />
                      {formValidation.deadline.length > 0 && (
                        <span className="invalid-feedback">
                          {formValidation.deadline}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="form-group mt-3">
                    <label htmlFor="Farmer">Farmer</label>
                    <select
                      className={`form-control`}
                      id="farmer"
                      name="farmer"
                      value={formData.farmer}
                      onChange={handleFarmerChange}
                    >
                      <option value="">--Choose--</option>
                      {subscriptions.map((farmer) => {
                        return <option value={farmer[0]}>{farmer[1]}</option>;
                      })}
                      ;
                    </select>
                  </div>

                  <button className="mt-4 btn btn-primary" type="submit">
                    Send request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
      <div className="my-5 row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 text-center">
        {seasonal_items}
      </div>
    </div>
  );
}

export default SeasonsCalendar;
