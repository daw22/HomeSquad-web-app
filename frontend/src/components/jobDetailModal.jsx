import { useState, useContext } from "react";
import { Box, Modal, Typography, Button, TextField } from "@mui/material";
import { userContext } from "../context/userContext";
import instance from "../axios";
import { useNavigate} from "react-router-dom";

function JobDetailModal({ openDetailsModal, setOpenDetailsModal, job }) {
  const ctx = useContext(userContext);
  const navigate = useNavigate();
  const [showImage, setShowImage] = useState(false);
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidPrice, setBidPrice] = useState(job.budget);
  const [bidMessage, setBidMessage] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  async function submitBid() {
    setButtonDisabled(true);
    if (!ctx.user){
        navigate('/login');
    }
    const data = {};
    data['bidPrice'] = bidPrice;
    data['jobPostId'] = job._id;
    data['message'] = bidMessage;
    await instance.post('api/job/bid', data);
    setShowBidForm(false);
  }
  function formatDate(date) {
    const dateObject = new Date(date); // Create a Date object from the string
    const year = dateObject.getFullYear().toString().padStart(4, "0"); // Add leading zeros for year
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed, add 1 and pad
    const day = dateObject.getDate().toString().padStart(2, "0"); // Pad day with leading zeros

    const hours = dateObject.getHours().toString().padStart(2, "0");
    const minutes = dateObject.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day} at ${hours}:${minutes}`;
  }

  function closeModal() {
    if (showImage) {
      setShowImage(false);
    } else if (showBidForm) {
      setShowBidForm(false);
    } else {
      setOpenDetailsModal(false);
    }
  }
  return (
    <Modal
      open={openDetailsModal}
      onClose={closeModal}
      aria-labelledby="modal-job-detail"
      aria-describedby="modal-for-job-detail"
    >
      {showImage ? (
        <Box
          component="img"
          alt="Job Picture"
          src={job.picture}
          sx={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -40%)",
            width: "40%",
          }}
        ></Box>
      ) : (
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -20%)",
            minWidth: 600,
            boxShadow: 24,
            p: 4,
            background: "#ffffff",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {showBidForm ? (
            <>
              <Typography variant="h6" sx={{ m: "0 auto" }}>
                Make a Bid
              </Typography>
              <TextField
                variant="outlined"
                placeholder={`bid price: ${job.budget}`}
                onChange={(e) => setBidPrice(e.target.value)}
                sx={{
                  width: "80%",
                  margin: '0 auto'
                }}
              />
              <TextField
                variant="outlined"
                multiline
                maxRows={4}
                placeholder="message"
                onChange={(e) => setBidMessage(e.target.value)}
                sx={{ width: "80%", margin: '0 auto' }}
              />
              <Button 
              variant='contained'
              onClick={submitBid}
              disabled={buttonDisabled}
              sx={{
                margin: '0 auto',
              }}
              >
                Submit Bid
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h6" sx={{ m: "0 auto" }}>
                {job.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ m: "0 auto" }}
              >
                Posted By: {job.employer.firstName} {job.employer.lastName}
              </Typography>
              <Typography variant="body1">{job.description}</Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Posted Date: {formatDate(job.createdAt)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Budget: ${job.budget}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {job.category}
                </Typography>
              </Box>
              {job.picture && (
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ m: "0 auto", cursor: "pointer" }}
                  onClick={() => {
                    setShowImage(true);
                  }}
                >
                  Picture attached
                </Typography>
              )}
              <Button
                variant="contained"
                sx={{ width: "fit-content", m: "0 auto", mt: 3 }}
                onClick={() => {
                  setShowBidForm(true);
                }}
              >
                Bid
              </Button>
            </>
          )}
        </Box>
      )}
    </Modal>
  );
}

export default JobDetailModal;
