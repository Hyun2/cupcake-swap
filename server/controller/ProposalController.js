//const { Proposals,proposedNftInfo,offeredNftInfo,AccountInfoList, sequelize } = require('../database/models');

const { proposals } = require('../database_mongo/models/proposals');
const { accounts } = require('../database_mongo/models/accounts');
const { sendEmbed } = require('./discord'); // discord.js에서 embed를 보내기위한 양식을 만드는 함수.
const { makeData } = require('./dataForm');  //save함수를 사용하는데 있어서 dataForm을 재사용하기위한 함수



// 데이터 형식에 맞춰서 재사용하기 위한 함수를 제작 

module.exports = {
	
	proposalSwap: async (req, res) => {

	//  ---- 필요한 데이터를 프론트에서 받아옵니다. -----
	
	// 	const proposedNfts = JSON.parse(req.body.proposedNfts).data;
	// 	const offeredNfts = JSON.parse(req.body.offeredNfts).data;
	// 	const netWork = req.body.netWork
	// 	const proposedAmount = 0;
	// 	const offeredAmount = 0;
		
	
		try {
		const proposalId = (await proposals.count('id').exec())+1;
	    const proposedAddress = req.body.proposedAddress;
		const offeredAddress = req.body.offeredAddress;
	//---- 먼저 swapProposalList에 들어온 proposal 데이터를 DB에 올리기-----	
		const form = makeData(proposalId, proposedAddress, offeredAddress)
		const data = new proposals(form);
		data.save(async (err, success) => {
			if (err) throw err;

	//전송이 성공하면 1 실패하면 -1
			const result = await sendEmbed(proposedAddress, offeredAddress, proposalId);
			if (result > 0) {
				return res.json({ data: "success" })
			} else {
				return res.json({ data: "fail" })
			}
		})
			
		} catch (error) {
			console.log(error);	
			return
		}
	},
	getProposal: async(req,res) => {
		// 제안을 받아서 페이지에서 제안된 NFT를 보여주는 모습이 나와야 합니다. 
		try {
			const proposalId = Number(req.params.id);
			const isCheck = await proposals.findOne({proposalId});
			if (isCheck.status === 'pending') {
				return res.json(isCheck)
			} else {
				return res.json({ data: 'fail' })
			}
		} catch (e) {
			console.log(e);
			res.json("fail")
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
		const proposalId = req.body.proposalID;
        const status = "accept"
		const result = await proposals.updateOne({proposalId }, { status })
		if (result.modifiedCount > 0) {
			return res.json('success' );
		} else {
			return res.json( 'fail' );
		}
	},
	rejectProposal: async (req, res) => {
		// 상태 accpet, pending, reject
		const proposalId = req.body.proposalID;
        const status = "reject"
		const result = await proposals.updateOne({ proposalId }, { status })
		if (result.modifiedCount > 0) {
			return res.json( 'success' );
		} else {
			return res.json('fail');
		}
	},
	allProposals: async (req, res) => {
		//proposalId에 해당하는 정보를 가져오기
		const data = await proposals.find().exec();
		return res.json({data})
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