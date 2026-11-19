import { createSlice } from "@reduxjs/toolkit";
import { IPlanDemoState } from "../lib/types/planDemo";

const initialState: IPlanDemoState = {
  isOpen: false,
};

const planDemoSlice = createSlice({
  name: "planDemo",
  initialState,
  reducers: {
    openPlanDemo(state) {
      state.isOpen = true;
    },
    closePlanDemo(state) {
      state.isOpen = false;
    },
  },
});

export const planDemoActions = planDemoSlice.actions;

export default planDemoSlice.reducer;
