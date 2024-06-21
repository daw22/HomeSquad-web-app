import React from 'react'
import { Box, Typography, Avatar } from '@mui/material';

function Review({data}) {
  return (
    <Box
    sx={{
        minWidth: "250px",
        padding: 2,
        textAlign: 'center',
    }}>
        <Avatar sx={{margin: '0 auto'}} src={data.avatar} alt={data.name} />
        <Typography sx={{margin: '10px 0'}} variant='h5'>{data.name}</Typography>
        <Typography variant='body2'>{data.comment}</Typography>
    </Box>
  )
}

export default Review;