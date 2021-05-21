import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getEvents,
  setEvents,
  selectEvents,
  fetchEvents,
} from "../Reducers/EventsSlice";

const Events = () => {
  const event = useSelector(selectEvents);
  const dispatch = useDispatch();
  console.log(event);
  const eventNew = {
    name: "NEW NAME FOR EVENT",
    options: "SOME NEW OPTIONS",
  };
  return (
    <div>
      <button onClick={() => dispatch(getEvents())}>Get</button>
      <button onClick={() => dispatch(setEvents(eventNew))}>Set</button>
      <button onClick={() => dispatch(fetchEvents())}>Fetch</button>
    </div>
  );
};

export default Events;
