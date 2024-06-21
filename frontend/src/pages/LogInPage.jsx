import { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Login } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';

function LogInPage() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();
  
  function submitForm() {}
  return (
    <Box
      sx={{
        width: "50%",
        minWidth: "300px",
        margin: "0 auto",
        background: "#a3a3a3",
        textAlign: "center",
        padding: 3,
        marginTop: 4,
        marginBottom: 4,
        color: "white",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography variant="h5">Sign In</Typography>
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
        sx={{ display: showErrorMessage ? "block" : "none" }}
      >
        Invalid username or password
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
