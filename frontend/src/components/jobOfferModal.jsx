import { useState, useContext } from "react";
import { Box, Typography, TextField, Modal, Button } from "@mui/material";
import { userContext } from "../context/userContext.jsx";
import instance from "../axios.js";
import { storage } from "../firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function JobOfferModal({ currentWorker, openModal, setOpenModal }) {
  const ctx = useContext(userContext);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [image, setImage] = useState(null);
  const [deadline, setDeadline] = useState();
  const [errorMessage, setErrorMessage] = useState(null);

  async function offerJob() {
    // make a job offer for a worker
    const data = {};
    if (!(jobTitle && jobDescription && budget && deadline)) {
      alert("Fill the form to offer a job.");
      return;
    }
    if (image != null) {
      const imageRef = ref(
        storage,
        `joboffer/${image.name + ctx.user._id + new Date().toISOString()}`
      );
      const iResp = await uploadBytes(imageRef, image);
      const url = await getDownloadURL(iResp.ref);
      data["picture"] = url;
    }
    data["homeowner"] = ctx.user._id;
    data["worker"] = currentWorker._id;
    data["title"] = jobTitle;
    data["description"] = jobDescription;
    data["budget"] = budget;
    data["deadline"] = deadline;
    const resp = await instance.post("/api/job/offerjob", data);
    ctx.setUser(resp.data);
    setOpenModal(false);
  }
  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="modal-profile"
      aria-describedby="modal-for-worker-profile"
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
          background: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h5">
          Offer Job for {currentWorker.firstName}
        </Typography>
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
          sx={{ width: "80%" }}
        />
        <TextField
          id="job-budjet-input"
          required
          variant="outlined"
          placeholder="job budget in dollar"
          onChange={(e) => setBudget(e.target.value)}
          sx={{ width: "80%" }}
        />
        <TextField
          id="image-upload"
          type="file"
          placeholder="Upload Image"
          onChange={(event) => {
            const file = event.target.files[0];
            setImage(file);
            setErrorMessage(null); // Clear any previous error messages
          }}
          error={Boolean(errorMessage)} // Set error state if an error occurs
          helperText={errorMessage} // Display error message if present
          sx={{ width: "80%" }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker label="wait response until" onChange={(value)=> setDeadline(value)}/>
          </DemoContainer>
        </LocalizationProvider>
        <Box>
          <Button
            variant="contained"
            onClick={offerJob}
            sx={{
              p: 1,
              background: "#ff5555",
              margin: "0 auto",
              marginTop: "10px",
            }}
          >
            Offer Job
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default JobOfferModal;
