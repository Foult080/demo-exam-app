import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./Reducers/EventsSlice";
import authReducer from "./Reducers/AuthSlice";

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    auth: authReducer,
  },
});

export default store;