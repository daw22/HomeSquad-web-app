import { useState, useContext } from "react";
import { userContext } from "../context/userContext.jsx";
import {
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import ActionModal from "../components/actionModal.jsx";
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const ctx = useContext(userContext);
  const [openModal, setOpenModal] = useState(false);

  const ActionCard = ({ image, title, description, btnTxt, action }) => {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia sx={{ height: 200 }} image={image} title={title} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            sx={{ margin: "0 auto" }}
            variant="contained"
            onClick={() => {
              if (action == 'post') setOpenModal(true);
              if (action == 'offer') navigate('/handiman');
            }}
          >
            {btnTxt}
          </Button>
        </CardActions>
      </Card>
    );
  };
  
  return (
    <Box
      sx={{
        minHeight: "90vh",
        width: "80%",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <ActionModal
      openModal={openModal}
      setOpenModal={setOpenModal}
      />
      {ctx.role === "homeowner" && (
        <>
          <ActionCard
            title="Post Job"
            image="/hiring.jpg"
            description="Post work you need to be done and chosse from skilled handimen to get it done."
            btnTxt="Post Job"
            action="post"
          />
          <ActionCard
            title="Offer Job"
            image="/job-offer.jpg"
            description="Offer work you need to be done for a handyman you like."
            btnTxt="Offer Job"
            action='offer'
          />
        </>
      )}
      {ctx.role === "worker" && (
        <>
          <Box>Post a Job</Box>
          <Box>Post a Job</Box>
        </>
      )}
    </Box>
  );
}

export default Dashboard;
