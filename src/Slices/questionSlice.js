// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   questionCount: 0,
//   question: null,
//   gameOver: false,
// };

// // QUESTION SLICE FOR HANDLING THE QUESTIONS...
// const questionSlice = createSlice({
//   name: "questionSlice",
//   initialState,
//   reducers: {
//     setQuestion: (state, action) => {
//       state.question = action.payload;
//       return state;
//     },
//     increaseQuestionCount: (state, action) => {
//       state.questionCount = state.questionCount + 1;
//       return state;
//     },
//     resetQuestionCount: (state, action) => {
//       state.questionCount = 0;
//       return state;
//     },
//     resetQuestion: (state, action) => {
//       state.question = null;
//       return state;
//     },
//     setGameOver: (state, action) => {
//       state.gameOver = true;
//       return state;
//     },
//     resetGameOver: (state, action) => {
//       state.gameOver = false;
//       return state;
//     },
//   },
// });

// export const {
//   increaseQuestionCount,
//   resetQuestionCount,
//   setQuestion,
//   resetQuestion,
//   setGameOver,
//   resetGameOver
// } = questionSlice.actions;
// export default questionSlice;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentLevel: 0,
  totalLevels: 12,
  question: [],
  gameOver: false,
  
};


const questionSlice = createSlice({
  name: "questionSlice",
  initialState,
  reducers: {
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
    increaseLevel: (state) => {
      console.log(state.currentLevel,'state of levels')

      console.log(state.totalLevels,'56789')
      if (state.currentLevel < state.totalLevels) {
        state.currentLevel += 1;
      }
    },
    resetLevel: (state) => {
      state.currentLevel = 0;
    },
    resetQuestion: (state) => {
      state.question = null;
    },
    setGameOver: (state) => {
      state.gameOver = true;
    },
    resetGameOver: (state) => {
      state.gameOver = false;
    },
  },
});

export const {
  setQuestion,
  increaseLevel,
  resetLevel,
  resetQuestion,
  setGameOver,
  resetGameOver
} = questionSlice.actions;

export default questionSlice.reducer;
