import { createSlice } from "@reduxjs/toolkit";
import { IMobileMenuState } from "../lib/types/mobileMenu";

const initialState: IMobileMenuState = {
  isOpen: false,
};

const mobileMenuSlice = createSlice({
  name: "mobileMenu",
  initialState,
  reducers: {
    openMenu(state) {
      state.isOpen = true;
    },
    closeMenu(state) {
      state.isOpen = false;
    },
    toggleMenu(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const mobileMenuActions = mobileMenuSlice.actions;

export default mobileMenuSlice.reducer;
