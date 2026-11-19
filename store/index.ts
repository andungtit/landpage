import { configureStore } from "@reduxjs/toolkit";

import featureReducer from "./feature-slice";
import mobileMenuReducer from "./mobileMenu-slice";
import navigationReducer from "./navigation-slice";
import planDemoReducer from "./planDemo-slice";

const store = configureStore({
  reducer: {
    feature: featureReducer,
    mobileMenu: mobileMenuReducer,
    navigation: navigationReducer,
    planDemo: planDemoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
