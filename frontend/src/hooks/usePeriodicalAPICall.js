import axiosInstance from "../api/axiosSubscription";
import useAuth from "./useAuth";

const usePeriodicalAPICall = () => {
  const { auth } = useAuth();
  const userId = auth.userId;

  // If the user is not logged in, then
  // just exit the API call, returning an empty function
  const isLoggedIn = auth?.userId ? true : false;
  if (!isLoggedIn) return () => {};

  const currentNotification = sessionStorage?.getItem("msg")?.split(",");

  // Get notifications from the farmers the user is subscribed to
  const getNotification = async () => {
    await axiosInstance
      .get(`customer/${userId}/`)
      .then((res) => {
        // Store the notifications in the session storage
        if (res.data?.length > 0) {
          // At the beginning, the notification is undefined
          if (currentNotification === undefined) {
            sessionStorage.setItem("msg", res.data[0]);
          }
          // if the key "msg" exists but there is no message
          else if (currentNotification[0] === "") {
            sessionStorage.setItem("msg", res.data[0]);
          }
          // When there are already other messages
          else {
            // If the farmer has already published something,
            // then the message is not included again
            if (!currentNotification.includes(res.data[0])) {
              currentNotification.push(res.data);
              sessionStorage.setItem("msg", currentNotification);
            }
          }
        }
      })
      .catch((error) => {
        return error.response;
      });
  };
  return getNotification;
};

export default usePeriodicalAPICall;
