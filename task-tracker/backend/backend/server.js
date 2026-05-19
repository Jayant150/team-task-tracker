require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


// Middleware
app.use(express.json());

app.use(cors({
  origin: "*"
}));


// Routes
app.use(
  "/api/users",
  require("./routes/user")
);

app.use(
  "/api/auth",
  require("./routes/auth")
);

app.use(
  "/api/tasks",
  require("./routes/task")
);

app.use(
  "/api/projects",
  require("./routes/project")
);


// Root Route
app.get("/", (req, res) => {

  res.send("Server Working");

});


// MongoDB Connection'
console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)

.then(() => {

  console.log("MongoDB Connected");

})

.catch((err) => {

  console.log(err);

});


// Port
const PORT = process.env.PORT || 3000;


// Start Server
app.listen(PORT, () => {

  console.log(`Server running on ${PORT}`);

});