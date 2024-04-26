// app/store.js

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import currentLocationReducer from "./slices/currentLocationSlice";
import destinationLocationReducer from "./slices/destinationLocationSlice";
import userReducer from "./slices/userSlice";
import tripReducer from "./slices/tripSlice";
import messageReducer from "./slices/messageSlice";
const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),

  reducer: {
    currentLocation: currentLocationReducer,
    destinationLocation: destinationLocationReducer,
    user: userReducer,
    trip: tripReducer,
    message: messageReducer,
    // Add more reducers as needed
  },
});

export default store;
