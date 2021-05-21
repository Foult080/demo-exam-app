import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./Reducers/EventsSlice";

export const store = configureStore({
  reducer: {
    events: eventsReducer,
  },
});
