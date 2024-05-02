import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null
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
    }
  }
});

export const {
  setUser
} = userSlice.actions;

export default userSlice.reducer;