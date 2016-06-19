import {
	Template
} from 'meteor/templating';

let contractInstance;
let events;


if (typeof Session.get('contractAbi') != 'undefined' && typeof Session.get('contractAddress') != 'undefined') {
	contractInstance = web3.eth.contract(Session.get('contractAbi')).at(Session.get('contractAddress'));
	events = contractInstance.allEvents({
		fromBlock: 0,
		toBlock: 'latest'
	});
	events.watch(function(error, result) {
		console.log(web3.toAscii(result.args.beneficiaryName), web3.toAscii(result.args.courseName), );
	});
}

Template.uploadForm.helpers({
	contractAddress: function() {
		return Session.get('contractAddress');
	},
});

Template.uploadForm.events({
	'click .btn-upload' (event) {
		event.preventDefault();
		// get data from page
		let issuerName = $('.issuerName').val();
		let beneficiaryAddress = $('.beneficiaryAddress').val();
		let beneficiaryName = $('.beneficiaryName').val();
		let courseName = $('.courseName').val();

		// upload data to blockhain
		const contractInstance = web3.eth.contract(Session.get('contractAbi')).at(Session.get('contractAddress'));
		contractInstance.addCertificate(
			web3.fromAscii(issuerName),
			web3.fromAscii(courseName),
			web3.fromAscii(beneficiaryName),
			beneficiaryAddress
		);

		// show success message
		FlashMessages.sendSuccess('Document added successfully');
	},
	'click .btn-fetch' (event) {
		event.preventDefault();

		// get contract instance
		const contractInstance = web3.eth.contract(Session.get('contractAbi')).at(Session.get('contractAddress'));
		// get data from blockchain
		beneficiaryName = $('.searchName').val();

		// findCertificate returns var of type BigNumber
		index = web3.toDecimal(contractInstance.findCertificate(beneficiaryName));
		let result = contractInstance.getCertificate(index);
		let timestamp = new Date(result[0] * 1000);
		let courseName = web3.toAscii(result[1]);
		let beneficiaryName = web3.toAscii(result[2]);
		let beneficiaryAddress = result[3];
		let issuerName = web3.toAscii(result[4]);
		$('.results').html(`Issuer: ${issuerName}<br/>Date: ${timestamp}<br/>Course: ${courseName}<br/>Beneficiary: ${beneficiaryName}<br/>Address: ${beneficiaryAddress}`);
	},
	'click .deployContract' (event) {
		event.preventDefault();
		// read contract source
		$.get("truffleDemo/contracts/SydEth.sol", function(data) {
			contractName = 'SydEth';
			contractSource = data;
			compiledContract = web3.eth.compile.solidity(contractSource);
			Session.setPersistent('contractAbi', compiledContract[contractName].info.abiDefinition);
			contractByteCode = compiledContract[contractName].code;

			// deploy contract
			web3.eth.contract(Session.get('contractAbi')).new(
				// param1, param2, param3,
				{
					from: web3.eth.defaultAccount,
					data: contractByteCode
				},
				(err2, contract) => {
					if (err2) {
						console.error(`error: ${err2}`);
						return;
					}
					// callback fires twice, we only want the second call when the contract is deployed
					if (contract.address) {
						console.log(
							`contract ${contractName} deployed\n`,
							`contract address: ${contract.address}\n`,
							`message sender: ${web3.eth.defaultAccount}`
						);
						Session.setPersistent('contractAddress', contract.address);

						// var theInstance = web3.eth.contract(Session.get('contractAbi')).at(Session.get('contractAddress'));

						const events = contract.allEvents({
							fromBlock: 0,
							toBlock: 'latest'
						});
						events.watch(function(error, result) {
							console.log('New certification to ' + web3.toAscii(result.args.beneficiaryName) + ' for course ' + web3.toAscii(result.args.courseName));
						});

						FlashMessages.sendSuccess('New Smart Contract deployed.');
						// would get all past logs again.
						// events.get(function(error, logs) {
						// 	console.log("past", logs);
						// });
					} // if
				} // (err2, contract) => {
			); // web3.eth.contract

		});
	},

});
