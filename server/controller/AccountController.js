
const { accounts } = require('../database_mongo/models/accounts');


module.exports = {
  
    // registerDiscord: async (req, res) => {
        
    //     try {
    //         const address = req.body.address;
    //         const discordId = req.body.discordId;


    //         console.log(address,discordId);
    //         const result = await AccountInfoList.create(
    //             { address, discordId }
    //         );
    //         res.send(' accountInfoList Router test중입니다 성공!');
    //     } catch (e) {
    //        console.log('discordId save failed');
    //     }
    // },
    registerDiscord: async (req, res) => {
		try {
			const address = req.body.address;
			const discordId = req.body.discordId;
			console.log(address, discordId);
            const result = await accounts.updateOne({ address }, { discordId }).exec();
            console.log(result);
			res.send(' accountInfoList Router test중입니다 성공!');
		} catch (e) {
			console.log('discordId save failed');
		}
    },
    registerAccount: async (req,res) => {
        try {
            const address = req.body.address;
            const account = new accounts({ address });
            account.save((err, result) => {
                if (result !== undefined) {
                    console.log(result);
                    res.json("success")
                } else { 
                    res.json("fail")  
                }
                
            })
        } catch (e) {
            console.log(e);
            res.json("fail")
        }
    }


}