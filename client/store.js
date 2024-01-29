// app/store.js

import { configureStore } from '@reduxjs/toolkit';
import currentLocationReducer  from './slices/currentLocationSlice';
import destinationLocationReducer from './slices/destinationLocationSlice';
const store = configureStore({
  reducer: {
    currentLocation: currentLocationReducer,
    destinationLocation: destinationLocationReducer,
    // Add more reducers as needed
  },
});

export default store;
