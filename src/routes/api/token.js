"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const { list, create, read, update, deletee } = require('../controllers/firm');

const { isAdmin } = require('../middlewares/permissions');



// URL: /firms
router.use(isAdmin)

router.route('/').get(list).post(create);

router.route('/:id').get(read).put(update).patch(update).delete(deletee);

/* ------------------------------------------------------- */
module.exports = router;