// slices/currentLocationSlice.js

import { createSlice } from "@reduxjs/toolkit";

const destinationLocationSlice = createSlice({
  name: "destinationLocation",
  initialState: {
    latitude: 47.91101355221306,
    longitude: 106.81344838673327,
    identifier: "dest",
    name: "",
    // latitudeDelta: 0.01,
    // longitudeDelta: 0.01,
  },
  reducers: {
    updateLocation: (state, action) => {
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };
    },
  },
});

export const { updateLocation } = destinationLocationSlice.actions;
export const selectDestinationLocation = (state) => state.destinationLocation;

export default destinationLocationSlice.reducer;
