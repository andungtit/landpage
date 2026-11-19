import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INavigationState } from "../lib/types/navigation";

const initialState: INavigationState = {
  activeHref: "#home",
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setActiveHref(state, action: PayloadAction<string>) {
      state.activeHref = action.payload;
    },
  },
});

export const navigationActions = navigationSlice.actions;

export default navigationSlice.reducer;
