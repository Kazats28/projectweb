import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "Admin",
  initialState: {
    admin: null
  },
  reducers: {
    setAdmin: (state, action) => {
      if (action.payload === null) {
        localStorage.removeItem("token");
        localStorage.removeItem("adminId");
        
      } else {
        if (action.payload.token)
        {
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("adminId", action.payload.id);
        }
      }

      state.admin = action.payload;
    }
  }
});

export const {
  setAdmin
} = adminSlice.actions;

export default adminSlice.reducer;