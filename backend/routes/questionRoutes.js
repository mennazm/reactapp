const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");
const {isAdmin,isUser} = require("../middlewares/auth/authRules");


/**
 * @openapi
 * /questions:
 *   post:
 *     tags: [Question]
 *     summary: Create a new question
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - answer
 *               - grade
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *               grade:
 *                 type: number
 *     responses:
 *       201:
 *         description: Question created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       500:
 *         description: Server error
 */

/**
 * @openapi
 * /questions:
 *   get:
 *     tags: [Question]
 *     summary: Get all questions
 *     responses:
 *       200:
 *         description: A list of questions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 *       500:
 *         description: Server error
 */

/**
 * @openapi
 * /questions/{id}:
 *   get:
 *     tags: [Question]
 *     summary: Get a question by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The question ID
 *     responses:
 *       200:
 *         description: A single question
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       404:
 *         description: Question not found
 */

/**
 * @openapi
 * /questions/{id}:
 *   put:
 *     tags: [Question]
 *     summary: Update a question by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The question ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *               grade:
 *                 type: number
 *     responses:
 *       200:
 *         description: Question updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       500:
 *         description: Server error
 */

/**
 * @openapi
 * /questions/{id}:
 *   delete:
 *     tags: [Question]
 *     summary: Delete a question by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The question ID
 *     responses:
 *       200:
 *         description: Question deleted successfully
 *       500:
 *         description: Server error
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       properties:
 *         question:
 *           type: string
 *         answer:
 *           type: string
 *         grade:
 *           type: number
 */

router.post("/", isAdmin, questionController.createQuestion);
router.get("/", isAdmin, questionController.getAllQuestions);
router.get("/:id", isAdmin, questionController.getQuestionById);
router.put("/:id", isAdmin, questionController.updateQuestion);
router.delete("/:id", isAdmin, questionController.deleteQuestion);

module.exports = router;
