contract('Access', function(accounts) {

  it("should set member for accounts[0] on contract instantiation", function(done) {
    var access = Access.deployed();
    access.members.call(0).then(function(result) {
      assert.equal(result, accounts[0], "member doesn't exist");
    }).then(done).catch(done);
  });

  it("should set member as special", function(done) {
    var access = Access.deployed();
    access.member.call(accounts[0]).then(function(result) {
      assert.equal(result[2], true, "member not set to special");
    }).then(done).catch(done);
  });

  it("should set member as exists", function(done) {
    var access = Access.deployed();
    access.member.call(accounts[0]).then(function(result) {
      assert.equal(result[1], true, "member not set to exists");
    }).then(done).catch(done);
  });


});