import axiosInstance from "../api/axiosUsers";
import useAuth from "./useAuth";

/**
 * When the access token expires, the refresh token
 * is sent back to the backend to get a new access token.
 */
const useRefreshToken = () => {
  /**
   ** VARIABLES
   */
  const { setAuth } = useAuth();
  const refreshToken = localStorage.getItem("refresh_token");
  
  /**
   ** FUNCTIONS
   */
  const refresh = async () => {
    await axiosInstance
      .post("token/refresh/", {
        refresh: refreshToken,
      })
      .then((res) => {
        // Update the refresh_token
        localStorage.setItem("refresh_token", res.data.refresh);

        setAuth((prev) => {
          return {
            ...prev,
            // Get all user info, because you may have refreshed the page
            userId: res.data.id,
            accountType: res.data.account_type,
            accessToken: res.data.access, // Refresh the access token with the new one
          };
        });

        // Return the access token
        return res.data.access;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // If the refresh token is null then do nothing
  return refreshToken ? refresh : () => {};
};

export default useRefreshToken;
