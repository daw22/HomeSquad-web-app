import { useState, useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  ButtonGroup,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";

function SignUpPage() {
  const [role, setRole] = useState("homeowner");
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("Plumber");
  const [workDescription, setWorkDescription] = useState("");
  const navigate = useNavigate();
  const userData = useContext(userContext);

  function handleSelectChange(e){
    setCategory(e.target.value);
  }
  async function submitForm() {
    const data = {
      "username": userName,
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "password": password,
      "jobCategory": category,
      "jobDescription": workDescription 
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) 
    };
    const response = await fetch(`http://localhost:5000/signup/${role}`, options);
    //get newly created profile after signup
    const user = await response.json();
    user.role = role;
    console.log(user);
    userData.setUser(user);
    navigate('/login');
    console.log(user);
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
        marginTop: 4,
        marginBottom: 4,
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: '10px'
      }}
    >
      <Typography variant="h5">Sign Up For </Typography>
      <Typography color='primary' variant='h3'>HomeSquad</Typography>
      <Box sx={{ display: "flex", justifyContent: "center", padding: 2, marginTop: 4 }}>
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
            onClick={() => setRole("Worker")}
            variant={role === "Worker" ? "contained" : "outlined"}
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
        onChange={(e) => setUserName(e.target.value)}
        sx={{ m: 3, mb: 2, width: "80%" }}
      />
      <TextField
        required
        id="firstname-input"
        label="First Name"
        variant="outlined"
        onChange={(e) => setFirstName(e.target.value)}
        sx={{ m: 3, mb: 2, width: "80%" }}
      />
      <TextField
        required
        id="lastname-input"
        label="Last Name"
        variant="outlined"
        onChange={(e) => setLastName(e.target.value)}
        sx={{ m: 3, mb: 2, width: "80%" }}
      />
      <TextField
        required
        id="email-input"
        label="Email"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
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
      <TextField
        required
        id="verify-password-input"
        label="Verify Password"
        variant="outlined"
        type="password"
        error={password.length < 6 && password.length !== 0}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ m: 1, mb: 2, width: "80%" }}
      />
      {role === "Worker" && (
        <Box sx={{width: '80%', margin: '0 auto'}}>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={category}
              label="category"
              onChange={handleSelectChange}
            >
              <MenuItem value="Plumber">Plumber</MenuItem>
              <MenuItem value="Furniture">Furniture</MenuItem>
              <MenuItem value="Cleaning">Cleaning</MenuItem>
              <MenuItem value="Electrician">Electrician</MenuItem>
              <MenuItem value="Gardening">Gardening</MenuItem>
              <MenuItem value="Paint">Paint</MenuItem>
              <MenuItem value="Satellite_dish">Satellite Dish</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="work-description-input"
            label="Describe your service"
            variant="outlined"
            multiline
            maxRows={4}
            onChange={(e) => setWorkDescription(e.target.value)}
            sx={{ mt: 3, mb: 2, width: '100%'}}
          />
        </Box>
      )}
      <Button
        variant="filed"
        onClick={submitForm}
        sx={{
          m: 1,
          backgroundColor: "#1976d2",
        }}
      >
        <span>Sign Up</span>
      </Button>
      <Typography
        variant="body2"
        onClick={()=> navigate('/login')}
        sx={{
          cursor: "pointer",
          fontStyle: "italic",
          marginTop: "10px",
          "&:hover": {
            color: "#1976d2",
          },
        }}
      >
        Already have an account? Log In
      </Typography>
    </Box>
  );
}

export default SignUpPage;
