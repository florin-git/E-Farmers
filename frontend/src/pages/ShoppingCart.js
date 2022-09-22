//import axiosInstance from "../axiosInsertions";
import axios from 'axios'

  function ShoppingCart(props) {
  /**
   ** VARIABLES
   */

  // Authentication data from context storage
  const { auth } = useAuth();
  const userId = auth.userId;

  // axios function with JWT tokens
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  /**
   ** FUNCTIONS
   */

  useEffect(() => {
    /**
     * Retrieve the user info
     */
    (async () => {
      await axios
        .post(`http://localhost:8082/api/users/${userId}/cart/`, {
          user:userId,
          //creation_date:,
          checked_out:false,
          total_amount: 0.0,
          //boxes:
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error.response);
          console.log("LOGIN AGAIN")
          // If also the refresh token expires then you have to
          // log in again
          navigate("login/", { state: { from: location }, replace: true });
        });
    })();

  }, [userId, axiosPrivate, location, navigate]);

  return (
    <div>
        <section className="vh-100">
            <div className="container py-5 h-100">

            </div>
        </section>
    </div>
  )
}