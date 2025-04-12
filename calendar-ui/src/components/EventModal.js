import React, { useState } from "react";

const EventModal = ({ onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("exercise");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      title,
      category,
      start: new Date(`${date}T${startTime}`),
      end: new Date(`${date}T${endTime}`),
    });
    onClose(); // Close modal after saving
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New Event</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="exercise">Exercise</option>
            <option value="eating">Eating</option>
            <option value="work">Work</option>
            <option value="relax">Relax</option>
            <option value="family">Family</option>
            <option value="social">Social</option>
          </select>

          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />

          <button type="submit" className="btn btn-save">Save</button>
          <button type="button" className="btn btn-cancel" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
