import HomePage from "../pages/HomePage";
import FavoriteList from "../pages/FavoriteList";
import MediaDetail from "../pages/MediaDetail";
import MediaList from "../pages/MediaList";
import MediaSearch from "../pages/MediaSearch";
import PasswordUpdate from "../pages/PasswordUpdate";
import BookingList from "../pages/BookingList";
import ProtectedPage from "../components/common/ProtectedPage";
import AddedMovieList from "../pages/AddedMovieList";
import ProtectedPageAdmin from "../components/common/ProtectedPageAdmin";
import AddMovie from "../pages/AddMovie";
import FixMovie from "../pages/FixMovie";
export const routesGen = {
  home: "/",
  mediaList: "/movie",
  mediaDetail: (id) => `/movie/${id}`,
  mediaSearch: "/search",
  favoriteList: "/favorites",
  bookingList: "/bookings",
  passwordUpdate: "/password-update",
  addMovie: "/addmovie",
  listMovie: "/listmovie",
  update: (id) => `/update/${id}`
};

const routes = [
  {
    index: true,
    element: <HomePage />,
    state: "home"
  },
  {
    path: "/search",
    element: <MediaSearch />,
    state: "search"
  },
  {
    path: "/password-update",
    element: (
      <ProtectedPage>
        <PasswordUpdate />
      </ProtectedPage>
    ),
    state: "password.update"
  },
  {
    path: "/favorites",
    element: (
      <ProtectedPage>
        <FavoriteList />
      </ProtectedPage>
    ),
    state: "favorites"
  },
  {
    path: "/bookings",
    element: (
      <ProtectedPage>
        <BookingList />
      </ProtectedPage>
    ),
    state: "bookings"
  },
  {
    path: "/movie",
    element: <MediaList />
  },
  {
    path: "/movie/:id",
    element: <MediaDetail />
  },
  {
    path: "/addmovie",
    element: (
      <ProtectedPageAdmin>
        <AddMovie />
      </ProtectedPageAdmin>
    ),
    state: "add"
  },
  {
    path: "/listmovie",
    element: (
      <ProtectedPageAdmin>
        <AddedMovieList />
      </ProtectedPageAdmin>
    ),
    state: "list"
  },
  {
    path: "/update/:id",
    element: <FixMovie />
  }
];

export default routes;