//setup web3
let Web3 = require('web3');
if (typeof web3 === 'undefined') {
	web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
	web3.eth.defaultAccount = web3.eth.accounts[0];
}
