const mongoose = require("mongoose");

const taskSchema =
  new mongoose.Schema({

    title: {
      type: String,
      required: true
    },

    status: {
      type: String,
      default: "Todo"
    },

    priority: {
      type: String,
      default: "Low"
    },

    dueDate: {
      type: String
    },

    // LINK TASK TO PROJECT
    project: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "Project"
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    createdBy: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User"
    }

  });

module.exports =
  mongoose.model(
    "Task",
    taskSchema
  );