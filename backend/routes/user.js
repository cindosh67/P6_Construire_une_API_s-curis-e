const express = require('express')
const router = express.Router();

const userCtrl = require('../controllers/user');
const emailCtrl = require('../middleware/check-email');
const passCtrl = require('../middleware/check-password')

router.post('/signup',emailCtrl, passCtrl, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;