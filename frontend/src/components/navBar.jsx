import { useContext } from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import FlexBetween from "./flexBetween.jsx";
import { userContext } from "../context/userContext.jsx";
import { useNavigate } from "react-router-dom";
import instance from "../axios.js";

function NavBar() {
  const status = useContext(userContext);
  const navigate = useNavigate();

  async function logout() {
    const response = await instance.get("/logout");
    if (!(response.status == 200)) return;
    status.setUser(null);
    navigate("/");
  }
  return (
    <AppBar sx={{ position: "static" }}>
      <Toolbar>
        <FlexBetween width="100%">
          {/* Left side */}
          <Box>
            <Typography variant="h5" onClick={() => {
                if (status.user) navigate("/dashboard");
                else navigate("/")
              }
              }>
              HomeSquad
            </Typography>
          </Box>
          {/* right side */}

          {!status.user ? (
            <Box width="30%" display="flex" justifyContent="space-around">
              <Button
                variant="text"
                onClick={() => navigate("/login")}
                sx={{ color: "white" }}
              >
                Log In
              </Button>
              <Button
                variant="text"
                onClick={() => navigate("/signup")}
                sx={{ color: "white" }}
              >
                Sign Up
              </Button>
            </Box>
          ) : (
            <Box>
              <Button variant="text" onClick={()=> navigate('/dashboard')} sx={{ color: "white" }}>
                Home
              </Button>
              <Button variant="text" onClick={()=> navigate('/profile')} sx={{ color: "white" }}>
                Profile
              </Button>
              <Button variant="text"  onClick={logout} sx={{ color: "white" }}>
                Log Out
              </Button>
            </Box>
          )}
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
