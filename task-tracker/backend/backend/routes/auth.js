const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req,res)=>{
  const {name,email,password} = req.body;

  const hashed = await bcrypt.hash(password,10);

  const user = await User.create({
    name,
    email,
    password: hashed
  });

  res.json(user);
});

// Login
router.post("/login", async (req,res)=>{
  const {email,password} = req.body;

  const user = await User.findOne({email});
  if(!user) return res.status(400).send("User not found");

  const valid = await bcrypt.compare(password,user.password);
  if(!valid) return res.status(400).send("Wrong password");

  const token = jwt.sign({id:user._id}, "secret123");

  res.json({token});
});

module.exports = router;