import { Box } from '@mui/material';
import HeroSection from '../components/heroSection.jsx';
import ServicesSection from '../components/servicesSection.jsx';
import ReviewSection from '../components/reviewSection.jsx';
import FooterSection from '../components/footerSection.jsx';

function HomePage() {
  return (
    <Box>
        <HeroSection />
        <ServicesSection />
        <ReviewSection />
        <FooterSection />
    </Box>
)
}

export default HomePage;