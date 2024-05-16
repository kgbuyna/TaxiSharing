// slices/currentLocationSlice.js

import { createSlice } from "@reduxjs/toolkit";

const currentLocationSlice = createSlice({
  name: "currentLocation",
  initialState: {
    latitude: 47.920764148238305,
    longitude: 106.90519639660427,
    identifier: "current",
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    name: "",
  },
  reducers: {
    updateLocation: (state, action) => {
      return {
        ...state,
        latitude: action.payload.latitude || state.latitude,
        longitude: action.payload.longitude || state.longitude,
        identifier: action.payload.identifier || state.identifier,
        latitudeDelta: action.payload.latitudeDelta || state.latitudeDelta,
        longitudeDelta: action.payload.longitudeDelta || state.longitudeDelta,
        name: action.payload.name || state.name,
      };
    },
  },
});

export const { updateLocation } = currentLocationSlice.actions;
export const selectCurrentLocation = (state) => state.currentLocation;

export default currentLocationSlice.reducer;
