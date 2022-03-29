const { swapProposalList } = require('../database/models');
const { nftInfo } = require('../database/models');

module.exports = {
	// registerDiscord: async (req, res) => {
	// 	try {
	// 		const address = req.body.address;
	// 		const discordId = req.body.discordId;
	// 		console.log(address, discordId);
	// 		const result = await AccountInfoList.create({ address, discordId });
	// 		res.send(' accountInfoList Router test중입니다 성공!');
	// 	} catch (e) {
	// 		console.log('discordId save failed');
	// 	}
	// },

	getSwapId: async (req, res) => {
		console.log('aaa');
		console.log(req, res);
	},
};
