const Inbox = artifacts.require('Inbox');

module.exports = function (deployer) {
	deployer.deploy(Inbox, (arguments = 'Hello World!'));
};
