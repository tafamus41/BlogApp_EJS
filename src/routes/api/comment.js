"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const { list, create, read, update, deleteComment } = require('../../controllers/api/comment');
const { isStaff } = require('../../middlewares/permissions');

// URL: /products

router.route('/').get(list).post(create);

router.route('/:id').get(read).put(update).patch(update).delete(deleteComment);

/* ------------------------------------------------------- */
module.exports = router;