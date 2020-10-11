const router = require('express').Router();
const product = require('../controller/product');
const auth = require('../middleware/auth');


router.route('/')
.post(auth,product.save)

router.route('/detail')
.post(auth,product.geDetail)

router.route('/list/:start/:length')
.get(product.listAll);

router.route('/delete')
.post(auth,product.delete)

module.exports = router;