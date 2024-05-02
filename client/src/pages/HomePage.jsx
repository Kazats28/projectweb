import React from 'react';
import HeroSlide from '../components/common/HeroSlide';
import { Box } from '@mui/material';
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";
import MediaSlide from "../components/common/MediaSlide";
import { getAllMovies } from "../api-helpers/api-helpers";
import { useEffect, useState } from "react";
const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => {setMovies(data.movies)})
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <HeroSlide/>

      <Box marginTop="-4rem" sx={{ ...uiConfigs.style.mainContent }}>
        <Container header="Top phim mới nhất">
          <MediaSlide movies={movies} type={1}/>
        </Container>

        <Container header="Top đánh giá phim">
          <MediaSlide movies={movies} type={2}/>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;