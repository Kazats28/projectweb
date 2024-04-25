import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import mediaApi from "../../api/modules/media.api";
import AutoSwiper from "./AutoSwiper";
import { toast } from "react-toastify";
import MediaItem from "./MediaItem";
import { getAllMovies } from "../../api-helpers/api-helpers";
import dayjs from "dayjs";
const MediaSlide = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  return (
    <AutoSwiper>
      {movies.map((movie, index) => (
        <SwiperSlide>
          <MediaItem
            key={index}
            id={movie._id}
            posterUrl={movie.posterUrl}
            releaseDate={dayjs(movie.releaseDate).format("DD-MM-YYYY")}
            title={movie.title}
          />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default MediaSlide;