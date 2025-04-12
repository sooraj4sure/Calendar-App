const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const eventRoutes = require("./routes/events");

const app = express();
app.use(cors());
app.use(express.json());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/calendarDB");

}

app.use("/events", eventRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
