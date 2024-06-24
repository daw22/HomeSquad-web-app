import { Box } from '@mui/material';
import { Outlet } from "react-router-dom";
import NavBar from '../components/navBar';
import FooterSection from '../components/footerSection.jsx';

function Layout() {
  return (
    <Box 
    width='100%' 
    sx={{
      background:'#f7f7f7',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      }}>
        <NavBar />
        <Outlet />
        <FooterSection />
    </Box>
)
}

export default Layout