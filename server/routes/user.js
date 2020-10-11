const router = require('express').Router();
const user = require('../controller/user');
const auth = require('../middleware/auth');

router.route('/')
.post(user.save)

router.route('/edit')
.post(auth,user.edit)

router.route('/list/:start/:length')
.get(auth,user.listAll);

router.route('/detail')
.get(auth,user.geDetail);

router.route('/login')
.post(user.login);

module.exports = router;