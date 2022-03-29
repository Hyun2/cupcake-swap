

const express = require('express');
const router = express.Router();
const { registerDiscord } = require('../controller/AccountController')
router.post('/', registerDiscord);


module.exports = router;






