const router =
  require("express").Router();

const User =
  require("../models/user");

const authMiddleware =
  require("../middleware/auth");


router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const users =
        await User.find();

      res.json(users);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: err.message
      });

    }

  }
);

module.exports = router;