const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const jwtSecret = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1] || "aaaa";
    if (!token)
      return res.status(401).send("Access denied. No token provided.");
    console.log(token);
    console.log(jwtSecret);
    console.log(process.env.JWT_SECRET);
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
