const router = require('express').Router();
const invoice = require('../controller/invoice');
const auth = require('../middleware/auth');


router.route('/')
.post(auth,invoice.invoice_gen)

module.exports = router;