const router = require("express").Router();

const User = require("../models/user");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

router.put(
  "/reset-password",
  async (req, res) => {

    try {

      const { email, newPassword } =
        req.body;

      const user =
        await User.findOne({ email });

      if (!user) {

        return res.status(400).json({
          message: "User not found"
        });

      }

      const hashed =
        await bcrypt.hash(
          newPassword,
          10
        );

      user.password = hashed;

      await user.save();

      res.json({
        message:
          "Password reset successful"
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: err.message
      });

    }

  }
);
// REGISTER
router.post("/register", async (req, res) => {

  try {

    const { name, email, password } =
      req.body;

    // CHECK EXISTING USER
    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "Email already exists"
      });

    }

    // HASH PASSWORD
    const hashed =
      await bcrypt.hash(password, 10);

    // CREATE USER
    const user = await User.create({

      name,

      email,

      password: hashed

    });

    res.json({
      message: "Registration successful",
      user
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

});


// LOGIN
router.post("/login", async (req, res) => {

  try {

    const { email, password } =
      req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "User not found"
      });

    }

    const valid =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!valid) {

      return res.status(400).json({
        message: "Wrong password"
      });

    }

    const token = jwt.sign(

      { id: user._id },

      process.env.JWT_SECRET

    );

    res.json({ token });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

});

module.exports = router;