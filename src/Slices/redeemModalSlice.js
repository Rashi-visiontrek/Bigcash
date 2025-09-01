import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalRedeemFive: false,
  modalRedeemTen: false,
  redeemData: [],
  drawSpin: false,
};

// REDEEM PRIZE MODAL SLICE FOR HANDLING THE PRIZE REDEEM USER FUNCTIONALITY...
const redeemModalSlice = createSlice({
  name: "redeemModalSlice",
  initialState,
  reducers: {
    openModalRedeemFive: (state, action) => {
      state.modalRedeemFive = true;
      return state;
    },
    openModalRedeemTen: (state, action) => {
      state.modalRedeemTen = true;
      return state;
    },
    setRedeemData: (state, action) => {
      state.redeemData = action.payload;
      return state;
    },
    setDrawSpin: (state, action) => {
      state.drawSpin = true;
      return state;
    },
    resetModalRedeem: (state, action) => {
      state.modalRedeemFive = false;
      state.modalRedeemTen = false;
      return state;
    },
    resetRedeemData: (state, action) => {
      state.redeemData = [];
      return state;
    },
    resetDrawSpin: (state, action) => {
      state.drawSpin = false;
      return state;
    },
  },
});

export const {
  openModalRedeemFive,
  openModalRedeemTen,
  resetModalRedeem,
  setRedeemData,
  resetRedeemData,
  setDrawSpin,
  resetDrawSpin,
} = redeemModalSlice.actions;
export default redeemModalSlice;
