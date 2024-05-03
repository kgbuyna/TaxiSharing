// slices/currentLocationSlice.js

import { createSlice } from "@reduxjs/toolkit";

const tripSlice = createSlice({
  name: "trip",
  initialState: {
    mateLocation: {
      latitude: null,
      longitude: null,
      identifier: "mateLoc",
    },
    mateDestination: {
      latitude: null,
      longitude: null,
      identifier: "mateDestinationLoc",
    },
    meetingLocation: {
      latitude: null,
      longitude: null,
    },
    polyline: "",
    taxiCoordinates: [],
    soloTaxiCoordinates: [],
    groupTaxiCoordinates: [],
  },
  reducers: {
    updateTrip(state, action) {
      const {
        mateLocation,
        mateDestination,
        meetingLocation,
        polyline,
        soloTaxiCoordinates,
        groupTaxiCoordinates,
      } = action.payload;

      // Only update values that are provided in the payload
      if (mateLocation) {
        state.mateLocation = { ...state.mateLocation, ...mateLocation };
      }
      if (mateDestination) {
        state.mateDestination = {
          ...state.mateDestination,
          ...mateDestination,
        };
      }
      if (meetingLocation) {
        state.meetingLocation = {
          ...state.meetingLocation,
          ...meetingLocation,
        };
      }
      if (polyline !== undefined) {
        state.polyline = polyline;
      }
      if (soloTaxiCoordinates) {
        state.soloTaxiCoordinates = soloTaxiCoordinates;
      }
      if (groupTaxiCoordinates) {
        state.groupTaxiCoordinates = groupTaxiCoordinates;
      }
    },
  },
});

export const { updateTrip } = tripSlice.actions;
export const selectTrip = (state) => state.trip;

export default tripSlice.reducer;
