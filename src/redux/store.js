import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./studentSlice";

const store = configureStore({
  reducer: {
    students: studentReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
