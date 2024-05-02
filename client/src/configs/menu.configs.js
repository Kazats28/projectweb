import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import {Add, Movie } from "@mui/icons-material";
const main = [
  {
    display: "Trang chủ",
    path: "/",
    icon: <HomeOutlinedIcon />,
    state: "home"
  },
  {
    display: "Tất cả phim",
    path: "/movie",
    icon: <SlideshowOutlinedIcon />,
    state: "movie"
  },
  {
    display: "Tìm kiếm",
    path: "/search",
    icon: <SearchOutlinedIcon />,
    state: "search"
  }
];

const user = [
  {
    display: "Phim yêu thích",
    path: "/favorites",
    icon: <FavoriteBorderOutlinedIcon />,
    state: "favorite"
  },
  {
    display: "Vé đã đặt",
    path: "/bookings",
    icon: <RateReviewOutlinedIcon />,
    state: "bookings"
  },
  {
    display: "Đổi mật khẩu",
    path: "/password-update",
    icon: <LockResetOutlinedIcon />,
    state: "password.update"
  }
];

const admin = [
  {
    display: "Thêm phim mới",
    path: "/addmovie",
    icon: <Add />,
    state: "addmovie"
  },
  {
    display: "Danh sách phim đã thêm",
    path: "/listmovie",
    icon: <Movie />,
    state: "listmovie"
  }
];

const menuConfigs = { main, user, admin };

export default menuConfigs;