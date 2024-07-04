import { useState, useContext, useEffect } from "react";
import { Modal, TextField, Typography, Button, Box } from "@mui/material";
import { userContext } from "../context/userContext.jsx";
import instance from "../axios.js";

function EditModal({ data, openModal, setOpenModal }) {
  const ctx = useContext(userContext);
  const [editData, setEditData] = useState({});
  const initState = { title: data.title };
  data.items.forEach(item=> initState[item.title] = item.value );
  console.log('edit:', editData);
  useEffect(()=>{
    setEditData(initState);
    //console.log("initState:", editData);
  },[])

  function updateState(e, data){
    setEditData({...editData, [data.title]: e.target.value});
    console.log('edited:', editData)
  }

  async function saveCahnges(title){
    let url = '';
    let data ={}
    if (title === 'Address'){
      url = '/api/profile/edit-address';
      data = {
        country: editData.country,
        city: editData.city,
        houseNumber: editData.houseNumber,
        streetName: editData.street,
        location: editData.GeoLocation
      }
    }
    if (title === 'About Me'){
      url = 'api/profile/edit-aboutme';
      data ={
        aboutme: editData.aboutme
      }
    }
    if (title === 'Job Description'){
      url = '/api/profile/edit-job';
      data= {
        Category: editData.Category,
        Detail: editData.Detail
      }
    }
    const response = await instance.post(url, data);
    console.log('resp:', response.data);
    ctx.setUser(response.data);
    setOpenModal(false);
  }

  function getLocation(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setEditData({...editData, 
          GeoLocation: [position.coords.longitude,position.coords.latitude]
        })
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }
  return (
    <Modal
      open={openModal}
      onClose={()=> setOpenModal(false)}
      aria-labelledby="modal-edit-profile"
      aria-describedby="modal-edit-profile-fields"
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
          background: '#a3a3a3'
        }}
      >
        <Typography variant="h5">Edit {data.title}</Typography>
        <Box>
          {data.items.map((field) => {
            return (
              <Box>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ margin: "5px 0" }}
                >
                  {field.title}
                </Typography>
                <TextField
                  variant="outlined"
                  value={editData[field.title]}
                  onChange={(e)=> updateState(e, field)}
                  sx={{
                    margin: "5px 0",
                    width: '80%'
                  }}
                  InputProps={{
                    endAdornment: (
                      field.title === 'GeoLocation' && 
                      <Button variant='outlined' onClick={getLocation}>Set</Button>
                    ),
                  }}
                />
              </Box>
            );
          })}
          <Button
            variant='contained'
            onClick={()=> saveCahnges(data.title)}
            sx={{
              p: 1,
              background: '#ff5555',
              margin: '0 auto',
              marginTop: '10px'
            }}>
              Save
            </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default EditModal;
