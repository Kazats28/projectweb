import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import tmdbConfigs from "../api/configs/tmdb.configs";
import mediaApi from "../api/modules/media.api";
import uiConfigs from "../configs/ui.configs";
import HeroSlide from "../components/common/HeroSlide";
import MediaGrid from "../components/common/MediaGrid";
import { setAppState } from "../redux/features/appStateSlice";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { toast } from "react-toastify";
import usePrevious from "../hooks/usePrevious";
import { getAllMovies } from "../api-helpers/api-helpers";
import { Grid } from "@mui/material";
import MediaItem from "../components/common/MediaItem";
import dayjs from "dayjs";
const MediaList = () => {
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const skip = 8;
  useEffect(() => {
    dispatch(setGlobalLoading(true));
    getAllMovies()
      .then((data) => {setMovies(data.movies);
      setFilteredMovies(data.movies.slice(0, skip));})
      .catch((err) => console.log(err));
    dispatch(setGlobalLoading(false));
  }, []);
  useEffect(() => {
    dispatch(setAppState("movie"));
    window.scrollTo(0, 0);
  }, []);
  const onLoadMore = () => {
    setFilteredMovies([...filteredMovies, ...[...movies].splice(page * skip, skip)]);
    setPage(page + 1);
  };

  return (
    <>
      <HeroSlide/>
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack
          spacing={2}
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginBottom: 4 }}
        >
          <Typography fontWeight="700" variant="h5">
            Tất cả phim
          </Typography>
          {/*<Stack direction="row" spacing={2}>
            {category.map((cate, index) => (
              <Button
                key={index}
                size="large"
                variant={currCategory === index ? "contained" : "text"}
                sx={{
                  color: currCategory === index ? "primary.contrastText" : "text.primary"
                }}
                onClick={() => onCategoryChange(index)}
              >
                {cate}
              </Button>
            ))}
          </Stack>*/}
        </Stack>
        {/* <MediaGrid
          medias={filteredMovies}
        /> */}
        <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
          {filteredMovies.map((movie, index) => (
            <Grid item xs={6} sm={4} md={3}>
              <MediaItem
                key={index}
                id={movie._id}
                posterUrl={movie.posterUrl}
                releaseDate={dayjs(movie.releaseDate).format("DD-MM-YYYY")}
                title={movie.title}
              />
            </Grid>
          ))}
        </Grid>
        {filteredMovies.length < movies.length && (
          <Button
            sx={{ marginTop: 8 }}
            fullWidth
            color="primary"
            onClick={onLoadMore}
          >
            xem thêm
        </Button>        
        )}
      </Box>
    </>
  );
};

export default MediaList;