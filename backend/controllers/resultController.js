const result = require("../models/result");

exports.submitResult = async (req, res) => {
  try {
    const { user, exam, score } = req.body;
    const newResult = new result({ user, exam, score });
    await newResult.save();
    res.status(201).json(newResult);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getResults = async (req, res) => {
  try {
    // strict mode: false
    const results = await result
      .find()
      .populate({
        path: "exam",
        populate: {
          path: "questions",
        },
      })
      // exclude password when populating
      .populate({
        path: "user",
        select: "-password",
      });
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getResult = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await result
      .findById(id)
      .populate({
        path: "exam",
        populate: {
          path: "questions",
        },
      })
      // exclude password when populating
      .populate({
        path: "user",
        select: "-password",
      });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserResults = async (req, res) => {
  try {
    const { user } = req.params;
    const results = await result
      .find({ user })
      .populate({
        path: "exam",
        populate: {
          path: "questions",
        },
      })
      // exclude password when populating
      .populate({
        path: "user",
        select: "-password",
      });
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteResult = async (req, res) => {
  try {
    const { id } = req.params;
    await result.findByIdAndDelete(id);
    res.status(200).json({ message: "Result deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
