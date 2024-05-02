import { Box, Typography, CircularProgress, Rating } from "@mui/material";

const CircularRate = ({ value }) => {
  return (
    <Box sx={{
      position: "relative",
      display: "inline-block",
      width: "max-content"
    }}>
      <Rating
        name="rating"
        value={(value / 10)}
        precision={0.1}
        min={0}
        max={1}
        size="large"
        fontSize="medium"
        />
      {/* <CircularProgress variant="determinate" value={value * 10} color="success" size={50} /> */}
      <Box sx={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Typography
          variant="caption"
          component="div"
          fontWeight="700"
          sx={{ marginTop: "-5px" }}
        >
          {Math.floor(value * 10) / 10}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularRate;