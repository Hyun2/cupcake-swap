const express = require('express');
const router = express.Router();
const { AccountInfoList } = require('../database/models');
const { getSwapId } = require('../controller/SwapController');

router.get('/', async (req, res) => {
	try {
		//const accountInfo = await AccountInfoList.create({ address: "0x0", discordId: "jun" });

		res.send('swapRouter test입니다1.');
	} catch (e) {
		res.send('오류가 생겼습니다 확인해주세요!');
		console.log(e);
	}
});

// router.get('')

module.exports = router;

// const { registerDiscord } = require('../controller/AccountController')
// router.post('/', registerDiscord);
