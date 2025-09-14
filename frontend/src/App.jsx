import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Home from "./Home";
import AgeStep from "./profileSteps/AgeStep";
import MaritalStep from "./profileSteps/MaritalStep";
import InvestStep from "./profileSteps/InvestStep";
import WhichInvestStep from "./profileSteps/WhichInvestStep";
import MarketStep from "./profileSteps/MarketStep";
import Dashboard from "./profileSteps/Dashboard";

function App() {
  // TODO: Replace this with actual user UID from auth context or props
  const uid = window.localStorage.getItem("uid") || "demo-uid";
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile-age" element={<AgeStep uid={uid} />} />
        <Route path="/profile-marital" element={<MaritalStep uid={uid} />} />
        <Route path="/profile-invest" element={<InvestStep uid={uid} />} />
        <Route
          path="/profile-which-invest"
          element={<WhichInvestStep uid={uid} />}
        />
        <Route path="/profile-market" element={<MarketStep uid={uid} />} />
      </Routes>
    </Router>
  );
}

export default App;
