import { createSlice } from "@reduxjs/toolkit";
const messageSlice = createSlice({
  name: "messages",

  initialState: {
    messages: [
      // {
      //   _id: 1,
      //   text: "Hello",
      //   createdAt: new Date(),
      //   map: true,
      //   user: {
      //     _id: 2,
      //   },
      // },
    ],
    editableMapRes: true,
  },

  reducers: {
    addMessage(state, action) {
      state.editableMapRes = false;
      state.messages.push(action.payload);
    },
    updateMessage(state, action) {
      state.editableMapRes = false;
      state.messages = action.payload;
    },

    editMessage(state, action) {
      const { _id, text } = action.payload;
      const existingMessage = state.messages.find(
        (message) => message._id === _id
      );
      if (existingMessage) {
        existingMessage.text = text;
      } else {
        state.messages.push(action.payload);
      }
    },
  },
});

export const { addMessage, updateMessage, editMessage } = messageSlice.actions;

export const selectMessages = (state) => state.message;
export const selectEditableMapRes = (state) => state.editableMapRes;

export default messageSlice.reducer;
