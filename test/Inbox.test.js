const assert = require('assert');
const Inbox = artifacts.require('Inbox');

contract('Inbox', (accounts) => {
	const owner = accounts[0];
	let inbox;
	const INITIAL_MESSAGE = 'Hello, world!';

	beforeEach(async () => {
		inbox = await Inbox.new(INITIAL_MESSAGE, {
			from: owner,
			gas: 1000000,
		});
	});

	describe('Inbox', () => {
		it('deploys a contract', () => {
			assert.ok(inbox.address);
		});

		it('has a default message', async () => {
			// await inbox.methods['message()'].call();
			assert.equal(await inbox.message(), INITIAL_MESSAGE);
		});

		it('lets the owner change the message', async () => {
			await inbox.setMessage('Good bye!', {
				from: owner,
			});
			assert.equal(await inbox.message(), 'Good bye!');
		});
	});
});
