import React from "react";
// For managing the routing
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Insertions from "./components/Insertions";
import PublishInsertion from "./components/PublishInsertion";
import AddBoxes from "./components/AddBoxes";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import SharedLayout from "./components/SharedLayout";
import ProtectedRouteInsertion from "./components/ProtectedRouteInsertion";
import Registration from "./pages/Registration";

function App(props) {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            {/* All the links are nested here */}
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
            {/* Match all the other paths */}


            <Route path="register/" exact element={<Registration />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
