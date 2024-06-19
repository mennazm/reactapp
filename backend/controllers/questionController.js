const Question = require("../models/question");

exports.createQuestion = async (req, res) => {
  try {
    const question = req.body;
    const newQuestion = new Question(question);
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id);
    res.status(200).json(question);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    const question = req.body;
    const updatedQuestion = await Question.findByIdAndUpdate(id, question, {
      new: true,
    });
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    await Question.findByIdAndDelete(id);
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
