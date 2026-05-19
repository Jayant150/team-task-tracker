const router = require("express").Router();

const Task = require("../models/Task");

const authMiddleware =
  require("../middleware/auth");


// CREATE TASK
router.post(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      console.log(req.body);

      const task = new Task({
        title: req.body.title,
        status: req.body.status,
        priority: req.body.priority,
        dueDate: req.body.dueDate,
        project: req.body.project || null,
        assignedTo: req.body.assignedTo || null,
        createdBy: req.user.id
      });

      await task.save();

      const populatedTask =
        await Task.findById(task._id)
          .populate("project")
          .populate("assignedTo");

      res.json(populatedTask);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: err.message
      });

    }

  }
);


// GET TASKS
router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const tasks = await Task.find({
        createdBy: req.user.id
      })
      .populate("project")
      .populate("assignedTo");

      res.json(tasks);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: err.message
      });

    }

  }
);


// UPDATE TASK
router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const updatedTask =
        await Task.findByIdAndUpdate(
          req.params.id,
          {
            title: req.body.title,
            status: req.body.status,
            priority: req.body.priority,
            dueDate: req.body.dueDate,
            project: req.body.project || null,
            assignedTo:
              req.body.assignedTo || null
          },
          {
            new: true
          }
        )
        .populate("project")
        .populate("assignedTo");

      res.json(updatedTask);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: err.message
      });

    }

  }
);


// DELETE TASK
router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      await Task.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "Task deleted"
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: err.message
      });

    }

  }
);


module.exports = router;