import { useState, useContext } from "react";
import { Button, Avatar, Box, Typography } from "@mui/material";
import { userContext } from '../context/userContext.jsx';
function ProfilePage() {
  const user = useContext(userContext).user;
  return (
    <Box
      sx={{
        width: "100%",
        padding: 2,
        display: "flex",
        justifyContent: "center",
        minHeight: '100vh',
        border: '1px solid red'
      }}
    >
      {/** left side */}
      <Box
        sx={{
          width: "30%",
          borderRight: "4px solid #cfcfcf",
        }}
      >
        <Avatar
          sx={{
            width: "100px",
            height: "100px",
            margin: "0 auto",
            marginBottom: 2,
          }}
          src=""
          alt=""
        />
        <Typography variant="h6" sx={{ color: 'primary', textAlign: 'center' }}>
          {user.firstName} {user.lastName}
        </Typography>
        <Box
        sx={{
            marginTop: '50px',
            textAlign: 'center'
        }}>
            <Button variant='text' sx={{width: '80%'}}>Address</Button>
            <Button variant='text' sx={{width: '80%'}}>Hires</Button>
            {user.role === 'worker' && <>
                <Button variant='text' sx={{width: '80%'}}>Job Offers</Button>
                <Button variant='text' sx={{width: '80%'}}>Job Description</Button>
            </>}
            {user.role === 'homeowner' && <>
                <Button variant='text' sx={{width: '80%'}}>Offered Jobs</Button>
                <Button variant='text' sx={{width: '80%'}}>Favorite Workers</Button>
                <Button variant='text' sx={{width: '80%'}}>Posted Jobs</Button>
            </>}
            <Button variant='text' sx={{width: '80%'}}>Bio</Button>
        </Box>
        
      </Box>
      {/** right side */}
      <Box
      sx={{
        width: '70%'
      }}></Box>
    </Box>
  );
}

export default ProfilePage;
