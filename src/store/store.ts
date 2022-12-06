import { configureStore } from "@reduxjs/toolkit";
import createLessonReducer from "./slices/createLessonSlice";

export const store = configureStore({
  reducer: {
    createLesson: createLessonReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
