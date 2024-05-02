import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Grid, Modal, Rating } from "@mui/material";
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

import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { setAuthModalOpen } from "../redux/features/authModalSlice";

import CastSlide from "../components/common/CastSlide";
import MediaVideosSlide from "../components/common/MediaVideosSlide";
import BackdropSlide from "../components/common/BackdropSlide";
import { getBookings, getMovieDetails, newBooking, getUserFavorite, newFavorite, deleteFavorite, addRate, updateRate, getUserRating, updateAverageRating} from "../api-helpers/api-helpers";
import dayjs from "dayjs";
const MediaDetail = () => {
  const id = useParams().id;
  const [movie, setMovie] = useState();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({ seatNumber: "", date: "", hour: "" });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDay, setSelectedDay] = useState([]);
  const [listDay, setListDay] = useState([]);
  const [listTime, setListTime] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const [bookings, setBookings] = useState();
  const [seatBooking, setSeatBooking] = useState(Array(selectedSeats.length).fill(false));
  let seatTemp;
  const [onRequest, setOnRequest] = useState(false);
  const { user} = useSelector((state) => state.user);
  const [listFavorites, setListFavorites] = useState([]);
  const [listRates, setListRates] = useState([]);
  const bookingsRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(0);
  const handleChange = async (event, newValue) => {
    if(user){
      if(bookings.some(e => e.user == localStorage.getItem("userId"))){
        if(listRates.some(e => e.movie.id == id)){
          const temp = listRates.find(e => e.movie.id == id);
          await updateRate({rateId: temp.id, rate: newValue})
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        }
        else{
          await addRate({rate: newValue, movie: movie.id})
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
          getListRate();
        }
      }
      await updateAverageRating(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    }
    setValue(newValue);
  };
  const handleOpen = () => {
    if(!inputs.seatNumber)
    {
      toast.error("Chưa chọn vị trí ngồi!");
      return;
    }
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const getNextNDays = () => {
    const today = new Date();
    const result = [];
  
    for (let i = 0; i < 7; i++) {
      let nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
  
      if (nextDate.getDate() < today.getDate() + i) {
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        const daysToAdd = today.getDate() + i - lastDayOfMonth;
        nextDate = new Date(today.getFullYear(), today.getMonth() + 1, daysToAdd);
      }
  
      result.push(nextDate);
    }
  
    setListDay(result);
  };
  const getListBooking = async () => {
    await getBookings(id)
      .then((res) => setBookings(res.booking))
      .catch((err) => console.log(err));
  };
  const getListRate = async () => {
    await getUserRating()
    .then((res) => {
      setListRates(res.rates);
      const rate = res.rates.find(e => e.movie.id == id);
      if(rate) setValue(rate.rate);
    })
    .catch((err) => console.log(err));
  };
  useEffect(() => {
    dispatch(setGlobalLoading(true));
    updateAverageRating(id)
      .then((res) => {console.log(res)})
      .catch((err) => {console.log(err)});
    dispatch(setGlobalLoading(false));
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    getNextNDays();
    dispatch(setGlobalLoading(true));
    getMovieDetails(id) 
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err))
    dispatch(setGlobalLoading(false));
  }, [id]);
  useEffect(() => {
    dispatch(setGlobalLoading(true));
    getListBooking();
    dispatch(setGlobalLoading(false));
  }, [id]);
  useEffect(() => {
    dispatch(setGlobalLoading(true));
    getListRate();
    dispatch(setGlobalLoading(false));
  }, [user]);
  useEffect(() => {
    dispatch(setGlobalLoading(true));
    getUserFavorite()
      .then((res) => {
        setListFavorites(res.favorites)})
      .catch((err) => console.log(err));
    dispatch(setGlobalLoading(false));
  }, [user]);
  
  const handleSeatSelect = (index) => {
    getListBooking();
    const newSelectedSeats = Array(selectedSeats.length).fill(false);
    newSelectedSeats[index] = true;
    setSelectedSeats(newSelectedSeats);
    setInputs((prevState) => ({
      ...prevState,
      seatNumber: index + 1
    }));
  };   
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await newBooking({ ...inputs, movie: movie.id })
      .then((res) => toast.success("Đặt vé thành công!"))
      .catch((err) => console.log(err));
    const newSeatBooking = seatBooking;
    newSeatBooking[inputs.seatNumber - 1] = true;
    setSeatBooking(newSeatBooking);
    setSelectedSeats(Array(selectedSeats.length).fill(false));
    handleClose();
    setInputs((prevInputs) => ({
      ...prevInputs,
      seatNumber: ""
    }));
  };
  const handleTimeSelect = (i) => {
    getListBooking();
    const newSelectedTime = Array(5).fill(false);
    newSelectedTime[i] = true;
    setSelectedTime(newSelectedTime);
    setInputs((prevState) => ({
      ...prevState,
      hour: listTime[i]
    }));
  };  
  const handleDaySelect = (i) => {
    const newSelectedDay = Array(7).fill(false);
    newSelectedDay[i] = true;
    setSelectedDay(newSelectedDay);
    switch (listDay[i].getDay()) {
      case 0:
        setListTime(movie.suns);
        break;
      case 1:
        setListTime(movie.mons);
        break;
      case 2:
        setListTime(movie.tues);
        break;
      case 3:
        setListTime(movie.weds);
        break;
      case 4:
        setListTime(movie.thus);
        break;
      case 5:
        setListTime(movie.fris);
        break;
      case 6:
        setListTime(movie.sats);
        break;
      default:
        break;
    }
    setSelectedTime([]);
    setInputs((prevState) => ({
      ...prevState,
      date: listDay[i],
      hour: ""
    }));
  };
  const renderTime = () => {
    const times = [];
    for (let i = 0; i < listTime.length; i++) {
      let isSelected = selectedTime[i] || false;
      const colorByState = {
        normal: "#949494",
        selected: "#2e7d31",
      }; 
      let color;
      if (isSelected) {
        color = colorByState.selected;
      } else {
        color = colorByState.normal;
      }
      const split = listTime.length > 3 ? listTime.length : 3;
      times.push(
        <Grid item xs={12/split} md={12/split}>
          <Grid>
            <Button
              variant="contained"
              style={{ backgroundColor: color, color: "white"}}
              onClick={() => handleTimeSelect(i)}
              //sx={{ m: 1 }}
              sx={{m:1, minWidth: 0 }}
              fullWidth
            >
              {listTime[i]}
            </Button>
          </Grid>
        </Grid>
      );
    }
    return times;
  };  
  const renderDay = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      let isSelected = selectedDay[i] || false;
      const colorByState = {
        normal: "#949494",
        selected: "#2e7d31",
      }; 
      let color;
      if (isSelected) {
        color = colorByState.selected;
      } else {
        color = colorByState.normal;
      }
      days.push(
        <Grid item xs={12/7} md={12/7}>
          <Grid>
            <Button
              variant="contained"
              style={{ backgroundColor: color, color: "white"}}
              onClick={() => handleDaySelect(i)}
              //sx={{ m: 1 }}
              sx={{m:1, minWidth: 0 }}
              fullWidth
            >
              {dayjs(listDay[i]).format("DD/MM")}
            </Button>
          </Grid>
        </Grid>
      );
    }
    return days;
  };
  const renderSeats = () => {
    const temp = dayjs(inputs.date).format("DD/MM/YYYY");
    {bookings && bookings.forEach((booking, index) => {
      const temp_date = dayjs(booking.date).format("DD/MM/YYYY");
      seatBooking[booking.seatNumber - 1] = (temp == temp_date && booking.hour == inputs.hour);
    })}
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
          normal: "#949494",
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
  const updateFavorite = async () => {
    await getUserFavorite()
      .then((res) => {
        setListFavorites(res.favorites);
      })
      .catch((err) => console.log(err));
  };
  const onFavoriteClick = async () => {
    if (!user) return dispatch(setAuthModalOpen(true));

    if (onRequest) return;

    if (listFavorites.some(e => e.movie.id.toString() === id.toString())) {
      onRemoveFavorite();
      return;
    }

    setOnRequest(true);
    await newFavorite({movie: movie.id })
      .then((res) => {updateFavorite(); toast.success("Thêm phim yêu thích thành công!");})
      .catch((err) => console.log(err));
    setOnRequest(false);
  };
  const onBookingClick = () => {
    if (!user) return dispatch(setAuthModalOpen(true));
    bookingsRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const onRemoveFavorite = async () => {
    if (onRequest) return;
    setOnRequest(true);
    const favorite = listFavorites.find(e => e.movie.id.toString() === movie.id.toString());
    await deleteFavorite(favorite.id)
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
                        {`${movie.title} ${dayjs(movie.releaseDate).format("DD/MM/YYYY")}`}
                      </Typography>
                      {/* title */}
    
                      {/* rate and genres */}
                      <Stack direction="row" spacing={1} alignItems="center">
                        {/* rate */}
                        <CircularRate value={movie.averageRating} />
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
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Rating
                            name="rating"
                            value={value}
                            onChange={handleChange}
                            precision={0.5}
                            min={0}
                            max={5}
                            />
                          <Typography ml={2} variant="body2">{value * 2}</Typography>
                      </Box>
                      <Stack direction="row" spacing={1}>
                        <LoadingButton
                          variant="text"
                          sx={{
                            width: "max-content",
                            "& .MuiButon-starIcon": { marginRight: "0" }
                          }}
                          size="large"
                          startIcon={listFavorites.some(e => e.movie.id.toString() === id.toString()) ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
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
              <div>
                <Modal
                    open={isOpen}
                    onClose={handleClose}
                    >
                  <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "100%",
                    maxWidth: "600px",
                    padding: 4,
                    outline: "none"
                  }}>
                    <Box sx={{ padding: 4, boxShadow: 24, backgroundColor: "background.paper" }}>
                      <Box sx={{ textAlign: "center", marginBottom: "2rem" }} >
                        <Stack spacing={1}>
                          <Typography
                            variant="h4"
                            >
                            Pay with PayPal
                          </Typography>
                        </Stack>
                      </Box>
                      <Stack spacing={1}>
                        <FormLabel>Mã số thẻ</FormLabel>
                        <TextField
                          type="text"
                          placeholder="XXXX-XXXX-XXXX-XXXX"
                          fullWidth
                          color="success"
                        />
                        <FormLabel>Ngày hết hạn</FormLabel>
                        <TextField
                          type="text"
                          placeholder="MM/YY"
                          fullWidth
                          color="success"
                        />
                        <FormLabel>CVV</FormLabel>
                        <TextField
                          type="text"
                          placeholder="XXX"
                          fullWidth
                          color="success"
                          />
                      </Stack>
                      <Box display="flex" justifyContent="center" >
                        <Box width={"80%"} marginTop={3}>
                          <form onSubmit={handleSubmit}>
                            <Box display="flex" >             
                              <Button type="submit" sx={{margin: "auto",bgcolor: "#add8e6",":hover": {bgcolor: "#121217"}}}>
                                Thanh toán
                              </Button>                 
                            </Box>
                          </form>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Modal>
              </div>
              {/* media backdrop */}
              {movie.backdrops.length > 0 && (
                <Container header="Một số cảnh trong phim">
                  <BackdropSlide backdrops={movie.backdrops} />
                </Container>
              )}
              {/* media backdrop */}
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
                    {movie && (
                      <Fragment>
                        <Box display={"flex"} justifyContent={"center"}>
                          <Typography
                            variant="h5"
                            fontSize={{ xs: "1rem", md: "1rem", lg: "2rem" }}
                            fontWeight="700"
                            sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                          >
                            Chọn ngày chiếu phim
                          </Typography>
                        </Box>
                        <Box display={"flex"} justifyContent={"center"}>
                          <Grid justifyContent={"center"} width={{xs: "90%", sm:"70%", md:"50%"}} container spacing={{ xs: 1, md: 2 }}>
                            {renderDay()}
                          </Grid>
                        </Box>
                        {inputs.date && (
                          <Box>
                            <Box display={"flex"} justifyContent={"center"}>
                              <Typography
                                variant="h5"
                                fontSize={{ xs: "1rem", md: "1rem", lg: "2rem" }}
                                fontWeight="700"
                                sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                              >
                                Chọn giờ chiếu phim
                              </Typography>
                            </Box>
                            <Box display={"flex"} justifyContent={"center"}>
                              <Grid justifyContent={"center"} width={{xs: "90%", sm:"70%", md:"50%"}} container spacing={{ xs: 1, md: 2 }}>
                                {renderTime()}
                              </Grid>
                            </Box>
                          </Box>
                        )}
                        {inputs.hour && (
                          <Box>
                            <Box display={"flex"} justifyContent={"center"}>
                              <Typography
                                variant="h5"
                                fontSize={{ xs: "1rem", md: "1rem", lg: "2rem" }}
                                fontWeight="700"
                                sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                              >
                                Vị trí ghế ngồi
                              </Typography>
                            </Box>
                            <Box display="flex" justifyContent="center" > 
                              <Box display="flex" alignItems="center" marginRight={2}>
                                <Box width={20} height={20} bgcolor="#d3302f" marginRight={1}></Box>
                                <Typography>Đã bán</Typography>
                              </Box>
                              <Box display="flex" alignItems="center" marginRight={2}>
                                <Box width={20} height={20} bgcolor="#2e7d31" marginRight={1}></Box>
                                <Typography>Đã chọn</Typography>
                              </Box>
                              <Box display="flex" alignItems="center" marginRight={2}>
                                <Box width={20} height={20} bgcolor="#949494" marginRight={1}></Box>
                                <Typography>Trống</Typography>
                              </Box>
                            </Box>
                            <Box display="flex" justifyContent="center">                                                 
                              <Button
                                variant="contained"
                                color="primary"
                                sx={{ m: 1, width: {xs: "90%", sm:"70%", md:"50%"}}}
                              >
                                MÀN HÌNH
                              </Button>                     
                            </Box>
                            <Box display={"flex"} justifyContent={"center"}>
                              <Grid width={{xs: "100%", sm:"80%", md:"60%"}} container spacing={{ xs: 0.5, md: 1 }}>
                                {renderSeats()}
                              </Grid>
                            </Box>
                            <Box display="flex" justifyContent="center" >
                              <Box width={"80%"} marginTop={3}>
                                <Box display="flex" justifyContent={"center"}>             
                                  <Button onClick={handleOpen} sx={{bgcolor: "#add8e6",":hover": {bgcolor: "#121217"}, width: {xs: "20%", sm:"15%", md:"10%"}}}>
                                    Đặt vé
                                  </Button>                 
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        )}
                      </Fragment>
                    )}
                  </Container>
                )}
              </div>
              {/* media videos */}
              
    
            </Box>
          </>
        )
      }
    </div>
  );
};

export default MediaDetail;