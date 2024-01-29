// slices/currentLocationSlice.js

import { createSlice } from "@reduxjs/toolkit";

const destinationLocationSlice = createSlice({
  name: "destinationLocation",
  initialState: {
    latitude: null,
    longitude: null,
    identifier: "dest",
    name:"",
    // latitudeDelta: 0.01,
    // longitudeDelta: 0.01,
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

export const { updateLocation } = destinationLocationSlice.actions;
export const selectDestinationLocation = (state) => state.destinationLocation;

export default destinationLocationSlice.reducer;
