import { useState, useContext } from "react";
import {
  Modal,
  Typography,
  Box,
  Button,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import instance from "../axios.js";
import {storage} from "../firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { userContext } from "../context/userContext.jsx";

function ActionModal({ openModal, setOpenModal }) {
  const ctx = useContext(userContext);
  const [category, setCategory] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [budjet, setBudjet] = useState(100);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const categories = [
    "Plumber",
    "Furniture",
    "Paint",
    "Gargening",
    "Cleanning",
    "Construction",
    "Satellite dish",
  ];
  function changeCategory(e) {
    setCategory(e.target.value);
  }
  async function postJob(){
    const data = {};
    if (!(category && jobTitle && jobDescription && budjet)){
      alert('fill in the form first.');
      return;
    }
    if (selectedFile != null){
      const imageRef = ref(storage,  `jobpost/${selectedFile.name + ctx.user._id + new Date().toISOString()}`);
      const iResp = await uploadBytes(imageRef, selectedFile);
      const url = await getDownloadURL(iResp.ref);
      data['picture'] = url;
    }
    if (category) data['jobCategory'] = category;
    if (jobTitle) data['jobTitle'] = jobTitle;
    if (jobDescription) data['jobDescription'] = jobDescription;
    if (budjet) data['budjet'] = budjet;
    const resp = await instance.post('/api/job/postjob', data);
    //console.log('post resp:', resp.data);
    setOpenModal(false);
    ctx.setUser(resp.data);
  }
  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="modal-post-job"
      aria-describedby="modal-post-job-fields"
    >
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -20%)",
          minWidth: 400,
          boxShadow: 24,
          p: 4,
          background: "#a3a3a3",
          textAlign: "center",
        }}
      >
          <>
            <Typography variant="h6" >Post Job</Typography>
            <FormControl sx={{ width: "80%", margin: "5px 0" }}>
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
            <Box>
              <TextField
                id="job-title-input"
                required
                variant="outlined"
                placeholder="job title"
                onChange={(e) => setJobTitle(e.target.value)}
                sx={{
                  margin: "5px 0",
                  width: "80%",
                }}
              />
              <TextField
                id="job-description-input"
                required
                variant="outlined"
                multiline
                maxRows={4}
                placeholder="job description"
                onChange={(e) => setJobDescription(e.target.value)}
                sx={{
                  margin: "5px 0",
                  width: "80%",
                }}
              />
              <TextField
                id="job-budjet-input"
                required
                variant="outlined"
                placeholder="job budget in dollar"
                onChange={(e) => setBudjet(e.target.value)}
                sx={{
                  margin: "5px 0",
                  width: "80%",
                }}
              />
              <TextField
                id="image-upload"
                type="file"
                placeholder='Upload Image'
                onChange={(event) => {
                  const file = event.target.files[0];
                  setSelectedFile(file);
                  setErrorMessage(null); // Clear any previous error messages
                }}
                error={Boolean(errorMessage)} // Set error state if an error occurs
                helperText={errorMessage} // Display error message if present
                sx={{
                  margin: "5px 0"
                }}
              />
            </Box>
            <Button
              variant="contained"
              onClick={postJob}
              sx={{
                p: 1,
                background: "#ff5555",
                margin: "0 auto",
                marginTop: "10px",
              }}
            >
              Post
            </Button>
          </>
      </Box>
    </Modal>
  );
}

export default ActionModal;
