import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import timeSlice from "./Slices/timeSlice";
import questionSliceReducer from "./Slices/questionSlice";
import redeemModalSlice from "./Slices/redeemModalSlice";
import audioSlice from "./Slices/audioSlice";

// REDUX PERSISTED STORE WITH SLICES FOR DIFFERENT FUNCTIONS IN IT...

const rootReducer = combineReducers({
  timeSlice: timeSlice.reducer,
  questionSlice: questionSliceReducer,
  redeemModalSlice: redeemModalSlice.reducer,
  audioSlice: audioSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    persisted: persistedReducer,
  },
});

export default store;
export const persistor = persistStore(store);
