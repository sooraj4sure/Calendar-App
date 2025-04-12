
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventModal from './EventModal';
import { v4 as uuidv4 } from 'uuid';

const CalendarView = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.date);
    setModalOpen(true);
  };

  const handleAddEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: uuidv4() }]);
    setModalOpen(false);
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        editable={true}
        selectable={true}
        events={events}
        dateClick={handleDateClick}
      />

      <EventModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        onSave={handleAddEvent}
        selectedDate={selectedDate}
      />
    </>
  );
};

export default CalendarView;
