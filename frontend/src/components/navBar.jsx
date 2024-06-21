import { useContext } from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import FlexBetween from "./flexBetween.jsx";
import { userContext } from "../context/userContext.jsx";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const status = useContext(userContext);
  const navigate = useNavigate();
  return (
    <AppBar sx={{ position: "static" }}>
      <Toolbar>
        <FlexBetween width="100%">
          {/* Left side */}
          <Box>
            <Typography variant="h5">HomeSquad</Typography>
          </Box>
          {/* right side */}
          {!status.logedIn && (
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
              onClick={()=> navigate('/signup')}
              sx={{ color: "white" }}>
                Sign Up
              </Button>
            </Box>
          )}
          {status.logedIn && (
            <Box width="30%" display="flex" justifyContent="space-around">
              <Button vatiant="text" sx={{ color: "white" }}>
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
