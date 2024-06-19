const router = require("express").Router();
const usersController = require("../controllers/userController");

/**
 * @openapi
 * /login:
 *   post:
 *     tags: [Auth]
 *     summary: Login a user
 *     description: Logs in a user and returns a token if the credentials are valid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 userId:
 *                   type: number
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/login", usersController.login);

/**
 * @openapi
 * /register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     description: Registers a new user and returns a token if the registration is successful
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 userId:
 *                   type: number
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/register", usersController.register);

module.exports = router;
