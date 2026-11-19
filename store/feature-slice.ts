import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeatureKey, IFeatureState } from "../lib/types/feature";

const initialState: IFeatureState = {
  activeFeature: "save",
};

const featureSlice = createSlice({
  name: "feature",
  initialState,
  reducers: {
    selectFeature(state, action: PayloadAction<FeatureKey | null>) {
      state.activeFeature = action.payload;
    },
    toggleFeature(state, action: PayloadAction<FeatureKey>) {
      state.activeFeature =
        state.activeFeature === action.payload ? null : action.payload;
    },
  },
});

export const featureActions = featureSlice.actions;

export default featureSlice.reducer;
