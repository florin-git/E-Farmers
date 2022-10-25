import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InsertionDetail from "../pages/InsertionDetail";
import axiosInstance from "../api/axiosInsertions";

function ProtectedRouteInsertion() {
  /**
   ** VARIABLES
   */
  // Variable to store the insertion's details
  const [insertion, setInsertion] = useState([]);

  // True If the URL is associated with an existing insertion
  const [existsURL, setExistsURL] = useState(false);

  // Retrieve the id from the URL
  const { insertion_id } = useParams();

  // This variable is used for the redirection
  const navigate = useNavigate();

  /**
   ** FUNCTIONS
   */

  useEffect(() => {
    /**
     * Try to access the insertion page
     */
    (async () => {
      await axiosInstance
        .get(`insertions/${insertion_id}/`)
        .then((res) => {
          if(res.status == '204'){
            setExistsURL(false);
            navigate("/");
          }
          else {
            setExistsURL(true);
            setInsertion(res.data);
          }
        })
        .catch((error) => {
          // If insertion does not exists
          console.log(error);
          setExistsURL(false);
          navigate("/");
        });
    })();
  }, [insertion_id, navigate]);

  return (
    // If the insertion exists go to the insertion page
    <div>
      <div>{existsURL === true && <InsertionDetail insertion={insertion} />}</div>
    </div>
  );
}

export default ProtectedRouteInsertion;
