contract('Access', function(accounts) {

  it("should issue 1000 tokens to the creator", function(done) {
    var access = Access.deployed();
    access.balanceOf(accounts[0], {from: accounts[0]}).then(function(balance) {
      assert.equal(balance.toNumber(), 1000, 'initial 1000 tokens not issued to creator');
    }).then(done).catch(done);
  });

  it("should have initial supply of 1000 tokens", function(done) {
    var access = Access.deployed();
    access.totalSupply().then(function(balance) {
      assert.equal(balance.toNumber(), 1000, 'initial 1000 tokens not accounted for');
    }).then(done).catch(done);
  });

  it("should set initial member for accounts[0] on contract instantiation", function(done) {
    var access = Access.deployed();
    access.members.call(0).then(function(result) {
      assert.equal(result, accounts[0], "member doesn't exist");
    }).then(done).catch(done);
  });

  it("should set initial member as special", function(done) {
    var access = Access.deployed();
    access.member.call(accounts[0]).then(function(result) {
      assert.equal(result[2], true, "member not set to special");
    }).then(done).catch(done);
  });

  it("should set initial member as exists", function(done) {
    var access = Access.deployed();
    access.member.call(accounts[0]).then(function(result) {
      assert.equal(result[1], true, "member not set to exists");
    }).then(done).catch(done);
  });

  it("should add new Member", function(done) {
    var access = Access.deployed();
    access.addMember.call(accounts[1], false, {from: accounts[0]}).then(function(result) {
      assert.equal(result, true, "member not added");
    }).then(done).catch(done);
  });

  it("new member should exist", function(done) {
    var access = Access.deployed();
    access.addMember(accounts[1], false, {from: accounts[0]}).then(function(result) {
      return access.member.call(accounts[1]);
  	}).then(function(member) {
  	  assert.equal(member[1], true, "member not set to exists");
	}).then(done).catch(done);
  });

  it("new member should not be special", function(done) {
    var access = Access.deployed();
    access.addMember(accounts[1], false, {from: accounts[0]}).then(function() {
      return access.member.call(accounts[1]);
  	}).then(function(member) {
  	  assert.equal(member[2], false, "member not set to special");
	}).then(done).catch(done);
  });

  it("existing member should be able to become special", function(done) {
    var access = Access.deployed();
    access.addMember(accounts[1], false, {from: accounts[0]}).then(function() {
      return access.addMember(accounts[1], true, {from: accounts[0]});
  	}).then(function(){
      return access.member.call(accounts[1]);
  	}).then(function(member) {
  	  assert.equal(member[2], true, "member set to special");
	}).then(done).catch(done);
  });

  it("should be able to recieve funds", function(done) {
    var access = Access.deployed();
    var amount = 1000000;
    var Web3 = require('web3');
    var web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));    
    web3.eth.sendTransaction({from: accounts[0], to: access.address, value: amount});
    var balance = web3.eth.getBalance(access.address);
    assert.equal(balance.toNumber(), amount, "funds not recieved");
    done();
  });

  it("special members should be able to spend contract funds", function(done) {
    var access = Access.deployed();
    var amount = 1000000;
    var starting_balance = web3.eth.getBalance("0x4a0c65869f0b320d3720af59b891709284224985");

    access.spend('0x4a0c65869f0b320d3720af59b891709284224985', amount, {from: accounts[0]}).then(function() {
      var ending_balance = web3.eth.getBalance("0x4a0c65869f0b320d3720af59b891709284224985");
      assert.equal(ending_balance - starting_balance, amount, 'funds not transfered');
  	}).then(done).catch(done);
  });

  it("ordinary members should not be able to spend contract funds", function(done) {
    var access = Access.deployed();
    var amount = 1000000;
    var starting_balance = web3.eth.getBalance("0x4a0c65869f0b320d3720af59b891709284224985");

    access.addMember(accounts[1], false, {from: accounts[0]}).then(function() {
      return access.spend('0x4a0c65869f0b320d3720af59b891709284224985', amount, {from: accounts[1]});
  	}).then(function() {
      var ending_balance = web3.eth.getBalance("0x4a0c65869f0b320d3720af59b891709284224985");
      assert.equal(ending_balance - starting_balance, 0, 'funds transfered when they should not have');
  	}).then(done).catch(done);
  });

  it("should be able to transfer tokens", function(done) {
    var access = Access.deployed();
    access.transfer(accounts[2], 1000, {from: accounts[0]}).then(function(result) {
      return access.balanceOf(accounts[2]);
    }).then(function(balance) {
      //console.log('account 2 balance', balance.toNumber());
      return access.balanceOf(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.toNumber(), 0, 'funds not transfered');
    }).then(done).catch(done);
  });

});