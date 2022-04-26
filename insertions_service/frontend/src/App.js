import React from "react";
import Insertions from "./components/Insertions";
import Navbar from "./components/Navbar";
import PublishInsertion from "./components/PublishInsertion";
import InsertionDetail from "./components/InsertionDetail";
import AddBoxes from "./components/AddBoxes";

// For managing the routing
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App(props) {
    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    {/* <Route path='/' exact /> */}
                    <Route path='insertions/' exact element={<Insertions />} />
                    <Route path='insertions/new' exact element={<PublishInsertion />} />
                    <Route path="insertions/:insertion_id" exact element={<InsertionDetail />} />
                    <Route path='insertions/:insertion_id/boxes' exact element={<AddBoxes />} />
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;
