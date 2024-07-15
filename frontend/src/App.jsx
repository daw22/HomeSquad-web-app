import React, { useEffect, useState, useContext } from "react";
import { userContext } from "./context/userContext.jsx";
import Layout from "./pages/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import LogInPage from "./pages/LogInPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PrivateRoutes from "./components/privateRoutes.jsx";
import HandimanSearch from "./pages/HandimanSearch.jsx";
import JobSearch from "./pages/JobSearch.jsx";

function App() {
  const [message, setMessage] = useState("");
  const status = useContext(userContext);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<Layout />}>
            <Route path="/login" element={<LogInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/handiman" element={<HandimanSearch />} />
            <Route path="/jobs" element={<JobSearch />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
