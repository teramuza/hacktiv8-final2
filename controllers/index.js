const express = require('express');
const router = express.Router();
const userRoute = require('./users');
const socialMediaRoute = require('./socialmedia');
const photoRoute = require('./poto');
const commentRoute = require('./comment')
const verifyToken = require('../middleware/verifyToken');

router.use('/users', userRoute);
router.use('/socialmedias', verifyToken, socialMediaRoute);
router.use('/photo', verifyToken,photoRoute);
router.use('/comment', verifyToken,commentRoute);

module.exports = router;
