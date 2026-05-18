const router =
  require("express").Router();

const Project =
  require("../models/Project");

const authMiddleware =
  require("../middleware/auth");


// CREATE PROJECT
router.post(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const project =
        await Project.create({

          name: req.body.name,

          description:
            req.body.description,

          createdBy:
            req.user.id

        });

      res.json(project);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: err.message
      });

    }

  }
);


// GET PROJECTS
router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const projects =
        await Project.find({
          createdBy:
            req.user.id
        });

      res.json(projects);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: err.message
      });

    }

  }
);


// UPDATE PROJECT
router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const updatedProject =
        await Project.findByIdAndUpdate(

          req.params.id,

          req.body,

          { new: true }

        );

      res.json(updatedProject);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: err.message
      });

    }

  }
);


// DELETE PROJECT
router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      await Project.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Project deleted"
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