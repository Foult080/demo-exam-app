import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  events: [],
  loading: "true",
};

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const res = await axios.get("/api/events");
  return res.data;
});

export const deleteEvents = createAsyncThunk("events/deleteEvents", async (id) => {
  const res = await axios.delete(`/api/events/${id}`);
  return res.data;
})

export const EventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    clearEvents: (state) => {
      state.events = [];
      state.loading = true;
    },
    getEvents: (state) => {
      state.loading = false;
    },
    setEvents: (state, actions) => {
      state.event = actions.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.loading = false;
      state.events = action.payload;
    });
  },
});

export const { getEvents, setEvents, clearEvents } = EventsSlice.actions;

export const selectEvents = (state) => state.events;

export default EventsSlice.reducer;
