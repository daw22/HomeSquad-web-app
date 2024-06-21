import React,{ useState, useEffect }from 'react'
import { Box, Typography, Button } from '@mui/material';
import FlexBetween from './flexBetween.jsx';

function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = ['./installer.png', 'Plumber.jpg']
  useEffect(()=>{
    const intervalId = setInterval(()=>{
      const nextImage = (currentImage + 1) % images.length;
      setCurrentImage(nextImage);
    }, 10000);
    return ()=> clearInterval(intervalId);
  },[currentImage])
  return (
    <Box
    sx={{
      height: `calc(100vh - 64px)`,
      width: '100%',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
    {images.map((image, index) => 
    <Box key={image}
    sx={{
      height: '100%',
      width: '100%',
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      opacity: currentImage == index ? 1 : 0,
      transition: 'opacity 1s ease-in-out',
      position: 'absolute',
      top: 0,
      left: 0
    }}>
    </Box>)}

    <Box
    sx={{
      zIndex: 2,
      maxWidth: '800px'
    }}>
      <Typography 
      variant='h3' 
      sx={{
        color: 'white', 
        fontFamily: 'Roboto',
        mb: 10
      }}>
        Hire The Best Handiman In Town
      </Typography>

      <FlexBetween sx={{width: '80%', m:'0 auto', gap: 2}}>
        <Button color='primary' variant='contained' sx={{padding:'10px 50px'}}>Hire Handimen</Button>
        <Button color='error' variant='contained' sx={{padding:'10px 50px'}}>Browse Jobs</Button>
      </FlexBetween>
    </Box>
    </Box>
  )
}

export default HeroSection;