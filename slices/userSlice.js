import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",

  initialState: {
    phoneNumber: "",
    firstName: "",
    id: "",
  },
  reducers: {
    setPhoneNumber(state, action) {
      console.log(action.payload);
      state.phoneNumber = action.payload;
    },
    setFirstName(state, action) {

      console.log(action.payload);
      state.firstName = action.payload;
    },
    setUserId(state, action) {

      console.log(action.payload);
      state.id = action.payload;
    },
  },
});

export const { setPhoneNumber, setFirstName, setUserId } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
