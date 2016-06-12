contract('Access', function(accounts) {

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

});