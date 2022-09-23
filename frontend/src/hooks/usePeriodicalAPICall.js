import axiosInstance from "../api/axiosSubscription";
import useAuth from "./useAuth";

const usePeriodicalAPICall = () => {
  const { auth } = useAuth();
  const userId = auth.userId;

  // If the user is not logged in, then
  // just exit the API call, returning an empty function
  const isLoggedIn = auth?.userId ? true : false;
  if (!isLoggedIn) 
    return () => {}

  const currentNotification = sessionStorage.getItem("msg");

  // Get notifications from the farmers the user is subscribed to 
  const getNotification = async () => {
    await axiosInstance
      .get(`customer/${userId}/`)
      .then((res) => {

        // Store the notifications in the session storage
        if (res.data?.length > 0) {
          if ((currentNotification === "") | (currentNotification === null)) {
            sessionStorage.setItem("msg", res.data);
          } else
            sessionStorage.setItem(
              "msg",
              currentNotification + ", " + res.data
            );
        }
      })
      .catch((error) => {
        return error.response;
      });
  };
  return getNotification;
};

export default usePeriodicalAPICall;
