import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",

  initialState: {
    phoneNumber: "99243596",
    firstName: "",
    id: 2,
  },
  reducers: {
    setPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
    setFirstName(state, action) {
      state.firstName = action.payload;
    },
    setUserId(state, action) {
      state.id = action.payload;
    },
  },
});

export const { setPhoneNumber, setFirstName, setUserId } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
