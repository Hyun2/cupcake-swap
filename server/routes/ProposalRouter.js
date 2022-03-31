const express = require('express');
const router = express.Router();
const { AccountInfoList } = require('../database/models');
const { getSwapId,proposalSwap,getProposal, rejectProposal } = require('../controller/ProposalController');


router.get('/openSwap/:swapId', getSwapId);
router.post('/proposal', proposalSwap);
router.get('/proposal/:id', getProposal);
router.post('/reverseProposal', getProposal);
router.patch('/reject', rejectProposal);
router.patch('/accept', getProposal);

module.exports = router;
