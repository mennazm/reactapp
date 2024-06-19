require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const userRouter = require("./routes/usersRoutes");
const questionRouter = require("./routes/questionRoutes");
const examRoutes = require("./routes/examRoutes");
const resultRoutes = require("./routes/resultRoutes");
const authRouter = require("./routes/authRoutes");
const isAuth = require("./middlewares/auth/isAuth");

const app = express();
const mongoDBURL = process.env.mongoDBURL;
const port = process.env.PORT || 3000;
const swaggerOptions = require("./swagger.json");
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow only this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => res.json({ message: "Server is running" }).status(200));

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Non-auth routes
app.use("", authRouter);

// Authenticated routes
app.use(isAuth);
app.use("/users", userRouter);
app.use("/questions", questionRouter);
app.use("/exams", examRoutes);
app.use("/results", resultRoutes);

// Error handler
app.use((error, req, res, next) => {
  res.status(500).json({ data: `Error MW ${error}` });
});

// Connect to MongoDB and start the server
mongoose.connect(mongoDBURL)
  .then(() => {
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch((err) => console.log("Can't connect to server: " + err));
