

const express = require('express');
const router = express.Router();
const { registerDiscord,registerAccount } = require('../controller/AccountController')
router.post('/discordId', registerDiscord);
router.post('/', registerAccount);



module.exports = router;






