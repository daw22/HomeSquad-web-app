import React,{ useState, useEffect }from 'react'
import { Box, Typography, Button } from '@mui/material';
import FlexBetween from './flexBetween.jsx';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const navigate = useNavigate();
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
      height: '100vh',
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
    //navigation
    <Box
    sx={{
      position: 'absolute',
      right: 0,
      top: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '30%',
      minwidth: '100px',
      zIndex: 3,
      padding: 2,
      color: 'white',
      background: '#1976d2',
      borderRadius: "10px",
      margin: '5px'
    }}>
      <Typography variant='body1' onClick={()=> navigate('/login')} sx={{cursor: 'pointer'}}>Log In</Typography>
      <Typography variant='body1' onClick={()=> navigate('/signup')} sx={{cursor: 'pointer'}}>Sign Up</Typography>
      <Typography variant='body1' sx={{cursor: 'pointer'}}>Contact Us</Typography>
    </Box>
    <Box
    sx={{
      zIndex: 2,
      width: '50%',
      minWidth: '400px',
      textAlign: 'center'
    }}>
      <Typography 
      variant='h1' 
      sx={{
        color: 'white', 
        fontFamily: 'Roboto',
        mb: 1
      }}>
        HomeSquad
      </Typography>
      <Typography 
      variant='h6' 
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