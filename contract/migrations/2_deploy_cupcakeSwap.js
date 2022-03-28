const CupCakeSwap = artifacts.require('CupCakeSwap');

module.exports = function (deployer) {
	deployer.deploy(
		CupCakeSwap,
		1,
		'0x645F1ac4c90689611b4c697ca9D0873aF213DC00'
	);
};
