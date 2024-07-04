import { useState, useContext } from "react";
import {
  Button,
  Avatar,
  Box,
  Typography,
  Icon,
  IconButton,
} from "@mui/material";
import { Edit } from '@mui/icons-material';
import { userContext } from "../context/userContext.jsx";
import EditModal from "../components/editModal.jsx";

function ProfilePage() {
  const ctx = useContext(userContext);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  console.log(ctx.user);

  function launchEditor(data) {
    setModalData(data);
    setOpenModal(true);
  }
  const InfoBox = ({ data }) => {
    return (
      <Box
        sx={{
          border: "1px solid #cfcfcf",
          padding: "10px 20px",
          margin: "30px 0",
          width: "50%",
          position: "relative",
        }}
      >
        <Typography variant="h5" color="text.primary">
          {data.title}
        </Typography>

        {data.items.map((item) => {
          return (
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
              key={item.title}
            >
              {item.title && (
                <Typography variant="h6" color="text.secondary">
                  {item.title}:
                </Typography>
              )}
              {item.value && (
                <Typography variant="body1" color="text.secondary">
                  {item.value}
                </Typography>
              )}
            </Box>
          );
        })}
        <Icon sx={{ position: "absolute", top: "10px", right: "30px" }}>
          <IconButton
            onClick={() => launchEditor(data)}
            sx={{ width: "10px", height: "10px" }}
          >
            <Edit />
          </IconButton>
        </Icon>
      </Box>
    );
  };
  return (
    <Box
      sx={{
        width: "100%",
        padding: 2,
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      {/** Modal */}
      {openModal && (
        <EditModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          data={modalData}
        />
      )}
      {/** left side */}
      <Box
        sx={{
          width: "30%",
          borderRight: "4px solid #cfcfcf",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100px",
              height: "100px",
              margin: '0 auto',
              marginBottom: '20px'
          }}
        >
          <Avatar
            sx={{
              width: "100px",
              height: "100px",
              marginBottom: 2,
            }}
            src={ctx.user.proilePic}
            alt={ctx.user.firstName}
          />
          <IconButton
            sx={{
              position: "absolute",
              bottom: -10
            }}
            onClick={() => {
              
            }}
          >
            <Edit />
          </IconButton>
        </Box>
        <Typography variant="h6" sx={{ color: "primary", textAlign: "center" }}>
          {ctx.user.firstName} {ctx.user.lastName}
        </Typography>
        <Box
          sx={{
            marginTop: "50px",
            textAlign: "center",
          }}
        >
          <Button variant="text" sx={{ width: "80%" }}>
            Hire History
          </Button>
          {ctx.role === "worker" && (
            <>
              <Button variant="text" sx={{ width: "80%" }}>
                Job Offers
              </Button>
            </>
          )}
          {ctx.role === "homeowner" && (
            <>
              <Button variant="text" sx={{ width: "80%" }}>
                Offered Jobs
              </Button>
              <Button variant="text" sx={{ width: "80%" }}>
                Favorite Workers
              </Button>
              <Button variant="text" sx={{ width: "80%" }}>
                Posted Jobs
              </Button>
            </>
          )}
        </Box>
      </Box>
      {/** right side */}
      <Box
        sx={{
          width: "70%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "30px",
        }}
      >
        <InfoBox
          data={{
            title: "Address",
            items: [
              {
                title: "country",
                value: ctx.user.address ? ctx.user.address.country : "",
              },
              {
                title: "city",
                value: ctx.user.address ? ctx.user.address.city : "",
              },
              {
                title: "street",
                value: ctx.user.address ? ctx.user.address.streetName : "",
              },
              {
                title: "houseNumber",
                value: ctx.user.address ? ctx.user.address.houseNumber : "",
              },
              {
                title: "GeoLocation",
                value: ctx.user.address
                  ? ctx.user.address.location.coordinates
                  : "",
              },
            ],
          }}
        />
        {ctx.role === "worker" && (
          <InfoBox
            data={{
              title: "Job Description",
              items: [
                { title: "Category", value: ctx.user.jobCategory },
                { title: "Detail", value: ctx.user.jobDescription },
              ],
            }}
          />
        )}
        <InfoBox
          data={{
            title: "About Me",
            items: [{ title: "aboutme", value: ctx.user.aboutYourSelf }],
          }}
        />
      </Box>
    </Box>
  );
}

export default ProfilePage;
