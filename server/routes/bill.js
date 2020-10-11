const router = require('express').Router();
const Bill = require('../controller/bill');
const auth = require('../middleware/auth');


router.route('/')
.post(auth,Bill.save)

router.route('/detail')
.post(auth,Bill.geDetail)

router.route('/list/:start/:length')
.get(auth,Bill.listAll);

router.route('/delete')
.post(auth,Bill.delete)

module.exports = router;