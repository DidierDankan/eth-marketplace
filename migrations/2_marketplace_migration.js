const MarketplaceMigration = artifacts.require('Marketplace'); // this import supposed to have the same name as the contract, not the same name as the .sol file of the contract

module.exports = function (deployer) {
	deployer.deploy(MarketplaceMigration);
};
