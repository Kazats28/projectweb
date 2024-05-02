import { Box } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import NavigationSwiper from "./NavigationSwiper";

const BackdropSlide = ({ backdrops }) => {
  return (
    <NavigationSwiper>
      {[...backdrops].map((item, index) => (
        <SwiperSlide key={index}>
            <Box sx={{
              paddingTop: "60%",
              backgroundPosition: "top",
              backgroundSize: "cover",
              backgroundImage: `url(${item})`
            }} />
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  );
};

export default BackdropSlide;