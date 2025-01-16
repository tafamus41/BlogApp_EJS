"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const { login,refresh,logout } = require('../../controllers/view/auth');
const loginLimiter = require('../../middlewares/loginLimiter');

// URL: /sales

router.route('/login')
    .post(loginLimiter, login).get(login)

router.route('/refresh')
    .get(refresh)

router.route('/logout')
    .post(logout)
/* ------------------------------------------------------- */
module.exports = router;