import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  audio: true,
};

// AUDIO SLICE FOR HANDLING THE AUDIO STATES...
const audioSlice = createSlice({
  name: "audioSlice",
  initialState,
  reducers: {
    toggleAudio: (state, action) => {
      state.audio = !state.audio;
      return state;
    },
  },
});

export const { toggleAudio } = audioSlice.actions;
export default audioSlice;
