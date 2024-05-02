import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import uiConfigs from "../configs/ui.configs";
import HeroSlide from "../components/common/HeroSlide";
import MediaGrid from "../components/common/MediaGrid";
import { setAppState } from "../redux/features/appStateSlice";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { getAllMovies } from "../api-helpers/api-helpers";
const MediaList = () => {
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const skip = 12;
  
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
        </Stack>
         <MediaGrid
          medias={filteredMovies}
        />
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