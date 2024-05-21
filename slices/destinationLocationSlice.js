// slices/currentLocationSlice.js

import { createSlice } from "@reduxjs/toolkit";

const destinationLocationSlice = createSlice({
  name: "destinationLocation",
  initialState: {
    latitude: 47.91101355221306,
    longitude: 106.81344838673327,
    identifier: "dest",
    place_id: null,
    name: "",
  },
  reducers: {
    updateLocation: (state, action) => {
      return {
        ...state,
        latitude: action.payload.latitude || state.latitude,
        longitude: action.payload.longitude || state.longitude,
        identifier: action.payload.identifier || state.identifier,
        place_id: action.payload.place_id || state.place_id,
        name: action.payload.name || state.name,
      };
    },
  },
});

export const { updateLocation } = destinationLocationSlice.actions;
export const selectDestinationLocation = (state) => state.destinationLocation;

export default destinationLocationSlice.reducer;
