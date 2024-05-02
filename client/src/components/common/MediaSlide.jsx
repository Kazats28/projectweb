import { SwiperSlide } from "swiper/react";
import AutoSwiper from "./AutoSwiper";
import MediaItem from "./MediaItem";
import dayjs from "dayjs";
const MediaSlide = ({movies, type}) => {
  if(type == 1) movies.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
  if(type == 2) movies.sort((a, b) => new Date(b.averageRating) - new Date(a.averageRating));
  return (
    <AutoSwiper>
      {movies.map((movie, index) => (
        <SwiperSlide>
          <MediaItem
            key={index}
            id={movie.id}
            posterUrl={movie.posterUrl}
            releaseDate={dayjs(movie.releaseDate).format("DD/MM/YYYY")}
            title={movie.title}
            rate={movie.averageRating}
          />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default MediaSlide;