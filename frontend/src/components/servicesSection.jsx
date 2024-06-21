import { Box, Typography } from "@mui/material";
import ServiceCard from "./serviceCard.jsx";
import Slider from "react-slick";

const services = [
  {
    title: "Plumber",
    image: "/plumber-cat.avif",
  },
  {
    title: "Cleaning",
    image: "/cleaning-cat.avif",
  },
  {
    title: "Construction",
    image: "/construction-cat.avif",
  },
  {
    title: "Satellite Dish",
    image: "/dish-cat.avif",
  },
  {
    title: "Furniture",
    image: "/furniture-cat.avif",
  },
  {
    title: "Gardening",
    image: "/gardenning-cat.avif",
  },
  {
    title: "Painting",
    image: "/painter-cat.avif",
  },
];
function ServicesSection() {
  function CustomArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#1976d2" }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: <CustomArrow />,
    nextArrow: <CustomArrow />
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "400px",
        margin: "40px 0 60px 0",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <Typography
        color="primary"
        variant="h5"
        sx={{
          marginBottom: 3,
        }}
      >
        Services
      </Typography>
      <Box 
      sx={{
        width: "80%", 
        margin: '0 auto'
        }}>
          <Slider {...settings}>
            {services.map((service)=><ServiceCard data={service} key={service.title} />)}
          </Slider>
      </Box>
    </Box>
  );
}

export default ServicesSection;