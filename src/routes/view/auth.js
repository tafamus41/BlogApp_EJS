"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const { login,refresh,logout } = require('../../controllers/view/auth');
const loginLimiter = require('../../middlewares/loginLimiter');

// URL: /sales

router.route('/')
    .post(loginLimiter, login)

router.route('/refresh')
    .get(refresh)

router.route('/logout')
    .post(logout)
/* ------------------------------------------------------- */
module.exports = router;