import axios from "axios";
export const getAllMovies = async () => {
  const res = await axios.get("/movie").catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }

  const data = await res.data;
  return data;
};

export const sendAdminAuthRequest = async (data) => {
  const res = await axios
    .post("/admin/login", {
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpectyed Error");
  }

  const resData = await res.data;
  return resData;
};

export const getMovieDetails = async (id) => {
  const res = await axios.get(`/movie/${id}`).catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};
export const getBookings = async (id) => {
  const res = await axios
    .get(`/booking/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};
export const getFavorites = async (id) => {
  const res = await axios
    .get(`/favorite/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};
export const newBooking = async (data) => {
  const res = await axios
    .post("/booking", {
      movie: data.movie,
      seatNumber: data.seatNumber,
      hour: data.hour,
      date: data.date,
      user: localStorage.getItem("userId"),
    })
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};
export const addRate = async (data) => {
  const res = await axios
    .post("/rate", {
      movie: data.movie,
      rate: data.rate,
      user: localStorage.getItem("userId"),
    })
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};
export const updateRate = async (data) => {
  const res = await axios
    .put(
      "/rate/update",
      {
        rateId: data.rateId,
        rate: data.rate
      }
    )
    .catch((err) => console.log(err));
  if (res.status !== 201) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};
export const newFavorite = async (data) => {
  const res = await axios
    .post("/favorite", {
      movie: data.movie,
      user: localStorage.getItem("userId"),
    })
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};
export const getUserRating = async () => {
  const id = localStorage.getItem("userId");
  if(id == null) return console.log("not find id");
  const res = await axios
    .get(`/user/ratings/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};
export const getUserBooking = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios
    .get(`/user/bookings/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};
export const getUserFavorite = async () => {
  const id = localStorage.getItem("userId");
  if(id == null) return console.log("Not find id");
  const res = await axios
    .get(`/user/favorites/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};
export const deleteBooking = async (id) => {
  const res = await axios
    .delete(`/booking/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unepxected Error");
  }

  const resData = await res.data;
  return resData;
};
export const deleteFavorite = async (id) => {
  const res = await axios
    .delete(`/favorite/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unepxected Error");
  }

  const resData = await res.data;
  return resData;
};
export const deleteMovie = async (id) => {
  const res = await axios
    .delete(`/movie/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unepxected Error");
  }

  const resData = await res.data;
  return resData;
};
export const updateAverageRating = async (id) => {
  const res = await axios
    .put(`/movie/update/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unepxected Error");
  }

  const resData = await res.data;
  return resData;
};
export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios.get(`/user/${id}`).catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const addMovie = async (data) => {
  const res = await axios
    .post(
      "/movie",
      {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        posterUrl: data.posterUrl,
        actors: data.actors,
        backgroundUrl: data.backgroundUrl,
        videoUrl: data.videoUrl,
        genres: data.genres,
        backdrops: data.backdrops,
        admin: localStorage.getItem("adminId"),
        averageRating: data.averageRating,
        mons: data.mons, tues: data.tues, weds: data.weds, thus: data.thus, fris: data.fris, sats: data.sats, suns: data.suns
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};

export const getAdminById = async () => {
  const adminId = localStorage.getItem("adminId");
  if(adminId == null) return console.log("Not find adminId");
  const res = await axios
    .get(`/admin/${adminId}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};

export const updateMovie = async (data) => {
  const res = await axios
    .put(
      "/movie/update",
      {
        movieId: data.movieId,
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        posterUrl: data.posterUrl,
        actors: data.actors,
        backgroundUrl: data.backgroundUrl,
        videoUrl: data.videoUrl,
        genres: data.genres,
        backdrops: data.backdrops,
        mons: data.mons, tues: data.tues, weds: data.weds, thus: data.thus, fris: data.fris, sats: data.sats, suns: data.suns
      }
    )
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};