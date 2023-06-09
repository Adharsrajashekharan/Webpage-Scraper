import React from "react";
import { Route, Routes } from "react-router-dom";
import ResultsPage from "../pages/ResultsPage";
import Urlpage from "../pages/Urlpage";

const RT = () => {
  return (
    <div>
      <Routes>
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/" element={<Urlpage />} />
      </Routes>
    </div>
  );
};

export default RT;
