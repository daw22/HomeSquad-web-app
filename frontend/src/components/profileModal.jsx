import React from 'react'
import { Box, Typography, Avatar, Modal, Rating} from '@mui/material';

function ProfileModal({currentWorker, openModal, setOpenModal}) {
  return (
    <Modal
    open={openModal}
    onClose={()=> setOpenModal(false)}
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
          background: "#a3a3a3",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Avatar 
        src={currentWorker.profilePic} 
        alt={currentWorker.firstName}
        sx={{width: '100px', height: '100px'}}
        />
        <Typography variant='h5'>{currentWorker.firstName} {currentWorker.lastName}</Typography>
        <Box sx={{ textAlign: "center" }}>
                <Rating
                  name="read-only"
                  value={currentWorker.rating}
                  defaultValue={2.5}
                  precision={0.5}
                  readOnly
                />
                <Typography variant="body2" color="text.secondary">
                  completed: {currentWorker.numberOfJobsCompleted} jobs
                </Typography>
        </Box>
        <Typography variant='body1'>{currentWorker.jobDescription}</Typography>
        {/* <Typography variant='body1'>Lives In: {currentWorker.address.country}</Typography> */}
      </Box>
    </Modal>
  )
}

export default ProfileModal;