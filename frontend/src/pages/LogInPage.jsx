import { useState, useContext } from "react";
import { Box, Typography, TextField, Button, ButtonGroup } from "@mui/material";
import { Login } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { userContext } from "../context/userContext";
import instance from '../axios.js';

function LogInPage() {
  const [role, setRole] = useState("homeowner");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const ctx = useContext(userContext);

  async function submitForm() {
    console.log("login as "+ role);
    setErrorMessage(null);
    if (!userName){
      setErrorMessage('username missing!');
      return;
    }
    if (!password){
      setErrorMessage('password missing!');
      return;
    }
    const data = {
      username: userName,
      password,
      role
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) 
    };
    const response = await instance.post(`/login/${role}`, data);
    ctx.setUser(response.data);
    ctx.setRole(role);
    navigate('/dashboard');
  }
  return (
    <Box
      sx={{
        width: "50%",
        minWidth: "300px",
        margin: "0 auto",
        background: "#a3a3a3",
        textAlign: "center",
        padding: 3,
        marginTop: 12,
        marginBottom: 4,
        color: "white",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography variant="h5">Sign In</Typography>
      <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
      <ButtonGroup
          variant="outlined"
          disableRipple={true}
          aria-label="roles button group"
        >
          <Button
            onClick={() => setRole("homeowner")}
            variant={role === "homeowner" ? "contained" : "outlined"}
            sx={{ color: "white" }}
          >
            Homeowner
          </Button>
          <Button
            onClick={() => setRole("worker")}
            variant={role === "worker" ? "contained" : "outlined"}
            sx={{ color: "white" }}
          >
            Worker
          </Button>
        </ButtonGroup>
      </Box>
      <TextField
        required
        id="username-input"
        label="UserName"
        variant="outlined"
        onChange={(e) => setUsername(e.target.value)}
        sx={{ m: 3, mb: 2, width: "80%" }}
      />
      <TextField
        required
        id="password-input"
        label="Password"
        variant="outlined"
        type="password"
        error={password.length < 6 && password.length !== 0}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ m: 1, mb: 2, width: "80%" }}
      />

      <Typography
        variant="body2"
        color="error"
        sx={{ display: errorMessage ? "block" : "none" }}
      >
        {errorMessage}
      </Typography>
      <Button
        variant="filed"
        onClick={submitForm}
        endIcon={<Login />}
        sx={{
          m: 1,
          backgroundColor: '#1976d2',
        }}
      >
        <span>Log In</span>
      </Button>
      <Typography
              variant="body2"
              onClick={()=> navigate('/signup')}
              sx={{
                cursor: "pointer",
                fontStyle: "italic",
                marginTop: '10px',
                "&:hover": {
                  color: '#1976d2',
                },
              }}
            >
              No Account? Sign up here
            </Typography>
    </Box>
  );
}

export default LogInPage;
