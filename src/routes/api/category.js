"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
const router = require("express").Router();

const Category = require("../../controllers/api/category");

// ------------------------------------------
// Category
// ------------------------------------------

// Get the list of posts
router.get("/", Category.list);

// Create a new post
router.route("/create").get(Category.create).post(Category.create);

// Get a specific post by ID
router.get("/:postId", Category.read);

// Update a specific post by ID
router.route("/:postId/update").get(Category.update).post(Category.update);

// Delete a specific post by ID
router.get("/:postId/delete", Category.deleteCategory);

module.exports = router;
