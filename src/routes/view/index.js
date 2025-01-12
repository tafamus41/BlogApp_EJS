"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// ROUTER INDEX:

// URL: /


router.use("/category", require("./category"));

router.use("/", require("./blog"));

router.use("/user", require("./user"));

router.use("/token", require("./token"));

router.use("/comment", require("./comment"));

router.use("/auth", require("./auth"));

module.exports = router;
