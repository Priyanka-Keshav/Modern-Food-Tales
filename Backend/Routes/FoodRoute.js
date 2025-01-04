const express = require("express");
const router = express.Router();

const {
  create_Blog,
  get_Blog,
  get_user_blog,
  get_one,
  delete_blog,
  update_blog,
} = require("../Config/BlogFun");

// POST route to create a blog
router.post("/create", create_Blog);

// GET routes for blogs
router.get("/all", get_Blog);
router.get("/user/:id", get_user_blog);
router.get("/:id", get_one);

// PUT route to update a blog
router.put("/update/:id", update_blog);

// DELETE route to delete a blog
router.delete("/delete/:id", delete_blog);

module.exports = router;
