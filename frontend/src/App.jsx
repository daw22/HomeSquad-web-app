import React, { useEffect, useState, useContext } from "react";
import { userContext } from "./context/userContext.jsx";
import Layout from "./pages/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import LogInPage from "./pages/LogInPage.jsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PrivateRoutes from "./components/privateRoutes.jsx";

function App() {
  const [message, setMessage] = useState("");
  const status = useContext(userContext);

  useEffect(() => {
    fetch("https://api-homesquad.onrender.com/api/status")
      .then((response) => response.json())
      .then((data) => setMessage(data.status));
  }, []);

  function logInOut(e) {
    status.setLogedIn(!status.logedIn);
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route element={<PrivateRoutes />}>
            <Route element={<Layout />}>
              <Route path="./profile" element={<ProfilePage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
