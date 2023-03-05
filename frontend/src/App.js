import React from "react";
// For managing the routing
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import SharedLayout from "./components/SharedLayout";
import ProtectedRouteInsertion from "./components/ProtectedRouteInsertion";

import Home from "./pages/Home";
// Import delle insertions
import Insertions from "./pages/Insertions";
import PublishInsertion from "./pages/PublishInsertion";
import EditInsertion from "./pages/EditInsertion.js";
import AddBoxes from "./pages/AddBoxes";
// Import dell'user profile
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import RequiredAuth from "./components/RequiredAuth";
import PersistLogin from "./components/PersistLogin";
import useAuth from "./hooks/useAuth";
import RequiredAuthNOROLE from "./components/RequiredAuthNOROLE"
// User advanced operation
import UserProfile from "./pages/UserProfile";
import FarmerProfile from "./pages/FarmerProfile";
import RiderProfile from "./pages/RiderProfile";
// Import carrello + pagamenti
import OrdersMainPage from "./pages/OrdersMainPage";
import PaymentPage from "./pages/PaymentPage";

import ProtectedRouteCart from "./components/ProtectedRouteCart";

import SeasonsCalendar from "./components/SeasonsCalendar";

function App(props) {
  // Authentication data from context storage
  const { auth } = useAuth();
  const isLoggedIn = auth?.userId ? true : false;

  //console.log("APP", auth);
  //console.log("LOG", isLoggedIn);
  //console.log("APPTOKEN", auth?.accessToken);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            {/* Whenever you are, if you are logged in
                then you will remain logged in after reloding the page */}
            <Route element={<PersistLogin />}>
              <Route index element={<Home />} />
              {/* For Insertions service */}
              <Route path="calendar/" exact element={<SeasonsCalendar />} />
              <Route path="insertions/" exact element={<Insertions />} />
              <Route
                path="insertions/new/"
                exact
                element={<PublishInsertion />}
              />
              <Route
                path="insertions/:insertion_id/edit/"
                exact
                element={<EditInsertion />}
              />
              <Route
                path="insertions/:insertion_id/"
                exact
                element={<ProtectedRouteInsertion />}
              />
              <Route
                path="insertions/:insertion_id/boxes/"
                exact
                element={<AddBoxes />}
              />
              <Route 
                path="farmer/profile/:farmer_id/" 
                exact
                element={<FarmerProfile />} 
              />
              <Route 
                path="rider/profile/:rider_id/" 
                exact
                element={<RiderProfile />} 
              />

              {/* For Users service */}
              {!isLoggedIn && (
                <Route>
                  <Route path="register/" exact element={<Registration />} />
                  <Route path="login/" exact element={<Login />} />
                </Route>
              )}

              {/* Temp Page for testing */ }
              <Route path="user/profile/payments" exact element = {<PaymentPage />} />
              {/* You can access these components only if you are logged in */}
              <Route element={<RequiredAuthNOROLE  />}>
                <Route path="user/profile/" exact element={<UserProfile />} />
                <Route path="user/profile/orders" exact element={<OrdersMainPage />} />
                {/* Access to personal shopping cart */}
                <Route
                  path="user/cart/"
                  exact
                  element={<ProtectedRouteCart />}
                />
                {/*Access to payment page*/}
                <Route path="user/cart/payment" exact element={<PaymentPage />}></Route>
              </Route>
            </Route>

            {/* Match all the other paths */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
