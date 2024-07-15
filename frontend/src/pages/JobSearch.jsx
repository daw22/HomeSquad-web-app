import { useState, useContext } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Button,
  MenuItem,
  TextField,
  Avatar,
  Rating,
  CircularProgress,
} from "@mui/material";
import { userContext } from "../context/userContext.jsx";
import instance from "../axios";
import JobDetailModal from "../components/jobDetailModal.jsx";

function JobSearch() {
  const ctx = useContext(userContext);
  const [minBudget, setMinBudget] = useState();
  const [category, setCategory] = useState();
  const [city, setCity] = useState();
  const [searchResults, setSearchResults] = useState([]);
  // searching state
  const [searching, setSearching] = useState(false);
  // modals state
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const[openBidModal, setOpenBidModal] = useState(false);
  const categories = [
    "Plumber",
    "Furniture",
    "Paint",
    "Gargening",
    "Electrician",
    "Cleanning",
    "Construction",
    "Satellite dish",
  ];

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
    if (!category || !city) {
      alert("Pick job category to search");
      return;
    }
    setSearching(true);
    const data = {};
    data["category"] = category;
    data["city"] = city;
    if (minBudget) data["minBudget"] = minBudget;
    const results = await instance.post("/search/jobs", data);
    setSearchResults(results.data);
    setSearching(false);
  }
  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: 3,
      }}
    >
      {selectedPost && (
          <JobDetailModal
            openDetailsModal={openDetailsModal}
            setOpenDetailsModal={setOpenDetailsModal}
            job={selectedPost}
          />
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "80%",
          margin: "0 auto",
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
        <TextField
          id="city-input"
          variant="outlined"
          placeholder="city"
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          id="first-name-input"
          variant="outlined"
          placeholder="min budget"
          onChange={(e) => setMinBudget(e.target.value)}
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
          {searchResults.length == 0 && (
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
          {searchResults.map((result, index) => {
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
                  width: "80%",
                  margin: "0 auto",
                  marginBottom: "10px",
                }}
              >
                <Box sx={{ display: "flex", gap: 3 }}>
                  <Avatar src={result.employer.profilePic} alt="" />
                  <Box>
                    <Typography variant="body1">
                      {result.employer.firstName} {result.employer.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {result.employer.address.city}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="body1"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 1, // Adjust the number of lines as needed
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {result.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Budget: ${result.budget}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 3 }}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSelectedPost(result);
                      setOpenDetailsModal(true);
                    }}
                  >
                    Job Details
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

export default JobSearch;
