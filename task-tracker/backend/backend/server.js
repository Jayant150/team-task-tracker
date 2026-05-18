require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use(
  "/api/users",
  require("./routes/user")
);
// Root route
app.use(
  "/api/projects",
  require("./routes/project")
);
app.get("/", (req,res)=>{
  res.send("Server Working");
});
app.use(
  "/api/users",
  require("./routes/auth")
);
// Auth route
app.use("/api/auth", require("./routes/auth"));

app.use("/api/tasks", require("./routes/task"));

app.use("/api/projects", require("./routes/project"));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/tasktracker")
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Start server
app.listen(3000, ()=> console.log("Server running on 3000"));