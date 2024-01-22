// slices/currentLocationSlice.js

import { createSlice } from '@reduxjs/toolkit';

const currentLocationSlice = createSlice({
  name: 'currentLocation',
  initialState: {
    latitude: null,
    longitude: null,
    identifier: '',
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  },
  reducers: {
    updateLocation: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.identifier = action.payload.identifier;
    },
  },
});

export const { updateLocation } = currentLocationSlice.actions;
export const selectCurrentLocation = (state) => state.currentLocation;

export default currentLocationSlice.reducer;
