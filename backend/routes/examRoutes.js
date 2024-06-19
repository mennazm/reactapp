const express = require("express");
const router = express.Router();
const examController = require("../controllers/examController");

/**
 * @openapi
 * /exams:
 *   post:
 *     tags: [Exam]
 *     summary: Create a new exam
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               questions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Exam created successfully
 *       500:
 *         description: Server error
 */
router.post("/", examController.createExam);

/**
 * @openapi
 * /exams:
 *   get:
 *     tags: [Exam]
 *     summary: Get all exams
 *     responses:
 *       200:
 *         description: List of exams
 *       500:
 *         description: Server error
 */
router.get("/", examController.getExams);

/**
 * @openapi
 * /exams/{id}:
 *   get:
 *     tags: [Exam]
 *     summary: Get a specific exam by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the exam
 *     responses:
 *       200:
 *         description: Exam data
 *       500:
 *         description: Server error
 */
router.get("/:id", examController.getExam);

/**
 * @openapi
 * /exams/{id}:
 *   put:
 *     tags: [Exam]
 *     summary: Update an exam
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the exam
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               questions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Exam updated successfully
 *       500:
 *         description: Server error
 */
router.put("/:id", examController.updateExam);

/**
 * @openapi
 * /exams/{examId}/questions/{questionId}:
 *   delete:
 *     tags: [Exam]
 *     summary: Remove a question from an exam
 *     parameters:
 *       - in: path
 *         name: examId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the exam
 *       - in: path
 *         name: questionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the question
 *     responses:
 *       200:
 *         description: Question removed successfully
 *       500:
 *         description: Server error
 */
router.delete(
  "/:examId/questions/:questionId",
  examController.removeQuestionFromExam
);

/**
 * @openapi
 * /exams/{examId}/questions/{questionId}:
 *   post:
 *     tags: [Exam]
 *     summary: Add a question to an exam
 *     parameters:
 *       - in: path
 *         name: examId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the exam
 *       - in: path
 *         name: questionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the question
 *     responses:
 *       200:
 *         description: Question added successfully
 *       500:
 *         description: Server error
 */
router.post("/:examId/questions/:questionId", examController.addQuestionToExam);

module.exports = router;
