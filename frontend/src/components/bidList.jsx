import { useState } from "react";
import { Box, Modal, Typography, Button } from "@mui/material";
import instance from "../axios";

const BidCard = ({bid, setOpenModal, setRefresh}) => {
    async function awardJob() {
        const resp = await instance.get(`/api/job/awardjob/${bid.jobPosting}/${bid._id}/${bid.worker._id}`);
        if (resp.status == 200){
            setOpenModal(false);
            setRefresh(0);
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
      <Typography variant="h6">
        {bid.worker.firstName} {bid.worker.lastName}
      </Typography>
      <Typography variant="body2">Price: {bid.bidPrice}</Typography>
      <Typography variant="body1">{bid.message}</Typography>
      <Button
        variant="contained"
        color="success"
        sx={{ width: "fit-content", marginLeft: "auto" }}
        onClick={awardJob}
      >
        Award Job
      </Button>
    </Box>
  );
};
function BidList({ openModal, setOpenModal, bids, setRefresh }) {
    console.log(bids)
  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
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
        {bids.map((bid)=>{
            return (
                <BidCard bid={bid} setOpenModal={setOpenModal} setRefresh={setRefresh} key={bid._id}/>
            )
        })}
      </Box>
    </Modal>
  );
}

export default BidList;
