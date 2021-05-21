import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  event: { name: "new Event", options: "some options" },
  loading: 'idle',
};

export const fetchEvents = createAsyncThunk(
    'events/fetchEvents',
    async () => {
        const res = await axios.get("/api/events");
        return res.data;
    }
)

export const EventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    getEvents: (state) => {
      state.loading = false;
    },
    setEvents: (state, actions) => {
        state.event = actions.payload;
        state.loading = false;
    }
  },
  extraReducers: (builder) => {
        builder.addCase(fetchEvents.pending, state => {
            state.loading = true;
        }).addCase(fetchEvents.fulfilled, (state, action) =>{
            state.loading = false;
            state.event = action.payload;
        })
  }
});

export const { getEvents, setEvents } = EventsSlice.actions;

export const selectEvents = (state) => state.events;

export default EventsSlice.reducer;
