
import React from "react";
import moment from "moment";

const CustomEvent = ({ event }) => {
  const startTime = moment(event.start).format("h:mm A");

  return (
    <div>
      <div style={{ fontSize: "0.75rem", fontWeight: "bold" }}>{startTime}</div>
      <div>{event.title}</div>
    </div>
  );
};

export default CustomEvent;
