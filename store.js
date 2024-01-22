// app/store.js

import { configureStore } from '@reduxjs/toolkit';
import currentLocationReducer  from './slices/currentLocationSlice';

const store = configureStore({
  reducer: {
    currentLocation: currentLocationReducer,
    // Add more reducers as needed
  },
});

export default store;
