contract('SydEth', function(accounts) {
	it("should add different certificates", function(done) {
		let meta = SydEth.deployed();

		let certificateArray = [{
			issuerName: 'issuer1',
			courseName: 'course1',
			beneficiaryName: 'name1',
			beneficiaryAddress: accounts[1]
		}, {
			issuerName: 'issuer2',
			courseName: 'course with space',
			beneficiaryName: 'name2',
			beneficiaryAddress: accounts[2]
		}, {
			issuerName: 'issuer3',
			courseName: 'course with special .,!@#$%',
			beneficiaryName: 'name3',
			beneficiaryAddress: accounts[3]
		}, {
			issuerName: 'issuer4',
			courseName: 'course4',
			beneficiaryName: 'Name with ümlaut',
			beneficiaryAddress: accounts[4]
		}, {
			issuerName: 'issuer5',
			courseName: 'course5',
			beneficiaryName: 'name5',
			beneficiaryAddress: accounts[5]
		}, ];

		for (let certificate of certificateArray)
			meta.addCertificate(certificate.issuerName, certificate.courseName, certificate.beneficiaryName, certificate.beneficiaryAddress, {
				from: accounts[1]
			});

		meta.getLength().then(function(length) {
			assert.equal(length.c[0], certificateArray.length, 'Assert fail: not all certificates added');
		}).then(done).catch(done);
	});

	it("should find certificates", function(done) {
		let meta = SydEth.deployed();
		let findName = 'Name with ümlaut';

		meta.findCertificate(findName).then(function(index) {
			assert.equal(index.c[0], 4, 'Assert fail: certificate not found');
		}).then(done).catch(done);
	});

	it("should not find non-existing certificates", function(done) {
		let meta = SydEth.deployed();
		let findName = 'Name with umlaut';

		meta.findCertificate(findName).then(function(index) {
			assert.equal(index.c[0], 0, 'Assert fail: certificate found');
		}).then(done).catch(done);
	});

	it("should allow name change", function(done) {
		let meta = SydEth.deployed();
		let oldName = 'name5';
		let newName = 'New name';

		meta.changeName(oldName, newName, {
			from: accounts[5]
		}).then(function() {
			meta.findCertificate(newName).then(function(index) {
				assert.equal(index.c[0], 5, 'Assert fail: certificate name not changed');
			}).then(done).catch(done);
		});
	});
	it("should not allow name change", function(done) {
		let meta = SydEth.deployed();
		let oldName = 'name1';
		let newName = 'New name';

		meta.changeName(oldName, newName, {
			from: accounts[5]
		}).then(function() {
			meta.findCertificate(oldName).then(function(index) {
				assert.equal(index.c[0], 1, 'Assert fail: certificate name changed');
			}).then(done).catch(done);
		});
	});
});
