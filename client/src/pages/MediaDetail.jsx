import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Chip, Divider,FormLabel, TextField, Stack, Typography } from "@mui/material";
import React,{Fragment, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CircularRate from "../components/common/CircularRate";
import Container from "../components/common/Container";
import ImageHeader from "../components/common/ImageHeader";

import uiConfigs from "../configs/ui.configs";
import tmdbConfigs from "../api/configs/tmdb.configs";
import mediaApi from "../api/modules/media.api";

import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
//import { addFavorite, removeFavorite, setListFavorites } from "../redux/features/userSlice";

import CastSlide from "../components/common/CastSlide";
import MediaVideosSlide from "../components/common/MediaVideosSlide";
import BackdropSlide from "../components/common/BackdropSlide";
import PosterSlide from "../components/common/PosterSlide";
import RecommendSlide from "../components/common/RecommendSlide";
import MediaSlide from "../components/common/MediaSlide";
import MediaReview from "../components/common/MediaReview";
import { getBookings, getMovieDetails, newBooking, getUserFavorite, newFavorite, deleteFavorite} from "../api-helpers/api-helpers";
import dayjs from "dayjs";
const MediaDetail = () => {
  const id = useParams().id;
  const [movie, setMovie] = useState();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookings, setBookings] = useState();
  const [seatBooking, setSeatBooking] = useState(Array(selectedSeats.length).fill(false));
  //const seatBooking = Array(selectedSeats.length).fill(false);
  let seatTemp;
  const [onRequest, setOnRequest] = useState(false);
  const { user} = useSelector((state) => state.user);
  const [listFavorites, setListFavorites] = useState([]);
  const bookingsRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setGlobalLoading(true));
    getMovieDetails(id) 
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err))
    dispatch(setGlobalLoading(false));
  }, [id]);
  useEffect(() => {
    dispatch(setGlobalLoading(true));
    getBookings(id)
      .then((res) => setBookings(res.booking))
      .catch((err) => console.log(err));
    dispatch(setGlobalLoading(false));
  }, [id]);
  useEffect(() => {
    dispatch(setGlobalLoading(true));
    getUserFavorite()
      .then((res) => {
        setListFavorites(res.favorites);
      })
      .catch((err) => console.log(err));
    dispatch(setGlobalLoading(false));
  }, []);
  const handleChange = (e) => {
    const newSeatNumber = e.target.value;
    if(seatBooking[parseInt(newSeatNumber) - 1]){
      return;
    }
    setInputs((prevInputs) => ({
      ...prevInputs,
      seatNumber: newSeatNumber 
    }));
  
    // Update selected seats based on new seat number
    const newSelectedSeats = Array(selectedSeats.length).fill(false);
    const seatIndex = parseInt(newSeatNumber) - 1;
    if (seatIndex >= 0 && seatIndex < 50) {
      newSelectedSeats[seatIndex] = true;
    }
    setSelectedSeats(newSelectedSeats);
  };
  
  const handleSeatSelect = (index) => {
    const newSelectedSeats = Array(selectedSeats.length).fill(false);
    newSelectedSeats[index] = true;
    setSelectedSeats(newSelectedSeats);
    setInputs((prevState) => ({
      ...prevState,
      seatNumber: index + 1
    }));
  };   
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    newBooking({ ...inputs, movie: movie._id })
      .then((res) => toast.success("Đặt vé thành công!"))
      .catch((err) => console.log(err));
    const newSeatBooking = seatBooking;
    newSeatBooking[inputs.seatNumber - 1] = true;
    setSeatBooking(newSeatBooking);
    setSelectedSeats(Array(selectedSeats.length).fill(false));
    setInputs((prevInputs) => ({
      ...prevInputs,
      seatNumber: "",
      date: "" 
    }));
    //window.location.reload();
  };
  const renderSeats = () => {
    const seats = [];
    for (let i = 0; i < 10; i++) {
      const column = [];
      for (let j = 0; j < 5; j++) {
        let index = j * 10 + i;        
        const seatNumber = index + 1; // Tính toán số chỗ ngồi
        const isBooked = seatBooking[index] || false;
        let isSelected = selectedSeats[index] || false;
        if(isBooked){
          isSelected = false;
          index = seatTemp;
        }
        const colorByState = {
          normal: "#1876d2",
          selected: "#2e7d31",
          booked: "#d3302f",
        };
      
        let color;
        if (isBooked) {
          color = colorByState.booked;
        } else if (isSelected) {
          color = colorByState.selected;
        } else {
          color = colorByState.normal;
        }
        column.push(
          <Grid>
          <Button
            variant="contained"
            style={{ backgroundColor: color, color: "white"}}
            onClick={() => handleSeatSelect(index)}
            //sx={{ m: 1 }}
            sx={{m:1, minWidth: 0 }}
            fullWidth
          >
            {seatNumber} {/* Hiển thị số chỗ ngồi */}
          </Button>
          </Grid>
        );
      }
      seats.push(<Grid item xs={1.2} md={1.2} >{column}</Grid>);
    }
    return seats;
  };
  const updateFavorite = () => {
    getUserFavorite()
      .then((res) => {
        setListFavorites(res.favorites);
      })
      .catch((err) => console.log(err));
  };
  const onFavoriteClick = () => {
    if (!user) return dispatch(setAuthModalOpen(true));

    if (onRequest) return;

    if (listFavorites.some(e => e.movie._id.toString() === id.toString())) {
      onRemoveFavorite();
      return;
    }

    setOnRequest(true);
    newFavorite({movie: movie._id })
      .then((res) => {updateFavorite(); toast.success("Thêm phim yêu thích thành công!");})
      .catch((err) => console.log(err));
    setOnRequest(false);
  };
  const onBookingClick = () => {
    if (!user) return dispatch(setAuthModalOpen(true));
    bookingsRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const onRemoveFavorite = () => {
    if (onRequest) return;
    setOnRequest(true);
    const favorite = listFavorites.find(e => e.movie._id.toString() === movie._id.toString());
    deleteFavorite(favorite.id)
      .then((res) => {updateFavorite(); toast.success("Xóa phim yêu thích thành công!");})
      .catch((err) => console.log(err));
    setOnRequest(false);
  };
  
  return (
    <div>
      {movie && 
        (
          <>
            <ImageHeader imgPath={movie.backgroundUrl} />
            <Box sx={{
              color: "primary.contrastText",
              ...uiConfigs.style.mainContent
            }}>
              {/* media content */}
              <Box sx={{
                marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" }
              }}>
                <Box sx={{
                  display: "flex",
                  flexDirection: { md: "row", xs: "column" }
                }}>
                  {/* poster */}
                  <Box sx={{
                    width: { xs: "70%", sm: "50%", md: "40%" },
                    margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" }
                  }}>
                    <Box sx={{
                      paddingTop: "140%",
                      ...uiConfigs.style.backgroundImage(movie.posterUrl)
                    }} />
                  </Box>
                  {/* poster */}
    
                  {/* media info */}
                  <Box sx={{
                    width: { xs: "100%", md: "60%" },
                    color: "text.primary"
                  }}>
                    <Stack spacing={5}>
                      {/* title */}
                      <Typography
                        variant="h4"
                        fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                        fontWeight="700"
                        sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                      >
                        {`${movie.title} ${dayjs(movie.releaseDate).format("DD-MM-YYYY")}`}
                      </Typography>
                      {/* title */}
    
                      {/* rate and genres */}
                      <Stack direction="row" spacing={1} alignItems="center">
                        {/* rate */}
                        {/*<CircularRate value={media.vote_average} />
                        {/* rate */}
                        <Divider orientation="vertical" />
                        {/* genres */}
                        {movie.genres.map((genre, index) => (
                          <Chip
                            label={genre}
                            variant="filled"
                            color="primary"
                            key={index}
                          />
                        ))}
                        {/* genres */}
                      </Stack>
                      {/* rate and genres */}
    
                      {/* overview */}
                      <Typography
                        variant="body1"
                        sx={{ ...uiConfigs.style.typoLines(5) }}
                      >
                        {movie.description}
                      </Typography>
                      {/* overview */}
    
                      {/* buttons */}
                      <Stack direction="row" spacing={1}>
                        <LoadingButton
                          variant="text"
                          sx={{
                            width: "max-content",
                            "& .MuiButon-starIcon": { marginRight: "0" }
                          }}
                          size="large"
                          startIcon={listFavorites.some(e => e.movie._id.toString() === id.toString()) ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
                          loadingPosition="start"
                          loading={onRequest}
                          onClick={onFavoriteClick}
                        />
                        <Button
                          variant="contained"
                          sx={{ width: "max-content" }}
                          size="large"
                          //startIcon={<PlayArrowIcon />}
                          onClick={onBookingClick}
                        >
                          đặt vé
                        </Button>
                      </Stack>
                      {/* buttons */}
    
                      {/* cast */}
                      <Container header="Diễn viên">
                        <CastSlide casts={movie.actors} />
                      </Container>
                      {/* cast */}
                    </Stack>
                  </Box>
                  {/* media info */}
                </Box>
              </Box>
              {/* media content */}
              {/* media videos */}
              <div style={{ paddingTop: "2rem" }}>
                <Container header="Video Trailer">
                  <MediaVideosSlide URL={movie.videoUrl} />
                </Container>
              </div>
              {/* media videos */}
              {/* media videos */}
              <div ref={bookingsRef} style={{ paddingTop: "2rem" }}>
                {user && (
                  <Container header="Đặt vé">
                    {bookings && bookings.map((booking, index) => (
                      seatBooking[booking.seatNumber - 1] = true
                    ))}
                    {movie && (
                      <Fragment>
                        <Box display="flex" justifyContent="center" >
                          <Box width={"50%"} paddingTop={3} >
                            <form onSubmit={handleSubmit}>
                              <Box
                                padding={5}
                                margin={"auto"}
                                display="flex"
                                flexDirection={"column"}
                              >             
                                <FormLabel>Vị trí ghế</FormLabel>
                                <TextField
                                  name="seatNumber"
                                  value={inputs.seatNumber}
                                  onChange={handleChange}
                                  type={"number"}
                                  margin="normal"
                                  variant="standard"
                                  inputProps={{ min: "1", max: "50" }} // Giả sử bảng có tối đa 50 chỗ ngồi
                                />
                                <FormLabel>Ngày đặt vé</FormLabel>
                                <TextField
                                  name="date"
                                  type={"date"}
                                  margin="normal"
                                  variant="standard"
                                  value={inputs.date}
                                  onChange={(e) => setInputs((prevState) => ({ ...prevState, date: e.target.value }))}
                                />
                                <Button type="submit" sx={{margin: "auto",bgcolor: "#add8e6",":hover": {bgcolor: "#121217"}}}>
                                  Đặt vé
                                </Button>                 
                              </Box>
                              <Box display="flex" alignItems="center" > 
                                <Box display="flex" alignItems="center" marginRight={2}>
                                  <Box width={20} height={20} bgcolor="#d3302f" marginRight={1}></Box>
                                  <Typography>Đã bán</Typography>
                                </Box>
                                <Box display="flex" alignItems="center" marginRight={2}>
                                  <Box width={20} height={20} bgcolor="#2e7d31" marginRight={1}></Box>
                                  <Typography>Đã chọn</Typography>
                                </Box>
                                <Box display="flex" alignItems="center" marginRight={2}>
                                  <Box width={20} height={20} bgcolor="#1876d2" marginRight={1}></Box>
                                  <Typography>Trống</Typography>
                                </Box>
                              </Box>    
                              <Box display="flex" alignItems="center" marginLeft={"2.5%"}>                              
                                <Button
                                  variant="contained"
                                  color="primary"
                                  sx={{ m: 1, width: "650px"}}
                                >
                                  MÀN HÌNH
                                </Button>                     
                              </Box>
                            </form>
                          </Box>
                        </Box>
                        <Box display={"flex"} justifyContent={"center"}>
                          <Grid width={{xs: "100%", sm:"80%", md:"60%"}} container spacing={{ xs: 0.5, md: 1 }}>
                            {renderSeats()}
                          </Grid>
                        </Box>
                      </Fragment>
                    )}
                  </Container>
                )}
              </div>
              {/* media videos */}
              
              {/* media backdrop */}
              {/*{media.images.backdrops.length > 0 && (
                <Container header="backdrops">
                  <BackdropSlide backdrops={media.images.backdrops} />
                </Container>
              )}
              {/* media backdrop */}
    
              {/* media posters */}
              {/*{media.images.posters.length > 0 && (
                <Container header="posters">
                  <PosterSlide posters={media.images.posters} />
                </Container>
              )}
              {/* media posters */}
    
              {/* media reviews */}
              {/*<MediaReview reviews={media.reviews} media={media} mediaType={mediaType} />
              {/* media reviews */}
    
              {/* media recommendation */}
              {/*<Container header="you may also like">
                {media.recommend.length > 0 && (
                  <RecommendSlide medias={media.recommend} mediaType={mediaType} />
                )}
                {media.recommend.length === 0 && (
                  <MediaSlide
                    mediaType={mediaType}
                    mediaCategory={tmdbConfigs.mediaCategory.top_rated}
                  />
                )}
              </Container> 
              {/* media recommendation */}
            </Box>
          </>
        )
      }
    </div>
  );
};

export default MediaDetail;