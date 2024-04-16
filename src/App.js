import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./views/Home";
import PerfumeMen from "./views/PerfumeMen";
import PerfumeWomen from "./views/PerfumeWommen";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/men" element={<PerfumeMen />}></Route>
        <Route path="/women" element={<PerfumeWomen />}></Route>
        <Route path="/women" element={<PerfumeWomenS />}></Route>
      </Routes>
    </div>
  );
}

export default App;
