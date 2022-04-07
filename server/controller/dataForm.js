const makeData = (proposalId,proposedAddress,offeredAddress) => {
	return {
		proposalId : proposalId,
        user1: {
          address: proposedAddress,
          nfts: [
            {
              address: "0x02e81f5e8bf8b19d0e1f3ad4a4eea757402b6cc0",
              id: "10",
              imageUrl:
                "https://lh3.googleusercontent.com/Q5V9Q0PLsQqpMXaj39_CgcxVdoBQxNf1fNyJtSyA3wcgm5Fkgh9-sv97aIIgJZbPy1sC6dFFAtiZyD82cz7EoQXvkFXeLZBVK8JwEA",
            },
            {
              address: "0x690071b9354031e135b8332ff10e4ad6ddfaf48e",
              id: "4",
              imageUrl:
                "https://lh3.googleusercontent.com/BWKgKXz6JbnK-H1r-n-3xE_wRJNAD3nGylSW-o6clV2GRs1Mn_xmdMXIZ0jIL5ot4-e1P7iy4lWHaNnwJ3S-V4SgFna7PejHbxdJ",
            },
          ],
          ether: 0,
        },
        user2: {
          address: offeredAddress,
          nfts: [
            {
              address: "0x02e81f5e8bf8b19d0e1f3ad4a4eea757402b6cc0",
              id: "10",
              imageUrl:
                "https://lh3.googleusercontent.com/Q5V9Q0PLsQqpMXaj39_CgcxVdoBQxNf1fNyJtSyA3wcgm5Fkgh9-sv97aIIgJZbPy1sC6dFFAtiZyD82cz7EoQXvkFXeLZBVK8JwEA",
            },
          ],
          ether: 0,
        },
      }
}


module.exports = { makeData };