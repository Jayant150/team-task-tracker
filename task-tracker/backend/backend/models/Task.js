const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    trim: true
  },

  status: {
    type: String,
    enum: [
      "Todo",
      "In Progress",
      "Done"
    ],
    default: "Todo"
  },

  priority: {
    type: String,
    enum: [
      "Low",
      "Medium",
      "High"
    ],
    default: "Low"
  },

  dueDate: {
    type: Date,
    default: null
  },

  // LINK TASK TO PROJECT
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    default: null
  },

  // ASSIGNED USER
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  // CREATED BY USER
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

},
{
  timestamps: true
});

module.exports =
  mongoose.model(
    "Task",
    taskSchema
  );