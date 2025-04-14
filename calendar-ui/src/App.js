import React, { useState, useEffect } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";

import EventModal from "./components/EventModal";
import DeleteModal from "./components/DeleteModal";

import { useDispatch, useSelector } from "react-redux";
import { addEvent } from "./redux/eventSlice";

import CustomEvent from "./components/CustomEvent";

const localizer = momentLocalizer(moment);

function App () {
  const dispatch = useDispatch();


  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [allEvents, setEvents] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  //  Fetch events from backend
  useEffect(() => {
    fetch(`https://calendar-app-ui-zpc7.vercel.app/`)
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Failed to fetch events", err));
  }, []);

  //  Save new event to backend and Redux
  const handleAddEvent = (event) => {
    fetch(`https://calendar-app-ui-zpc7.vercel.app/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(addEvent(data));
        setEvents((prev) => [...prev, data]);
        setShowModal(false);
      })
      .catch((err) => console.error("Failed to save event", err));
  };

  //  Open event creation modal
  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setShowModal(true);
  };

  //  Open delete modal with selected event
  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setShowDeleteModal(true);
  };

  //  Confirm delete
  const confirmDelete = () => {
    fetch(`https://calendar-app-ui-zpc7.vercel.app/`, {
      method: "DELETE",
    })
      .then(() => {
        setEvents((prev) => prev.filter((e) => e._id !== selectedEvent._id));
        setShowDeleteModal(false);
        setSelectedEvent(null);
      })
      .catch((err) => console.error("Delete error:", err));
  };

  //  Category-based event colors
  const eventStyleGetter = (event) => {
    const categoryColors = {
      exercise: "#4CAF50",
      eating: "#FF9800",
      work: "#2196F3",
      relax: "#9C27B0",
      family: "#E91E63",
      social: "#FF5722",
    };
    return {
      style: {
        backgroundColor: categoryColors[event.category] || "#607D8B",
        borderRadius: "5px",
        color: "white",
        padding: "4px",
      },
    };
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">📅 My Personal Calendar</h1>


      <BigCalendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        selectable
        style={{ height: 600 }}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleEventSelect}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CustomEvent,
        }}
      />

      {/* Add Event Modal */}
      {showModal && (
        <EventModal
          onClose={() => setShowModal(false)}
          onSave={handleAddEvent}
          slotInfo={selectedSlot}
        />
      )}

      {/* Delete Event Modal */}
      {showDeleteModal && selectedEvent && (
        <DeleteModal
          eventTitle={selectedEvent.title}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}

export default App;
