const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

// Create Task
// Create Task
router.post("/", auth, async (req, res) => {
    try {
      const task = await Task.create({
        title: req.body.title,
        description: req.body.description,
        project: req.body.project,
        assignedTo: req.body.assignedTo,
        status: req.body.status,
        priority: req.body.priority,
        dueDate: req.body.dueDate
      });
  
      res.json(task);
  
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  });
router.get("/dashboard/stats", auth, async (req,res)=>{
    try{
      const totalTasks = await Task.countDocuments();
  
      const completedTasks = await Task.countDocuments({
        status: "Done"
      });
  
      const overdueTasks = await Task.countDocuments({
        dueDate: { $lt: new Date() },
        status: { $ne: "Done" }
      });
  
      res.json({
        totalTasks,
        completedTasks,
        overdueTasks
      });
  
    }catch(error){
      res.status(500).json({
        message:error.message
      });
    }
  });

// Get Tasks

  
router.get("/", auth, async (req, res) => {
    try {
      const tasks = await Task.find()
        .populate("project", "title description")
        .populate("assignedTo", "name email");
  
      res.json(tasks);
  
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  });

// Update Task
router.put("/:id", auth, async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      if (!task) {
        return res.status(404).json({
          message: "Task not found"
        });
      }
  
      res.json(task);
  
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  });

  
// Delete Task
router.delete("/:id", auth, async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
  
      if (!task) {
        return res.status(404).json({
          message: "Task not found"
        });
      }
  
      await Task.findByIdAndDelete(req.params.id);
  
      res.json({
        message: "Task deleted successfully"
      });
  
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  });

module.exports = router;