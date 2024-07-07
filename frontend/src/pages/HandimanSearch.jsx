import { useState, useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Rating,
  CircularProgress,
} from "@mui/material";
import ProfileModal from "../components/profileModal.jsx";
import { userContext } from "../context/userContext.jsx";
import instance from "../axios";
import { useNavigate } from "react-router-dom";
import JobOfferModal from "../components/jobOfferModal.jsx";

function HandimanSearch() {
  const ctx = useContext(userContext);
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [radius, setRadius] = useState({ radius: "", location: [] });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [results, setResults] = useState([]);
  // search progress state
  const [searching, setSearching] = useState(false);
  // modal state
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openOfferModal, setOpenOfferModal] = useState(false);
  const [currentWorker, setCurrentWorker] = useState(null);
  const categories = [
    "Plumber",
    "Furniture",
    "Paint",
    "Gardening",
    "Electrician",
    "Cleanning",
    "Construction",
    "Satellite dish",
  ];
  const radiuses = [1, 2, 3, 4, 5, 10];

  function changeCategory(e) {
    setCategory(e.target.value);
  }
  function changeRadius(e) {
    const value = e.target.value;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = [position.coords.longitude, position.coords.latitude];
        setRadius({ radius: value, location: loc });
      },
      (error) => {
        alert("Couldn't get your location.");
        return;
      }
    );
  }
  async function search() {
    setSearching(true);
    const filter = {
      firstName,
      lastName,
      radius,
      category,
    };
    console.log("filter:", filter);
    const response = await instance.post("/search/handiman", filter);
    setResults(response.data);
    setSearching(false);
    console.log("resp:", response.data);
    console.log(results);
  }

  return (
    <Box
      sx={{
        width: "80%",
        margin: "0 auto",
        marginTop: "20px",
        minHeight: "100vh",
      }}
    >
      {/** modal for profile and job offer */}
      {currentWorker && (
        <>
          <ProfileModal
            openModal={openProfileModal}
            setOpenModal={setOpenProfileModal}
            currentWorker={currentWorker}
          />
          <JobOfferModal
            openModal={openOfferModal}
            setOpenModal={setOpenOfferModal}
            currentWorker={currentWorker}
          />
        </>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {/** filter by category */}
        <FormControl sx={{ width: "20%" }}>
          <InputLabel id="select-category">Category</InputLabel>
          <Select
            labelId="select-category"
            value={category}
            label="Category"
            onChange={changeCategory}
          >
            {categories.map((cat) => {
              return (
                <MenuItem value={cat.replace(" ", "_")} key={cat}>
                  {cat}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {/**filter by proximity */}
        <FormControl sx={{ width: "20%" }}>
          <InputLabel id="select-radius">Near Me</InputLabel>
          <Select
            labelId="select-radius"
            value={radius.radius}
            label="Km Radius"
            onChange={changeRadius}
          >
            {radiuses.map((rad) => {
              return (
                <MenuItem value={rad} key={rad}>
                  {rad} Km Radius
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <TextField
          id="first-name-input"
          variant="outlined"
          placeholder="first name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          id="last-name-input"
          variant="outlined"
          placeholder="last name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <Button variant="contained" onClick={() => search()} sx={{ p: 1.5 }}>
          Search
        </Button>
      </Box>
      {searching ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "40vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ marginTop: "40px" }}>
          {results.length == 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "40vh",
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Nothing Found
              </Typography>
            </Box>
          )}
          {results.map((result, index) => {
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  background: "#cfcfcf",
                  marginTop: "5px",
                }}
              >
                <Box sx={{ display: "flex", gap: 3 }}>
                  <Avatar src={result.profilePic} alt="" />
                  <Box>
                    <Typography variant="body1">
                      {result.firstName} {result.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {result.jobCategory}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Rating
                    name="read-only"
                    value={result.rating}
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                  />
                  <Typography variant="body2" color="text.secondary">
                    completed: {result.numberOfJobsCompleted}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 3 }}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setOpenProfileModal(true);
                      setCurrentWorker(result);
                    }}
                  >
                    Profile
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      if (!ctx.user) {
                        navigate("/login");
                        return;
                      }
                      setOpenOfferModal(true);
                      setCurrentWorker(result);
                    }}
                  >
                    Offer Job
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}

export default HandimanSearch;
