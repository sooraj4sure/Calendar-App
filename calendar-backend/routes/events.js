const express = require("express");
const router = express.Router();
const Event = require("../models/event");


// GET all events
router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// POST new event
router.post("/", async (req, res) => {
  const newEvent = new Event(req.body);
  const saved = await newEvent.save();
  res.json(saved);
});

// PUT update event
// router.put("/:id", async (req, res) => {
//   const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });
//   res.json(updated);
// });

// DELETE an event
router.delete("/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete event" });
  }
});

module.exports = router;
