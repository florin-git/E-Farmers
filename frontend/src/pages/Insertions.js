import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

// Bootstrap Components
import ListInsertions from "../components/ListInsertions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Insertions(props) {
  /**
   ** VARIABLES
   */

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchString, setSearchString] = useState(searchParams.get("search"));

  /**
   ** FUNCTIONS
   */

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchString(document.getElementById("search").value);
  };

  return (
    <div>
      <h1 className="text-center">Insertions</h1>
      <div className="container-lg py-5">
        <form
          className="mb-5 d-flex justify-content-center"
          onSubmit={handleSearchSubmit}
        >
          <div className="form-group d-flex w-50">
            <input
              className="form-control"
              type="text"
              id="search"
              name="search"
            />
            <button className="btn btn-primary" type="submit">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </form>

        <ListInsertions searchString={searchString} />
      </div>
    </div>
  );
}

export default Insertions;
