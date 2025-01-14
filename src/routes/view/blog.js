"use strict";

const Blog = require("../../controllers/view/blog");

/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
const router = require("express").Router();




router.get("/", Blog.list);

router.route("/create").post(Blog.create).get(Blog.create);

router.get("/:id",Blog.read)

router.get("/:id/delete",Blog.deleteBlog)

router.get("/:categoryId/update", Blog.update);


module.exports = router;
