import React from "react";
// For managing the routing
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Insertions from "./pages/Insertions";
import PublishInsertion from "./pages/PublishInsertion";
import AddBoxes from "./pages/AddBoxes";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SharedLayout from "./components/SharedLayout";
import ProtectedRouteInsertion from "./components/ProtectedRouteInsertion";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Logout from "./components/Logout";

function App(props) {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            
            {/* For Insertions service */}
            <Route index element={<Home />} />
            <Route path="insertions/" exact element={<Insertions />} />
            <Route path="insertions/new/" exact element={<PublishInsertion />} />
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

            {/* For Users service */}
            <Route path="register/" exact element={<Registration />} />
            <Route path="login/" exact element={<Login />} />
            <Route path="logout/" exact element={<Logout />} />

            {/* Match all the other paths */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
