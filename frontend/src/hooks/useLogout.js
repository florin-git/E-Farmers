import axiosInstance from "../api/axiosUsers";
import useAuth from "./useAuth";

const useLogout = () => {
  /**
   ** VARIABLES
   */

  const { setAuth } = useAuth();
  const refreshToken = localStorage.getItem("refresh_token");

  /**
   ** FUNCTIONS
   */
  const logout = async () => {
    try {
      await axiosInstance.post("logout/blacklist/", {
        refresh_token: refreshToken,
      });
    } catch (error) {
      console.log(error);
    } finally {
      // The order is important
      axiosInstance.defaults.headers["Authorization"] = null;
      localStorage.removeItem("refresh_token");
      /**
       * You must reset the authentication variables at the end,
       * because otherwise you will do a refresh of the page
       * and so the refresh token will not be removed from 
       * the local storage.
       */
      setAuth({});
    }
  };

  return logout;
};

export default useLogout;
