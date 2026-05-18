const express = require("express");
const router = express.Router();

const Project = require("../models/Project");
const auth = require("../middleware/auth");


// Create project
router.post("/", auth, async (req, res) => {
  try {
    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      createdBy: req.user.id
    });

    res.json(project);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// Get all projects
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find({
      createdBy: req.user.id
    });

    res.json(projects);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// Update project
router.put("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(project);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// Delete project
router.delete("/:id", auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);

    res.json({
      message: "Project deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;