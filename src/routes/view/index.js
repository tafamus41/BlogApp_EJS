"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// ROUTER INDEX:

// URL: /

// blogCategory:
router.use("/category", require("./blog"));
// blogPost:
router.use("/post", require("./category"));
// user:
router.use("/user", require("./user"));

module.exports = router;
