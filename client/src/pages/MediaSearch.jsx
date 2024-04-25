import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, TextField, Toolbar } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import mediaApi from "../api/modules/media.api";
import MediaGrid from "../components/common/MediaGrid";
import uiConfigs from "../configs/ui.configs";
import { getAllMovies } from "../api-helpers/api-helpers";

const searchTypes = ["tên phim", "thể loại", "diễn viên"];
//let timer;
//const timeout = 500;

const MediaSearch = () => {
  /*const [query, setQuery] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [mediaType, setMediaType] = useState(mediaTypes[0]);
  const [medias, setMedias] = useState([]);
  const [page, setPage] = useState(1);

  const search = useCallback(
    async () => {
      setOnSearch(true);

      const { response, err } = await mediaApi.search({
        mediaType,
        query,
        page
      });

      setOnSearch(false);

      if (err) toast.error(err.message);
      if (response) {
        if (page > 1) setMedias(m => [...m, ...response.results]);
        else setMedias([...response.results]);
      }
    },
    [mediaType, query, page],
  );

  useEffect(() => {
    if (query.trim().length === 0) {
      setMedias([]);
      setPage(1);
    } else search();
  }, [search, query, mediaType, page]);

  useEffect(() => {
    setMedias([]);
    setPage(1);
  }, [mediaType]);

  
  const onQueryChange = (e) => {
    const newQuery = e.target.value;
    clearTimeout(timer);
    
    timer = setTimeout(() => {
      setQuery(newQuery);
    }, timeout);
  };*/
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
          
          {/*medias.length > 0 && (
            <LoadingButton
              loading={onSearch}
              onClick={() => setPage(page + 1)}
            >
              load more
            </LoadingButton>
          )*/}
        </Stack>
      </Box>
    </>
  );
};

export default MediaSearch;