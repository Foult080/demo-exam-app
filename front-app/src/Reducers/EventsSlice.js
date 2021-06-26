import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const config = {
  headers: {
    "Content-type": "application/json",
  },
};

const initialState = {
  events: [],
  event: {},
  errors: [],
  loading: "true",
};

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const res = await axios.get("/api/events");
  return res.data;
});

export const deleteEvents = createAsyncThunk(
  "events/deleteEvents",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/api/events/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/events/", data, config);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

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
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(deleteEvents.fulfilled, (state, action) => {
        let data = state.events.filter((item) => item._id !== action.meta.arg);
        state.events = data;
        state.errors = action.payload;
        setTimeout(() => (state.errors = []), 5000);
      })
      .addCase(deleteEvents.rejected, (state, action) => {
        state.errors = action.payload;
        state.loading = false;
      }).addCase(createEvent.fulfilled, (state, action) => {
        state.event = action.payload;
        console.log(initialState);
      })
  },
});

export const { getEvents, setEvents, clearEvents } = EventsSlice.actions;

export const selectEvents = (state) => state.events;

export default EventsSlice.reducer;
