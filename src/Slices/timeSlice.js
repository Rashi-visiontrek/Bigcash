import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timer: 10,
};

// TIME SLICE FOR HANDLING THE TIMER OF THE GAME...
const timeSlice = createSlice({
  name: "timeSlice",
  initialState,
  reducers: {
    decreaseTimer: (state, action) => {
      state.timer = state.timer - 1;
      return state;
    },
    resetTimer:(state,action)=>{
        state.timer=10;
        return state;
    },
  },
});

export const {
  decreaseTimer,
  resetTimer
} = timeSlice.actions;
export default timeSlice;