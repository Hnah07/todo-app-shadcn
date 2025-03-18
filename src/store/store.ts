import { configureStore } from "@reduxjs/toolkit";
import { todoApi } from "../todoApi";
import filterReducer from "./filterSlice";
import paginationReducer from "./paginationSlice";

export const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
    filters: filterReducer,
    pagination: paginationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
