import { useState, useContext } from "react";
import { userContext } from "../context/userContext";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import instance from "../axios.js";

function JobOffer({ offer, jobOffers, setJobOffers }) {
  const ctx = useContext(userContext);
  const [render, setRender] = useState(0);
  async function deleteJobOffer(id) {
    if (ctx.role != "homeowner") return;
    const resp = await instance.delete(`api/job/delete-jobOffer/${id}`);
    if (resp.status == 201) {
      ctx.setUser(resp.data);
      setJobOffers(resp.data.jobOffers);
    }
  }
  async function respond(id, response) {
    if (ctx.role != "worker") return;
    response = response == 1 ? "ACCEPTED" : "DECLINED";
    const resp = await instance.patch(`/api/job/offer-response/${id}/${response}`);
    if (resp.status == 201){
        let offers = jobOffers;
        offers.map((offer)=>{
            if (offer._id == id) {
                offer.status = response;
            };
        })
        setJobOffers(offers);
        setTimeout(()=> {setRender((prev)=> prev + 1)}, 1000);
    }
  }
  return (
    <Box
      sx={{
        width: "80%",
        margin: "0 auto",
        marginTop: 5,
        border: "1px solid #cfcfcf",
        padding: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        position: "relative",
      }}
    >
      {ctx.role === "homeowner" && (
        <IconButton
          sx={{
            position: "absolute",
            top: "20px",
            right: "20px",
          }}
        >
          <DeleteOutline
            color="error"
            onClick={() => deleteJobOffer(offer._id)}
          />
        </IconButton>
      )}
      <Typography variant="h6">{offer.title}</Typography>
      <Typography variant="body1">{offer.description}</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {ctx.role == "worker" && (
          <Typography variant="body2" color="text.secondary">
            Offer From: {offer.homeowner.firstName} {offer.homeowner.lastName}
          </Typography>
        )}
        {ctx.role == "homeowner" && (
          <Typography variant="body2" color="text.secondary">
            Offer For: {offer.worker.firstName} {offer.worker.lastName}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          Budget: ${offer.budget}
        </Typography>
        {offer.deadline && (
          <Typography variant="body2" color="text.secondary">
            Expires at: {offer.deadline}
          </Typography>
        )}
        <Typography variant='body2' color="text.secondary">
            status: {offer.status}
        </Typography>
      </Box>
      {ctx.role == "worker" && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={() => respond(offer._id, 1)}
          >
            Accept Offer
          </Button>
          <Button variant="contained" color="error" onClick={() => respond(offer._id, 0)}>
            Decline Offer
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default JobOffer;
