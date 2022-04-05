const express = require('express');
const router = express.Router();
const { AccountInfoList } = require('../database/models');
const { getSwapId,proposalSwap,getProposal, rejectProposal, acceptProposal, allProposals } = require('../controller/ProposalController');

router.get('/',allProposals)
router.post('/proposal', proposalSwap);
router.get('/proposal/:id', getProposal);
router.post('/reverseProposal', getProposal);
router.patch('/reject', rejectProposal);
router.patch('/accept', acceptProposal);

module.exports = router;
