contract('Errors', function(accounts) {

  it("should return zero with divide by zero error", function(done) {
    var errors = Errors.deployed();
    errors.divideByZero.call(100, {from: accounts[0]}).then(function(result) {
      assert.equal(result.toNumber(), 0, 'divide by zero doesnt return 0');
    }).then(done).catch(done);
  });

  // it("should break for array index out of bounds error on fixed sized array", function(done) {
  //   var errors = Errors.deployed();
  //   errors.arrayIndexOutOfBounds.call(10, {from: accounts[0]}).then(function(result) {
  //     console.log(result);
  //     // assert.equal(result.toNumber(), 0, 'array out of bounds error doesnt return 0');
  //   }).then(done).catch(done);
  // });

  // it("should return zero for array index out of bounds error on dynamic array", function(done) {
  //   var errors = Errors.deployed();
  //   errors.arrayIndexOutOfBoundsDynamic.call(1000, {from: accounts[0]}).then(function(result) {
  //     console.log(result);
  //     // assert.equal(result.toNumber(), 0, 'array out of bounds error doesnt return 0');
  //   }).then(done).catch(done);
  // });

  it("should run out of gas", function(done) {
    var errors = Errors.deployed();
    errors.bigLoop.call().then(function(result) {
      console.log(result);
    }).then(done).catch(done);
  });


  it("should produce invalid jump error", function(done) {
    var errors = Errors.deployed();
    errors.numbersFixed.call(10).then(function(result) {
      console.log(result);
      // assert.equal(result.toNumber(), 0, 'divide by zero doesnt return 0');
    }).then(done).catch(done);
  });

});