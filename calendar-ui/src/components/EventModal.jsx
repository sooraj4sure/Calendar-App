import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const EventModal = ({ isOpen, onRequestClose, onSave, }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("work");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      title,
      start,
      end,
      backgroundColor: categoryColor(category),
    });
    setTitle("");
    setStart("");
    setEnd("");
  };

  const categoryColor = (cat) => {
    const map = {
      exercise: "#34d399",
      eating: "#fbbf24",
      work: "#3b82f6",
      relax: "#8b5cf6",
      family: "#f472b6",
      social: "#ef4444",
    };
    return map[cat] || "#000";
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="p-6 bg-white rounded shadow w-96 mx-auto mt-20"
    >
      <h2 className="text-xl font-semibold mb-4">Create Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Event Title"
          className="w-full border p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2"
        >
          <option value="exercise">Exercise</option>
          <option value="eating">Eating</option>
          <option value="work">Work</option>
          <option value="relax">Relax</option>
          <option value="family">Family</option>
          <option value="social">Social</option>
        </select>
        <input
          type="datetime-local"
          className="w-full border p-2"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          className="w-full border p-2"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Event
        </button>
      </form>
    </Modal>
  );
};

export default EventModal;
