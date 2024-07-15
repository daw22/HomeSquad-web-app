import { useContext, useState } from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import instance from "../axios";
import { userContext } from "../context/userContext";
import BidList from "./bidList";

function JobPosting({ job, setJobPostings, setRefresh }) {
  const ctx = useContext(userContext);
  const [bids, setBids] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  console.log(job)
  function formatDate(date) {
    const dateObject = new Date(date); // Create a Date object from the string
    const year = dateObject.getFullYear().toString().padStart(4, "0"); // Add leading zeros for year
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed, add 1 and pad
    const day = dateObject.getDate().toString().padStart(2, "0"); // Pad day with leading zeros

    const hours = dateObject.getHours().toString().padStart(2, "0");
    const minutes = dateObject.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day} at ${hours}:${minutes}`;
  }

  async function deleteJobPosting(id) {
    const newProfile = await instance.delete(
      `/api/job/delete-jobPosting/${id}`
    );
    if (newProfile.data) {
      ctx.setUser(newProfile.data);
      setJobPostings(newProfile.data.jobPostings);
    }
  }

  async function getBids(jobId) {
    const jobBids = await instance.get(`/api/job/bids/${jobId}`);
    if (jobBids.status == 200){
      setBids(jobBids.data);
      setOpenModal(true);
    }
  }
  return (
    <Box
      sx={{
        width: "80%",
        padding: 3,
        shadow: 24,
        margin: "0 auto",
        marginTop: 5,
        border: "1px solid #cfcfcf",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        position: "relative",
      }}
    >
      {openModal && (
        <BidList
          openModal={openModal}
          setOpenModal={setOpenModal}
          bids={bids}
          setRefresh={setRefresh}
        />
      )}
      <IconButton
        sx={{
          position: "absolute",
          top: "20px",
          right: "20px",
        }}
      >
        <DeleteOutline
          color="error"
          onClick={() => deleteJobPosting(job._id)}
        />
      </IconButton>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="h6" color="primary">
          {job.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ({job.stillOpen ? "open for biding" : "closed"})
        </Typography>
      </Box>
      <Typography variant="body1" color="text.primary">
        {job.description}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Budget: ${job.budget}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Posted Date: {formatDate(job.createdAt)}
        </Typography>
        <Button
          variant="contained"
          disabled={job.bids.length == 0 ? true : false}
          onClick={()=> getBids(job._id)}
        >
          Bids {`(${job.bids.length})`}
        </Button>
      </Box>
    </Box>
  );
}

export default JobPosting;
