import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

function ServiceCard({ data }) {
  return (
    <Card
      sx={{
        minWidth: "150px",
        textAlign: "center",
        margin: '0 10px'
      }}
    >
      <CardMedia
        sx={{ height: 250, objectFit: "contain" }}
        image={data.image}
        title={data.title}
      ></CardMedia>
      <CardContent>
        <Typography color='primary'>{data.title}</Typography>
      </CardContent>
    </Card>
  );
}

export default ServiceCard;