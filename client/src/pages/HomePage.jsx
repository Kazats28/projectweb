import React from 'react';
import HeroSlide from '../components/common/HeroSlide';
import tmdbConfigs from "../api/configs/tmdb.configs";
import { Box } from '@mui/material';
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";
import MediaSlide from "../components/common/MediaSlide";

const HomePage = () => {
  return (
    <>
      <HeroSlide/>

      <Box marginTop="-4rem" sx={{ ...uiConfigs.style.mainContent }}>
        <Container header="popular movies">
          <MediaSlide />
        </Container>

        <Container header="popular series">
          <MediaSlide/>
        </Container>

        <Container header="top rated movies">
          <MediaSlide/>
        </Container>

        <Container header="top rated series">
          <MediaSlide/>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;