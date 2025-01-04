const express = require("express");
const router = express.Router();
const creation = require("../Config/UserFun"); // Ensure the path to UserFun.js is correct

// Route to create a new user
router.post("/create", creation.create_user);
router.post("/login", creation.login);

module.exports = router;
