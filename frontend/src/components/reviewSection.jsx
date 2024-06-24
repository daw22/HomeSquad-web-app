import React from "react";
import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
import Review from "./review.jsx";

const reviews = [
  {
    name: "Johsua Matson",
    avatar: "https://avatar.iran.liara.run/public/boy",
    comment:
      "I am Amazed by the speed and acurecy of the work" +
      "Every in the hose is now in order thanks to HomeSquad",
  },
  {
    name: "Ivar Igorov",
    avatar: "https://avatar.iran.liara.run/public/boy",
    comment:
      "HomSquad make it easy form me to outsource taks in my house and save my precious time.",
  },
  {
    name: "Mickel Arteta",
    avatar: "https://avatar.iran.liara.run/public/boy",
    comment:
      "I am Amazed by the speed and acurecy of the work" +
      "Every in the hose is now in order thanks to HomeSquad",
  },
  {
    name: "Samanta Greenfied",
    avatar: "https://avatar.iran.liara.run/public/girl",
    comment:
      "I am Amazed by the speed and acurecy of the work" +
      "Every in the hose is now in order thanks to HomeSquad",
  },
  {
    name: "Lisa Morgan",
    avatar: "https://avatar.iran.liara.run/public/girl",
    comment:
      "I am Amazed by the speed and acurecy of the work" +
      "Every in the hose is now in order thanks to HomeSquad",
  },
];
function ReviewSection() {
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
    slidesToScroll: 2,
    prevArrow: <CustomArrow />,
    nextArrow: <CustomArrow />,
  };
  return (
    <Box
      sx={{
        width: "80%",
        margin: "0 auto",
        padding: 2,
        textAlign: "center",
        marginBottom: '50px'
      }}
    >
      <Box>
        <Typography
          color="primary"
          variant="h5"
          sx={{
            margin: "50px 0",
          }}
        >
          What customers say
        </Typography>
      </Box>
      <Slider {...settings}>
        {reviews.map((review) => (
          <Review data={review} key={review.name}/>
        ))}
      </Slider>
    </Box>
  );
}

export default ReviewSection;
