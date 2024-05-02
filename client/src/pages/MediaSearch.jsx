import { Box, Button, Stack, TextField, Toolbar } from "@mui/material";
import { useState, useEffect } from "react";
import MediaGrid from "../components/common/MediaGrid";
import uiConfigs from "../configs/ui.configs";
import { getAllMovies } from "../api-helpers/api-helpers";

const searchTypes = ["tên phim", "thể loại", "diễn viên"];

const MediaSearch = () => {
  const [movies, setMovies] = useState([]);
  const [medias, setMedias] = useState([]);
  const [searchType, setSearchType] = useState(searchTypes[0]);
  const onChange = (selected) => setSearchType(selected);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  const onQueryChange = (e) => {
    const newQuery = e.target.value;
    if(searchType == "tên phim") setMedias(movies.filter(movie => movie.title.toLowerCase().includes(newQuery.toLowerCase())));
    else if(searchType == "thể loại") setMedias(movies.filter(movie => movie.genres.some(genre => genre.toLowerCase().includes(newQuery.toLowerCase()))));
    else setMedias(movies.filter(movie => movie.actors.some(actor => actor.toLowerCase().includes(newQuery.toLowerCase()))));
    if(newQuery == "") setMedias([]);
  };
  return (
    <>
      <Toolbar />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack spacing={2}>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            {searchTypes.map((item, index) => (
              <Button
                size="large"
                key={index}
                variant={searchType === item ? "contained" : "text"}
                sx={{
                  color: searchType === item ? "primary.contrastText" : "text.primary"
                }}
                onClick={() => onChange(item)}
              >
                {item}
              </Button>
            ))}
          </Stack>
          <TextField
            color="success"
            placeholder="Nhập để tìm kiếm (Có dấu)"
            sx={{ width: "100%" }}
            autoFocus
            onChange={onQueryChange}
          />
          <MediaGrid medias={medias}/>
        </Stack>
      </Box>
    </>
  );
};

export default MediaSearch;