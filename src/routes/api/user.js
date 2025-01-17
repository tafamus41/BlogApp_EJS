"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const router = require("express").Router();

const {list,register,read,update} = require("../../controllers/api/user");

// ------------------------------------------
// User
// ------------------------------------------


// router.route("/login").post().get();
// Handle logout (POST since it involves action)
// router.route("/logout").get(User.logout);

// User management routes
// Get the list of users
router.get("/", list)
// Create a new user
router.route("/register").post(register).get(register);
// Get a specific user by ID
router.get("/:id", read);
// Update a specific user by ID
// router.put("/:id/update", User.update);
// router.patch("/:id/update", User.update);
// Delete a specific user by ID
// router.delete("/:id/delete", User.delete);

module.exports = router;
