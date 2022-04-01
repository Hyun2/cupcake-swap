const { Proposals,nftInfo,AccountInfoList } = require('../database/models');
const { Client, Intents, MessageEmbed,WebhookClient, MessageButton,MessageActionRow } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_WEBHOOKS] })	// Client 객체 생성
	//더미데이터
		// { "data"
		// 	 : [
		// 	{ "address" : "0xdB41F06dde2AFAD8670ad926499ec2D05da433ce", "contractAddress" : "1", "tokenId" : "1" },
		// 	{ "address" : "0xdB41F06dde2AFAD8670ad926499ec2D05da433ce", "contractAddress" : "2", "tokenId" : "2" },
		// 	{ "address" : "0xE296D723005223D394186168Af07e091e7b6cBDC", "contractAddress" : "3", "tokenId" : "3" },
		// 	{ "address" : "0xE296D723005223D394186168Af07e091e7b6cBDC", "contractAddress" : "4", "tokenId" : "4" }]
		// }

const makeEmbed = (proposedAddress,offerAddress,proposalId,discordId) => {
	//임베드만드는 기본 양식 함수 
	const embed = new MessageEmbed()
		.setTitle("SWAP") // 1 - embed의 제목을 담당합니다
		.setDescription(`${proposedAddress} PROPOSE to ${offerAddress}`)
	    .setFields([
		{
			name: `proposal Address`,
			value: `[${proposedAddress}](https://ropsten.etherscan.io/address/${proposedAddress})`,
			inline : true
		},
		{
			name: `offerd Address`,
			value: `[${offerAddress}](https://ropsten.etherscan.io/address/${offerAddress})`,
			inline : true
			},
		
		{
			name: `discordId`,
			value: `${discordId}`,
			inline : true
		},
		{
			name: `openSwap URL`,
			value: `[swapURL](http://localhost:3000/propoposal/${proposalId})`,
			inline : true
		}

	])
	.setColor("PURPLE") // 2 - embed 사이드 바의 색을 정합니다.
	 // 3 - 실제로 설명을 담당하는 곳입니다.
	
	  return embed
}



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
		console.log(req.params.swapId);
		// console.log('aaa');
		// console.log(req, res);
	},

	proposalSwap: async (req, res) => {

	//  ---- 필요한 데이터를 프론트에서 받아옵니다. -----
        const swapId = req.body.swapId
		const nfts = JSON.parse(req.body.nfts).data;
		const netWork = req.body.netWork
		const proposedAddress = req.body.proposedAddress;
		const offerAddress = req.body.offeredAddress;
		console.log(nfts);
		
   //  ---- 먼저 swapProposalList에 들어온 proposal를 적재합시다.-----
		 Proposals.create(
			{netWork, proposedAddress, offerAddress, swapId, status:"pending"}
		  ).then((result) => {
			  for (let i = 0; i < nfts.length; i++) {
				  nftInfo.create(nfts[i]);
			  }
		  }).catch((err) => {
			  
			  console.log(err);
			  
		  });
		
		
	//  ---- 먼저 swapProposalList에 들어온 proposal를 적재합시다.-----	
	  
		try { 
	 //  ---- DB에서 계정에 해당하는 discordId를 찾아와야합니다.  -----
		const addrInfo = await AccountInfoList.findOne({ where: { address: offerAddress } })
	    const discordId = (addrInfo.discordId);
		const data = {
			id : process.env.WEBHOOKID,
			token : process.env.WEBHOOKTOKEN
		}

	// discordId를 통해서 보내주는 작업
		const embed = makeEmbed(proposedAddress,offerAddress,swapId,discordId)
		const hook = new WebhookClient(data);
		hook.send({ embeds: [embed]})
		return res.json({data:"success"})
		
		}catch(error) {
			console.log(error);
			return
		}
	},
	getProposal: async(req,res) => {
		// 제안을 받아서 페이지에서 제안된 NFT를 보여주는 모습이 나와야 합니다. 
		const proposalID = req.params.id;
		const isCheck = await Proposals.findOne({ where: { swapId: proposalID } });
		if (isCheck.stats === 'pending') {
			const data = await nftInfo.findAll({ where: { swapId: proposalID } })
			return res.json(data)
		} else {
			return res.json({data : 'fail'})
		}
		
	},

	reverseProposal: async(req,res) => {
		// 제안을 받은 offerAddress가 다시 제안을 함으로써 proposedAddress가 된다.
		// proposedAddress는 데이터가 변하지 않으므로 변경시키지 않고 
		// Proposals에서 proposedAddress와 
		// offerAddress가 제안하는 nft만 변경해주도록합시다.
		const proposalID = req.params.id; 
		const data = await nftInfo.findAll({ where: { swapId: proposalID } })
		return res.json(data)
	},
	acceptProposal: async(req,res) => {
		// 수락을 했기에 상태를 변경시켜준다.
		const proposalID = req.body.proposalID;
        const status = "accept"
		const result = await Proposals.update({ status }, { where: { swapId: proposalID } })
		
		if (result > 0) {
			return res.json({ data: 'success' });
		} else {
			return res.json({ data: 'fail' });
		}
	},
	rejectProposal: async (req, res) => {
		// 상태 accpet, pending, reject
		
		const proposalID = req.body.proposalID;
        const status = "reject"
		const result = await Proposals.update({ status }, { where: { swapId: proposalID } })
		
		if (result > 0) {
			return res.json({ data: 'success' });
		} else {
			return res.json({ data: 'fail' });
		}
		
	    	
	}

};
// [{
// 	color: 3447003,
// 	author: {
// 	  name: "Author Name, it can hold 256 characters",
// 	  icon_url: "https://i.imgur.com/lm8s41J.png"
// 	},
// 	thumbnail: {
// 	  url: "http://i.imgur.com/p2qNFag.png"
// 	},
// 	image: {
// 	  url: "http://i.imgur.com/yVpymuV.png"
// 	},
// 	title: "This is your title, it can hold 256 characters",
// 	url: "https://discord.js.org/#/docs/main/master/class/MessageEmbed",
// 	description: "This is the main body of text, it can hold 2048 characters.",
// 	fields: [{
// 	  name: "This is a single field title, it can hold 256 characters",
// 	  value: "This is a field value, it can hold 1024 characters.",
// 	  inline: false
// 	},
// 	{
// 	  name: "Inline fields",
// 	  value: "They can have different fields with small headlines, and you can inline them.",
// 	  inline: true
// 	},
// 	{
// 	  name: "Masked links",
// 	  value: "You can put [masked links](https://discord.js.org/#/docs/main/master/class/MessageEmbed) inside of rich embeds.",
// 	  inline: true
// 	},
// 	{
// 	  name: "Markdown",
// 	  value: "You can put all the *usual* **__Markdown__** inside of them.",
// 	  inline: true
// 	},
// 	{
// 	  name: "\u200b",
// 	  value:"\u200b"
// 	}],
// 	timestamp: new Date(),
// 	footer: {
// 	  icon_url: "http://i.imgur.com/w1vhFSR.png",
// 	  text: "This is the footer text, it can hold 2048 characters"
// 	}
//   }]});