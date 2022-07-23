import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  /**
   * Every time you reload a page,
   * a request for refreshing the JWT token will be made,
   * hence all the user info will be also retrieved.
   */
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    // We run the above function if accessToken was null
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, [auth, refresh]);

  return <div>{isLoading ? <p>Loading...</p> : <Outlet />}</div>;
};

export default PersistLogin