import { createSlice } from "@reduxjs/toolkit";

export const adminModalSlice = createSlice({
  name: "AdminModal",
  initialState: {
    adminModalOpen: false
  },
  reducers: {
    setAdminModalOpen: (state, action) => {
      state.adminModalOpen = action.payload;
    }
  }
});

export const {
  setAdminModalOpen
} = adminModalSlice.actions;

export default adminModalSlice.reducer;