const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const eventRoutes = require("./routes/events");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

main().catch((err) => console.log(err));

async function main() {
  // await mongoose.connect("mongodb://127.0.0.1:27017/calendarDB");
  // await mongoose.connect(`mongodb+srv://skashyap9711:surajkashyap@calendar.fbomphh.mongodb.net/?retryWrites=true&w=majority&appName=Calendar`);

  // const MONGO_URI ="mongodb+srv://skashyap9711:surajkashyap@calendar.fbomphh.mongodb.net/?retryWrites=true&w=majority&appName=Calendar"
  await mongoose.connect(process.env.MONGO_URI);

}

app.use("/events", eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port 5000");
});
