import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    listFavorites: []
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload === null) {
        localStorage.removeItem("actkn");
        localStorage.removeItem("userId");
        
      } else {
        if (action.payload.token)
        {
          localStorage.setItem("actkn", action.payload.token);
          localStorage.setItem("userId", action.payload.id);
        }
      }

      state.user = action.payload;
    },
    // setListFavorites: (state, action) => {
    //   state.listFavorites = action.payload;
    // },
    // removeFavorite: (state, action) => {
    //   const { movieId } = action.payload;
    //   state.listFavorites = [...state.listFavorites].filter(e => e.movie._id.toString() !== movieId.toString());
    // },
    // addFavorite: (state, action) => {
    //   state.listFavorites = [action.payload, ...state.listFavorites];
    // }
  }
});

export const {
  setUser,
  setListFavorites,
  addFavorite,
  removeFavorite
} = userSlice.actions;

export default userSlice.reducer;