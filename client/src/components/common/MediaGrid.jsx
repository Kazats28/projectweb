import { Grid } from "@mui/material";
import MediaItem from "./MediaItem";
import dayjs from "dayjs";
const MediaGrid = ({ medias}) => {
  return (
    <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
      {medias.map((movie, index) => (
        <Grid item xs={6} sm={4} md={3}>
          <MediaItem
            key={index}
            id={movie.id}
            posterUrl={movie.posterUrl}
            releaseDate={dayjs(movie.releaseDate).format("DD/MM/YYYY")}
            title={movie.title}
            rate={movie.averageRating}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MediaGrid;