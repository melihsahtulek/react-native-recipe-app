import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "open_search",
  initialState: {
    isOpened: false,
  },
  reducers: {
    open: (state) => {
      state.isOpened = true;
    },
    close: (state) => {
      state.isOpened = false;
    },
  },
});

export const { open, close } = searchSlice.actions;

export default searchSlice.reducer;
