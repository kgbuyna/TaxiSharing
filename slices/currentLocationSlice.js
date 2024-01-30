// slices/currentLocationSlice.js

import { createSlice } from "@reduxjs/toolkit";

const currentLocationSlice = createSlice({
  name: "currentLocation",
  initialState: {
    latitude: null,
    longitude: null,
    identifier: "current",
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    name: "",
  },
  reducers: {
    updateLocation: (state, action) => {
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        identifier: action.payload.identifier,
        name: action.payload.name,
      };
    },
  },
});

export const { updateLocation } = currentLocationSlice.actions;
export const selectCurrentLocation = (state) => state.currentLocation;

export default currentLocationSlice.reducer;
