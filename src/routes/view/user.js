"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const router = require("express").Router();

const User = require("../../controllers/view/user");

// ------------------------------------------
// User
// ------------------------------------------


router.route("/login").post(User.login).get(User.login);
// Handle logout (POST since it involves action)
router.get("/logout", User.logout);

// Get the list of users
router.get("/", User.list);
// Create a new user
router.route("/register").post(User.register).get(User.register);
// Get a specific user by ID
router.get("/:id", User.read);


module.exports = router;
