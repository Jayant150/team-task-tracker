const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Root route
app.get("/", (req,res)=>{
  res.send("Server Working");
});

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