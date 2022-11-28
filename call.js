const Web3 = require('web3');

// Loading the contract ABI
// (the results of a previous compilation step)
const fs = require('fs');
const path = require('path');
const { abi } = JSON.parse(
	fs.readFileSync(
		path.resolve(__dirname, 'build', 'contracts', 'Inbox.json')
	)
);

async function main() {
	// Configuring the connection to an Ethereum node
	const network = process.env.ETHEREUM_NETWORK;
	const web3 = new Web3(
		new Web3.providers.HttpProvider(process.env.INFURA_API_KEY)
	);
	// Creating a signing account from a private key
	const signer = web3.eth.accounts.privateKeyToAccount(
		process.env.SIGNER_PRIVATE_KEY
	);
	web3.eth.accounts.wallet.add(signer);
	// Creating a Contract instance
	const contract = new web3.eth.Contract(
		abi,
		// Replace this with the address of your deployed contract
		process.env.INBOX_CONTRACT
	);
	// Issuing a transaction that calls the `setMessage` method (writing function)
	const tx = contract.methods.setMessage('Hello, world!');
	const receipt = await tx
		.send({
			from: signer.address,
			gas: await tx.estimateGas(),
		})
		.once('transactionHash', (txhash) => {
			console.log(`Mining transaction ...`);
			console.log(
				`https://${network}.etherscan.io/tx/${txhash}`
			);
		});
	// The transaction is now on chain!
	console.log(`Mined in block ${receipt.blockNumber}`);

	// Calling `message` method (reading function, not a transaction)
	const message = await contract.methods.message().call();
	console.log(`Message on chain is now ${message}`);
}

require('dotenv').config();
main();
