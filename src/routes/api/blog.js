"use strict";

const Blog = require("../../controllers/api/blog");

/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
const router = require("express").Router();



// Get the list of categories
router.get("/", Blog.list);

// Create a new category
router.route("/create").post(Blog.create).get(Blog.create);

// Get a specific category by ID
router.get("/:categoryId", Blog.read);

// Update a specific category by ID
router.put("/:categoryId/update", Blog.update);
router.get("/:categoryId/update", Blog.update);
router.patch("/:categoryId/update", Blog.update);

// Delete a specific category by ID
router.delete("/:categoryId/delete", Blog.deleteBlog);

// Get the list of posts under a specific category
// router.get("/:categoryId/posts", Blog.listCategoryPosts);

module.exports = router;
