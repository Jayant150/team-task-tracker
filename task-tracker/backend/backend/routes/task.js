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

      const task = await Task.create({
        ...req.body,
        createdBy: req.user.id
      });

      res.json(task);

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
      }).populate("project")
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
// UPDATE TASK
router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const updatedTask =
        await Task.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );

      res.json(updatedTask);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: err.message
      });

    }

  }
);
module.exports = router;