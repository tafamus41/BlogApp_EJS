"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const { list, create, read, update, deleteToken } = require('../../controllers/view/token');

const { isAdmin } = require('../../middlewares/permissions');



// URL: /firms
router.use(isAdmin)

router.route('/').get(list).post(create);

router.route('/:id').get(read)

/* ------------------------------------------------------- */
module.exports = router;