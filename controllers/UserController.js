const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const errors = [];
    // see if user exist
    const user = await User.findOne({ email });
    if (user) {
      errors.push({ message: "This User already exist on our Database" });
      return res.status(400).send({
        success: false,
        errors,
      });
    }

    // create an instance of user
    let newUser = new User({
      name,
      email,
      password,
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // save user
    await newUser.save();

    return res.status(200).send({
      success: true,
      message: "User registered successfully"
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      success: false,
      message: "Server Error",
      data: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errors = [];
    const user = await User.findOne({ email });
    if (!user) {
      errors.push({ message: "This User does not exist" });
      return res.status(404).send({
        success: false,
        errors,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      errors.push({ message: "Invalid Password" });
      return res.status(404).send({
        success: false,
        errors,
      });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(payload, config.get("JWT_SECRET"), {
      expiresIn: 360000,
    });
    return res.status(200).send({
      success: true,
      token,
      message: "User Logged In",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      success: false,
      message: "Server Error",
      data: error.message,
    });
  }
};

exports.getLoggedInUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.status(200).send({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      success: false,
      message: "Server Error",
      data: error.message,
    });
  }
};
