const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;
/**
 * @desc Register a new user
 * @route POST /users
 * @body {string} email
 *
 *
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

/**
 * @desc Login a user
 * @route POST /users/login
 * @body {string} email
 * @body {string} password
 *
 */

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      jwtSecret
    );
    res.status(200).json({
      message: "User logged in successfully",
      token,
      userId: user._id,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      users,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// get by mongoId
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(400).json({});
  }
};

exports.updateUser = async (req, res) => {
  try {
    req.body.role = "user";
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
