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
      await axiosPrivate
        .get(`users/${userId}/`)
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