import React from "react";
// For managing the routing
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NotFound from "./pages/NotFound";
import SharedLayout from "./components/SharedLayout";
import ProtectedRouteInsertion from "./components/ProtectedRouteInsertion";

import Home from "./pages/Home";

import Insertions from "./pages/Insertions";
import PublishInsertion from "./pages/PublishInsertion";
import EditInsertion from "./pages/EditInsertion.js";
import AddBoxes from "./pages/AddBoxes";

import Registration from "./pages/Registration";
import Login from "./pages/Login";
import RequiredAuth from "./components/RequiredAuth";
import PersistLogin from "./components/PersistLogin";
import useAuth from "./hooks/useAuth";

import FarmerUpdate from "./pages/FarmerUpdate";
import RiderUpdate from "./pages/RiderUpdate";
import UserProfile from "./pages/UserProfile";
import FarmerProfile from "./pages/FarmerProfile";
import RiderProfile from "./pages/RiderProfile";


import ShoppingCart from "./pages/ShoppingCart";
import OrdersMainPage from "./pages/OrdersMainPage";
import TempPayPage from "./pages/TempPayPage";
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
              <Route path="farmer/profile/" exact element={<FarmerProfile />} />

              {/* For Users service */}
              {!isLoggedIn && (
                <Route>
                  <Route path="register/" exact element={<Registration />} />
                  <Route path="login/" exact element={<Login />} />
                </Route>
              )}

              {/* Temp Page for testing */ }
              <Route path="user/profile/payments" exact element = {<TempPayPage />} />
              {/* You can access these components only if you are logged in */}
              <Route element={<RequiredAuth />}>
                <Route path="user/profile/" exact element={<UserProfile />} />
                <Route path="user/profile/farmer_update" exact element={<FarmerUpdate />} />
                <Route path="user/profile/rider_update" exact element={<RiderUpdate />} />
                <Route path="farmer/profile" exact element={<FarmerProfile />} />
                <Route path="rider/profile" exact element={<RiderProfile />} />
                <Route path="user/profile/orders" exact element={<OrdersMainPage />} />
                {/* Access to personal shopping cart */}
                <Route path="cart/" exact element={<ShoppingCart />} />
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
